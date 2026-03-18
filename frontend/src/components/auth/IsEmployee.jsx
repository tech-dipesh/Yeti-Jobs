import React, { useEffect } from 'react'
import { useAuth } from '../../context/Authcontext'
import { Outlet, useNavigate } from 'react-router'

export default function IsEmployee() {
  const {data, error, loading}=useAuth()
  const navigate=useNavigate()
  const {company_id, role}=data || {}
  useEffect(() => {
      if(error) navigate("/auth/login", { state: { from: location.pathname }, replace: true })
      if(error=='Please Verify Your verification code.') navigate("/auth/verify-email", {state: {from: location.pathname}, replace: true})
      }, [])
    console.log(role && role=='recruiter')
    if(role && (role!='recruiter' && role!='admin')) navigate("/")
    if (loading) return <p>Checking authentication</p>;
    return <Outlet data={data}/>
}
