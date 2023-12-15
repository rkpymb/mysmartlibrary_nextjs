import React, { useState, useEffect, useContext } from 'react';


import { useRouter } from 'next/router'
import Link from 'next/link';
import MYS from '../../../Styles/mystyle.module.css'
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Badge from '@mui/material/Badge';
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import { LuChevronRight } from "react-icons/lu";

import { FiClock, FiGlobe, FiLock, FiRadio, FiEye } from "react-icons/fi";


import Nodatafound from '../Extra/Nodatafound'
import Skeleton from '@mui/material/Skeleton';

import Image from 'next/image';
import {
    IconButton,
    styled,
    useTheme
} from '@mui/material';

function RecentOrders({ chapterid, pid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const Demodata = [
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
        }
        ,
        {
            id: 6
        }
    ]


    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {

        setTimeout(function () {
            GetData()
        }, 1000);


    }, [router.query])

    const GetData = async () => {
        const sendUM = { JwtToken: Contextdata.JwtToken, chapterid: chapterid, pid: pid }
        const data = await fetch("/api/V3/Students/Livelistbychapterid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.VideosList)
                setIsLoading(false)
            })
    }

    const theme = useTheme();

    return (<>

        <div className={MYS.stickytableBox344} >


            {isLoading &&
                <div className={MYS.Titleboxitem}>

                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} animation="wave" />
                </div>
            }
            {!isLoading &&
                <div className={MYS.Titleboxitem}>

                    Live Session ({Retdata.length})
                </div>
            }

            {isLoading &&
                <div>

                    {Demodata.map((item, index) => {
                        return <div key={index} >
                            <div className={MYS.VideolistboxItem}>
                                <div className={MYS.VideolistboxItemA}>

                                    <div className={MYS.Videothumbbox}>
                                        <div >
                                            <Skeleton variant="rounded" width={100} height={100} animation="wave" />
                                        </div>
                                    </div>

                                    <div className={MYS.VideoContentbox}>
                                        <div style={{ height: '10px' }}></div>
                                        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={'100%'} animation="wave" />
                                        <div style={{ height: '5px' }}></div>

                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={200} animation="wave" />

                                    </div>
                                </div>
                                <div className={MYS.VideolistboxItemB}>
                                    <div className={MYS.OnlyDesktop}>
                                        <Skeleton variant="rectangular" width={100} height={30} animation="wave" />
                                    </div>
                                </div>


                            </div>
                            <div style={{ height: '10px' }}></div>
                        </div>

                    }

                    )}
                </div>
            }

            <div>
                {!isLoading &&
                    <div>


                        {Retdata.length == 0 &&
                            <Nodatafound
                                Title={'No Live Session Found'}
                                Desc={'We are adding Live Session Lectures to this Chapter please stay tuned and try after some time'}

                            />
                        }

                        {Retdata.length > 0 &&
                            <div>
                                {Retdata.map((item, index) => {
                                    return <div key={index} onClick={() => router.push(`/WatchLive/${item._id}`)}>
                                        <div className={MYS.VideolistboxItem}>
                                            <div className={MYS.VideolistboxItemA}>

                                                <div className={MYS.Videothumbbox}>
                                                    <div className={MYS.videothumbimg}>
                                                        <Image
                                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.thumbnail}`}

                                                            alt="image"
                                                            layout="responsive"
                                                            placeholder='blur'
                                                            width={'100%'}
                                                            height={70}
                                                            quality={50}
                                                            blurDataURL={blurredImageData}

                                                        />
                                                    </div>
                                                </div>

                                                <div className={MYS.VideoContentbox}>
                                                    <div style={{ height: '10px' }}></div>
                                                    <span className={MYS.Vtitle}>{item.title}</span>
                                                    <div style={{ height: '5px' }}></div>

                                                    <div className={MYS.VideoStickListBox}>
                                                        <div className={MYS.VideoStickList}>
                                                            <div className={MYS.VideoStickListA}>
                                                                <FiClock />
                                                            </div>
                                                            <div className={MYS.VideoStickListB}>
                                                                <small>{item.date}, {item.time}</small>
                                                            </div>
                                                        </div>
                                                        <div style={{ width: '10px' }}></div>
                                                        {item.isActive == 1 &&
                                                            <div className={MYS.VideoStickList}>
                                                                <div className={MYS.VideoStickListA}>
                                                                    <FiRadio />
                                                                </div>
                                                                <div className={MYS.VideoStickListB}>
                                                                    <small>upcoming</small>
                                                                </div>
                                                            </div>

                                                        }
                                                        {item.isActive == 2 &&
                                                            <div className={MYS.VideoStickList}>
                                                                <div className={MYS.VideoStickListA}>
                                                                    <FiGlobe />
                                                                </div>
                                                                <div className={MYS.VideoStickListB}>
                                                                    <small>Public</small>
                                                                </div>
                                                            </div>

                                                        }

                                                        {item.isActive == 3 &&
                                                            <div className={MYS.VideoStickList}>
                                                                <div className={MYS.VideoStickListA}>
                                                                    <FiLock />
                                                                </div>
                                                                <div className={MYS.VideoStickListB}>
                                                                    <small>Private</small>
                                                                </div>
                                                            </div>

                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                            <div className={MYS.VideolistboxItemB}>
                                                <div className={MYS.OnlyDesktop}>
                                                    <IconButton aria-label="cart" onClick={() => router.push(`/WatchLive/${item._id}`)}>
                                                        <StyledBadge color="secondary" >
                                                            <LuChevronRight />
                                                        </StyledBadge>
                                                    </IconButton>
                                                </div>
                                            </div>


                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                    </div>

                                }

                                )}
                            </div>
                        }


                    </div>

                }

            </div>
        </div>

    </>
    );
}

export default RecentOrders;
