import React from 'react';

const Hero = () => {
    const backgroundImageUrl = 'https://img.freepik.com/free-photo/benchman-fixing-engine-car_114579-2807.jpg?w=900&t=st=1709282433~exp=1709283033~hmac=f597cb9bb45b4f3b4f6aa3a5d01df59ced46a71ea34a5c8c06836e1cf6289ad7'; // Replace with your image URL

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
                <button className="bg-white text-blue-500 w-[200px] rounded-md font-medium my-6 mx-auto py-4">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Hero;
