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
            const sendUM = { LimitData: 4 }
            const data = await fetch("/api/V3/List/TSlist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.TS.length > 0) {
                        setRetdata(parsed.ReqD.TS)
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
                <h1>Best <span className={Mstyles.HeroBoxTwoTitleBottom}> Test Series</span></h1>
                <div style={{ minHeight: '5px' }}></div>
                <span className={Mstyles.HeroBoxTwoTitlespan}>From videos to notes to tests, providing all you need to learn and practice in one place</span>
            </div>
            <div style={{ minHeight: '20px' }}></div>
            {isLoading &&
                <div>
                    <div className={Mstyles.TSGrid}>
                        {Dummydta.map((item, index) => {
                            return <div className={Mstyles.CourseItems} key={index}>

                                <Skeleton variant="rectangular" width={'100%'} height={218} animation="wave" />

                                <div className={Mstyles.CourseItemsData}>
                                    <div className={Mstyles.CourseItemsTBoxA}>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={100} animation="wave" />
                                    </div>

                                    <div style={{ minHeight: '50px' }}></div>

                                    <div className={Mstyles.coursestickerBoxFooter}>

                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                        <div className={Mstyles.coursestickerBoxDiscountTag}>


                                            <div style={{ marginTop: '-5px', fontWeight: 500 }}>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                            </div>
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
                <div className={Mstyles.CourseListBox}>
                    <div className={Mstyles.TSGrid}>
                        {Retdata.map((item) => {
                            return <div className={Mstyles.CourseItems} key={item._id} onClick={() => router.push(`/testseriesview/${item.pid}`)}>

                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "210px",
                                        backgroundColor: '#c5d6e3',
                                    }}
                                >
                                    <Image
                                        placeholder='blur'
                                        blurDataURL={blurredImageData}
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`} alt="Vercel Logo" layout='fill' />
                                </div>

                                <div className={Mstyles.CourseItemsData}>
                                    <div className={Mstyles.CourseItemsTBoxA}>
                                        <span>{item.title}</span>
                                    </div>
                                    <div>
                                        {(item.isFree == false)
                                            ?
                                            <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{item.sprice}</span>
                                            : <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                        }

                                        <del>₹{item.mprice}</del>

                                    </div>
                                    <div className={Mstyles.coursestickerBox}>
                                        <div className={Mstyles.coursestickerItem}>
                                            <div>
                                                <FiAlertCircle size={15} />
                                            </div>
                                            <div className={Mstyles.coursestickerItemtext}>
                                                <span>{item.tagline}</span>
                                            </div>
                                        </div>
                                        <div className={Mstyles.coursestickerItem}>
                                            <div>
                                                <FiAward size={15} />
                                            </div>
                                            <div className={Mstyles.coursestickerItemtext}>
                                                <span>{item.taglinetwo}</span>
                                            </div>
                                        </div>


                                    </div>

                                    <div className={Mstyles.coursestickerBoxFooter}>

                                        <div>
                                            <LoadingButton
                                                fullWidth

                                                endIcon={<FiChevronRight />}
                                                loading={false}
                                                loadingPosition="end"
                                                variant="contained"
                                                size='small'
                                            >
                                                <span>Enroll Now</span>
                                            </LoadingButton>
                                        </div>
                                        <div className={Mstyles.coursestickerBoxDiscountTag}>
                                            <div>
                                                <span><TbDiscount2 size={20} /></span>
                                            </div>

                                            <div style={{ marginTop: '-5px', fontWeight: 500 }}>
                                                {(item.isFree == false)
                                                    ?
                                                    <small>Save ₹{item.mprice - item.sprice}</small>
                                                    : <small>Save ₹{item.mprice}</small>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }

                        )}


                    </div>


                </div>

            }
            {Retdata.length > 3 &&
                <div className={Mstyles.Loadmorebtnbox}>
                    <LoadingButton
                        fullWidth
                        onClick={() => router.push('/TestSeries')}
                        endIcon={<FiChevronRight />}
                        loading={false}
                        loadingPosition="end"
                        variant="outlined"
                        size='small'
                    >
                        <span>View All Test Series</span>
                    </LoadingButton>
                </div>

            }

        </>
    );
}

export default RecentOrders;
