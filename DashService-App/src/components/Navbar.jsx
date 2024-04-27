import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import ShopCart from './shopCart';

function validateJwt(token) {
  const payload = jwtDecode(token);
  return payload;
}

const Navbar = () => {


  const [open, setOpen] = useState(false);

  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');
  let user = null;

  if (token) {

    user = validateJwt(token);
  }

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();


  const handleNav = () => {
    setNav(!nav);
  };
  const handleOpenCart = () => {
    setOpen(true);
  };
  const handleCloseCart = () => {
    setOpen(false);
  }

  return (
    <div style={{ 
      position: 'relative', 
      zIndex: 500, 
      backgroundColor: '#4c4f9f', // Background color
      color: 'white',
      width: '100%',
      display: 'flex', 
      justifyContent: 'space-between', // Align items horizontally
      alignItems: 'center' // Align items vertically
    }} className="flex justify-between items-center h-24  mx-auto text-black ">
      <span className="w-full text-white p-4 text-3xl font-bold text-[#575ec2]">
        DashService
      </span>

      <ul className="hidden md:flex space-x-6">
        <Link to={'/'} className="p-4">Home</Link>
        {
          token && user.role === 'serviceCenter' &&
          (<Link to={'/bookingRequests'} className="p-4">Booking Requests</Link>)
        }
         {token && user.role === 'ClientUser' && (

<Link to={'/booking'} className="p-4">Book</Link>

)}
{token && user.role === 'ClientUser' && (

<Link to={'/roadSideRequest'} className="p-4">RoadSide Request</Link>

)}
{
          token && user.role === 'serviceCenter' &&
          (<Link to={'/roadSideRequests'} className="p-4">RoadSide Requests</Link>)
        }
        
        {token && user.role === 'serviceCenter' && (
          <Link to={'/createProduct'} className="p-4">Add Part</Link>
        )}


        {/* <span className="p-4">Profile</span> */}
        {/* <span className="p-4">Admin</span>
                <span className="p-4">Vendor</span> */}
        {token && user.role === 'ClientUser' && (

          <Link to={'/join'} className="p-4">Join</Link>

        )}

        {!isAuthenticated ? (
          <>
            <Link
              to="/register"
              className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2] mr-5"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Login
            </Link>

          </>
        ) : (

          token && user && (
            <>
              <span
                onClick={handleOpenCart}
                className="p-4">Cart</span>
              <span className='pt-4'>👤</span>

              <div className='pt-4 '>{user.fullName} </div>

              {/* notification icon */}
              <div className='pt-4'>
                <Link
                  to="/notifications"

                >

                  🔔
                </Link>

              </div>





              {/* logout */}
              <div
                onClick={() => {
                  cookies.remove('token');

                 
                  navigate('/');
                  window.location.reload();
                }}
                className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
                style={{
                  height: '40px',
                  paddingTop: '9px',
                  marginTop: '6px',
                }}
              >
                Logout
              </div>

            </>



          )
        )}

      </ul>
      <div onClick={handleNav}   className="block md:hidden ">
        {nav ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <ul
      style={{ 
      
     
        backgroundColor: '#4c4f9f', // Background color
        
        
      }}
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 flex flex-col'
            : 'ease-in-out duration-500 fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#575ec2] m-4">

        </h1>
        <Link to={'/'} className="p-4 border-b border-gray-100">Home</Link>
        {
          token && user.role === 'serviceCenter' &&
          (<Link to={'/bookingRequests'} className="p-4 border-b border-gray-100">Booking Requests</Link>)
        }
        {
          token && user.role === 'serviceCenter' &&
          (<Link to={'/roadSideRequests'} className="p-4 border-b border-gray-100">RoadSide Requests</Link>)
        }
        
        {token && user.role === 'ClientUser' && (

<Link to={'/booking'} className="p-4">Book</Link>

)}
{token && user.role === 'ClientUser' && (

<Link to={'/roadSideRequest'} className="p-4 border-b border-gray-100">RoadSide Request</Link>

)}
        {token && user.role === 'serviceCenter' && (
          <Link to={'/createProduct'} className="p-4 border-b border-gray-100">Part</Link>
        )}


        
        {token && user.role === 'ClientUser' && (

          <Link to={'/join'} className="p-4 border-b border-gray-100">Join</Link>

        )}

        {!isAuthenticated ? (
          <>
            <Link
              to="/register"
              className="p-4 border-b border-gray-100 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2] mr-5"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="p-4 border-b border-gray-100 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Login
            </Link>

          </>
        ) : (

          token && user && (
            <>
              <span
                onClick={handleOpenCart}
                className="p-4 border-b border-gray-100">Cart</span>
              <span className='pt-4'>👤</span>

              <div className='pt-4 border-b border-gray-100'>{user.fullName} </div>

              {/* notification icon */}
              <div className='pt-4 border-b border-gray-100'>
                <Link
                  to="/notifications"

                >

                  🔔
                </Link>

              </div>





              {/* logout */}
              <div
                onClick={() => {
                  cookies.remove('token');

                  navigate('/');
                  window.location.reload();
                }}
                className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
                style={{
                  height: '40px',
                  paddingTop: '9px',
                  marginTop: '6px',
                }}
              >
                Logout
              </div>

            </>



          )
        )}
        
     
      </ul>

      {open && (
        <ShopCart
          onClose={handleCloseCart}
          isOpen={handleOpenCart}

        />



      )

      }

    </div>
  );
};

export default Navbar;
