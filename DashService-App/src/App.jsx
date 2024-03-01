import './App.css';
import AdminLogin from './pages/AdminLogin';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {PrivateHomeRoute, PrivateLoginRoute} from './components/privateRoute';
import UserDashPage from './pages/userDashPage';
function App() {
  return (
    <Router>
      <Routes>

      <Route exact path="/" element={<PrivateHomeRoute />} >
        <Route exact path="/" element={<UserDashPage/>} />
      </Route>
      
      <Route exact path="/login" element={<PrivateLoginRoute />} >
        <Route exact path="/login" element={<Login/>} />
      </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
