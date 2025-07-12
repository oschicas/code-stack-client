import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const authContext = use(AuthContext)
    return authContext
};

export default useAuth;