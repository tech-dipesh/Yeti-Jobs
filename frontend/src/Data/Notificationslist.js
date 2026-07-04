
import { Bell, Briefcase, AlertCircle, Bookmark, Building2, FileCheck, Eye, MessageSquare, FileSearch, Megaphone } from 'lucide-react'
export const NOTIFICATION_CONFIG = {
  new_jobs:             { icon: Briefcase,     color: 'text-cyan-400',    bg: 'bg-cyan-400/10',    label: 'New Job Posted',        getDesc: n => n.job_title ? `${n.job_title} is now open` : 'A new job was posted',                      link: n => n.job_id ? `/jobs/${n.job_id}` : '/jobs' },
  application_status:   { icon: AlertCircle,   color: 'text-yellow-400',  bg: 'bg-yellow-400/10',  label: 'Application Updated',   getDesc: n => n.job_title ? `Your application for ${n.job_title} changed` : 'Application status changed', link: () => '/applications/me' },
  job_alert:            { icon: Bell,           color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: 'Job Alert',             getDesc: n => n.job_title ? `${n.job_title} matches your profile` : 'A job matches your profile',       link: n => n.job_id ? `/jobs/${n.job_id}` : '/jobs' },
  bookmark_reminder:    { icon: Bookmark,       color: 'text-purple-400',  bg: 'bg-purple-400/10',  label: 'Bookmark Reminder',     getDesc: n => n.job_title ? `Still interested in ${n.job_title}?` : 'Check your saved jobs',              link: () => '/jobs/bookmarks' },
  company_follow:       { icon: Building2,      color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Company Update',        getDesc: n => n.company_name ? `${n.company_name} posted something new` : 'A followed company updated',   link: n => n.company_id ? `/companies/${n.company_id}` : '/companies/all' },
  application_recieved: { icon: FileCheck,      color: 'text-green-400',   bg: 'bg-green-400/10',   label: 'New Applicant',         getDesc: n => n.job_title ? `Someone applied to ${n.job_title}` : 'New applicant on your job',            link: n => n.job_id ? `/jobs/${n.job_id}` : '/companies/dashboard' },
  profile_view:         { icon: Eye,            color: 'text-sky-400',     bg: 'bg-sky-400/10',     label: 'Profile Viewed',        getDesc: n => n.company_name ? `${n.company_name} viewed your profile` : 'Someone viewed your profile',  link: () => '/jobs' },
  message_recieved:     { icon: MessageSquare,  color: 'text-pink-400',    bg: 'bg-pink-400/10',    label: 'New Message',           getDesc: n => n.company_name ? `Message from ${n.company_name}` : 'You have a new message',               link: () => '/jobs' },
  resume_analysed:      { icon: FileSearch,     color: 'text-orange-400',  bg: 'bg-orange-400/10',  label: 'Resume Analysed',       getDesc: () => 'Your ATS analysis is ready',                                                              link: n => `/users/${n.users_id}/profile/resume` },
  announcement:         { icon: Megaphone,      color: 'text-red-400',     bg: 'bg-red-400/10',     label: 'Announcement',          getDesc: () => 'A new announcement is available',                                                         link: () => '/' },
}


export const FilterNotifications = notifications .filter(n => {
    if (tab === 'Unread') return !n.read_at;
    if (tab === 'Read') return !!n.read_at;
    return true;
  })
  .filter(n => {
    const search = debouncedSearch?.toLowerCase();
    if (!search) return true;

    return (
      n.type.includes(search) ||
      n.job_title?.toLowerCase().includes(search) ||
      n.company_name?.toLowerCase().includes(search)
    );
  });
