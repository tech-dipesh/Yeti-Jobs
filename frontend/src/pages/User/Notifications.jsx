import { useState, useEffect, useMemo } from 'react'
import { Bell } from 'lucide-react'
import useFetchData from '../../hooks/useFetchData'
import { ShowAllNotifications, ReadUserSingleNotifications, ReadAllNotifications } from '../../api/auth.notifications.js'
// import { FilterNotifications } from "../../Data/Notificationslist.js";
import Loading from '../../components/feedback/Loading'
import Notificationcard from '../../components/users/Notificationcard'
import useDebounce from '../../hooks/useDebounce'

const TABS = ['All', 'Unread', 'Read']

export default function Notifications() {
  const { data, loading, execute } = useFetchData(ShowAllNotifications)
  const { execute: toggleRead } = useFetchData(ReadUserSingleNotifications)
  const { execute: readAll } = useFetchData(ReadAllNotifications)
  const [notifications, setNotifications] = useState([])
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => { execute() }, [])
  const NotificationSetFun = ()=>{
    if (data?.message) setNotifications(data.message) 
    }
  useEffect(() => {
    if (data?.message && JSON.stringify(data.message) !== JSON.stringify(notifications)) {
      setNotifications(data.message)
    }
  }, [data]) 

  const handleToggle = async (uid, markAsRead) => {
    await toggleRead({ id: uid, isRead: markAsRead })
    setNotifications(prev =>
      prev.map(n => n.uid === uid ? { ...n, read_at: markAsRead ? new Date().toISOString() : null } : n)
    )
  }
const filteredNotifications = useMemo(() => {
  return notifications
    .filter(n => {
      if (tab === 'Unread') return !n.read_at;
      if (tab === 'Read') return !!n.read_at;
      return true;
    })
    .filter(n => {
      const searchQuery = debouncedSearch?.toLowerCase();
      if (!searchQuery) return true;

      return (
        n.type.toLowerCase().includes(searchQuery) ||
        n.job_title?.toLowerCase().includes(searchQuery) ||
        n.company_name?.toLowerCase().includes(searchQuery)
      );
    });
}, [notifications, tab, debouncedSearch]);

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
            <div className='w-9 h-9 rounded-xl border-y-indigo-900 border border-slate-600/60 flex items-center justify-center'>
              <Bell className='w-4 h-4 text-slate-700' />
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

        <div className='flex gap-1 bg-slate-800/40 border border-slate-700/40 rounded-xl p-1'>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all cursor-pointer
                ${tab === t ? 'bg-[#314158] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              {t}
              {t === 'Unread' && unreadCount > 0 && (
                <span className='ml-1.5 text-xs bg-cyan-400/15 text-cyan-400 px-1.5 py-0.5 rounded-full'>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
        {filteredNotifications.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-[#314158]/50 border border-slate-700/50 flex items-center justify-center'>
              <Bell className='w-5 h-5 text-slate-600' />
            </div>
            <p className='text-slate-500 text-sm'>
              {debouncedSearch ? 'No results found' : tab === 'Unread' ? "You're all caught up" : 'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-2 pt-1'>
            {filteredNotifications.map(n => <Notificationcard key={n.uid} notification={n} onToggleRead={handleToggle} />)}
          </div>
        )}

      </div>
    </div>
  )
}
