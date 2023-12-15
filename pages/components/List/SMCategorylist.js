import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Skeleton from '@mui/material/Skeleton';
import Mstyles from '../../../Styles/home.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Image from 'next/image'

import {

    useTheme,
} from '@mui/material';

// import required modules
import { FreeMode, Autoplay, Navigation } from 'swiper/modules';

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
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/CatList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.categories.length > 0) {
                        setRetdata(parsed.ReqD.categories)
                        setTimeout(function () {
                            setIsLoading(false)
                        }, 1000);
                    }

                })
        }
        handleSubmit()


    }, [router.query])

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


    return (<div>

        {isLoading &&
            <div>

                <div style={{ minHeight: '20px' }}></div>
                <Swiper
                    slidesPerView={3.5}
                    spaceBetween={5}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    modules={[FreeMode, Navigation, Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                        768: {
                            slidesPerView: 3.5 // Display 2 slides on tablets (768px or more)
                        },
                        992: {
                            spaceBetween: 5,
                            slidesPerView: 7.5, // Display 3 slides on desktop (992px or more)
                        },
                    }}


                >

                    {Dummydta.map((item, index) => {
                        return <SwiperSlide key={index}>
                            <div className={Mstyles.LoaderVideoCatItem} key={index}>
                                <Skeleton variant="rectangular" width={50} height={50} animation="wave" />
                                <div style={{ minHeight: '5px' }}></div>
                                <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={'60%'} animation="wave" />
                            </div>
                        </SwiperSlide>

                    }

                    )}



                </Swiper>
                <div className={Mstyles.VideoCatLoaderBox}>



                </div>
            </div>

        }
        {!isLoading &&
            <div>
                <Swiper
                    slidesPerView={3.5}
                    spaceBetween={5}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    modules={[FreeMode, Navigation, Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                        768: {
                            slidesPerView: 3.5 // Display 2 slides on tablets (768px or more)
                        },
                        992: {
                            spaceBetween: 5,
                            slidesPerView: 7.5, // Display 3 slides on desktop (992px or more)
                        },
                    }}


                >
                    {Retdata.map((item, index) => {
                        return <SwiperSlide key={index}>
                            <Link href={`StudyMaterials/${item.slug}`} >
                                <div className={Mstyles.SMCatItem}>
                                    <div className={Mstyles.SMCatImg}>
                                        <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />
                                    </div>
                                    <div style={{ minHeight: '5px' }}></div>
                                    <span> {item.name.slice(0, 20)}</span>
                                </div>

                            </Link>
                        </SwiperSlide>

                    }

                    )}


                </Swiper>

            </div>

        }







    </div>
    );
}

export default RecentOrders;
