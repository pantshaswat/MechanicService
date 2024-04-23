import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import DialogBox from './DialogBox';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export default function ShopCart({ isOpen, onClose }) {
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(storedCartItems);
  }, []);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = products.filter((product) => product._id !== id);
    setProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Increment quantity of item
  const incrementQuantity = (id) => {
    const updatedProducts = products.map(product => {
      if (product._id === id) {
        return { ...product, amount: (product.amount || 1) + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Decrement quantity of item
  const decrementQuantity = (id) => {
    const updatedProducts = products.map(product => {
      if (product._id === id && (product.amount || 1) > 1) {
        return { ...product, amount: (product.amount || 1) - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Calculate total amount
  const totalAmount = products.reduce((total, product) => {
    return total + (parseFloat(product.price) * (product.amount || 1));
  }, 0);

const handleDialogOpen = () => {
  // Show toast to indicate order placement
  toast.success("Order placed.");
  setOpen(false);

  // Extract only the necessary data from products array
  const orderItems = products.map(({ _id, amount }) => ({ _id: _id, amount }));
  console.log(orderItems);

  // API request to place order with orderItems array
  axios.post('http://localhost:3000/marketplace/buy', { orderItems },{ withCredentials: true })
    .then(response => {
      // Handle success response
      console.log(response.data);
      // Clear the cart after successful order placement
      localStorage.removeItem('cart');
      setDialogOpen(true); // Open dialog box after successful order placement
      onClose(); // Close the cart dialog
    })
    .catch(error => {
      // Handle error response
      console.error('Error placing order:', error);
      toast.error("Error placing order. Please try again later.");
    });
};


  return (
    <Transition.Root style={{zIndex: 1000
}
} show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`http://localhost:3000/${product.photoUrl}`}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-blue-500">{product.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">{product.description}</p>

                                    <div className="flex items-center">
                                      <button
                                        type="button"
                                        onClick={() => decrementQuantity(product._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        -
                                      </button>
                                      <p className="mx-2">{product.amount || 1}</p>
                                      <button
                                        type="button"
                                        onClick={() => incrementQuantity(product._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => removeItem(product._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs {totalAmount.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          onClick={handleDialogOpen}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <Toaster />
          
        </div>
        {dialogOpen && <DialogBox />}
      </Dialog>
    </Transition.Root>
  )
}
