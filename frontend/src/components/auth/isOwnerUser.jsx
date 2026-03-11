import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import useFetchData from '../../hooks/useFetchData';
import { isUserOwnedRoute } from '../../api/auth.job';
import Loading from '../Loading';

export default function IsownerUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState(false);
    const {execute, error}=useFetchData(isUserOwnedRoute)
  useEffect(() => {
    (async () => {
      if (error) return navigate('../');
      const success = await execute(id);
      success ? setIsVerify(true) : navigate('/auth/login', { replace: true });
    })();
  }, [id]); 

  if (!isVerify) return <Loading/>; 
  return <Outlet />;
};


