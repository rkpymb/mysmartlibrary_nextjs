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
        const data = await fetch("/api/V3/List/AllLBPosterslider", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.LBPosterSlider)
                setIsLoading(false)
            })
    }


    useEffect(() => {
        if (Contextdata.UserBranchData !== null) {
            GetSliders()
        }

    }, [Contextdata.UserBranchData]);


    return (<div>

        <Swiper

            breakpoints={{
                768: {
                    slidesPerView: 3, // Display 2 slides on tablets (768px or more)
                },
                992: {
                    slidesPerView: 3, // Display 3 slides on desktop (992px or more)
                },
            }}
            spaceBetween={10}
            centeredSlides={false}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}


        >
            {Retdata.map((item, index) => {
                return <SwiperSlide className={Mstyles.HeroSwiperItem} key={index}>
                    <div>
                        {isLoading ? <div>
                            <Skeleton variant="rounded" height={250} width={'100%'} animation="wave" />
                        </div> :
                            <div>
                                <img src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`} alt='img' className={Mstyles.Herosliderimg} />
                            </div>}

                    </div>

                </SwiperSlide>



            }

            )}






        </Swiper>
        {Retdata.length > 0 &&

            <div className={Mstyles.OnlyDesktop} >
                <div className={Mstyles.MSecDevider} ></div>
            </div>
        }
    </div>
    );
}

export default RecentOrders;
