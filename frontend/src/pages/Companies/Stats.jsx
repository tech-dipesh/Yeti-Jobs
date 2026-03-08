import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { companyStats, getCompanyEmployee } from '../../api/auth.companies'
import { useParams } from 'react-router';
import Errorloading from '../../components/Errorloading';

export default function Stats() {
  const {id}=useParams();
  const {execute, data, error, loading}=useFetchData(companyStats);
  useEffect(()=>{
      execute(id)
  }, [id])
  const {message}=data || {}
  return (
    <div>
      <h1>Company Stats.</h1>
      <Errorloading data={{error, loading}}/>
  {/* allapplications, thiswekkapplications, totalstatus */}
  
      {message && 
          <div>
            <h2>Total Applications: {message.allapplications}</h2>
            <h3>This week applications: {message.thisweekapplications}</h3>
              {message.totalstatus && message.totalstatus.map(({status, percentage}, i)=>(
                <div key={i}>
                  <h3>Status: {status}</h3>
                  <h3>Percentage: {percentage}</h3>
                </div>
              ))}
            </div>
          }
    </div>
  )
}
