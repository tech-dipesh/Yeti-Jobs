import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { Fragment } from 'react'
import { Link } from 'react-router'
import Buttoncomps from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Goback({to='../', content='Go Back'}) {
  return (
    <Link to={to}>
      <Buttoncomps values={
      <Fragment >
        <FontAwesomeIcon icon={faArrowLeft} />
         {content}
      </Fragment>}
    /></Link>
  )
}
