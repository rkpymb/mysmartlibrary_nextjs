import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Navbarmain from '../../src/components/Parts/Navbarmain'
import { BiCheckCircle } from "react-icons/bi";
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import { useRouter, useParams } from 'next/router'
import { DO_SPACES_URL, DO_SPACES_FOLDER, AppName } from '../../Data/config'
export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: DataSlug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}home/getcTSbyid`, requestOptions);
    const CourseFullData = await response.json();

    return {

        props: { CourseFullData }, // will be passed to the page component as props
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

function Overview({ CourseFullData }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [ShowEdulist, setShowEdulist] = useState(false);
    const [DataMian, setDataMian] = useState(CourseFullData.TSData);
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {
        console.log(CourseFullData.TSData)
        setLoading(false)
        if (Contextdata.IsLogin == true) {
            // router.push('/dashboards/main')
        } else {
            // router.push('/Login')
        }

    });
    return (
        <OverviewWrapper>
            <Head>
                <title>{DataMian && DataMian.title} Enroll Now</title>
                <meta name="description" content={DataMian && DataMian.title} />
                {/* <meta property="og:image" content={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${DataMian.img} && DataMian.img}`} /> */}

            </Head>
            <Navbarmain />
            <div className={Mstyles.OnlyDesktop}>
                <div style={{ minHeight: '79px' }}></div>
            </div>
            {!Loading &&

                <div>


                    {DataMian.isFree == true &&
                        <div className={Mstyles.SaveTodayBoxCourse}>
                            <div className={Mstyles.SaveTodayBoxCourseA}>
                                <TbDiscount2 />
                            </div>
                            <div className={Mstyles.SaveTodayBoxCourseB}>
                                <b>₹{DataMian.mprice}</b> Discount, Enroll for Free offer valid for Today only.
                            </div>
                        </div>
                    }
                    {DataMian.isFree == false &&
                        <div className={Mstyles.SaveTodayBoxCourse}>
                            <div className={Mstyles.SaveTodayBoxCourseA}>
                                <TbDiscount2 />
                            </div>
                            <div className={Mstyles.SaveTodayBoxCourseB}>
                                <b>₹{DataMian.mprice - DataMian.mprice}</b> Discount, Offer valid for Today only.
                            </div>
                        </div>
                    }

                </div>


            }

            <div className={Mstyles.CourseBox_container} >
                <div className={Mstyles.CourseBox_container_A} >

                    {Loading &&

                        <div className={Mstyles.CoursePageSkelton}>
                            <div style={{ height: '20px' }}></div>
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} width={200} className={Mstyles.CoursePageSkeltonItem} />

                        </div>
                    }
                    {!Loading &&

                        <div className={Mstyles.OnlyDesktop}>
                            <div style={{ height: '20px' }}></div>
                            <h1 style={{ margin: 0, }}>{DataMian && DataMian.title}</h1>
                        </div>
                    }

                    {Loading &&

                        <div className={Mstyles.CoursePageSkelton}>
                            <div style={{ height: '20px' }}></div>
                            <Skeleton variant="rectangular" height={20} width={300} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '10px' }}></div>
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />


                        </div>
                    }
                    {!Loading &&
                        <div style={{ padding: '5px' }}>
                            <div style={{ height: '10px' }}></div>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>Course overview:</span>
                                <div style={{ height: '5px' }}></div>
                            </div>
                            <div>
                                {DataMian.details}
                                {/* <CourseData CourseHtml={CourseHtml} /> */}
                            </div>

                        </div>
                    }
                    {Loading &&

                        <div className={Mstyles.CoursePageSkelton}>
                            <div style={{ height: '20px' }}></div>
                            <Skeleton variant="rectangular" height={20} width={300} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '10px' }}></div>
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />
                            <Skeleton variant="rectangular" height={10} className={Mstyles.CoursePageSkeltonItem} />


                        </div>
                    }
                    {ShowEdulist &&
                        <div style={{ padding: '5px' }}>
                            <div style={{ height: '10px' }}></div>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>Top Educators in this course:</span>
                                <div style={{ height: '10px' }}></div>
                            </div>



                        </div>

                    }
                    {!Loading &&
                        <div style={{ padding: '5px' }}>
                            <div style={{ height: '10px' }}></div>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>Terms & Conditions:</span>
                                <div style={{ height: '10px' }}></div>
                            </div>
                            <div> 1. This course can be purchased both from the official website and the App.</div>
                            <div> 2. for best user experience needs to download and sign up/login into the {AppName} App to access any kind of study material like Live/Recorded lectures, PDF Notes, Test Series, or any other kind of Study Material.</div>
                            <div> 3. Any content related to the course accessible on the App and website.</div>
                            <div style={{ height: '100px' }}></div>
                        </div>
                    }


                </div>
                <div className={Mstyles.CourseBox_container_B} >
                    {Loading &&

                        <div className={Mstyles.CoursePageSkelton}>
                            <div style={{ height: '20px' }}></div>
                            <Skeleton variant="rectangular" height={250} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '20px' }}></div>
                            <Skeleton variant="rectangular" height={50} width={100} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '15px' }}></div>
                            <Skeleton variant="rectangular" height={10} width={300} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '15px' }}></div>
                            <Skeleton variant="rectangular" height={10} width={300} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '15px' }}></div>
                            <Skeleton variant="rectangular" height={10} width={300} className={Mstyles.CoursePageSkeltonItem} />
                            <div style={{ height: '15px' }}></div>
                            <Skeleton variant="rectangular" height={10} width={300} className={Mstyles.CoursePageSkeltonItem} />

                            <div style={{ height: '50px' }}></div>
                            <Skeleton variant="rectangular" height={50} className={Mstyles.CoursePageSkeltonItem} />



                        </div>
                    }
                    {!Loading &&

                        <div>

                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "280px",
                                    backgroundColor: '#c5d6e3',
                                }}
                            >
                                <Image src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${DataMian.img}`} alt="img" placeholder='blur' blurDataURL={blurredImageData} layout='fill' />
                            </div>
                            <div className={Mstyles.OnlyMobile}>
                                <h3 style={{ margin: 0 }}>{DataMian && DataMian.title}</h3>
                            </div>
                            <div className={Mstyles.CourseBox_container_BDataBox}>
                                <div>

                                </div>

                                <div className={Mstyles.OnlyDesktop}>

                                    {DataMian.isFree == true &&
                                        <div className={Mstyles.OnlyDesktop}>
                                            <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                            <del> ₹{DataMian.mprice}</del>
                                        </div>
                                    }
                                    {DataMian.isFree == false &&
                                        <div className={Mstyles.OnlyDesktop}>
                                            <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{DataMian.mprice}</span>
                                            <del> ₹{DataMian.mprice}</del>
                                        </div>
                                    }

                                </div>
                                <div>
                                    <div className={Mstyles.CourseBox_IconTextBox}>
                                        <div className={Mstyles.CourseBox_IconTextBoxA}>
                                            <BiCheckCircle />
                                        </div>
                                        <div className={Mstyles.CourseBox_IconTextBoxB}>
                                            <span>{DataMian.tagline}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBox}>
                                        <div className={Mstyles.CourseBox_IconTextBoxA}>
                                            <BiCheckCircle />
                                        </div>
                                        <div className={Mstyles.CourseBox_IconTextBoxB}>
                                            <span>{DataMian.taglinetwo}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBox}>
                                        <div className={Mstyles.CourseBox_IconTextBoxA}>
                                            <FiUsers />
                                        </div>
                                        <div className={Mstyles.CourseBox_IconTextBoxB}>
                                            <span>{DataMian.enrolled}1K + enrolled</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBox}>
                                        <div className={Mstyles.CourseBox_IconTextBoxA}>
                                            <BiCheckCircle />
                                        </div>
                                        <div className={Mstyles.CourseBox_IconTextBoxB}>
                                            <span>{DataMian.taglinetwo} </span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBox}>
                                        <div className={Mstyles.CourseBox_IconTextBoxA}>
                                            <FiClock />
                                        </div>
                                        <div className={Mstyles.CourseBox_IconTextBoxB}>
                                            <span>{DataMian.duration} days Validity</span>
                                        </div>
                                    </div>
                                </div>
                                {Contextdata.IsLogin &&
                                    <div className={Mstyles.OnlyDesktop}>
                                        <div style={{ minHeight: '20px' }}></div>

                                        <Link href={`/Checkout/${DataMian._id}`} style={{ textDecoration: 'none', color: 'white', }}>
                                            <div className={Mstyles.Coursebtn}>
                                                <span>Enroll Now</span>
                                            </div>
                                        </Link>
                                        <div style={{ minHeight: '10px' }}></div>
                                    </div>

                                }
                                {!Contextdata.IsLogin &&
                                    <div className={Mstyles.OnlyDesktop}>
                                        <div style={{ minHeight: '20px' }}></div>
                                        <Link href={`/Login`} style={{ textDecoration: 'none', color: 'white', }}>
                                            <div className={Mstyles.Coursebtn}>
                                                <span>Login to Enroll</span>
                                            </div>
                                        </Link>
                                        <div style={{ minHeight: '10px' }}></div>
                                    </div>

                                }
                            </div>
                        </div>
                    }


                </div>

            </div>

            <div className={Mstyles.FootermobileBtnCourse}>
                {!Loading &&
                    <div className={Mstyles.FootermobileBtnCourseBox}>
                        <div className={Mstyles.FootermobileBtnCourseBoxPrice}>
                            <div>
                                <small>Course Price :</small>
                            </div>
                            <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{DataMian.mprice}</span>
                            <del> ₹{DataMian.mprice}</del>
                        </div>


                        <div>
                            {Contextdata.IsLogin &&
                                <div className={Mstyles.OnlyMdevice}>

                                    <Link href={`/Checkout/${DataMian._id}`} style={{ textDecoration: 'none', color: 'white', }}>
                                        <div className={Mstyles.CoursebtnMob}>
                                            <span>Enroll Now</span>
                                        </div>
                                    </Link>

                                </div>

                            }
                            {!Contextdata.IsLogin &&
                                <div className={Mstyles.OnlyMdevice}>

                                    <Link href={`/Login`} style={{ textDecoration: 'none', color: 'white', }}>
                                        <div className={Mstyles.CoursebtnMob}>
                                            <span>Login to Enroll</span>
                                        </div>
                                    </Link>

                                </div>

                            }
                        </div>


                    </div>
                }

            </div>




        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
