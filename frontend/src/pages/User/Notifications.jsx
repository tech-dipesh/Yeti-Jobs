import useFetchData from '../../hooks/useFetchData'
import {ShowAllNotifications} from '../../api/auth.notifications.js'
import { useEffect } from 'react';
import Loading from '../../components/Loading'
export default function Notifications() {
  const {data, loading, error, execute}=useFetchData(ShowAllNotifications)
  useEffect(()=>{
      execute()
  }, [])
  console.log('data is', data)
  if(loading){
    return <Loading/>
  }
  return (
    <div>
      
    <div className="flex justify-center align-middle">
      No notifications Found
    </div>

    </div>
  );
}
