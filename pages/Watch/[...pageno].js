import { useState, useEffect, useContext } from 'react';
import {

    Box,

    styled
} from '@mui/material';
import MYS from '../../Styles/mystyle.module.css'
import Avatar from '@mui/material/Avatar';
import { LuArrowRight } from "react-icons/lu";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";


import YtplayerVideo from '../components/Player/YtplayerVideo';
import Footer from '../../src/components/Parts/Footer'
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';

import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'
import { FiPlus, } from 'react-icons/fi';

import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {
    const videoid = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoid: videoid, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/GetVideoData`, requestOptions);
    const VD = await response.json();


    return {

        props: { VD, videoid }, // will be passed to the page component as props
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

function Overview({ VD, videoid }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [IsLoadingcmt, setIsLoadingcmt] = useState(true);
    const Contextdata = useContext(CheckloginContext)
    const [CommentList, setCommentList] = useState([]);
    const [LoadingBtn, setLoadingBtn] = useState(false);


    const [VideoMainData, setVideoMainData] = useState(VD.VideoData[0]);
    const [IsLiked, setIsLiked] = useState(false);
    const [LikedList, setLikedList] = useState([]);
    const [CmtText, setCmtText] = useState('');

    useEffect(() => {
        if (VD.VideoData.length == 1) {

            const Token = localStorage.getItem('Token');
            if (!Token || Token.trim() === '') {
                router.push('/Login')
            }
            if (Contextdata.IsLogin == true) {
                setLoading(false)
                GetLikesData()
                setLoading(false);
            }


        } else {
            router.push('/Videonotfound')
        }


    }, [Contextdata.IsLogin]);



    const LikeVideo = async () => {
        setIsLiked(true)
        const sendUM = { Videoid: videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/AddVideosLecturesLike", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedLikedadded) => {
                if (parsedLikedadded.ReqData.done) {
                    GetLikesData()

                }
            })
    }

    const Addcmt = async (e) => {
        e.preventDefault();
        if (IsLoadingcmt == false) {
            if (CmtText !== '') {
                const sendUM = { Videoid: videoid, cmt: CmtText, JwtToken: Contextdata.JwtToken }
                const data = await fetch("/api/V3/Video/AddVideosLecturesComment", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendUM)
                }).then((a) => {
                    return a.json();
                })
                    .then((parsedLikedadded) => {
                        if (parsedLikedadded.ReqData.done) {
                            GetComments()

                        }
                    })
            } else {
                alert('Can not add empty Comment')
            }
        } else {
            alert('Something went wrong')
        }



    }

    const GetLikesData = async () => {
        const sendUM = { Videoid: videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/GetLikesData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedLiked) => {
                if (parsedLiked.ReqData.Likelist) {
                    setLikedList(parsedLiked.ReqData.Likelist)
                    GetComments()
                }
                if (parsedLiked.ReqData.isLiked.length > 0) {
                    setIsLiked(true)
                }


            })
    }
    const GetComments = async () => {
        const sendUM = { Videoid: videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/GetComments", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedCmt) => {
                if (parsedCmt.ReqData.cmtlist) {
                    setCommentList(parsedCmt.ReqData.cmtlist)
                    Allok()
                }


            })
    }
    const Allok = async (e) => {


        setTimeout(function () {
            setIsLoadingcmt(false)
        }, 2000);
    }


    return (
        <OverviewWrapper>
            <Head>
                <title>{VideoMainData && VideoMainData.title}</title>
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

                                <span>{VideoMainData && VideoMainData.title.slice(0, 30)} ...</span>
                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>

                <div className={Mstyles.MainBoxContainerInner}>
                    <div>
                        <div className={Mstyles.VideoPlayerBoxTopDevider}></div>
                        <div className={Mstyles.VideoPlayerBox}>
                            <div className={Mstyles.VideoPlayerBoxA}>
                                <div>  <YtplayerVideo videoid={videoid} /> </div>

                                <div className={MYS.VideoPlayermenuBox}>
                                    <div className={MYS.VideoPlayermenuBoxA}>
                                        {Loading &&
                                            <div className={MYS.VideoPlayerTitlebox}>
                                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'80%'} />
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'30%'} />
                                            </div>

                                        }

                                        {!Loading &&
                                            <div className={MYS.VideoPlayerTitlebox}>
                                                <span>{VideoMainData && VideoMainData.title}</span>
                                                <small>Published on : {VideoMainData && VideoMainData.date}</small>

                                            </div>

                                        }



                                    </div>


                                    {Loading &&
                                        <div className={MYS.loaderLikeflex}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={50} />
                                            <div style={{ width: '10px' }}></div>
                                            <Skeleton variant="rounded" animation="wave" width={30} height={30} />
                                        </div>

                                    }


                                    {!Loading &&
                                        <div>
                                            {IsLiked &&

                                                <div className={MYS.Likedbox}>
                                                    <div className={MYS.LikedboxA}>
                                                        {LikedList.length}
                                                    </div>
                                                    <div className={MYS.LikedboxB}>
                                                        <IconButton aria-label="Liked" >
                                                            <StyledBadge color="secondary" >

                                                                <MdThumbUp />
                                                            </StyledBadge>
                                                        </IconButton>
                                                    </div>

                                                </div>

                                            }
                                            {!IsLiked &&
                                                <div className={MYS.Likedbox}>
                                                    <div className={MYS.LikedboxA}>
                                                        {LikedList.length}
                                                    </div>
                                                    <div className={MYS.LikedboxB}>
                                                        <IconButton aria-label="Like" onClick={LikeVideo}>
                                                            <StyledBadge color="secondary" >
                                                                <MdOutlineThumbUp />
                                                            </StyledBadge>
                                                        </IconButton>
                                                    </div>

                                                </div>

                                            }

                                        </div>

                                    }

                                </div>
                                <div className={MYS.VideoBybox}>
                                    <div className={MYS.VideoByboxA}>
                                        <div className={MYS.VideoByboxADp}>
                                            {Loading &&
                                                <Skeleton variant="circular">
                                                    <Avatar />
                                                </Skeleton>

                                            }
                                            {!Loading &&
                                                <Avatar
                                                    alt={VideoMainData && VideoMainData.VideoOwner}
                                                    src="/static/images/avatar/1.jpg"
                                                    sx={{ width: 40, height: 40 }}
                                                />

                                            }

                                        </div>
                                        <div className={MYS.VideoByboxAVideoBybox}>
                                            {Loading &&
                                                <div>
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={250} />
                                                </div>

                                            }
                                            {!Loading &&
                                                <span>{VideoMainData.VideoOwner}</span>

                                            }
                                           
                                            {Loading &&
                                                <div>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} animation="wave" width={200} />
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} animation="wave" width={150} />
                                                </div>

                                            }
                                            {!Loading &&
                                                <div className={MYS.CreatorDesc}>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                                    numquam blanditiis harum quisquam
                                                </div>

                                            }



                                            <div style={{ height: '10px' }}> </div>
                                            <div>
                                                {Loading &&
                                                    <div>
                                                        <Skeleton variant="text" sx={{ fontSize: '2.5rem' }} animation="wave" width={100} />

                                                    </div>

                                                }
                                                {!Loading &&
                                                    <LoadingButton
                                                        size={'small'}
                                                        endIcon={<FiPlus />}
                                                        loading={LoadingBtn}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Follow</span>
                                                    </LoadingButton>

                                                }



                                            </div>

                                        </div>

                                    </div>


                                </div>

                            </div>
                            <div className={Mstyles.VideoPlayerBoxB}>
                                <div className={MYS.Comentbox}>
                                    <div className={MYS.ComentboxHeader}>
                                        {IsLoadingcmt &&
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={100} />
                                        }
                                        {!IsLoadingcmt &&
                                            <span>{CommentList.length} Comments</span>
                                        }

                                    </div>
                                    <div className={MYS.CommentItemBox}>
                                        {IsLoadingcmt &&
                                            <div className={MYS.CommentItem}>
                                                <div className={MYS.CommentItemA}>
                                                    <Skeleton variant="circular">
                                                        <Avatar />
                                                    </Skeleton>
                                                </div>
                                                <div className={MYS.CommentItemB}>
                                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} animation="wave" width={120} />

                                                    <Skeleton variant="text" sx={{ fontSize: '0.7rem' }} animation="wave" width={200} />
                                                    <div style={{ height: '10px' }}> </div>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} animation="wave" width={80} />
                                                </div>

                                            </div>
                                        }
                                        {!IsLoadingcmt &&
                                            <div>
                                                {CommentList.map((item, index) => {
                                                    return <div className={MYS.CommentItem} key={index}>
                                                        <div className={MYS.CommentItemA}>
                                                            <Avatar alt={item.by} src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
                                                        </div>
                                                        <div className={MYS.CommentItemB}>
                                                            <span>{item.by}</span>

                                                            <small>{item.cmt}</small>
                                                            <div style={{ height: '10px' }}> </div>
                                                            <small style={{ fontSize: '8px' }}>{item.date}</small>
                                                        </div>

                                                    </div>
                                                }

                                                )}
                                            </div>
                                        }
                                    </div>

                                    {IsLoadingcmt &&
                                                <div>
                                                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} animation="wave" width={'100%'} />
                                                </div>

                                            }
                                            {!IsLoadingcmt &&
                                                 <div className={MYS.AddCommentboxWatch}>
                                                 <div className={MYS.AddCommentboxMain}>
                                                     <div className={MYS.AddCommentboxA}>
                                                         <Avatar
                                                             alt="Remy Sharp"
                                                             src="/static/images/avatar/1.jpg"
                                                             sx={{ width: 40, height: 40 }}
                                                         />
                                                         <form onSubmit={Addcmt}>
         
                                                             <div className={MYS.Cmtinput}>
                                                                 <input type='text' placeholder={`Post Comments as ${Contextdata.Data.name}`}
                                                                     required
                                                                     value={CmtText}
                                                                     onInput={e => setCmtText(e.target.value)} />
                                                             </div>
         
                                                         </form>
         
         
         
                                                     </div>
         
         
                                                     <div className={MYS.AddCommentboxB}>
                                                         {IsLoadingcmt &&
                                                             <Skeleton variant="rounded" animation="wave" width={30} height={30} />
                                                         }
                                                         {!IsLoadingcmt &&
                                                             <IconButton aria-label="cart" onClick={Addcmt}>
                                                                 <StyledBadge color="secondary" >
                                                                     <LuArrowRight />
                                                                 </StyledBadge>
                                                             </IconButton>
                                                         }
         
                                                     </div>
         
         
                                                 </div>
         
                                             </div>

                                            }
                                  




                                </div>
                            </div>
                        </div>

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
