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
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/admin'}element={<HomePage/>}>

        </Route>
        <Route exact path={'/register'} element={ <Register/>} />
        

      <Route exact path="/" element={<PrivateHomeRoute />} >
        <Route exact path="/" element={<HomePage/>} />
      </Route>
      
      <Route exact path="/login" element={<PrivateLoginRoute />} >
        <Route exact path="/login" element={<Login/>} />
      </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
