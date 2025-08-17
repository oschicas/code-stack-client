import React from 'react';
import Logo from '../assets/logo/CodeStack Logo.png'
import { Link } from 'react-router';


const CodeStackLogo = () => {
    return (
        <Link to={'/'} className='flex items-center gap-2'>
            <img className='w-8' src={Logo} alt="" />
            <p className='text-primary font-bold'>CodeStack</p>
        </Link>
    );
};

export default CodeStackLogo;