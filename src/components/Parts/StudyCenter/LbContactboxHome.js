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
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (Contextdata.UserBranchData) {
            setLoading(false)
        }
    }, [Contextdata.UserBranchData]);


    return (

        <div>
            {!Loading &&

                <div>
                    <div>
                        <div className={Mstyles.ContactitemGrid}>
                            <div className={Mstyles.Contactitem}>
                                <div className={Mstyles.ContactitemA}>
                                    <div className={Mstyles.ContactitemAimg}>
                                        <Image
                                            src={`/img/phone-call.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.ContactitemBx}>
                                    <span>{Contextdata.UserBranchData.MobileNum}</span>
                                    <div style={{ height: '5px' }}></div>
                                    <small>Call us for any queries</small>
                                </div>
                            </div>
                            <div className={Mstyles.Contactitem}>
                                <div className={Mstyles.ContactitemA}>
                                    <div className={Mstyles.ContactitemAimg}>
                                        <Image
                                            src={`/img/envelope.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.ContactitemBx}>
                                    <span>{Contextdata.UserBranchData.Email}</span>
                                    <div style={{ height: '5px' }}></div>
                                    <small>write us a email</small>
                                </div>
                            </div>
                            <div className={Mstyles.Contactitem}>
                                <div className={Mstyles.ContactitemA}>
                                    <div className={Mstyles.ContactitemAimg}>
                                        <Image
                                            src={`/img/location.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.ContactitemBx}>
                                    <span>{Contextdata.UserBranchData.Address} ,{Contextdata.UserBranchData.City} ,{Contextdata.UserBranchData.State} {Contextdata.UserBranchData.pincode}</span>
                                    <div style={{ height: '5px' }}></div>
                                    <small>Branch Address</small>
                                </div>
                            </div>


                        </div>

                    </div>




                </div>
            }
           
        </div>

    )
}

export default HeroBox