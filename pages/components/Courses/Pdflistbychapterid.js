import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';

import { useRouter } from 'next/router'

import MYS from '../../../Styles/mystyle.module.css'

import CheckloginContext from '../../../context/auth/CheckloginContext'
import Badge from '@mui/material/Badge';


import Nodatafound from '../Extra/Nodatafound'
import Skeleton from '@mui/material/Skeleton';

import { FiClock, FiGlobe, FiLock, FiRadio, FiEye } from "react-icons/fi";

import Image from 'next/image';

import {
    IconButton,
    styled,
    useTheme,

} from '@mui/material';

function RecentOrders({ chapterid, pid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);


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



    const GetData = async () => {
        const sendUM = { JwtToken: Contextdata.JwtToken, chapterid: chapterid, pid: pid }
        const data = await fetch("/api/V3/Students/Pdflistbychapterid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.Notes)
                setIsLoading(false)
            })
    }

    useEffect(() => {

        setTimeout(function () {
            GetData()
        }, 1000);



    }, [router.query])

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

                    Study materials & Pdf Notes  ({Retdata.length})
                </div>
            }

            <div className={MYS.stickyBoxList}>
                {isLoading &&
                    <div>
                        {Demodata.map((item, index) => {
                            return <div className={MYS.ChapterlistItem} key={index} >
                                <div className={MYS.ChapterlistItemA}>
                                    <h3> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" /></h3>
                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />
                                </div>

                                <div className={MYS.ChapterlistItemB}>

                                    <Skeleton variant="rectangular" width={70} height={20} animation="wave" />


                                </div>

                            </div>
                        }

                        )}

                    </div>
                }
                {!isLoading &&
                    <div>
                        {Retdata.length == 0 &&
                            <Nodatafound
                                Title={'No Study material or Pdf Notes Found'}
                                Desc={'We will be add Study Material Soon Please Stay tuned and try after some time '}

                            />
                        }
                        {Retdata.length > 0 &&
                            <div>
                                {Retdata.map((item, index) => {
                                    return <div key={index} className={MYS.VideolistboxItem}>
                                        <div className={MYS.VideolistboxItemA}>

                                            <div >
                                                <Image
                                                    src={`/pdf-file-format.png`}

                                                    alt="image"

                                                    placeholder='blur'
                                                    width={50}
                                                    height={50}
                                                    quality={50}
                                                    blurDataURL={blurredImageData}

                                                />
                                            </div>

                                            <div className={MYS.VideoContentbox}>

                                                <span className={MYS.Vtitle}>{item.title}</span>


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
                                            <IconButton aria-label="cart" onClick={() => router.push(`/ViewPdf/${item.file}/${item.title}`)}>
                                                <StyledBadge color="secondary" >
                                                    <FiEye className={MYS.FiEye} />
                                                </StyledBadge>
                                            </IconButton>
                                        </div>

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
