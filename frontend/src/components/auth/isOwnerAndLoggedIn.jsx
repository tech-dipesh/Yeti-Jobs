import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import useFetchData from '../../hooks/useFetchData';
import { isUserOwnedRoute } from '../../api/auth.admin';
import Loading from '../Loading';
import { useAuth } from '../../context/Authcontext';

export default function IsOwnerandloggedIn() {
  const { id } = useParams();
  const navigate = useNavigate();
    const {execute, error:fetcherrData, loading: verifyOwner}=useFetchData(isUserOwnedRoute)
    const {data, error, loading}=useAuth()
  useEffect(() => {
    (async () => {
      if (error) {
      navigate("/auth/login", {state:{ from: location.pathname }, replace: true  });
      return;
    }
      await execute(id);
       if (fetcherrData === 'Please Verify Your verification code.') { navigate("/auth/verify-email", {   state: { from: location.pathname },  replace: true });
      return;
    }
    })();
  }, [id]); 
  if(loading || verifyOwner){
    return <Loading/>
  }

  return <Outlet context={data}/>;
};


