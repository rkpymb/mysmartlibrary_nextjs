import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/main.module.css';

const HomeMenu = () => {
  return (
    <div className={Mstyles.HomeMenu}>
      <div className={Mstyles.HomeMenuItem}>
        <span>Home</span>
      </div>
      <div className={Mstyles.HomeMenuItem}>
        <span>Pricing</span>
      </div>
      <div className={Mstyles.HomeMenuItem}>
        <span>Blog</span>
      </div>
      <div className={Mstyles.HomeMenuItem}>
        <span>Support</span>
      </div>
      <div className={Mstyles.HomeMenuItem}>
        <span>Recharge</span>
      </div>
    </div>
  )
}

export default HomeMenu
