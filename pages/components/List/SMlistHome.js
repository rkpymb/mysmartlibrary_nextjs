import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import Mstyles from '../../../Styles/home.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";
import {

    useTheme,

} from '@mui/material';
import { TbDiscount2 } from "react-icons/tb";
import { FiCoffee, FiAward, FiAlertCircle } from "react-icons/fi";
function RecentOrders() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {

            const sendUM = { LimitData: 6 }
            const data = await fetch("/api/V3/List/studymaterialslist", {
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

        <>
            <div className={Mstyles.OnlyDesktop}>
                <div style={{ minHeight: '30px' }}></div>
            </div>
            <div className={Mstyles.HeroBoxTwoTitle}>
                <h1>Important Notes & <span className={Mstyles.HeroBoxTwoTitleBottom}> Study Materials</span></h1>
                <div style={{ minHeight: '5px' }}></div>
                <span className={Mstyles.HeroBoxTwoTitlespan}>From videos to notes to tests, providing all you need to learn and practice in one place</span>
            </div>
            <div style={{ minHeight: '20px' }}></div>

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
                <div className={Mstyles.SMBox}>
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

            {Retdata.length > 5 &&
                <div className={Mstyles.Loadmorebtnbox}>
                    <LoadingButton
                        fullWidth
                        onClick={() => router.push('/Courses')}
                        endIcon={<FiChevronRight />}
                        loading={false}
                        loadingPosition="end"
                        variant="outlined"
                        size='small'
                    >
                        <span>View all Study Materials</span>
                    </LoadingButton>
                </div>

            }

        </>
    );
}

export default RecentOrders;
