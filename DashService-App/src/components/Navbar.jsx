import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';
import ShopCart from './shopCart';

function validateJwt(token){
  const payload =  jwtDecode(token);
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
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto text-black">
            <span className="w-full text-3xl font-bold text-[#575ec2]">
                DashService
            </span>
            <ul className="hidden md:flex space-x-6">
                <Link to={'/'} className="p-4">Home</Link>
                <Link to={'/service'} className="p-4">Products</Link>
                <Link to={'/booking'} className="p-4">Booking</Link>
                {token && user.role  === 'serviceCenter' && (
                    <Link to={'/createProduct'} className="p-4">Part</Link>
                )}
                

                {/* <span className="p-4">Profile</span> */}
                {/* <span className="p-4">Admin</span>
                <span className="p-4">Vendor</span> */}
                                {token && user.role  === 'ClientUser' && (
                    
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
                  <button
                    onClick={handleOpenCart}
                    className="p-4">Cart</button>
                  <span className='pt-4'>👤</span>
                  
              <div className='pt-4 '>{user.fullName} </div>
              
              <Link className='pt-4' to={'/notifications'}>
    <img className='rounded-full h-10 w-15' src='https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg'>
    </img>
              </Link>
              
    
              {/* logout */}
              <div
                onClick={() => {
                  cookies.remove('token');
                  
                  window.location.reload();
                  navigate('/');
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
            <div onClick={handleNav} className="block md:hidden ">
                {nav ? (
                    <AiOutlineClose size={20} />
                ) : (
                    <AiOutlineMenu size={20} />
                )}
            </div>
            <ul
                className={
                    nav
                        ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'ease-in-out duration-500 fixed left-[-100%]'
                }
            >
                <h1 className="w-full text-3xl font-bold text-[#575ec2] m-4">
                    
                </h1>
                <span className="p-4 border-b border-gray-600">Home</span>
                <span className="p-4 border-b border-gray-600">Services</span>
                <span className="p-4">Become a vendor</span>
            </ul>
             { open &&(
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
