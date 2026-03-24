import ButtonComps from './common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreativeCommons } from "@fortawesome/free-brands-svg-icons"
import Linkcomps from './common/Linkcomps'
import { Link } from 'react-router'
export default function Footer({ data }) {
  const socials = [
    { name: 'Twitter', link: 'https://linkedin.com/in/tech-dipesh' },
    { name: 'Github', link: 'https://github.com/tec_dipesh' },
    { name: 'LeetCode', link: 'https://leetcode.com/u/tech-dipesh' },
    { name: 'Email', link: 'mailto:dipsharmadev+project@gmail.com' }
  ]

  const { company_id } = data ?? {};
  return (
    <footer className="grid grid-cols-2 lg:flex lg:flex-row justify-between items-center p-6 text-sm border-t bg-zinc-800 text-gray-300 bg-neutral-700">
      <div className="grid grid-cols-1 lg:flex gap-4">
        <h2>Socials:</h2>
        {socials.map(({ name, link }, i) => <Linkcomps key={i} to={link} content={name} />)}
      </div>
      {/* <div className='lg:grid lg:none'> */}
      <div className='flex flex-col items-start gap-2 lg:contents'>
      <p className='text-gray-500  font-sans'><FontAwesomeIcon icon={faCreativeCommons} />2026 Dipesh Sharma. All rights reserved.</p>
      <div className='grid grid-cols-1 gap-2 w-full text-nowrap lg:flex lg:w-auto'>
        {company_id && <Linkcomps to='companies/dashboard' content={<ButtonComps values='Dashboard' />} />}
        <Linkcomps to={'/jobs/search'} content={<ButtonComps values='Search Jobs' />} />
        <Linkcomps to={'https://github.com/tech-dipesh/yeti-jobs/issues'} content={<ButtonComps values='Request Issue/Features?' />} />
        <Link to={'https://yeti-jobs.onrender.com/api/v1/swagger'} target='_blank' className='text-xs text-white font-medium underline-offset-4 hover:underline hover:text-blue-400 transition-colors duration-200e w-fit'><ButtonComps values='View API Docs ↗' /></Link>
      </div>
      {/* </div> */}
      </div>
    </footer>
  )
}
