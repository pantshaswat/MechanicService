import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black">
            <span className="w-full text-3xl font-bold text-[#575ec2]">
                DashService
            </span>
            <ul className="hidden md:flex space-x-4">
                <span className="p-4">Home</span>
                <Link to={'/service'} className="p-4">Service</Link>
                <span className="p-4">Help</span>
                <Link to={'/about'} className="p-4">About</Link>
                <span className="p-4">Profile</span>
                {/* <span className="p-4">Admin</span>
                <span className="p-4">Vendor</span> */}
                <span className="p-4">Join</span>
                <Link to={'/register'}
                    className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2] mr-5"
                    style={{
                        height: '40px',
                        paddingTop: '9px',
                        marginTop: '6px',
                    }}
                >
                    Register
                </Link>
                <Link to={'/login'}
                    className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
                    style={{
                        height: '40px',
                        paddingTop: '9px',
                        marginTop: '6px',
                    }}
                >
                    Login
                </Link>
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
                <span className="p-4 border-b border-gray-600">Help</span>
                <span className="p-4 border-b border-gray-600">About</span>
                <span className="p-4">Become a vendor</span>
            </ul>
        </div>
    );
};

export default Navbar;
