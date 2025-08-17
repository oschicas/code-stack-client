import axios from 'axios';
import React from 'react';

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://assignment-12-server-side-nu.vercel.app'
    })
    return axiosInstance;
};

export default useAxios;