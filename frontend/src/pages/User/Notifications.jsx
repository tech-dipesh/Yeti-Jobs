import { useState, useEffect, useMemo } from 'react'
import { Bell } from 'lucide-react'
import useFetchData from '../../hooks/useFetchData'
import { ShowAllNotifications, ReadUserSingleNotifications, ReadAllNotifications } from '../../api/auth.notifications.js'
import Loading from '../../components/feedback/Loading'
import Notificationcard from '../../components/users/Notificationcard'
import useDebounce from '../../hooks/useDebounce'

const TABS = ['All', 'Unread', 'Read']

const isToday = (iso) => new Date(iso).toDateString() === new Date().toDateString()

export default function Notifications() {
  const { data, loading, execute } = useFetchData(ShowAllNotifications)
  const { execute: toggleRead } = useFetchData(ReadUserSingleNotifications)
  const { execute: readAll } = useFetchData(ReadAllNotifications)
  const [notifications, setNotifications] = useState([])
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => { execute() }, [])

  useEffect(() => {
    if (data?.message) setNotifications(data.message)
  }, [])

  const handleToggle = async (uid, markAsRead) => {
    await toggleRead({ id: uid, isRead: markAsRead })
    setNotifications(prev =>
      prev.map(n => n.uid === uid ? { ...n, read_at: markAsRead ? new Date().toISOString() : null } : n)
    )
  }

  const handleReadAll = async () => {
    await readAll()
    setNotifications(prev => prev.map(n => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })))
  }

  const unreadCount = notifications.filter(n => !n.read_at).length

  const groups = useMemo(() => {
    const q = debouncedSearch?.toLowerCase()
    const filtered = notifications
      .filter(n => (tab === 'Unread' ? !n.read_at : tab === 'Read' ? !!n.read_at : true))
      .filter(n => {
        if (!q) return true
        return ( n.type.toLowerCase().includes(q) || n.job_title?.toLowerCase().includes(q) || n.company_name?.toLowerCase().includes(q)
        )
      })
    return [
      { label: 'Today', items: filtered.filter(n => isToday(n.created_at)) },
      { label: 'Earlier', items: filtered.filter(n => !isToday(n.created_at)) },
    ].filter(g => g.items.length > 0)
  }, [notifications, tab, debouncedSearch])

  if (loading) return <Loading />

  const emptyText = debouncedSearch
    ? 'No results found'
    : tab === 'Unread'
      ? "You're all caught up"
      : 'No notifications yet'

  return (
    <main className='min-h-screen bg-slate-900 px-4 py-8'>
      <div className='mx-auto max-w-2xl space-y-4'>

        <header className='flex items-center justify-between gap-3'>
          <div>
            <h1 className='text-lg font-semibold text-white'>Notifications</h1>
            <p className='text-xs text-slate-400' aria-live='polite'>{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button
              type='button'
              onClick={handleReadAll}
              className='cursor-pointer rounded-md border border-slate-600 px-3 py-1 text-xs text-gray-300 outline-none transition-colors duration-200 hover:bg-zinc-800 hover:text-white focus-visible:underline focus-visible:underline-offset-4'
            >
              Mark all read
            </button>
          )}
        </header>

        <div>
          <label htmlFor='notification-search' className='sr-only'>Search notifications</label>
          <input id='notification-search' type='search' placeholder='Search by job, company or type' value={search}
            onChange={e => setSearch(e.target.value)}
            className='w-full rounded-md border border-slate-700 bg-zinc-800 px-3 py-2 text-sm text-gray-300 placeholder-slate-400 outline-none transition-colors duration-200 focus:border-slate-400'
          />
        </div>

        <div className='flex gap-5 border-b border-slate-700'>
          {TABS.map(t => (
            <button key={t} type='button' aria-pressed={tab === t} onClick={() => setTab(t)}
              className={`-mb-px cursor-pointer border-b-2 pb-2 text-sm outline-none transition-colors duration-200 focus-visible:underline focus-visible:underline-offset-4
                ${tab === t ? 'border-cyan-400 text-white' : 'border-transparent text-slate-400 hover:text-gray-300'}`}
            >
              {t}
              {t === 'Unread' && unreadCount > 0 && (
                <span className='ml-1.5 rounded-full bg-cyan-400/15 px-1.5 py-0.5 text-xs text-cyan-400'>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {groups.length === 0 ? (
          <div className='flex flex-col items-center gap-2 py-16 text-center'>
            <Bell className='h-5 w-5 text-slate-400' aria-hidden='true' />
            <p className='text-sm text-slate-400'>{emptyText}</p>
          </div>
        ) : (
          groups.map(({ label, items }) => (
            <section key={label} aria-label={label}>
              <h2 className='mb-1.5 px-1 text-xs text-slate-400'>{label}</h2>
              <ul className='divide-y divide-slate-700 overflow-hidden rounded-lg border border-slate-700 bg-zinc-800'>
                {items.map(n => (
                  <Notificationcard key={n.uid} notification={n} onToggleRead={handleToggle} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </main>
  )
}