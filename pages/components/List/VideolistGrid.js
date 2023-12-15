import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import Mstyles from '../../../Styles/home.module.css'

import Skeleton from '@mui/material/Skeleton';

import {

    useTheme,

} from '@mui/material';

function RecentOrders() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const sendUM = { LimitData: 100 }
            const data = await fetch("/api/V3/List/Videolist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.Videolist.length > 0) {
                        setRetdata(parsed.ReqD.Videolist)
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
    ]
    const theme = useTheme();

    return (

        <div>

            {isLoading &&
                <div>
                    <div className={Mstyles.Videgrid}>
                        {Dummydta.map((item, index) => {
                            return  <div className={Mstyles.FreeVideoItem}>
                            <div className={Mstyles.VideoTHumnailYTfree}>
                            <Skeleton variant="rectangular" width={'100%'} height={218} animation="wave" />
                            </div>
                            <div className={Mstyles.FreevideoListContentbox}>
                                <div className={Mstyles.FreevideoListContentboxTitle}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation="wave" />
                                </div>
                                <div className={Mstyles.Freevideofooter}>
                                    <div>
                                 
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />
                                    </div>

                                    <div className={Mstyles.DotDevider}>
                                        
                                    </div>

                                    <div >
                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />
                                    </div>
                                </div>
                            </div>
                        </div>

                            
                        }

                        )}


                    </div>
                </div>

            }
            {!isLoading &&
                <div>
                    <div className={Mstyles.Videgrid}>
                        {Retdata.map((item) => {
                            return <Link href={`/Watch/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                                <div className={Mstyles.FreeVideoItem}>
                                    <div className={Mstyles.VideoTHumnailYTfree}>
                                        <Image
                                            src={`https://img.youtube.com/vi/${item.Videoid}/0.jpg`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={100}
                                            height={70}
                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />
                                    </div>
                                    <div className={Mstyles.FreevideoListContentbox}>
                                        <div className={Mstyles.FreevideoListContentboxTitle}>
                                            <span>{item.title.slice(0, 50)}</span>
                                        </div>
                                        <div className={Mstyles.Freevideofooter}>
                                            <div>
                                                <small>{item.date}</small>
                                            </div>

                                            <div className={Mstyles.DotDevider}>
                                                ︳
                                            </div>

                                            <div >
                                                {item.isFree &&
                                                    <small>Free</small>
                                                }
                                                {!item.isFree &&
                                                    <small>Paid</small>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }

                        )}


                    </div>


                </div>

            }

        </div>
    );
}

export default RecentOrders;
