import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '../../../Styles/home.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'


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
function RecentOrders() {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const GetSliders = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/PostersliderlistWebsite", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.Sliders)
                setRetdata(parsed.ReqD.Sliders)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetSliders()
    }, [router.query])
    return (<div className={Mstyles.Sliderhero}>
        {isLoading ?
            <div>
                <h1>Loading..</h1>
            </div> :
            <div>
                <div>

                    <Swiper

                        breakpoints={{
                            768: {
                                slidesPerView: 1, // Display 2 slides on tablets (768px or more)
                            },
                            992: {
                                slidesPerView: 1, // Display 3 slides on desktop (992px or more)
                            },
                        }}
                        spaceBetween={0}
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
                        {Retdata.map((item) => {
                            return <SwiperSlide className={Mstyles.SwiperImgae} key={item._id} onClick={() => router.push(`${item.url}`)}>

                                <div>
                                    <img src={`${MediaFilesUrl}${MediaFilesFolder}/${item.BigImg}`} alt='img' className={Mstyles.SliderimgDesktop} />
                                    <img src={`${MediaFilesUrl}${MediaFilesFolder}/${item.SmallImg}`} alt='img' className={Mstyles.SliderimgMobile} />
                                </div>

                            </SwiperSlide>



                        }

                        )}






                    </Swiper>
                </div>
            </div>

        }

    </div>
    );
}

export default RecentOrders;
