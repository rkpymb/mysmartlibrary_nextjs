import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useRouter, useParams } from 'next/router'
const HeroBox = () => {
    const router = useRouter()
    return (
        <div>
            <div className={Mstyles.Heroimg}  onClick={() => router.push(`https://dashboard.mysmartlibrary.in/Signup`)}>
                <img src='/Home/desktopposter.png' className={Mstyles.OnlyDesktop}/>
                <img src='/Home/mobileposter.png' className={Mstyles.OnlyMobile} />
            </div>
           
        </div>
    )
}

export default HeroBox
