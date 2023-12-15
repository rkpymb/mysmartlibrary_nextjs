import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import { LuArrowRight } from "react-icons/lu";

import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';


import { MediaFilesUrl, MediaFilesFolder } from '../../Data/config'


import YtplayerLive from '../components/Player/YtplayerLive';

import {
    IconButton,

    styled,

} from '@mui/material';
import Avatar from '@mui/material/Avatar';

export async function getServerSideProps(context) {
    const Videoid = context.query.pageno[0];
    return {
        props: { Videoid },
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

function DashboardCrypto(Videoid) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [VideoData, setVideoData] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const [IsLoadingcmt, setIsLoadingcmt] = useState(true);
    const [IsLiked, setIsLiked] = useState(false);
    const [LikedList, setLikedList] = useState([]);
    const [CommentList, setCommentList] = useState([]);
    const [VideoStatus, setVideoStatus] = useState();
    const [Title, setTitle] = useState('');
    const [CmtText, setCmtText] = useState('');
    const [Descriptions, setDescriptions] = useState('');
    const [Btnloading, setBtnloading] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [VideoUrlid, setVideoUrlid] = useState('');


    useEffect(() => {
        GetVideoData()
    }, [router.query])


    const GetVideoData = async () => {
        const sendUM = { Videoid: Videoid.Videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/GetLiveData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
                if (parsed.ReqData.error) {
                    alert('Invalid video id')
                } else {

                    setVideoData(parsed.ReqData.videodata)
                    setDescriptions(parsed.ReqData.videodata.details)
                    setTitle(parsed.ReqData.videodata.title)
                    Contextdata.ChangeMainTitle(parsed.ReqData.videodata.title)
                    setVideoStatus(parsed.ReqData.videodata.isActive)
                    setVideoUrlid(parsed.ReqData.videodata.videoid)

                    GetLikesData()

                    setIsLoading(false)
                }
            })
    }
    const GetLikesData = async () => {
        const sendUM = { Videoid: Videoid.Videoid, JwtToken: Contextdata.JwtToken }
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
        const sendUM = { Videoid: Videoid.Videoid, JwtToken: Contextdata.JwtToken }
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

    const LikeVideo = async () => {
        setIsLiked(true)
        const sendUM = { Videoid: Videoid.Videoid, JwtToken: Contextdata.JwtToken }
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
                const sendUM = { Videoid: Videoid.Videoid, cmt: CmtText, JwtToken: Contextdata.JwtToken }
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
    const Allok = async (e) => {


        setTimeout(function () {
            setIsLoadingcmt(false)
        }, 2000);
    }





    return (
        <>
            {/* <Head>
                <title>Video : {VideoData.title}</title>
            </Head> */}

            <div className={MYS.VideoPlayerBox}>
                <div className={MYS.VideoPlayerBoxA}>
                    {IsLoading &&
                        <div>
                            <Skeleton variant="rounded" animation="wave" width={'100%'} height={500} />
                        </div>

                    }
                    {!IsLoading &&
                        <div>
                            {VideoStatus == 2 &&
                                <div>  <YtplayerLive Videoid={VideoUrlid} /> </div>
                            }
                            {VideoStatus !== 2 &&
                                <div className={MYS.VideoMasgbox}>  This video is not available </div>
                            }

                        </div>

                    }
                    <div className={MYS.VideoPlayermenuBox}>
                        <div className={MYS.VideoPlayermenuBoxA}>
                            {IsLoading &&
                                <div className={MYS.VideoPlayerTitlebox}>
                                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'80%'} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'30%'} />
                                </div>

                            }

                            {!IsLoading &&
                                <div className={MYS.VideoPlayerTitlebox}>
                                    <span>{VideoData.title}</span>
                                    <small>Published on :{VideoData.date}</small>
                                </div>

                            }


                        </div>


                        {IsLoading &&
                            <div className={MYS.loaderLikeflex}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={50} />
                                <div style={{ width: '10px' }}></div>
                                <Skeleton variant="rounded" animation="wave" width={30} height={30} />
                            </div>

                        }


                        {!IsLoading &&
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

                </div>
                <div className={MYS.VideoPlayerBoxB}>
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


                        <div className={MYS.AddCommentbox}>
                            <div className={MYS.AddCommentboxA}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 40, height: 40 }}
                                />
                                <form onSubmit={Addcmt}>
                                    <div className={MYS.Cmtinput}>
                                        <input type='text' placeholder='Write your Comment'
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

                </div>
            </div>


            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
