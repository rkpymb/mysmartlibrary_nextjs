import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/main.module.css'
import Link from 'next/link';
import { useRouter, useParams } from 'next/router'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';

import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '/context/auth/CheckloginContext'
const Footer = () => {
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);

    return (
        <div>
            <div className={Mstyles.FotterDeviderdot}></div>
            <div className={Mstyles.FotterM}>
                <div className={Mstyles.FotterMBox}>
                    <div className={Mstyles.FotterMBoxA}>
                        <div className={Mstyles.menuurlfGrid}>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/tutorials`)}>
                                <span>Tutorials</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/about`)}>
                                <span>About us</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/contact`)}>
                                <span>Contact us</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/pricing`)}>
                                <span>Pricing</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/cancellation_refund_policy`)}>
                                <span>Cancellation & Refund Policy</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/terms-and-conditions`)}>
                                <span>Terms & Conditions</span>
                            </div>
                            <div className={Mstyles.menuurlf} onClick={() => router.push(`/p/privacy-policy`)}>
                                <span>Privacy Policy</span>
                            </div>

                        </div>
                    </div>
                    <div className={Mstyles.FotterMBoxB}>
                        <div className={Mstyles.Madein}>

                            Made in <div style={{ width: '5px' }}></div>
                            <Image
                                src={`/img/indiaflag.svg`}
                                alt="image"

                                placeholder='blur'
                                blurDataURL={blurredImageData}
                                objectFit='center'
                                width={15}
                                height={15}

                            /><div style={{ width: '5px' }}></div> Bharat
                        </div>
                        <small>© {new Date().getFullYear()} mysmartlibrary.in All Rights Reserved.</small>
                    </div>
                </div>

            </div>

        </div>


    )
}

export default Footer