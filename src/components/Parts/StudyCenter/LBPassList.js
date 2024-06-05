import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiClock, FiPlus } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
import CheckloginContext from '/context/auth/CheckloginContext';
import {

    useTheme,
} from '@mui/material';


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
        const sendUM = { BranchCode: BranchCode, webid: webid }

        const data = await fetch("/api/V3/List/LBPassList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setRetdata(parsed.ReqD.LBPass)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (Contextdata.UserBranchData !== null) {
            GetSliders()
        }

    }, [Contextdata.UserBranchData]);


    return (<div>
        {!isLoading &&
            <div>

                {Retdata.length > 0 &&
                    <div className={Mstyles.PassBox}>
                        <div className={Mstyles.WebsteTitlebox} >
                            <h1>Subscription Pass</h1>
                            <span>Choose from Best and Affordable Subscription Plans for your seamless self study at Better Environment </span>
                        </div>

                        <div style={{ minHeight: '30px' }}></div>


                        <div className={Mstyles.PassItemGrid} >
                            {Retdata.map((item, index) => {
                                return <div className={Mstyles.PassItem} key={index}
                                    onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/subscription-pass/${item.passid}/${item.Branchcode}/${Contextdata.WebData.WebData.webid}/`)}
                                >
                                    <div className={Mstyles.PassItemTop}>
                                        <div className={Mstyles.PassItemTopA}>
                                            <span>{item.title}</span>
                                            <small>Validity : {item.Validity} DAYS</small>
                                        </div>
                                        <div className={Mstyles.PassItemTopB}>
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
                                    </div>

                                    <div className={Mstyles.PassItemMiddle}>
                                        <span>{item.details.slice(0, 70)}</span>
                                    </div>

                                    <div className={Mstyles.PassItemFooter}>
                                        <LoadingButton
                                            size='small'
                                            fullWidth

                                            endIcon={<LuArrowRight />}
                                            loading={false}
                                            loadingPosition="end"
                                            variant="contained"

                                        >
                                            <span>Book Seat</span>
                                        </LoadingButton>
                                    </div>

                                </div>



                            }

                            )}
                        </div>
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
