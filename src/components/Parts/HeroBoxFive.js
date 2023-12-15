import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiChevronRight } from "react-icons/fi";
import CourselistGridHome from '../../../pages/components/List/CourselistGridHome'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBoxFive = (props) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (

        <div style={{backgroundColor:'white'}}>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle}>
                <h1>Recommended Courses for your <span className={Mstyles.HeroBoxTwoTitleBottom}>Career Upskiling </span> with Certification</h1>
                <div style={{ minHeight: '5px' }}></div>
                <span className={Mstyles.HeroBoxTwoTitlespan}>We have listes the best Courses for your best journey for preparation of different category.</span>
            </div>
            <div style={{ minHeight: '30px' }}></div>
           
            <div className={Mstyles.container}>
            <CourselistGridHome />
            </div>
            <div style={{ minHeight: '30px' }}></div>
        </div>

    )
}

export default HeroBoxFive