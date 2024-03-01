import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import ForgetPassword from './pages/ForgetPassword';
import ActivationSuccess from './pages/ActivationSuccess';
import Login from './pages/Login';
import UserForm from './pages/UserForm';
import DetailsPage from './pages/DetailsPage';
import AdminPanel from './pages/AdminPanel';
import { Nav, Spinner } from 'react-bootstrap';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard.';
import ShopCart from './components/shopCart';
import Footer from './components/Footer';
import Hero from './components/Hero'

function App() {
  return (
    <Router>
      <Navbar/>
      <Hero />
      
      
      
      
     
      <Routes>
        
                <Route path="/login" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
