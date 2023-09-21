import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiChevronRight } from "react-icons/fi";
import TSlistGrid from '../../../pages/components/List/TSlistGrid'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBoxFive = (props) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (

        <div className={Mstyles.HeroBoxTwoV}>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle}>
                <h1>Recommended Test Series</h1>
                <span>We have listes the best Test series for your best journey for preparation of different category.</span>
            </div>
            <div style={{ minHeight: '30px' }}></div>
            <TSlistGrid />
            <div style={{ minHeight: '30px' }}></div>
        </div>

    )
}

export default HeroBoxFive