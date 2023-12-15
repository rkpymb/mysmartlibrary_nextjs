import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import Mstyles from '../../../Styles/home.module.css'

import Skeleton from '@mui/material/Skeleton';

import {

    useTheme,

} from '@mui/material';

function RecentOrders({ slug }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter()
    useEffect(() => {
        console.log(slug)
        const handleSubmit = async () => {
            const sendUM = { slug: slug }
            const data = await fetch("/api/V3/List/SMlistMainCat", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.SMlist.length > 0) {
                        setRetdata(parsed.ReqD.SMlist)
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

        <div className={Mstyles.SMBox}>

            {isLoading &&
                <div className={Mstyles.CourseListBox}>
                    <div className={Mstyles.Videgrid}>
                        {Dummydta.map((item, index) => {
                            return <div className={Mstyles.SMItem}>
                                <div className={Mstyles.SMImg}>
                                <Skeleton variant="rectangular" width={50} height={50} animation="wave" />
                                </div>
                                <div>
                                    <div style={{ minHeight: '10px' }}></div>
                                    <div className={Mstyles.FreevideoListContentboxTitle}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />
                                    </div>
                                    <div className={Mstyles.Freevideofooter}>
                                        <div >
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={100} animation="wave" />
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
                    <div className={Mstyles.SMGrid}>
                        {Retdata.map((item) => {
                            return <Link href={`/ViewPdf/${item.fileurl}/${item.title}`} key={item._id} style={{ textDecoration: 'none' }}>
                                <div className={Mstyles.SMItem}>
                                    <div className={Mstyles.SMImg}>
                                        <Image
                                            src={`/img/pdf-file.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={100}
                                            height={100}
                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />
                                    </div>
                                    <div>
                                        <div style={{ minHeight: '10px' }}></div>
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
