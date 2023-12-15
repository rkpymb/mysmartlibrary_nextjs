import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'

import Footer from 'src/components/Footer';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import { useRouter } from 'next/router'
import Nodatafound from '../../pages/components/Extra/Nodatafound'
import Badge from '@mui/material/Badge';
import { FiChevronRight } from "react-icons/fi";
import Skeleton from '@mui/material/Skeleton';
import {


    IconButton,

    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const ProductId = context.query.pageno[0];
    const pid = context.query.pageno[1];


    return {

        props: { ProductId, pid }, // will be passed to the page component as props
    }

}


function DashboardCrypto({ ProductId, pid }) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        Contextdata.ChangeMainTitle('Course Chapters')
        setTimeout(function () {
            GetChapterlist()
        }, 1000);
    }, [router.query]);

    const GetChapterlist = async () => {
        const sendUM = { JwtToken: Contextdata.JwtToken, pid: ProductId }
        const data = await fetch("/api/V3/Students/Coursechapterlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setRetdata(parsed.ReqData)
                setIsLoading(false)

            })
    }

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

    return (
        <>
            <Head>
                <title>Chapters</title>
            </Head>
            <div className={Mstyles.Containerpadding}>
                <div className={Mstyles.OnlyMobile}>
                    <div style={{ minHeight: '30px' }}></div>
                </div>
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
                                Title={'Chapters not found'}
                                Desc={'We are adding chapters to this course please stay tuned and try after some time'}

                            />
                        }
                        {Retdata.length > 0 &&
                            <div>
                                {Retdata.map((item, index) => {
                                    return <div className={MYS.ChapterlistItem} key={item._id} onClick={() => router.push(`/ClassRoom/${item._id}/${ProductId}/${pid}`)}>
                                        <div className={MYS.ChapterlistItemA}>
                                            <h3>{index + 1}. {item.title}</h3>

                                        </div>

                                        <div className={MYS.ChapterlistItemB}>

                                            <IconButton aria-label="cart" onClick={() => router.push(`/ClassRoom/${item._id}/${ProductId}/${pid}`)}>
                                                <StyledBadge color="secondary" >
                                                    <FiChevronRight />
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


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
