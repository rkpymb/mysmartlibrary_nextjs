import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const HeroBox = () => {
    return (
        <div>
            <div className={Mstyles.Heroimg}>
                <img src='/Home/heropostermain.png' className={Mstyles.OnlyDesktop}/>
                <img src='/Home/heropostermainmobile.png' className={Mstyles.OnlyMobile} />
            </div>
           
        </div>
    )
}

export default HeroBox
