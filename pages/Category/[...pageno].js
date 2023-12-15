import { useState, useEffect, useContext } from 'react';
import {

    Box,
    Card,

    styled
} from '@mui/material';



import Footer from '../../src/components/Parts/Footer'

import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Image from 'next/image';
import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'next/link';
import Head from 'next/head';

import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'
import { FiChevronRight } from 'react-icons/fi';
import { MediaFilesUrl, MediaFilesFolder } from '../../Data/config'
import { useRouter } from 'next/router'

import { TbDiscount2 } from "react-icons/tb";
import { FiAward, FiAlertCircle } from "react-icons/fi";
export async function getServerSideProps(context) {
    const catid = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catid: catid, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/GetListsbycatid`, requestOptions);
    const FullData = await response.json();

    return {

        props: { FullData, catid }, // will be passed to the page component as props
    }

}



const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Overview({ FullData, catid }) {
    const router = useRouter()

    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [CatData, setCatData] = useState({});
    const [CourseList, setCourseList] = useState([]);
    const [TSList, setTSList] = useState([]);
    const [VideoList, setVideoList] = useState([]);
    const [SMList, setSMList] = useState([]);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [Email, setEmail] = useState('');
    useEffect(() => {
        console.log(FullData.done.Catdata)
        setCatData(FullData.done.Catdata[0])
        setCourseList(FullData.done.CourseList)
        setTSList(FullData.done.TSList)
        setVideoList(FullData.done.VideoList)
        setSMList(FullData.done.SMList)
        setTimeout(function () {
            setLoading(false);
        }, 2000);
    }, [Contextdata.IsLogin]);
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

    return (
        <OverviewWrapper>
            <Head>
                <title>{CatData && CatData.name}</title>
            </Head>
            <MainNavBarSecond CheckPComplete={false} />
            <div className={Mstyles.MainBoxContainer}>
                <div className={Mstyles.secndHeder}>
                    <div className={Mstyles.secndHederBox}>
                        <div className={Mstyles.secndHederBoxA}>
                            <div>
                                <IconButton aria-label="cart" onClick={() => router.back()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                            </div>
                            <div>
                                <span>{CatData && CatData.name}</span>
                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>

                <div className={Mstyles.MainBoxContainerInner}>
                    <div className={Mstyles.ContainerSec}>
                        <div className={Mstyles.VideoBoxTopDevider}></div>

                        {/* Courses */}
                        {CourseList.length > 0 &&
                            <div>
                                <div style={{ minHeight: '20px' }}></div>
                                <div className={Mstyles.CourseListBox}>
                                    <div className={Mstyles.CoursecatboxTitle} >
                                        <h2 style={{ color: 'black', margin: 0 }}><span className={Mstyles.HeroBoxTwoTitleBottom} style={{ color: 'black' }}>Best Courses and Live Batches </span> </h2>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span style={{ color: 'black' }}>Enroll into Experts made course and Accelerate Your Career Growth & Upskill Yourself</span>
                                    </div>
                                    <div style={{ minHeight: '20px' }}></div>
                                    <div className={Mstyles.CourseGrid}>
                                        {CourseList.map((item) => {
                                            return <div className={Mstyles.CourseItems} key={item._id} onClick={() => router.push(`/course/${item.pid}`)}>

                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "210px",
                                                        backgroundColor: '#c5d6e3',
                                                    }}
                                                >
                                                    <Image
                                                        placeholder='blur'
                                                        blurDataURL={blurredImageData}
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`} alt="Vercel Logo" layout='fill' />
                                                </div>

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
                                                                    <small>Save ₹{item.mprice - item.sprice}</small>
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
                            </div>

                        }
                        {/* Courses end */}
                        {/* TS */}
                        {TSList.length > 0 &&
                            <div>
                                <div style={{ minHeight: '20px' }}></div>
                                <div className={Mstyles.CourseListBox}>
                                    <div className={Mstyles.CoursecatboxTitle} >
                                        <h2 style={{ color: 'black', margin: 0 }}><span className={Mstyles.HeroBoxTwoTitleBottom} style={{ color: 'black' }}>Best Test Series for you </span> </h2>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span style={{ color: 'black' }}>Enroll into Experts made course and Accelerate Your Career Growth & Upskill Yourself</span>
                                    </div>
                                    <div style={{ minHeight: '20px' }}></div>
                                    <div className={Mstyles.TSGrid}>
                                        {TSList.map((item) => {
                                            return <div className={Mstyles.CourseItems} key={item._id} onClick={() => router.push(`/testseriesview/${item.pid}`)}>

                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "210px",
                                                        backgroundColor: '#c5d6e3',
                                                    }}
                                                >
                                                    <Image
                                                        placeholder='blur'
                                                        blurDataURL={blurredImageData}
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`} alt="Vercel Logo" layout='fill' />
                                                </div>

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
                                                                    <small>Save ₹{item.mprice - item.sprice}</small>
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
                            </div>

                        }
                        {/* TS end */}
                        {/* Video */}
                        {VideoList.length > 0 &&
                            <div>
                                <div style={{ minHeight: '20px' }}></div>
                                <div className={Mstyles.CourseListBox}>
                                    <div className={Mstyles.CoursecatboxTitle} >
                                        <h2 style={{ color: 'black', margin: 0 }}><span className={Mstyles.HeroBoxTwoTitleBottom} style={{ color: 'black' }}>Video Classes by Top Educators </span> </h2>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span style={{ color: 'black' }}>Enroll into Experts made course and Accelerate Your Career Growth & Upskill Yourself</span>
                                    </div>
                                    <div style={{ minHeight: '20px' }}></div>

                                    <div className={Mstyles.Videgrid}>
                                        {VideoList.map((item) => {
                                            return <Link href={`/Watch/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                                                <div className={Mstyles.FreeVideoItem}>
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
                                            </Link>
                                        }

                                        )}


                                    </div>

                                </div>




                            </div>

                        }
                        {/* Video end */}
                        {/* Study Materials */}
                        {SMList.length > 0 &&
                            <div>
                                <div style={{ minHeight: '20px' }}></div>
                                <div className={Mstyles.CourseListBox}>
                                    <div className={Mstyles.CoursecatboxTitle} >
                                        <h2 style={{ color: 'black', margin: 0 }}><span className={Mstyles.HeroBoxTwoTitleBottom} style={{ color: 'black' }}>Listed Best Study Materials for you  </span> </h2>
                                        <div style={{ minHeight: '5px' }}></div>
                                        <span style={{ color: 'black' }}>Enroll into Experts made course and Accelerate Your Career Growth & Upskill Yourself</span>
                                    </div>
                                    <div style={{ minHeight: '20px' }}></div>

                                    <div className={Mstyles.SMBox}>
                                        <div className={Mstyles.SMGrid}>
                                            {SMList.map((item) => {
                                                return <Link href={`/ViewPdf/${item.fileurl}/${item.title}`} key={item._id} style={{ textDecoration: 'none' }}>
                                                    <div className={Mstyles.SMItem}>
                                                        <div className={Mstyles.SMImg}>
                                                            <Image
                                                                src={`/img/pdf-file.png`}
                                                                alt="image"
                                                                layout="responsive"
                                                                placeholder='blur'
                                                                width={100}
                                                                height={100}
                                                                quality={100}
                                                                blurDataURL={blurredImageData}

                                                            />
                                                        </div>
                                                        <div>
                                                            <div style={{ minHeight: '10px' }}></div>
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
                                                </Link>
                                            }

                                            )}


                                        </div>


                                    </div>

                                </div>




                            </div>

                        }
                        {/* Study Materials end */}




                        <div style={{ minHeight: '50px' }}></div>
                    </div>

                </div>


            </div>

            <div className={Mstyles.containerFull}>
                <div className={Mstyles.OnlyDesktop}>
                    <div style={{ minHeight: '20px' }}></div>
                </div>
                <Footer />

            </div>




        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
