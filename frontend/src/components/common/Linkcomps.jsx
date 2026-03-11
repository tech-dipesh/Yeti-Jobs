import React from 'react'
import { Link } from 'react-router'

export default function Linkcomps({to, content, targets}) {
  return <Link to={to} target='_self' className="text-blue-500 font-medium underline-offset-4 hover:underline hover:text-blue-400 transition-colors duration-200"
>{content}</Link>
}
