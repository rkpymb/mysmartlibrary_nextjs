import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/library.module.css'
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'


const FooterMenu1 = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    return (
        <div>
            <div className={Mstyles.menuurlfGrid}>
                <div className={Mstyles.menuurlf} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/about`)}>
                    <span>About us</span>
                </div>
                <div className={Mstyles.menuurlf} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/contact`)}>
                    <span>Contact us</span>
                </div>
                <div className={Mstyles.menuurlf} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/privacy-policy`)}>
                    <span>Privacy Policy</span>
                </div>
                <div className={Mstyles.menuurlf} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/terms-and-conditions`)}>
                    <span>Terms & Conditions</span>
                </div>

            </div>
        </div>
    )
}

export default FooterMenu1
