import React from 'react'
import { Link } from 'react-router'

export default function Linkcomps({to, content, targets, onClick: clickButton, style, ...rest}) {
  return <Link to={to} target='_self' {...rest} onClick={clickButton} className={`${style}text-blue-500 cursor-pointer font-medium underline-offset-4 hover:underline hover:text-blue-400 transition-colors duration-200`}
>{content}</Link>
}
