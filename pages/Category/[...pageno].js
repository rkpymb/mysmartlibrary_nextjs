import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import Footer from '../../src/components/Parts/Footer'
import { LuShare2 } from "react-icons/lu";
import CatlistTagType from '../../pages/components/List/CatlistTagType'
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Navbarmain from '../../src/components/Parts/Navbarmain'
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertCircle, FiAward, FiClock } from "react-icons/fi";

import { useRouter, useParams } from 'next/router'
import { DO_SPACES_URL, DO_SPACES_FOLDER, AppName } from '../../Data/config'
import { TbDiscount2 } from "react-icons/tb";

export async function getServerSideProps(context) {
    const catid = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catid: catid, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}TestSeries/getTSByCatid`, requestOptions);
    const CourseFullData = await response.json();

    return {

        props: { CourseFullData, catid }, // will be passed to the page component as props
    }

}



const HeaderWrapper = styled(Card)(
    ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview({ CourseFullData, catid }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()


    const [Retdata, setRetdata] = useState(CourseFullData.TS);
    const [isLoading, setIsLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {

        setIsLoading(false)
        if (Contextdata.IsLogin == true) {
            // router.push('/dashboards/main')
        } else {
            // router.push('/Login')
        }

    });
    return (
        <OverviewWrapper>
            <Head>
                <title>{catid} : SuperMarks</title>
                {/* <meta name="description" content={DataMian && DataMian.title} /> */}
                {/* <meta property="og:image" content={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${DataMian.img} && DataMian.img}`} /> */}

            </Head>
            <Navbarmain />
            <div className={Mstyles.ContainerMain}>
                <div>
                    <div className={Mstyles.HeroBoxTwoTitle}>
                        <h1> Test Series For <span className={Mstyles.primaryColor}>{catid} </span></h1>
                        <span>All our test series for {catid} are created by top educators, and each question is meticulously reviewed by the best experts</span>
                    </div>
                    <div style={{ minHeight: '50px' }}></div>
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
                                                    src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${item.img}`} alt="Vercel Logo" layout='fill' />
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

                                                        <div style={{ marginTop: '-5px', fontWeight: 500 }}>
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

                        </div>

                    }
                    {isLoading && 
                    
                    <p>Loading...</p>
                    }
                    <div style={{ minHeight: '50px' }}></div>
                    <div className={Mstyles.SmallHeadline}>
                        <h2>Choose Test Series from<span className={Mstyles.primaryColor}> Different Categories</span></h2>
                    </div>

                    <CatlistTagType />
                </div>
            </div>


            <div style={{ minHeight: '130px' }}></div>


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
