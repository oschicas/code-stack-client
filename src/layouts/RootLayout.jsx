import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

const RootLayout = () => {
    return (
        <div>
            <nav className='fixed top-0 z-50 w-full backdrop-blur-xs bg-[#0e243e3c]'>
                <NavBar></NavBar>
            </nav>
            <div className='min-h-[calc(100vh-65px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;