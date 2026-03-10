import './App.css'
import { Outlet } from 'react-router';
import Header from './components/Header';
import { useAuth } from './context/Authcontext';
import Footer from './components/Footer';
import Loading from './components/Loading';

function App() {
 const {data, loading}=useAuth()
 if(loading){
  return <Loading/>
 }
  return (
   <div className='w-full min-h-screen flex flex-col overflow-x-hidden'>
   <Header data={data}/>
  <main className='flex-1'>
    <Outlet />
  </main>
  <Footer data={data}/>
</div>
  )
}

export default App
