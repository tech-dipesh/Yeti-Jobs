import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
import Buttoncomps from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Goback({to='../', content='Go Back'}) {
  return (
    <Link to={to} className='flex w-full gap-2'>
      <Buttoncomps values={
      <div className='gap-2'>
        <FontAwesomeIcon icon={faArrowLeft} />
         {content}
      </div>}
    /></Link>
  )
}
