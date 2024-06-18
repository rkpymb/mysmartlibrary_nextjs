import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useRouter, useParams } from 'next/router'
const HeroBox = () => {
    const router = useRouter()
    return (
        <div>
            <div className={Mstyles.Heroimg}  onClick={() => router.push(`https://admin.mysmartlibrary.in/Signup`)}>
                <img src='/Home/heropostermain.png' className={Mstyles.OnlyDesktop}/>
                <img src='/Home/heropostermainmobile.png' className={Mstyles.OnlyMobile} />
            </div>
           
        </div>
    )
}

export default HeroBox
