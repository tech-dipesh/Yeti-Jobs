import { createContext } from 'react'
import { isUserLoggedIn } from '../api/auth.user'
import useFetchData from '../hooks/useFetchData'
import { useEffect } from 'react'
import { useContext } from 'react'

 const authContext=createContext() 
export default function AuthProvider({children}) {
  const {data, error, loading, execute } = useFetchData(isUserLoggedIn)
  useEffect(() => {
  ;(async()=>execute())() 
  }, []);
  return (
    <authContext.Provider value={{data: data?.message, reexecute:execute, error, loading}} >
      {children}
    </authContext.Provider>
  )
}

export const useAuth=()=>{
  const context = useContext(authContext);
  if (!context) {
    throw new Error("Error on AuthContext");
  }
  return context;
}