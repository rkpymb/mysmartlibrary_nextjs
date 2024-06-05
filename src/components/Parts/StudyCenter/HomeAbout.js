import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'
import { FiDownload, FiArrowRight } from "react-icons/fi";

import WebsiteMainCounter from './WebsiteMainCounter'

import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '/Data/config'
const HeroBox = () => {
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)


    return (



        <div className={Mstyles.HomeAboutbox}>
            <div className={Mstyles.HomeAboutboxText}>
                <h1>Welcome to <span className={Mstyles.primaryColor}>{Contextdata.WebData.WebName}</span></h1>
             
                <div className={Mstyles.HeroBoxTwoTitlespan} ><span>{Contextdata.WebData.WebData.LongDesc}</span></div>
                
            </div>
            <div style={{ minHeight: '10px' }}></div>
            <WebsiteMainCounter />



        </div>

    )
}

export default HeroBox