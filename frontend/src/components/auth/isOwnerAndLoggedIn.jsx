import { useParams, useNavigate, Outlet, Navigate } from 'react-router';
import Loading from '../Loading';
import Errorloading from '../common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import authUid from '../../auth/authUid';

export default function IsOwnerandLoggedIn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useAuth();
  const isValid = id && authUid(id);
  if (error?.login === true && error?.verify === false) return <Navigate to="/auth/verify-email" />;
  if (error) return <Navigate to="/auth/login" />;
  if (loading) {
    return <Loading />;
  }

  if (id && !isValid) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    return <Errorloading data={{ error: 'Incorrect uid. Please enter correct uid. Loading...' }} />;
  }

  return <Outlet context={data} />;
}