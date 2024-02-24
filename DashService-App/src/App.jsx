import { useState } from 'react'
import './App.css'
import AdminLogin from './pages/AdminLogin'

import About from './pages/About'
import ForgetPassword from './pages/ForgetPassword'
import ActivationSuccess from './pages/ActivationSuccess'
import Login from './pages/Login'
import { Form } from 'react-router-dom';
import UserForm from './pages/UserForm'
import DetailsPage from './pages/DetailsPage'


function App() {

  return (
    <div className="flex items-center justify-center min-h-screen p-4">

    {/* // <AdminLogin/>
    // <About/>
    // <ForgetPassword/>
    // <Navbar/>
    // <ActivationSuccess/>
    // <Login/> */}
      {/* <UserForm/> */}
      <DetailsPage/>
    </div>

  )
}

export default App
