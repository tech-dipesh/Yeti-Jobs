import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import useFetchData from '../../hooks/useFetchData'
import { ShowAllNotifications, ReadUserSingleNotifications, ReadAllNotifications } from '../../api/auth.notifications.js'
import { FilterNotifications } from "../../Data/Notificationslist.js";
import Loading from '../../components/Loading'
import Notificationcard from '../../components/common/User/Notificationcard'
import useDebounce from '../../hooks/useDebounce'

const TABS = ['All', 'Unread', 'Read']

export default function Notifications() {
  const { data, loading, execute } = useFetchData(ShowAllNotifications)
  const { execute: toggleRead } = useFetchData(ReadUserSingleNotifications)
  const { execute: readAll } = useFetchData(ReadAllNotifications)
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
 const handleReadAll = async () => {
    await readAll()
    setNotifications(prev => prev.map(n => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })))
  }


  const unreadCount = notifications.filter(n => !n.read_at).length

  if (loading) return <Loading />

   return (
    <div className='min-h-screen bg-slate-900 py-10 px-4'>
      <div className='max-w-2xl mx-auto space-y-3'>

        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-[#314158] border border-slate-600/60 flex items-center justify-center'>
              <Bell className='w-4 h-4 text-cyan-400' />
            </div>
            <div>
              <h1 className='text-lg font-bold text-white'>Notifications</h1>
              <p className='text-xs text-slate-500'>{unreadCount} unread</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleReadAll}
              className='text-xs text-white border border-cyan-400/30 hover:bg-cyan-400/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer'
            >
              Mark all read
            </button>
          )}
        </div>

        <input
          type='text'
          placeholder='Search by job, company or type...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full bg-[#314158]/60 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all'
        />

        

      </div>
    </div>
  )
}
