import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiChevronRight } from "react-icons/fi";
import CatlistGrid from '../../../pages/components/List/CatlistGrid'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBoxThree = (props) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (

        <div className={Mstyles.HeroBoxTwoV}>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle}>
                <h1>We cover all Exams and Classes</h1>
                <span>From videos to notes to tests, providing all you need to learn and practice in one place</span>
            </div>
            <div style={{ minHeight: '30px' }}></div>
            <CatlistGrid />
            <div style={{ minHeight: '30px' }}></div>
        </div>

    )
}

export default HeroBoxThree