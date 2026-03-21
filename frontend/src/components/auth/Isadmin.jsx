import { useEffect } from 'react'
import { useAuth } from '../../context/Authcontext'
import { Outlet, useNavigate } from 'react-router'
import Loading from '../Loading'
import Errorloading from '../common/Errorloading'

export default function Isadmin() {
  const {data, error, loading}=useAuth()
  const navigate=useNavigate()
  const {role}=data || {}
  useEffect(() => {
    if(error=='Only Admin Allowed') navigate("/", {state: {from: location.pathname}, replace: true})
      if(error) navigate("/auth/login", { state: { from: location.pathname }, replace: true })
      }, [])
    
    if (loading) return <Loading/>;
    if(role && role!='admin'){
      <Errorloading data={{error: "Only Admin Allowed"}}/>
      setTimeout(() => {
        navigate("/")
      }, 500);
    }
    return <Outlet data={data}/>
}
