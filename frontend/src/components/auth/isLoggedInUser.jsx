import {  useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { useAuth } from '../../context/Authcontext';
import { useLocation } from 'react-router';

export default function IsloggedinUser() {
  const location=useLocation()
  const navigate=useNavigate()
  const {data, error, loading}=useAuth()
  useEffect(() => {
    if(error){
      navigate("/auth/login", { state: { from: location.pathname }, replace: true })
      return;
    }
    if(error=='Please Verify Your verification code.'){
      navigate("/auth/verify-email", {state: {from: location.pathname}, replace: true})
      return;
    } 
    }, [error, navigate, location])
  
  if (loading) return <p>Checking authentication</p>; 
  return <Outlet data={data}/>;
};