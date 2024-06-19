import React, { useState, useEffect, useContext } from 'react';

import Mstyles from '/Styles/main.module.css'


import Badge from '@mui/material/Badge';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import Image from 'next/image'


import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'
import {

    FormControl,
    TextField,
    useTheme,
    styled,
    IconButton

} from '@mui/material';

const SubscriptionsPlan = () => {
    const [ShowPg, setShowPg] = useState(false);
    const [SelectedPlanPg, setSelectedPlanPg] = useState(null);

    const router = useRouter()

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const [ReqData, setReqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [SubType, setSubType] = useState('Monthly');


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/Home/SubsPlanList", {
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

            if (parsed.ReqD) {
                console.log(parsed.ReqD)

                if (parsed.ReqD.DataList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);

                } else {

                    if (page === 1) {
                        setReqData([])
                    }



                    setReqData(prevData => [...prevData, ...parsed.ReqD.DataList]);
                    setPage(page + 1)

                    if (parsed.ReqD.DataList.length < limit) {
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

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };
    const ChangeSubType = (e) => {
        setSubType(e)
    };


    useEffect(() => {

        GetData()

    }, [])



    const ShowPgDiloag = async (Plan) => {
        setSelectedPlanPg(Plan);
        setShowPg(true)


    };


    return (
        <div>
            <div className={Mstyles.MboxMain} style={{ backgroundColor: 'white' }}>

                <div className={Mstyles.Planh}>
                    <div className={Mstyles.PlanhA}>
                        <h1>My Smart Library <span className={Mstyles.primaryColor}>Subscription Plan</span></h1>
                        <div style={{ height: '10px' }}></div>
                        <div className={Mstyles.PlanhAx}>
                            <span>Choose your success path with flexible pricing</span>
                        </div>

                    </div>
                    <div className={Mstyles.PlanhB}>
                        <div className={Mstyles.PTSelctbtnBox}>
                            <div className={SubType == 'Monthly' ? Mstyles.PTSelctbtnActive : Mstyles.PTSelctbtn} onClick={() => ChangeSubType('Monthly')}>
                                <span>Monthly</span>
                            </div>
                            <div className={SubType == 'Yearly' ? Mstyles.PTSelctbtnActive : Mstyles.PTSelctbtn} onClick={() => ChangeSubType('Yearly')}>
                                <span>Yearly</span>
                            </div>
                        </div>

                    </div>
                </div>

                <InfiniteScroll
                    dataLength={ReqData.length}
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

                    <div className={Mstyles.PlanGrid}>
                        {ReqData.map((item, index) => {
                            return <div hover key={index} className={Mstyles.PlanItem}>

                                <div className={Mstyles.PlanTop}>
                                    <div className={Mstyles.PlanTopA}>
                                        <div className={Mstyles.PlanImg}>
                                            <Image
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.Image}`}
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
                                    <div className={Mstyles.PlanTopB}>
                                        <div className={Mstyles.Pmtag}>
                                            <span>  {item.Tagline}</span>
                                        </div>
                                        <div className={Mstyles.PmtagCredit}>
                                            <span>₹{item.IncludedItems.FreeCredits || 0}</span>
                                            <small>Free Credits</small>
                                        </div>
                                    </div>

                                </div>
                                <div className={Mstyles.PlanTitle}>
                                    <span>{item.Title}</span>
                                    <div>
                                        <small>{item.Details}</small>
                                    </div>


                                </div>

                                <div className={Mstyles.includedBox}>
                                    <div className={Mstyles.includedBoxTitle}>
                                        <span> What’s included:</span>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Total Branches</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Branches}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Total Seats</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Seats} /Branch</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Users Account</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Users}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Staff Account</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Staffs}</span>
                                        </div>
                                    </div>
                                   
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Addon Products</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.AddonsProducts}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Website</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Website}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Android App</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.MobileApp}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PlanInItem}>
                                        <div className={Mstyles.PlanInItemA}>
                                            <span>Pwa Support</span>
                                        </div>
                                        <div className={Mstyles.PlanInItemB}>
                                            <span>{item.IncludedItems.Pwa}</span>
                                        </div>
                                    </div>
                                   

                                </div>




                                <div style={{ height: '10px' }}></div>
                                <div className={Mstyles.PMItemFotter}>
                                    <div className={Mstyles.PMItemFA}>

                                        {item.Trial == false ?
                                            <div className={Mstyles.Pricebox}>
                                                {SubType == 'Monthly' ?
                                                    <div>
                                                        <div>
                                                            <del>{item.MonthlyPrice.Mprice} </del> <span> ₹ {item.MonthlyPrice.Sprice} </span>
                                                        </div>
                                                        <div className={Mstyles.PriceboxText}>
                                                            <small>for {item.MonthlyPrice.Validity} Days</small>
                                                        </div>
                                                    </div> :
                                                    <div>
                                                        <div>
                                                            <del>{item.YearlyPrice.Mprice} </del> <span> ₹ {item.YearlyPrice.Sprice} </span>
                                                        </div>
                                                        <div className={Mstyles.PriceboxText}>
                                                            <small>for {item.YearlyPrice.Validity} Days</small>
                                                        </div>
                                                    </div>


                                                }

                                            </div> :
                                            <div className={Mstyles.Pricebox}>
                                                <div>
                                                    <span> Free </span>
                                                </div>
                                                <div className={Mstyles.PriceboxText}>
                                                    <small>for {item.MonthlyPrice.Validity} Days</small>
                                                </div>
                                            </div>

                                        }

                                    </div>
                                    <div className={Mstyles.PMItemFB}>
                                        <div className={Mstyles.Flexbtnbox}>
                                            <div style={{ minWidth: '10px' }}></div>


                                            {item.Trial == false ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <LoadingButton
                                                         onClick={() => router.push(`https://admin.mysmartlibrary.in/admin/buy-subscriptions`)}
                                                        endIcon={<LuArrowRight />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Buy Now</span>
                                                    </LoadingButton>
                                                </div> :
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <LoadingButton
                                                         onClick={() => router.push(`https://admin.mysmartlibrary.in/admin/buy-subscriptions`)}
                                                        endIcon={<LuArrowRight />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Try Now</span>
                                                    </LoadingButton>
                                                </div>

                                            }

                                        </div>
                                    </div>

                                </div>



                            </div>
                        }

                        )}
                    </div>
                </InfiniteScroll>

            </div>
           

        </div>
    )
}

export default SubscriptionsPlan
