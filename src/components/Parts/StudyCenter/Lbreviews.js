import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import RatingStars from '../RatingStars'

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
        const sendUM = { Branchcode: BranchCode, webid: webid, Limit: 8 }

        const data = await fetch("/api/V3/List/LBReviewsList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setRetdata(parsed.ReqD.LBReview)
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
                        <div className={Mstyles.Tbox} style={{ textAlign: 'center' }} >
                            <h1>Valuable Feedback &  <span className={Mstyles.primaryColor}>Reviews</span></h1>
                            <span>Here is the Valuable reviews and feedback from our users and coustomer, might be helps you !</span>
                        </div>
                        <div style={{ height: '50px' }}></div>
                        <div className={Mstyles.ReviewGrid} >
                            {Retdata.map((item, index) => {
                                return <div className={Mstyles.ReviewItem} key={index}>
                                    <div className={Mstyles.ReviewItemTop}>
                                        <Avatar
                                            alt={item.UserData[0].FullName}
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData[0].ProfilePic}`}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        <div className={Mstyles.ReviewItemNamebox}>
                                            <span>{item.UserData[0].FullName}</span>
                                            <div style={{ height: '5px' }}></div>
                                            <RatingStars Stars={item.ReviewData[0].Stars} />
                                        </div>
                                    </div>
                                    <div className={Mstyles.RatingMsg}>
                                        {item.ReviewData[0].Message}
                                    </div>

                                </div>



                            }

                            )}
                        </div>
                    </div>


                }

            </div>

        }

        {Retdata.length > 0 &&

            <div>
                <div className={Mstyles.MSecDevider} ></div>
            </div>
        }


    </div>
    );
}

export default RecentOrders;
