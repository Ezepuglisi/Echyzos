"use client"
import { useEffect } from 'react';
import { userStore } from './store';
import { redirect } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { user } = userStore();

  useEffect(() => {
    if (!user) {
    redirect('/login');
    }
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;