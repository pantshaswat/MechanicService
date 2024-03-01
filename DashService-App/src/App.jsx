import './App.css';
import AdminLogin from './pages/AdminLogin';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {PrivateHomeRoute, PrivateLoginRoute} from './components/privateRoute';
import UserDashPage from './pages/userDashPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import SimpleSidebar from './components/SideBar';
import SimpleLayout from './components/SideBar';
import AdminPage from './pages/AdminPage';
import DetailsPage from './pages/shop/DetailsPage';
import Example from './pages/shop/PartsPage';
import PartsPage from './pages/shop/PartsPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/admin'}element={<AdminPage/>}>

        </Route>
        
        <Route exact path={'/register'} element={<Register />} />
        <Route exact path={'/service'} element={<PartsPage />} />
                        <Route exact path={'/details'} element={ <DetailsPage/>} />


        

      <Route exact path="/" element={<PrivateHomeRoute />} >
      </Route>
      
      <Route exact path="/login" element={<PrivateLoginRoute />} >
        <Route exact path="/login" element={<Login/>} />
      </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
