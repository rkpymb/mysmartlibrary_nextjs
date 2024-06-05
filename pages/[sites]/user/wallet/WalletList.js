import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';

import { LuArrowRight } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';
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
    const [TotalBalance, setTotalBalance] = useState(0);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {

            page: page,
            limit: limit,
        };

        try {
            const response = await fetch("/api/Users/MyWallet", {
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
                if (parsed.RetD.totalbalace > 0) {
                    setTotalBalance(parsed.RetD.totalbalace)

                }

                if (parsed.RetD.WalletList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {

                    if (page === 1) {
                        setRetdata([])
                    }
                    if (parsed.RetD.WalletList.length < limit) {
                        setHasMore(false);

                    }

                    setRetdata(prevData => [...prevData, ...parsed.RetD.WalletList]);
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
            <div className={Mstyles.Wbbox}>
                <div className={Mstyles.WbboxA}>
                    <div className={Mstyles.TotalBalanceBox}>
                        <span>₹ {TotalBalance}</span>
                        <small>Wallet Balance</small>
                    </div>
                    <div className={Mstyles.Rechargebtn}>
                        <LoadingButton

                            fullWidth
                            onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/wallet//recharge`)}
                            endIcon={<LuArrowRight />}
                            loading={false}
                            desabled={false}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Recharge Wallet</span>
                        </LoadingButton>
                    </div>
                </div>
                <div className={Mstyles.WbboxB}>
                    <div className={Mstyles.Passimg}>
                        <Image
                            src={`/img/wallet.png`}
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

            </div>
            <div className={Mstyles.WalletGrid} >





                {Retdata.map((item, index) => {
                    return <div className={Mstyles.WalletItem} key={index}>
                        <div className={Mstyles.WalletItemA}>
                            <div className={Mstyles.Amountbox} >
                                {item.isActive === true ?
                                    <span style={{ color: 'black' }}>+{item.amt}</span> : <span style={{ color: 'red' }}>-{item.amt}</span>
                                }
                            </div>
                            <div style={{ height: '10px' }}></div>
                            <div className={Mstyles.SusPasTitle}>
                                <span>{item.title}</span>
                            </div>
                            <div style={{ height: '5px' }}></div>

                            <div className={Mstyles.attitemBText}>
                                <div className={Mstyles.SeatTitle}>
                                    <span> {item.details}</span>
                                </div>
                                <div style={{ height: '5px' }}></div>
                                <div className={Mstyles.SeatTitle}>
                                    <span> {item.date}, {item.time}</span>
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.WalletItemB}>
                            <div className={Mstyles.Statutag} >
                                {item.isActive === true ?
                                    <span style={{ color: 'black' }}>{item.StatusText}</span> : <span style={{ color: 'red' }}>{item.StatusText}</span>
                                }
                            </div>
                        </div>


                    </div>

                }

                )}
            </div>
        </InfiniteScroll>
    );
}

export default QrOrderslist;
