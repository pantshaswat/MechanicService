import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast } from 'sonner';


export default function DialogBox() {
  const cookies = new Cookies();

  const [open, setOpen] = useState(true)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')


  const butItems = JSON.parse(localStorage.getItem('cart')) || []

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');

  function validateJwt(token) {
    const payload = jwtDecode(token);
    return payload;
  }

  const getUserIdFromLocalStorage = () => {
    const user = validateJwt(token);

    if (!user) {
      return null;
    }
    return user._id;
  }

  const saveCartItemsToDatabase = async () => {
    try {
      const userId = getUserIdFromLocalStorage()
      // Replace with your actual backend API endpoint
      const response = await axios.post('http://localhost:3000/marketplace/buy', {
        parts: butItems,
        userId: userId,
      },
        {
          withCredentials: true,
        }
      )
      if (response.status === 400) {
        toast.error('Insufficient amount of vehicle part')
      }
    } catch (error) {
      console.error('Error saving cart items:', error)
    }
  }


  const clearLocalStorage = () => {
    localStorage.clear()
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckBadgeIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Confirm your Delivery
                      </Dialog.Title>
                      <p className="text-m text-gray-500 pt-2">
                        Type: Cash on Delivery

                      </p>
                      <div className="mt-2 ">
                        {/* //a field to write address */}
                        <label htmlFor="address"
                          className=''
                        >Address:</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          // onChange={handleAddressChange}
                          placeholder="Enter your address..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpen(false)
                      saveCartItemsToDatabase()
                      clearLocalStorage()
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
