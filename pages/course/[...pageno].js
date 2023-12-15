import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,

    styled
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';

import Badge from '@mui/material/Badge';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";
import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'
import { BiCheckCircle } from "react-icons/bi";
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";

import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, AppName } from '../../Data/config'
export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pid: DataSlug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/GetCoursedata`, requestOptions);
    const CourseFullData = await response.json();


    return {

        props: { CourseFullData }, // will be passed to the page component as props
    }

}


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
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
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [ShowEdulist, setShowEdulist] = useState(false);
    const [DataMian, setDataMian] = useState(CourseFullData.CourseData[0]);
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {
        if (CourseFullData.CourseData.length == 1) {
            setLoading(false)
        } else {
            router.push('/pagenotfound')
        }

    });
    return (
        <OverviewWrapper>
            <Head>
                <title>{DataMian && `${DataMian.title} : Enroll Now`} </title>
                <meta name="description" content={DataMian && DataMian.details} />
                <meta property="og:image" content={DataMian && `${MediaFilesUrl}${MediaFilesFolder}/${DataMian.img}`} />

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
                                {Loading &&
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={200} />
                                }
                                {!Loading &&
                                    <span>{DataMian && DataMian.title}</span>
                                }

                            </div>

                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>
                <div style={{ height: '51px' }}></div>


            </div>

            <div className={Mstyles.CourseBox_container} >
                <div className={Mstyles.CourseBox_container_A} >
                    <div className={Mstyles.OnlyDesktop}>
                        <div style={{ height: '20px' }}></div>
                        {Loading &&
                            <div>
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={'80%'} />
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'50%'} />
                            </div>
                        }
                        {!Loading &&
                            <h1 style={{ margin: 0, }}>{DataMian && DataMian.title} a</h1>
                        }


                    </div>

                    <div className={Mstyles.CoursepageDataBox}>

                        <div>
                            {Loading &&
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={'80%'} />
                            }
                            {!Loading &&
                                <span style={{ fontWeight: 'bold' }}>Course overview:</span>
                            }

                            <div style={{ height: '5px' }}></div>
                        </div>
                        <div>
                            {Loading &&
                                <div>
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={'80%'} />
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'30%'} />
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'50%'} />
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'50%'} />
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'50%'} />
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'50%'} />
                                </div>
                            }
                            {!Loading &&
                                <div>
                                    {DataMian.details}
                                </div>
                            }
                            {/* <CourseData CourseHtml={CourseHtml} /> */}
                        </div>
                        {ShowEdulist &&
                            <div>
                                <div style={{ height: '10px' }}></div>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>Top Educators in this course:</span>
                                    <div style={{ height: '10px' }}></div>
                                </div>



                            </div>

                        }

                        <div style={{ height: '200px' }}></div>

                    </div>

                </div>
                <div className={Mstyles.CourseBox_container_B}>
                    <div>
                        <div className={Mstyles.CoursePageimge}>
                            {Loading &&
                                <div>
                                    <Skeleton variant="rectangular" height={250} className={Mstyles.CoursePageSkeltonItem} />
                                </div>
                            }
                            {!Loading &&
                                <img src={`${MediaFilesUrl}${MediaFilesFolder}/${DataMian.img}`} alt='img' />
                            }

                        </div>
                        <div className={Mstyles.OnlyMobile}>
                            <div style={{ minHeight: '10px' }}></div>
                            {Loading &&
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} className={Mstyles.SkeltoonC} />

                            }
                            {!Loading &&
                                <h3 style={{ margin: 0 }}>{DataMian && DataMian.title}</h3>
                            }

                        </div>
                        <div className={Mstyles.CourseBox_container_BDataBox}>
                            <div>
                                {Loading &&
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'40%'} />

                                }
                                {!Loading &&
                                    <div>
                                        {DataMian.isFree == true &&
                                            <div>
                                                <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                                <del> ₹{DataMian.mprice}</del>
                                            </div>
                                        }
                                        {DataMian.isFree == false &&
                                            <div>
                                                <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{DataMian.sprice}</span>
                                                <del> ₹{DataMian.mprice}</del>
                                            </div>
                                        }

                                    </div>

                                }

                            </div>

                            <div className={Mstyles.CourseBox_IconTextBoxMain}>
                                <div className={Mstyles.CourseBox_IconTextBox}>
                                    <div className={Mstyles.CourseBox_IconTextBoxA}>

                                        {!Loading &&
                                            <BiCheckCircle />

                                        }

                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBoxB}>
                                        {Loading &&
                                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={100} />

                                        }
                                        {!Loading &&
                                            <span>{DataMian.tagline}</span>

                                        }

                                    </div>
                                </div>
                                <div className={Mstyles.CourseBox_IconTextBox}>
                                    <div className={Mstyles.CourseBox_IconTextBoxA}>


                                        {!Loading &&
                                            <BiCheckCircle />

                                        }
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBoxB}>
                                        {Loading &&
                                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={100} />

                                        }
                                        {!Loading &&
                                            <span>{DataMian.taglinetwo}</span>

                                        }

                                    </div>
                                </div>
                                <div className={Mstyles.CourseBox_IconTextBox}>
                                    <div className={Mstyles.CourseBox_IconTextBoxA}>

                                        {!Loading &&
                                            <FiUsers />

                                        }
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBoxB}>
                                        {Loading &&
                                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={100} />

                                        }
                                        {!Loading &&
                                            <span>{DataMian.enrolled}1K + enrolled</span>

                                        }

                                    </div>
                                </div>
                                <div className={Mstyles.CourseBox_IconTextBox}>
                                    <div className={Mstyles.CourseBox_IconTextBoxA}>

                                        {!Loading &&
                                            <BiCheckCircle />

                                        }
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBoxB}>
                                        {Loading &&
                                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={100} />

                                        }
                                        {!Loading &&
                                            <span>Access on mobile App and Website </span>

                                        }

                                    </div>
                                </div>
                                <div className={Mstyles.CourseBox_IconTextBox}>
                                    <div className={Mstyles.CourseBox_IconTextBoxA}>


                                        {!Loading &&
                                            <FiClock />

                                        }
                                    </div>
                                    <div className={Mstyles.CourseBox_IconTextBoxB}>
                                        {Loading &&
                                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={100} />

                                        }
                                        {!Loading &&
                                            <span>{DataMian.duration} days Validity</span>

                                        }


                                    </div>
                                </div>
                            </div>

                            <div className={Mstyles.EnrollBtnBoxmain}>
                                <div className={Mstyles.OnlyDesktop}>
                                    <div style={{ minHeight: '20px' }}></div>
                                    {Loading &&
                                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '3rem' }} width={'100%'} />

                                    }
                                    {!Loading &&
                                        <div>

                                            {Contextdata.IsLogin ?
                                                <div>
                                                    <Link href={`/CoursesCheckout/${DataMian._id}`} style={{ width: '100%' }}>
                                                        <LoadingButton
                                                            fullWidth

                                                            endIcon={<FiChevronRight />}
                                                            loading={LoadingBtn}
                                                            loadingPosition="end"
                                                            variant="contained"
                                                        >
                                                            <span>Enroll Now  {DataMian.isFree == true &&
                                                                <span> For Free</span>
                                                            }</span>
                                                        </LoadingButton>
                                                    </Link>
                                                </div>
                                                :
                                                <div>
                                                    <Link href={`/Login`} style={{ width: '100%' }}>
                                                        <LoadingButton
                                                            fullWidth

                                                            endIcon={<FiChevronRight />}
                                                            loading={LoadingBtn}
                                                            loadingPosition="end"
                                                            variant="contained"
                                                        >
                                                            <span> Login to Enroll</span>
                                                        </LoadingButton>
                                                    </Link>
                                                </div>

                                            }

                                        </div>

                                    }


                                    <div style={{ minHeight: '10px' }}></div>
                                </div>


                                {!Loading &&

                                    <div className={Mstyles.OnlyDesktop}>
                                        {DataMian.isFree == true &&
                                            <div className={Mstyles.totalFinalDiscountBox}>


                                                <div>
                                                    <span>Wow 😍 You saved  </span>   <span className={Mstyles.totalFinalDiscount} >₹{DataMian.mprice} </span> <span>Enroll for Free offer valid for Today only</span>
                                                </div>

                                            </div>
                                        }
                                        {DataMian.isFree == false &&
                                            <div className={Mstyles.totalFinalDiscountBox}>
                                                {Loading &&
                                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'100%'} />

                                                }
                                                {!Loading &&
                                                    <div>
                                                        <span>Wow 😍 You saved  </span>   <span className={Mstyles.totalFinalDiscount} >₹{DataMian.mprice - DataMian.sprice} </span> <span>Discount, Offer valid for Today only.</span>
                                                    </div>

                                                }

                                            </div>
                                        }
                                    </div>
                                }

                            </div>


                        </div>
                    </div>


                </div>

            </div>


            {!Loading &&

                <div className={Mstyles.FootermobileBtnCourse}>
                    <div className={Mstyles.FootermobileBtnCourseBox}>
                        <div>
                            {DataMian.isFree == true &&
                                <div className={Mstyles.totalFinalDiscountBox}>



                                    <div>
                                        <span>Wow 😍 You saved  </span>   <span className={Mstyles.totalFinalDiscount} >₹{DataMian.mprice} </span> <span>Enroll for Free offer valid for Today only</span>
                                    </div>

                                </div>
                            }
                            {DataMian.isFree == false &&
                                <div className={Mstyles.totalFinalDiscountBox}>
                                    {Loading &&
                                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.5rem' }} width={'100%'} />

                                    }
                                    {!Loading &&
                                        <div>
                                            <span>Wow 😍 You saved  </span>   <span className={Mstyles.totalFinalDiscount} >₹{DataMian.mprice - DataMian.sprice} </span> <span>Discount, Offer valid for Today only.</span>
                                        </div>

                                    }

                                </div>
                            }
                        </div>

                        {Contextdata.IsLogin ?
                            <div>
                                <Link href={`/CoursesCheckout/${DataMian._id}`} style={{ width: '100%' }}>
                                    <LoadingButton
                                        fullWidth

                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Enroll Now  {DataMian.isFree == true &&
                                            <span> For Free</span>
                                        }</span>
                                    </LoadingButton>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link href={`/Login`} style={{ width: '100%' }}>
                                    <LoadingButton
                                        fullWidth

                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span> Login to Enroll</span>
                                    </LoadingButton>
                                </Link>
                            </div>

                        }

                    </div>
                </div>

            }






        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
