import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'

import Image from 'next/image';
import MYS from '../../../Styles/mystyle.module.css'
import CheckloginContext from '../../../context/auth/CheckloginContext'
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
function RecentOrders({ catid }) {
    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const GetData = async () => {
        const sendUM = { catid: catid }
        const data = await fetch("/api/V3/List/DbTSlistbycatid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqD.TSLIST.length > 0) {
                    setRetdata(parsed.ReqD.TSLIST)

                }
                setTimeout(function () {
                    setIsLoading(false)
                }, 1000);

            })
    }
    useEffect(() => {


        GetData()


    }, [Contextdata.MainCat])
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

    ]
    const theme = useTheme();

    return (
        <div className={MYS.WhitebgFull}>
            <div>
                {isLoading &&
                    <div className={MYS.DbContainerpaddingOnlyDesktop}>
                        <div className={Mstyles.DbCourseGrid}>
                            {Dummydta.map((item, index) => {
                                return <div className={Mstyles.DbCourseItems} key={index}>



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
                    <div>

                        {Retdata.length > 0 &&
                            <div className={MYS.DbContainerpadding}>
                                <div>
                                    <div className={Mstyles.HeroBoxTwoTitle}>
                                        <h1>Best Test Series for <span className={Mstyles.HeroBoxTwoTitleBottom}> {Contextdata.MainCat.name}</span></h1>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span className={Mstyles.HeroBoxTwoTitlespan}>From videos to notes to tests, providing all you need to learn and practice in one place</span>
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>

                            </div>
                        }
                        {Retdata.length > 0 &&
                            <div className={MYS.DbContainerpaddingOnlyDesktop}>
                                <div className={Mstyles.DbCourseGrid}>
                                    {Retdata.map((item) => {
                                        return <div className={Mstyles.DbCourseItems} key={item._id} onClick={() => router.push(`/testseries/${item.pid}`)}>

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
                                                                <small>Save ₹{item.mprice - item.mprice}</small>
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








                    </div>

                }

                {Retdata.length > 3 &&
                    <div className={Mstyles.Loadmorebtnbox}>
                        <LoadingButton
                            fullWidth
                            onClick={() => router.push(`/TestSeries/${catid}`)}
                            endIcon={<FiChevronRight />}
                            loading={false}
                            loadingPosition="end"
                            variant="outlined"
                            size='small'
                        >
                            <span>View all Test Series</span>
                        </LoadingButton>
                    </div>

                }

            </div>

        </div>
    );
}

export default RecentOrders;
