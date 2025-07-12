import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

const RootLayout = () => {
    return (
        <div>
            <nav className='bg-base-100 shadow-sm'>
                <NavBar></NavBar>
            </nav>
            <div className='min-h-[calc(100vh-65px)] my-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;