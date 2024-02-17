"use client"
import { useEffect, useState } from 'react';
import { userStore } from './store';
import { redirect } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  // const login = userStore(state => state.login)
  // const [currentUser, setCurrentUser] = useState(null)
  const user = userStore(state => state.user)
  
  useEffect(() => {
    // console.log(user)
    // if (!user) {
    //     redirect('/login');
    // } 
  }, []);


  return user ? children : null;
};

export default ProtectedRoute;