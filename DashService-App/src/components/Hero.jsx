import React from 'react';

const Hero = () => {
    const backgroundImageUrl = 'https://t3.ftcdn.net/jpg/04/26/71/86/360_F_426718640_YZ6RFhGqwb7TCh5480prCzzxt9Zp6mIU.jpg'; 

    const heroStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //blur
        backdropFilter: 'blur(4px)',
        
        height: '100vh', // Set height to 100% of viewport height
    };

    return (
        <div style={heroStyle} className="relative text-white ">
            <div className="max-w-[800px] mx-auto text-center flex flex-col justify-center h-full">
                <p className="text-lg md:text-xl font-bold p-2">
                    YOUR VEHICLE, OUR EXPERTS
                </p>
                <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold md:py-6">
                    Quality Service for Your Vehicle
                </h1>
                <div className="flex justify-center items-center">
                    <p className="md:text-4xl sm:text-3xl text-lg font-bold py-4">
                        Connect, Collaborate,
                    </p>
                    {/* You can add more lines here if needed */}
                </div>
                <p className="md:text-lg text-base font-bold text-gray-200">
                    Your trusted partner for vehicle maintenance and services
                </p>
                <button onClick={
                    () => {
                     
                         window.location.href = "/register";
                    }
                
                } className="bg-white text-blue-500 w-[200px] rounded-md font-medium my-6 mx-auto py-4">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Hero;
