import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import PaywithCredit from '/src/components/Parts/StudyCenter/PaymentGatway/PaywithCredit'


import Mstyles from '/Styles/library.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { BiCheckCircle } from "react-icons/bi";
import { FiChevronRight, FiClock, FiPlus } from "react-icons/fi";

import Lottie from 'react-lottie'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';

import Pglist from '../PaymentGatway/Pglist'
import { Add } from '@mui/icons-material';

function AddonList() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [ShowPg, setShowPg] = useState(false);
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [BtnLoad, setBtnLoad] = useState(false);
    const [limit, setlimit] = useState(5);
    const [TotalBalance, setTotalBalance] = useState(0);

    const [hasMore, setHasMore] = useState(true);
    const [PaymentData, setPaymentData] = useState({});
    const [page, setPage] = useState(1);
    const [Loadpg, setLoadpg] = useState(false);
    const [OrderData, setOrderData] = useState(null);

    const GetData = async () => {
        const webid = Contextdata.UserBranchData.WebData.webid
        const BranchCode = Contextdata.UserBranchData.BranchCode
        const sendUM = {

            page: page,
            limit: limit,
            Branchcode: BranchCode,
            webid: webid
        };

        try {
            const response = await fetch("/api/V3/Library/AddonList", {
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

                console.log(parsed.RetD.AddonList.length)
                if (parsed.RetD.AddonList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {

                    if (page === 1) {
                        setRetdata([])
                    }



                    setRetdata(prevData => [...prevData, ...parsed.RetD.AddonList]);
                    setPage(page + 1)

                    if (parsed.RetD.AddonList.length < limit) {
                        setHasMore(false);

                    }
                    setIsLoading(false);
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


    const CeateAddonOrder = async (selectedItems) => {
        setBtnLoad(true)
        const Pmd = {
            PaymentMode: 'Wallet'
        }
        const datasend = {
         
            Addons: selectedItems,
            PMData: Pmd

        }
        const data = fetch("/api/V3/Library/AddonCreateOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datasend)
        }).then((a) => {
            return a.json();
        })
            .then((OrderParse) => {
                
                if (OrderParse.ReqData.done) {
                    const OData = OrderParse.ReqData.done
                    setPaymentData(OData)
                    setTimeout(function () {

                        setShowPg(true)

                    }, 2000);
                } else {
                    setBtnLoad(false)
                    console.log(OrderParse)
                  
                    alert('Something Went Wrong')

                }


            })

    }

    return (
        <div>
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
                <div className={Mstyles.AddonGrid}>
                    {Retdata.map((item) => {
                        return <div className={Mstyles.AddonItem} key={item._id}


                        >
                            <div className={Mstyles.AddonItemA}>
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
                                <div style={{ height: '10px' }}></div>
                                <div>  <span style={{ fontWeight: 600 }}>{item.title}</span></div>

                                <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>Price  <del>{item.mprice}</del> <span style={{ fontWeight: 700 }}>₹{item.sprice}</span> </span></div>
                            </div>
                            <div className={Mstyles.AddonItemB} style={{ margin: 5 }}>
                                <LoadingButton
                                    fullWidth
                                    size='small'
                                    onClick={() => CeateAddonOrder(item)}
                                    endIcon={<FiPlus />}
                                    loading={BtnLoad}
                                    desabled={BtnLoad}
                                    loadingPosition="end"
                                    variant="outlined"

                                >
                                    Buy
                                </LoadingButton>
                            </div>
                        </div>
                    }

                    )}
                </div>
            </InfiniteScroll>
            {ShowPg &&

                <div>
                    <PaywithCredit PaymentData={PaymentData} />
                </div>
            }
        </div>
    );
}

export default AddonList;
