import { useCallback } from 'react'
import { Bell } from 'lucide-react'
import { Link } from 'react-router'
import Timeago from '../../services/Timeago.js'
import { NOTIFICATION_CONFIG } from '../../Data/Notificationslist.js'

export default function Notificationcard({ notification, onToggleRead }) {
  const { uid, type, created_at, read_at } = notification
  const c = NOTIFICATION_CONFIG[type] ?? {
    icon: Bell,
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    label: type,
    getDesc: () => 'New notification',
    link: () => '/',
  }
  const Icon = c.icon
  const isUnread = !read_at
  const handleToggle = useCallback(() => onToggleRead(uid, isUnread), [uid, isUnread, onToggleRead])

  return (
    <li
      className={`flex items-center gap-3 border-l-2 px-3 py-2.5 transition-colors duration-200 hover:bg-slate-700/40
        ${isUnread ? 'border-cyan-400' : 'border-transparent'}`}
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${c.bg}`}>
        <Icon className={`h-4 w-4 ${c.color}`} aria-hidden='true' />
      </div>

      <Link
        to={c.link(notification)}
        onClick={() => isUnread && onToggleRead(uid, true)}
        className='min-w-0 flex-1 outline-none focus-visible:underline focus-visible:underline-offset-4'
      >
        <p className={`truncate text-sm font-medium ${isUnread ? 'text-white' : 'text-slate-400'}`}>
          {c.label}
          {isUnread && <span className='sr-only'> (unread)</span>}
        </p>
        <p className='truncate text-xs text-slate-400'>{c.getDesc(notification)}</p>
      </Link>

      <div className='flex shrink-0 flex-col items-end gap-0.5 sm:flex-row sm:items-center sm:gap-3'>
        <span className='text-xs text-slate-400'>{Timeago(created_at)}</span>
        <button
          type='button'
          onClick={handleToggle}
          className='cursor-pointer text-xs text-gray-300 outline-none transition-colors duration-200 hover:text-white hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4'
        >
          {isUnread ? 'Mark read' : 'Mark unread'}
        </button>
      </div>
    </li>
  )
}