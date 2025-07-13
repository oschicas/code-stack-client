import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate, useLocation } from 'react-router';

const AuthPrivate = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(!user){
        return <Navigate to={'/login'} state={{from: location.pathname}}></Navigate>
    }


    return children
};

export default AuthPrivate;