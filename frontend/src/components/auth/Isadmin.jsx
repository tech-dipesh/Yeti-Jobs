import { useEffect } from 'react'
import { useAuth } from '../../context/Authcontext'
import { Outlet, useNavigate } from 'react-router'
import Loading from '../feedback/Loading'
import Errorloading from '../ui/Errorloading'
export default function Isadmin() {
  const { data, error, loading } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (error?.login === true && error?.verify === false) {
      navigate("/auth/verify-email", { state: { from: location.pathname }, replace: true });
      return;
    }
  if (error) {
      navigate("/auth/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    if(data?.role!='admin'){
    navigate("/auth/login", { state: { from: location.pathname }, replace: true });
    return;
  }
  }, [error, navigate])
  if (loading) return <Loading />;
  return <Outlet data={data} />
}
