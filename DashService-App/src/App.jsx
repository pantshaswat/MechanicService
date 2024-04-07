import './App.css';
import AdminLogin from './pages/AdminLogin';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { PrivateHomeRoute, PrivateLoginRoute, PrivateAdminRoute, PrivateServiceCenterRoute } from './components/privateRoute';
import UserDashPage from './pages/userDashPage';
import Dashboard from './components/Admin/Dashboard';
import Register from './pages/Register';
import SimpleSidebar from './components/SideBar';
import SimpleLayout from './components/SideBar';
import AdminPage from './pages/AdminPage';
import DetailsPage from './pages/shop/DetailsPage';
import Example from './pages/shop/PartsPage';
import PartsPage from './pages/shop/PartsPage';
import Users from './components/Admin/users';
import ServiceCenterRegistrationForm from './pages/JoinForm';
import BookingPage from './pages/booking';
import ShopCart from './components/shopCart';
import AddVehiclePart from './pages/addParts';
import NotificationPage from './pages/notificationPage';
import BookingRequest from './pages/bookingRequest';
import BookingListPage from './pages/bookedLists';
import RoadSideRequestPage from './pages/roadSideRequestPage';
import RoadSideReqList from './pages/roadSideListPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin/*" element={<PrivateAdminRoute />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/service" element={<PartsPage />} />
        <Route exact path="/details" element={<DetailsPage />} />

        <Route exact path="/" element={<PrivateHomeRoute />} >
          <Route exact path="/" element={<UserDashPage />} />
        </Route>

        <Route exact path="/login" element={<PrivateLoginRoute />} >
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/detailsPage" element={<DetailsPage />} />

        <Route exact path="/join" element={<ServiceCenterRegistrationForm />} />
        <Route exact path="/booking" element={<BookingPage />} />
        <Route exact path="/bookingRequest" element={<BookingRequest />} />
        <Route exact path="/cart" element={<ShopCart />} />

        <Route exact path="/createProduct" element={<PrivateServiceCenterRoute />} >
          <Route exact path="/createProduct" element={<AddVehiclePart />} />
        </Route>
        <Route exact path="/bookingRequests" element={<PrivateServiceCenterRoute />} >
          <Route exact path="/bookingRequests" element={<BookingListPage />} />
        </Route>
        <Route exact path="/roadSideRequests" element={<PrivateServiceCenterRoute />} >
          <Route exact path="/roadSideRequests" element={<RoadSideReqList />} />
        </Route>
        <Route exact path='/notifications' element={<NotificationPage></NotificationPage>}>

        </Route>
        <Route exact path='/roadSideRequest' element={<RoadSideRequestPage></RoadSideRequestPage>}>

</Route>






      </Routes>

    </Router>
  );
}

export default App;
