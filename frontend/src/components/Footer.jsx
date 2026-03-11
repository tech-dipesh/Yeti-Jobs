import { Link, useNavigate } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import ButtonComps from './common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCreativeCommons} from "@fortawesome/free-brands-svg-icons"
import Linkcomps from './common/Linkcomps'
export default function Footer({data}) {
  const navigate=useNavigate()
  const {execute}=useFetchData(logoutUser);
 const LogoutPage=async()=>{
  await execute()
  navigate(0)
 }
 const socials=[
    {name: 'Twitter', link:'https://linkedin.com/in/tech-dipesh'},
    {name: 'Github', link:'https://github.com/tec_dipesh'},
    {name: 'LeetCode', link:'https://leetcode.com/u/tech-dipesh'},
    {name: 'Email', link:'mailto:dipsharmadev+project@gmail.com'}
 ]

 const {userVerified, company_id, uid}=data ?? {};
  return (
    <footer className="flex justify-between items-center p-6 text-sm border-t bg-zinc-800 text-gray-300 bg-neutral-700">
          <div className="flex gap-4">
              <h2>Socials:</h2>
              {socials.map(({name, link}, i)=><Linkcomps key={i} to={link} content={name}/>)}
          </div>
          <p className='text-gray-500  font-sans'><FontAwesomeIcon icon={faCreativeCommons}/>2026 Dipesh Sharma. All rights reserved.</p>
          {company_id &&  <Linkcomps to='companies/dashboard' content={<ButtonComps values='Dashboard'/>}/>}
          <Linkcomps to={'/jobs/search'} content={<ButtonComps values='Search Jobs'/>}/>
      </footer>
  )
}
