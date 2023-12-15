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
        const data = await fetch("/api/V3/List/DBVideolistbycatid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqD.VideoList.length > 0) {
                    setRetdata(parsed.ReqD.VideoList)

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
                        <div className={Mstyles.Videgrid}>
                            {Dummydta.map((item, index) => {
                                return <div className={Mstyles.CourseItems} key={index}>

                                    <Skeleton variant="rectangular" width={'100%'} height={218} animation="wave" />

                                    <div className={Mstyles.CourseItemsData}>
                                        <div className={Mstyles.CourseItemsTBoxA}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />
                                            <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={100} animation="wave" />
                                        </div>

                                        <div style={{ minHeight: '50px' }}></div>


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
                                        <h1>Free Video for <span className={Mstyles.HeroBoxTwoTitleBottom}> {Contextdata.MainCat.name}</span> </h1>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span className={Mstyles.HeroBoxTwoTitlespan}>Watch and learn  {Contextdata.MainCat.name} for free, videos made by Indutry Experts.</span>
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                               
                            </div>
                        }
                        {Retdata.length > 0 &&
                            <div className={MYS.DbContainerpaddingOnlyDesktop}>
                                 <div className={Mstyles.Videgrid}>
                                    {Retdata.map((item) => {
                                        return <div className={Mstyles.FreeVideoItem} key={item._id} onClick={() => router.push(`/Watch/${item._id}`)} >
                                            <div className={Mstyles.VideoTHumnailYTfree}>
                                                <Image
                                                    src={`https://img.youtube.com/vi/${item.Videoid}/0.jpg`}
                                                    alt="image"
                                                    layout="responsive"
                                                    placeholder='blur'
                                                    width={100}
                                                    height={70}
                                                    quality={100}
                                                    blurDataURL={blurredImageData}

                                                />
                                            </div>
                                            <div className={Mstyles.FreevideoListContentbox}>
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
                            onClick={() => router.push(`/Videos/${catid}`)}
                            endIcon={<FiChevronRight />}
                            loading={false}
                            loadingPosition="end"
                            variant="outlined"
                            size='small'
                        >
                            <span>Load more Videos</span>
                        </LoadingButton>
                    </div>

                }

            </div>

        </div>
    );
}

export default RecentOrders;
