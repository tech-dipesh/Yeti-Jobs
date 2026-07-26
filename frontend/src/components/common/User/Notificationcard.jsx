
import { useState, useCallback } from 'react'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bell, Briefcase, AlertCircle, Bookmark, Building2, FileCheck, Eye, MessageSquare, FileSearch, Megaphone } from 'lucide-react'
import { Link } from 'react-router'
import Timeago from '../../../services/Timeago.js'
import {NOTIFICATION_CONFIG} from '../../../Data/Notificationslist.js'
export default function Notificationcard({ notification, onToggleRead }) {
  const { uid, type, created_at, read_at } = notification
  const c = NOTIFICATION_CONFIG[type] ?? { icon: Bell, color: 'text-slate-400', bg: 'bg-slate-400/10', label: type, getDesc: () => 'New notification', link: () => '/' }
  const Icon = c.icon
  const isUnread = !read_at
  const [open, setOpen] = useState(false)
  const handleToggle = useCallback(() => onToggleRead(uid, isUnread), [uid, isUnread, onToggleRead])

  return (
    <div className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 relative
      ${isUnread
        ? 'bg-[#314158]/80 border-slate-600/50 hover:border-slate-500/70'
        : 'bg-slate-800/20 border-slate-700/30 hover:border-slate-600/40'
      }`}
    >
      <div className={`shrink-0 w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center mt-0.5`}>
        <Icon className={`w-4 h-4 ${c.color}`} />
      </div>

      <Link
        to={c.link(notification)}
        onClick={() => isUnread && onToggleRead(uid, true)}
        className='flex-1 min-w-0 group'
      >
        <div className='flex items-center gap-2'>
          <p className={`text-sm font-semibold leading-tight ${isUnread ? 'text-white' : 'text-slate-400'}`}>
            {c.label}
          </p>
          {isUnread && <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0' />}
        </div>
        <p className='text-xs text-slate-500 mt-0.5 truncate group-hover:text-slate-400 transition-colors'>
          {c.getDesc(notification)}
        </p>
      </Link>

      <div className='shrink-0 flex flex-col items-end gap-1.5 ml-1'>
        <span className='text-xs text-slate-600'>{Timeago(created_at)}</span>
        <div className='relative'>
          <button
            onClick={() => setOpen(p => !p)}
            className='text-slate-500 hover:text-slate-300 transition-colors cursor-pointer p-1'
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className='text-xs' />
          </button>
          {open && (
            <div className='absolute right-0 top-6 z-10 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 min-w-32.5'>
              <button
                onClick={() => { handleToggle(); setOpen(false) }}
                className='w-full text-left text-xs px-4 py-2.5 text-slate-300 hover:bg-[#314158] hover:text-white transition-colors cursor-pointer'
              >
                {isUnread ? 'Mark as read' : 'Mark as unread'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
