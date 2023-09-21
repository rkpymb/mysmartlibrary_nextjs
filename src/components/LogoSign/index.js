import React from 'react'
import Mstyle from '../../../Styles/home.module.css'
const index = () => {
  return (
    <div className={Mstyle.logomainDB}>
      <div className={Mstyle.logomainDBimg}>
        <img src='https://supermarks.in/logo/logomain.png' alt='logo' />
      </div>
      <span>Student Dashboard</span>
    </div>
  )
}

export default index
