import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import ButtonComps from '../ui/Button'
import { SOCIALS } from '@/Data/OptionList'
const wrap ='w-fit text-xs outline-none focus-visible:underline focus-visible:underline-offset-4 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs'

function ExternalAction({ href, children }) {
  return (
    <a href={href} className={wrap} >
      <ButtonComps values={children} />
    </a>
  )
}

export default function Footer({ data }) {
  const { company_id } = data ?? {}
  return (
    <footer className="border-t bg-zinc-800 text-gray-300 text-sm">
      <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Social links" className="flex flex-wrap items-center gap-2">
          <span className="text-gray-300">Socials:</span>
          {SOCIALS.map(({ name, href }) => (
            <ExternalAction key={name} href={href}>
              {name}
            </ExternalAction>
          ))}
        </nav>

        <nav aria-label="Product and developer links" className="flex flex-wrap items-center gap-2">
          {company_id && (
            <Link to="/companies/dashboard" className={wrap}>
              <ButtonComps values="Dashboard" />
            </Link>
          )}
          <Link to="/jobs/search" className={wrap}>
            <ButtonComps values="Search jobs" />
          </Link>
          <ExternalAction href="https://github.com/tech-dipesh/yeti-jobs/issues">
            Request feature
          </ExternalAction>
          <ExternalAction href="https://yeti-jobs.onrender.com/api/v1/swagger">
            API docs
          </ExternalAction>
          <ExternalAction href="https://stats.uptimerobot.com/DJs087hnNB">
            <span className="inline-flex items-center gap-1">
              API status
              <FontAwesomeIcon icon={faBarsProgress} aria-hidden="true" />
            </span>
          </ExternalAction>
        </nav>
      </div>

      <p className="px-4 pb-3 text-xs text-gray-500 font-sans">
        <FontAwesomeIcon icon={faCreativeCommons} aria-hidden="true" /> {new Date().getFullYear()} Dipendra Sharma. All
        rights reserved.
      </p>
    </footer>
  )
}