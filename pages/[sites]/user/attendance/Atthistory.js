import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';

import Mstyles from '/Styles/library.module.css'

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';


function QrOrderslist() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setlimit] = useState(5);


    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {

            page: page,
            limit: limit,
        };

        try {
            const response = await fetch("/api/Users/MyAttendanceList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await response.json();

            if (parsed.RetD) {

                console.log(parsed.RetD.MyAttlistall.length)
                if (parsed.RetD.MyAttlistall.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {

                    if (page === 1) {
                        setRetdata([])
                    }
                    if (parsed.RetD.MyAttlistall.length < limit) {
                        setHasMore(false);

                    }
                    setRetdata(prevData => [...prevData, ...parsed.RetD.MyAttlistall]);
                    setPage(page + 1)

                    setIsLoading(false);
                }


            } else {
                setHasMore(false);
            }


        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetData();
    }, [router.query]);

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };

    return (
        <>
            <InfiniteScroll
                dataLength={Retdata.length}
                next={loadMoreData}
                hasMore={hasMore}
                scrollThreshold={0.2}
                loader={<div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                    <CircularProgress size={25} color="success" />
                </div>}
                endMessage={
                    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                        <b>Yay! You have seen it all 🎉</b>
                    </div>
                }
            >

                {Retdata.length > 0 &&


                    <div className={Mstyles.TodayAtboxB}>

                        <div className={Mstyles.BoxTitle} >
                            <span>Attendance <span className={Mstyles.primaryColor}>History</span></span>
                            <small>Mark and manage your daily Attendance here </small>
                        </div>
                    </div>

                }

                <div className={Mstyles.TodayAttGrid}>
                    {Retdata.map((item) => {
                        return <div className={Mstyles.TodayAttItem} key={item.id} >
                            <div className={Mstyles.attitem}>
                                <div className={Mstyles.attitemA}>
                                    <div className={Mstyles.attitemimgsmall}>
                                        <Image
                                            src={'/img/checkmark.png'}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />
                                    </div>
                                    <div className={Mstyles.StstatusText}>
                                        {item.StatusText}

                                    </div>
                                </div>
                                <div className={Mstyles.attitemB}>
                                    <div className={Mstyles.attitemBText}>
                                        <div className={Mstyles.ShiftTitle}>
                                            <span> {item.ShiftData.title}</span>
                                        </div>
                                        <div className={Mstyles.ShiftTiming}>
                                            <span>{item.ShiftData.uptime} - {item.ShiftData.downtime}</span>
                                        </div>
                                        <div className={Mstyles.SeatTitle}>
                                            <span> {item.SeatData.title}</span>
                                        </div>
                                        <div className={Mstyles.SeatTitle}>
                                            <span> {item.date},  {item.time}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }

                    )}
                </div>
            </InfiniteScroll>

        </>
    );
}

export default QrOrderslist;
