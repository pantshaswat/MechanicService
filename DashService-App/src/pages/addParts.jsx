
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from '../components/Navbar'
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';

//toast
import { Toaster, toast } from 'sonner';

function validateJwt(token){
  const payload =  jwtDecode(token);
  return payload;
}


export default function AddVehiclePart() {
    const cookies = new Cookies();

  
  const token = cookies.get('token');
  const user = validateJwt(token);


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    
    price: 0,
    category: 'Others',
    amount: 0,

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  sendDataToBackend(formData);
  //set a timer
  

  // navigate to home



  
  };
  const sendDataToBackend = (data) => {
    const finalFormData = new FormData();
  finalFormData.append('name', data.name);
  finalFormData.append('description', data.description);
  finalFormData.append('price', data.price);
  finalFormData.append('amount', data.amount);
  finalFormData.append('category', 'others');
    
    const imageInput = document.querySelector('input[type="file"]');
  const imageFile = imageInput.files[0];
  finalFormData.append('vehiclePartImage', imageFile);

    axios.post("http://localhost:3000/vehiclePart/add", finalFormData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
}).then(response=>{
    if(response.status === 201){
      console.log(`Request submitted: ${response.data}`);
      toast.success("Request submitted successfully, Wait for approval.")
  setTimeout(() => {

    navigate('/');
  }, 1000);

    }
  })
    .catch(error => {
      console.log(error)
  })
  };
    return (<>
            <Navbar/>
        <div className='pt-2 pl-28 pr-8 pb-10'>
        <form
      onSubmit={handleSubmit}
        >
      <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Part Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                        autoComplete="name"
                        onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="spark plug"
                  />
                </div>
              </div>
                </div>
                
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                      name="description"
                                              onChange={handleInputChange}

                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
                </div>
                {/* //upload photo */}
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        name="vehiclePartImage"
                        id="vehiclePartImage"
                                                onChange={handleInputChange}

                        autoComplete="photo"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  
                  </div>
                </div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="price"
                        id="price"
                                                onChange={handleInputChange}

                    autoComplete="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Rs. 4000"
                  />
                </div>
              </div>
                </div>
                  <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="amount"
                        id="amount"
                                                onChange={handleInputChange}

                    autoComplete="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="3"
                  />
                </div>
              </div>
                </div>
                
              
          
          

         

        
              </div>
              
              
        </div>

       
      
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-12">
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button> */}
        <button
              type="submit"
              onSubmit={handleSubmit}
          className="mt-2 rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Save
        </button>
      </div>
        </form>
        <Toaster/>
            </div>
              </>
  )
}
