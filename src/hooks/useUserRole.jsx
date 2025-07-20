import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: role, isLoading: roleLoading} = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async() => {
            const res = await axiosSecure(`/users/${user?.email}`);
            return res?.data?.role;
        }
    });

    return {role, roleLoading}
};

export default useUserRole;