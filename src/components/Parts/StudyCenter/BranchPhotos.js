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
        const sendUM = { BranchCode: BranchCode, webid: webid, Limit: 8 }
        const data = await fetch("/api/V3/List/AllLBPhoto", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setRetdata(parsed.ReqD.Photoslist)
                setIsLoading(false)
            })
    }


    useEffect(() => {
        if (Contextdata.UserBranchData !== null) {
            GetSliders()
        }

    }, [Contextdata.UserBranchData]);


    return (<div className={Mstyles.HeroBoxTwoVT}>
        {!isLoading &&
            <div>
                {Retdata.length > 0 &&
                    <div>
                        <div className={Mstyles.Tbox} >
                            <h1>Study Center <span className={Mstyles.primaryColor}>Photos</span></h1>
                            <span>Let's Look Hows Looks Your Study Center , we have listed best photos </span>
                        </div>
                        <div style={{ height: '20px' }}></div>
                        <Swiper

                            breakpoints={{
                                768: {
                                    slidesPerView: 2.5, // Display 2 slides on tablets (768px or more)
                                },
                                992: {
                                    slidesPerView: 4, // Display 3 slides on desktop (992px or more)
                                },
                            }}
                            slidesPerView={2.5}
                            spaceBetween={10}
                            centeredSlides={false}

                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}


                        >
                            {Retdata.map((item, index) => {
                                return <SwiperSlide className={Mstyles.HeroSwiperItem} key={item.index}>
                                    <div>

                                        <div className={Mstyles.LbPhotoItemimg}>
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

                                    </div>

                                </SwiperSlide>



                            }

                            )}






                        </Swiper>
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
