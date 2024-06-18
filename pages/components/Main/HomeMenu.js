import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/main.module.css';
import { useRouter, useParams } from 'next/router'
const HomeMenu = () => {
  const router = useRouter()
  return (
    <div className={Mstyles.HomeMenu}>
      <div className={Mstyles.HomeMenuItem} onClick={() => router.push(`/`)}>
        <span>Home</span>
      </div>
      <div className={Mstyles.HomeMenuItem} onClick={() => router.push(`/p/pricing`)}>
        <span>Pricing</span>
      </div>
      <div className={Mstyles.HomeMenuItem} onClick={() => router.push(`/p/tutorials`)}>
        <span>Tutorials</span>
      </div>
      <div className={Mstyles.HomeMenuItem} onClick={() => router.push(`/p/contact`)}>
        <span>Contact us</span>
      </div>
      
    </div>
  )
}

export default HomeMenu
