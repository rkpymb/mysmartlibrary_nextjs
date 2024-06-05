import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import MsgBoxtBtn from '/src/components/Parts/StudyCenter/Extra/MsgBoxtBtn';

import LoadingButton from '@mui/lab/LoadingButton';
import Mstyles from '/Styles/library.module.css'
import { FiChevronRight, FiClock, FiPlus } from "react-icons/fi";
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function QrOrderslist() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Loading, setLoading] = useState(true);
    const [limit, setlimit] = useState(5);
    const [ActivePass, setActivePass] = useState(null);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {
            page: page,
            limit: limit,
        };

        try {
            const response = await fetch("/api/Users/MyLBPassList", {
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

            


                if (parsed.RetD.Mypasslist.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                    setLoading(false)
                } else {



                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.RetD.Mypasslist]);
                    setPage(page + 1)


                    if (parsed.RetD.Mypasslist.length < limit) {
                        setHasMore(false);

                    }
                    if (parsed.RetD.ActivePass) {
                        setActivePass(parsed.RetD.ActivePass);

                    }
                    setIsLoading(false);
                    setLoading(false)
                }


            } else {
                setHasMore(false);
            }


        } catch (error) {
            console.error('Error fetching data:', error);

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
        <div>

            <div className={Mstyles.OnlyDesktop}>
                <div style={{ height: '20px' }}></div>
            </div>

            {!Loading ?
                <div>
                    {ActivePass == 0 ?
                        <MsgBoxtBtn Title={`Your don't have any Active Subscriptios.`} Msg={`Please subscribe to a valid pass to mark your daily attendance`} Url={'/'} /> :
                        <div className={Mstyles.Wbbox}>
                            <div className={Mstyles.WbboxA}>
                                <div className={Mstyles.TotalBalanceBox}>
                                    <span>{ActivePass}</span>
                                    <small>Active</small>
                                </div>
                            </div>
                            <div className={Mstyles.WbboxB}>
                                <LoadingButton
                                    fullWidth
                                    size='small'
                                    onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/subscription-pass`)}
                                    endIcon={<FiPlus />}
                                    loading={false}

                                    loadingPosition="end"
                                    variant="outlined"

                                >
                                    Buy Subscription
                                </LoadingButton>
                            </div>

                        </div>

                    }
                </div> :
                <div style={{ padding: '5px' }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'50%'} />

                </div>

            }


            <div style={{ height: '20px' }}></div>
            <InfiniteScroll
                dataLength={Retdata.length}
                next={loadMoreData}
                hasMore={hasMore}
                scrollThreshold={0.2}
                loader={<div style={{ textAlign: 'center', margin: 'auto', margin: '50px' }} >
                    <CircularProgress size={25} color="success" />
                </div>}
                endMessage={
                    <div style={{ textAlign: 'center', margin: 'auto', margin: '50px' }} >
                        <b>Yay! You have seen it all 🎉</b>
                    </div>
                }
            >

                <div className={Mstyles.SusPassGrid} >
                    {Retdata.map((item, index) => {
                        return <div className={Mstyles.SusPassItem} key={index}>
                            <div className={Mstyles.SusPassItemTop} >
                                <div className={Mstyles.SusPassItemTopA}>
                                    <div className={Mstyles.Passimg}>
                                        <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={30}
                                            height={30}
                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.SusPassItemTopB} >
                                    <div className={Mstyles.SusPasTitle} >
                                        <span>{item.title}</span>
                                    </div>
                                    <div style={{ height: '5px' }}></div>

                                    <div className={Mstyles.attitemBText}>

                                        <div className={Mstyles.SeatTitle}>
                                            <span> {item.ShiftData.title}</span>
                                        </div>
                                        <div className={Mstyles.SeatTitle}>
                                            <span>{item.ShiftData.uptime} - {item.ShiftData.downtime}</span>
                                        </div>
                                        <div style={{ height: '5px' }}></div>

                                        <div className={Mstyles.SeatTitle}>
                                            <span> {item.SeatData.title}</span>
                                        </div>

                                        <div className={Mstyles.SeatTitle} >
                                            <span>Valid till : {item.validityStartDate} - {item.validityEndDate}</span>
                                        </div>


                                        <div className={Mstyles.Addonboxtxt}>
                                            <div className={Mstyles.AddonboxtxtTitle}>
                                                <span>{item.Addon.length} Addons :</span>
                                            </div>
                                            <div style={{ height: '5px' }}></div>
                                            <div className={Mstyles.AdontxtGrid}>
                                                {item.Addon.map((item, index) => {
                                                    return <div className={Mstyles.Adontxti} key={index}>
                                                        ✅ {item.title}
                                                    </div>
                                                }

                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ height: '10px' }}></div>
                            <div className={Mstyles.Spf} >
                                <div className={Mstyles.SPfA} >
                                    <div className={Mstyles.Statutag} >
                                        {item.StatusText == 'Expired' ?
                                            <span style={{ color: 'red' }}>{item.StatusText}</span> : <span style={{ color: 'black' }}>{item.StatusText}</span>


                                        }
                                    </div>

                                </div>
                                <div className={Mstyles.SPfB} >

                                </div>

                            </div>


                        </div>

                    }

                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default QrOrderslist;
