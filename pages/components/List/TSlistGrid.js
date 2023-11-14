import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import { LuShare2 } from "react-icons/lu";
import Mstyles from '../../../Styles/home.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'


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
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';
import { TbDiscount2 } from "react-icons/tb";
import { FiCoffee, FiAward, FiAlertCircle } from "react-icons/fi";
function RecentOrders() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/TSlist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.TS)
                    setRetdata(parsed.ReqD.TS)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (

        <>
            <div>
                {!isLoading &&
                    <div className={Mstyles.CourseListBox}>
                        <div className={Mstyles.CourseGrid}>
                            {Retdata.map((item) => {
                                return <Link href={`/TestSeries/${item._id}`} key={item.id} style={{ textDecoration: 'none' }}>
                                    <div className={Mstyles.CourseItems}>
                                        <div className={Mstyles.CourseItemsTBox}>
                                            <div className={Mstyles.CourseItemsTBoxA}>
                                                <span>{item.title}</span>
                                            </div>
                                            <div className={Mstyles.CourseItemsTBoxB}>
                                               
                                                <div className={Mstyles.ShareiConList}>
                                                    <LuShare2 size={15} />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "150px",
                                                backgroundColor: '#c5d6e3',
                                            }}
                                        >
                                            <Image
                                                placeholder='blur'
                                                blurDataURL={blurredImageData}
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`} alt="Vercel Logo" layout='fill' />
                                        </div>

                                        <div className={Mstyles.CourseItemsData}>

                                            <div>
                                                {(item.isFree == false)
                                                    ?
                                                    <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{item.mprice}</span>
                                                    : <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                                }

                                                <del>₹{item.mprice}</del>

                                            </div>
                                            <div className={Mstyles.coursestickerBox}>
                                                <div className={Mstyles.coursestickerItem}>
                                                    <div>
                                                        <FiAlertCircle />
                                                    </div>
                                                    <div className={Mstyles.coursestickerItemtext}>
                                                        <span>{item.tagline}</span>
                                                    </div>
                                                </div>
                                                <div className={Mstyles.coursestickerItem}>
                                                    <div>
                                                        <FiAward />
                                                    </div>
                                                    <div className={Mstyles.coursestickerItemtext}>
                                                        <span>{item.taglinetwo}</span>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                            <div className={Mstyles.coursestickerBoxFooter}>
                                               
                                                <div className={Mstyles.EnrollBtn}>
                                                    <span>Let's Practices</span>
                                                </div>
                                                <div className={Mstyles.coursestickerBoxDiscountTag}>
                                                    <div>
                                                        <span><TbDiscount2 size={20} /></span>
                                                   </div>

                                                    <div style={{marginTop:'-5px', fontWeight:500}}>
                                                        {(item.isFree == false)
                                                            ?
                                                            <small>Save Today ₹{item.mprice - item.mprice}</small>
                                                            : <small>Save ₹{item.mprice}</small>
                                                        }
                                                   </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            }

                            )}


                        </div>

                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px' }}>
                            <div className={Mstyles.LoadMoreBtn}>
                                <span>View More Courses</span>
                            </div>
                        </div> */}
                    </div>

                }
            </div>

        </>
    );
}

export default RecentOrders;
