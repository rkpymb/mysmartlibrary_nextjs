import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '../../../Styles/home.module.css'
// import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'


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


    return (<div className={Mstyles.Sliderhero}>

        {isLoading &&
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
                    <SwiperSlide className={Mstyles.SwiperImgae}>

                        <Link href={`/services/virtual-assistant`} >

                            <div>
                                <img src='/img/p1.jpg' alt='img' className={Mstyles.SliderimgDesktop} />
                                <img src='/img/pm1.jpg' alt='img' className={Mstyles.SliderimgMobile} />
                            </div>
                        </Link>

                    </SwiperSlide>

                    <SwiperSlide className={Mstyles.SwiperImgae}>

                        <Link href={`/services/website-development`} >

                            <div>

                                <img src='/img/p1.jpg' alt='img' className={Mstyles.SliderimgDesktop} />
                                <img src='/img/pm1.jpg' alt='img' className={Mstyles.SliderimgMobile} />
                            </div>
                        </Link>

                    </SwiperSlide>




                </Swiper>
            </div>
        }

    </div>
    );
}

export default RecentOrders;
