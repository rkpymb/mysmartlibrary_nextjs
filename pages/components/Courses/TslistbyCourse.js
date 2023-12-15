import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import Nodatafound from '../Extra/Nodatafound'
import Skeleton from '@mui/material/Skeleton';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import Badge from '@mui/material/Badge';
import { LuChevronRight } from "react-icons/lu";
import MYS from '../../../Styles/mystyle.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Button from '@mui/material/Button';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { FiChevronRight } from "react-icons/fi";

import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,

    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    styled,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';
import { FiClock, FiGlobe, FiLock, FiRadio, FiEye } from "react-icons/fi";

function RecentOrders({ courseid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

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

    useEffect(() => {
        setTimeout(function () {
            GetData()
        }, 1000);


    }, [router.query]);

    const GetData = async () => {

        const sendUM = { JwtToken: Contextdata.JwtToken, courseid: courseid }
        const data = await fetch("/api/V3/Students/TslistbyCourse", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
               
                setRetdata(parsed.ReqD.TestSeries)
                setIsLoading(false)
            })
    }

    const theme = useTheme();

    return (

        <>
            {!isLoading &&
                <div>
                    <div className={MYS.TablevideotitleBox}>
                        <div className={MYS.TablevideotitleBoxA}>

                            Exam & Test Series ({Retdata.length})
                        </div>


                    </div>
                    <div style={{ height: '10px' }}></div>
                </div>
            }
            {isLoading &&
                <div>


                    <div>
                        {Demodata.map((item) => {
                            return <div className={MYS.ItemList} key={item.id}>
                                <div className={MYS.ItemListBox}>
                                    <div className={MYS.ItemListBoxA}>
                                        <Skeleton variant="rounded" width={130} height={130} animation="wave" />
                                    </div>
                                    <div className={MYS.ItemListBoxB}>
                                        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={'100%'} animation="wave" />

                                        <div>
                                            <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={200} animation="wave" />
                                        </div>
                                        <div>
                                            <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={200} animation="wave" />
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <div className={MYS.BtnFlexBox}>
                                            <Skeleton variant="rectangular" width={100} height={30} animation="wave" />

                                            <div style={{ minWidth: '10px' }}></div>
                                            <Skeleton variant="rectangular" width={100} height={30} animation="wave" />

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
                    {Retdata.length == 0 &&
                        <Nodatafound
                            Title={'No Exam or Test Series Found'}
                            Desc={'We will be add Exam or Test Series in future'}

                        />
                    }
                    {Retdata.length > 0 &&
                        <div>
                            {Retdata.map((item, index) => {
                                return <div key={index} className={MYS.VideolistboxItem}>
                                    <div className={MYS.VideolistboxItemA}>

                                        <div className={MYS.Videothumbbox}>
                                            <div className={MYS.videothumbimg}>
                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

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

                                            <div style={{ height: '5px' }}></div>
                                            <Link href={`/TSChapters/${item._id}/${item.title}`}>
                                                <Button size='small' variant="outlined" endIcon={<FiChevronRight />}>
                                                Let's Practice
                                                </Button>
                                            </Link>

                                            <div style={{ height: '5px' }}></div>





                                        </div>
                                    </div>


                                </div>
                            }

                            )}
                        </div>
                    }



                </div>

            }


        </>
    );
}

export default RecentOrders;
