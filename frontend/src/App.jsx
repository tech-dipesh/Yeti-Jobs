import './App.css'
import { Outlet } from 'react-router';
import Header from './components/layout/Header';
import { useAuth } from './context/Authcontext';
import Footer from './components/layout/Footer';
import Loading from './components/feedback/Loading';
import ToastConataine from './components/feedback/Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  const { data, loading } = useAuth()
  if (loading) {
    return <Loading />
  }
  return (
    <HelmetProvider>
    <div className='w-full min-h-screen flex flex-col overflow-x-hidden'>
      <Header />
      <Analytics/>
      <SpeedInsights/>
      <main className='flex-1'>
        <Suspense fallback={<Loading/>}>
        <Outlet />
        </Suspense>
        <ToastConataine />
      </main>
      <Footer data={data} />
    </div>
    </HelmetProvider>
  )
}

export default App
