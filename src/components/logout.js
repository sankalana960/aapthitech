"use client"
import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;
