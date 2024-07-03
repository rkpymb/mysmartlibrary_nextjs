import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import CheckloginContext from '/context/auth/CheckloginContext';
import {

    useTheme,
} from '@mui/material';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Dummydta = [
    {
        id: 1
    },
    {
        id: 2
    }
    ,
    {
        id: 3
    }
    ,
    {
        id: 4
    }
    ,
    {
        id: 5
    },
    {
        id: 4
    }
    ,
    {
        id: 5
    }
]
function RecentOrders() {

    const Contextdata = useContext(CheckloginContext);
    const [Retdata, setRetdata] = useState(Dummydta);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetSliders = async () => {
        const webid = Contextdata.UserBranchData.WebData.webid
        const BranchCode = Contextdata.UserBranchData.BranchCode
        const sendUM = { BranchCode: BranchCode, webid: webid }
        const data = await fetch("/api/V3/List/LbAmenities", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setRetdata(parsed.ReqD.Amenities)
                setIsLoading(false)
            })
    }


    useEffect(() => {
        if (Contextdata.UserBranchData !== null) {
            GetSliders()
        }

    }, [Contextdata.UserBranchData]);


    return (<div>
        {!isLoading &&
            <div>
                {Retdata.length > 0 &&
                    <div>
                        <div style={{ height: '10px' }}></div>

                        <div className={Mstyles.Tbox} >
                            <h1>Facilities & Amenities</h1>
                            <span>Our self-study center offers a quiet, well-equipped environment with WiFi, comfortable seating, and a library, perfect for focused learning. </span>
                        </div>

                        <div className={Mstyles.AmenitiesItemGrid}>
                            {Retdata.map((item, index) => {
                                return <div className={Mstyles.AmenitiesItem} key={index}>
                                    <div className={Mstyles.AmenitiesItemImg}>
                                        <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={80}
                                            blurDataURL={blurredImageData}
                                            objectFit='cover'

                                        />
                                    </div>
                                    <div style={{ height: '7px' }}></div>
                                    <div className={Mstyles.AmenitiesItemText}>{item.Title}</div>

                                </div>
                            }

                            )}



                        </div>
                        <div className={Mstyles.OnlyMobile}>
                            <div style={{ height: '10px' }}></div>
                        </div>

                    </div>
                }

            </div>
        }

        {Retdata.length > 0 &&

            <div className={Mstyles.OnlyDesktop}>
                <div className={Mstyles.MSecDevider} ></div>
            </div>
        }
    </div>

    );
}

export default RecentOrders;
