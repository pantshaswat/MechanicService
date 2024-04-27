import React,{ useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role:"ClientUser",
    password: ""
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToBackend(formData);
  };
  const sendDataToBackend = (data) => {
  axios.post('http://localhost:3000/auth/register',data)
  .then(response=>{
    if(response.status === 201){
      console.log(`Account crearted: ${response.data}`);
      navigate('/login');
    }
  })
  .catch(error=>{
    if (error.response && error.response.status === 409) {
      console.log("Email already in use");
      // Display an error message to the user indicating that the email is already in use
    } else {
      console.error("Error creating user:", error);
      // Handle other errors
    }
  })
  };
  const backgroundImageUrl = 'https://t3.ftcdn.net/jpg/04/26/71/86/360_F_426718640_YZ6RFhGqwb7TCh5480prCzzxt9Zp6mIU.jpg'; 

    const backimg = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
      
    };
  return (
    <>
     <Navbar />
      <div style={backimg} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className= 'text-5xl text-gray-100 font-bold text-center'>Dash Service</div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST">
                      <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-100">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  autoComplete="fullName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div><div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-100">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  autoComplete="phoneNumber"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
Register              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={'/login'} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
Login            </Link>
          </p>
        </div>
      </div>
    </>
  )
}