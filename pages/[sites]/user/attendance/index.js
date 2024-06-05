import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Dialog from '@mui/material/Dialog';

import QrReader from 'react-qr-scanner'

import Sheet from 'react-modal-sheet';
import Slide from '@mui/material/Slide';
import Atthistory from './Atthistory'
import MsgBoxtBtn from '/src/components/Parts/StudyCenter/Extra/MsgBoxtBtn';


import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';


import Badge from '@mui/material/Badge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";


import Lottie from 'react-lottie'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';

import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'


import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, AppName, DomainURL } from '/Data/config'

import * as animationData from '/Data/Lottie/paymentdone.json'

import * as attdone from '/Data/Lottie/attdone.json'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
   
`
);

function Overview() {
    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()

    const [LoadingMarkAtt, setLoadingMarkAtt] = useState(false);

    const [Loading, setLoading] = useState(true);
    const [Attmodal, setAttmodal] = useState(false);
    const [DoneAtt, setDoneAtt] = useState(false);
    const [QRScaner, setQRScaner] = useState(false);
    const [ShowMainAtt, setShowMainAtt] = useState(true);
    const [Attdata, setAttdata] = useState(null);
    const [AttText, setAttText] = useState('___________');

    const [TodayAtt, setTodayAtt] = useState([]);
    const [CurrentLocation, setCurrentLocation] = useState(null);


    const [delay, setDelay] = useState(100);
    const [result, setResult] = useState('Scan Libary Center QR Code');
    const [QRtext, setQRtext] = useState('Scan Libary Center QR Code');

    const handleScan = (data) => {
        if (data !== null) {
            console.log(data.text)
            const webid = Contextdata.UserBranchData.WebData.webid

            if (data.text === `${DomainURL}${webid}`) {
                setQRScaner(false)
                setShowMainAtt(true)

                MarkLBPresentAtt()
            } else {
                alert('Invalid QR Code');

            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };


    const notify = (T) => toast(T, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const handleClose = () => {
        setShwoSeatsModal(false);

    };


    const handleClickOpen = () => {
        setShwoSeatsModal(true);
    };

    const GetTodayAttt = async () => {
        const datasend = {
            d: 1


        }
        const data = fetch("/api/Users/MyLBPassListActiveOnly", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datasend)
        }).then((a) => {
            return a.json();
        })
            .then((Parsed) => {
                console.log(Parsed.ReqData.Mypasslist)
                setTodayAtt(Parsed.ReqData.Mypasslist)
                setLoading(false)
                setAttmodal(false)
                


            })
    }




    useEffect(() => {
        Locateuser()
        GetTodayAttt()



    }, []);
    useEffect(() => {
        setShowMainAtt(true)
        setQRScaner(false)
        setLoadingMarkAtt(false)
        setDoneAtt(false)
    }, [Attmodal]);





    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const attdoneLottie = {
        loop: true,
        autoplay: true,
        animationData: attdone,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }


    const Markatt = async (e) => {
        console.log(e)
        setAttdata(e)
        setAttmodal(true)

    }
    const FinalMarkAtt = async (Attype) => {
        setAttText(Attype)
        if (Attype == 'Absent') {
            MarkLBAbsent()
        }
        if (Attype == 'Present') {
            setShowMainAtt(false)
            setQRScaner(true)
        }

    }

    const MarkLBAbsent = async () => {
        if (Attdata !== null &&  CurrentLocation !==null) {
            setLoadingMarkAtt(true)
            const datasend = {
                Orderid: Attdata.Orderid,
                CurrentLocation:CurrentLocation
            }


            const data = fetch("/api/Users/MarkLBAbsent", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datasend)
            }).then((a) => {
                return a.json();
            })
                .then((Parsed) => {
                    console.log(Parsed)
                    if (Parsed.ReqData) {
                        if (Parsed.ReqData.done) {
                            setShowMainAtt(false)
                            setDoneAtt(true)
                            setLoadingMarkAtt(false)

                            setTimeout(function () {
                                GetTodayAttt()

                            }, 3000);

                        }else{
                            alert(Parsed.ReqData.error)
                            setLoadingMarkAtt(false)
                        }
                        
                    } else {
                        alert('Something went wrong')
                        setLoadingMarkAtt(false)


                    }

                })

        }

    }
    const MarkLBPresentAtt = async () => {
        if (Attdata !== null && CurrentLocation !==null) {
            setLoadingMarkAtt(true)
            const datasend = {
                Orderid: Attdata.Orderid,
                CurrentLocation:CurrentLocation
            }


            const data = fetch("/api/Users/MarkLBPresentAtt", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datasend)
            }).then((a) => {
                return a.json();
            })
                .then((Parsed) => {
                    console.log(Parsed)
                    if (Parsed.ReqData) {
                        if (Parsed.ReqData.done) {
                            setShowMainAtt(false)
                            setDoneAtt(true)
                            setLoadingMarkAtt(false)

                            setTimeout(function () {
                                GetTodayAttt()

                            }, 3000);

                        }else{
                            alert(Parsed.ReqData.error)
                            setLoadingMarkAtt(false)
                        }
                        
                    } else {
                        alert('Something went wrong')
                        setLoadingMarkAtt(false)


                    }


                })

        }

    }


    const Locateuser = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    
                    const SeLocData = {
                        lat: latitude,
                        lng: longitude,
                    }
                    setCurrentLocation(SeLocData)
                   
                   console.log('SeLocData')
                   console.log(SeLocData)

                },
                error => {
                    RetryLocate()
                    console.log('Error getting user location:', error);
                    
                }
            );
        } else {
            RetryLocate()
           
            console.log('Geolocation is not supported by this browser.');
        }
    }

    const RetryLocate = () => {
      
        Locateuser()

    };

    return (
        <OverviewWrapper>
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>
            <NavbarTitle Title={'My Attendance'} />

            <div className={Mstyles.Minh100vh}>

                <div className={Mstyles.MboxSmall}>
                    <div className={Mstyles.OnlyDesktop}>
                        <div style={{ height: '20px' }}></div>
                    </div>
                    <div className={Mstyles.TodayAtbox}>
                        <div>
                            {!Loading ?
                                <div>
                                    {TodayAtt.length > 0 ?
                                        <div className={Mstyles.TodayAtboxA}>
                                            <div className={Mstyles.BoxTitle} >
                                                <span>Today's <span className={Mstyles.primaryColor}>Attendance</span></span>
                                                <small>Mark and manage your daily Attendance here </small>
                                            </div>

                                            <div>
                                                <div className={Mstyles.TodayAttGrid}>
                                                    {TodayAtt.map((item) => {
                                                        return <div className={Mstyles.TodayAttItem} key={item.id} >
                                                            <div className={Mstyles.attitem}>
                                                                <div className={Mstyles.attitemA}>
                                                                    <div className={Mstyles.attitemimg}>
                                                                        <Image
                                                                            src={item.isMarked == true ? '/img/check.png' : '/img/info.png'}
                                                                            alt="image"
                                                                            layout="responsive"
                                                                            placeholder='blur'
                                                                            width={50}
                                                                            height={50}
                                                                            quality={100}
                                                                            blurDataURL={blurredImageData}

                                                                        />
                                                                    </div>
                                                                    <div className={Mstyles.StstatusText}>
                                                                        {item.isMarked == true ? <span>Marked</span> : <span>Pending</span>}

                                                                    </div>
                                                                </div>
                                                                <div className={Mstyles.attitemB}>
                                                                    <div className={Mstyles.attitemBText}>
                                                                        <div className={Mstyles.ShiftTitle}>
                                                                            <span> {item.ShiftData.title}</span>
                                                                        </div>
                                                                        <div className={Mstyles.ShiftTiming}>
                                                                            <span>{item.ShiftData.uptime} - {item.ShiftData.downtime}</span>
                                                                        </div>
                                                                        <div className={Mstyles.SeatTitle}>
                                                                            <span> {item.SeatData.title}</span>
                                                                        </div>

                                                                        <div className={Mstyles.Attbtn}>
                                                                            {item.isMarked == true ? <div className={Mstyles.markedatt}>Attendance Marked Succesfully 😍</div> : <LoadingButton
                                                                                onClick={() => Markatt(item)}
                                                                                fullWidth
                                                                                size='small'
                                                                                endIcon={<LuArrowRight />}
                                                                                loading={false}
                                                                                loadingPosition="end"
                                                                                variant="outlined"

                                                                            >
                                                                                <span>Mark Attendance</span>
                                                                            </LoadingButton>}

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    }

                                                    )}
                                                </div>
                                            </div>
                                        </div> :
                                        <div>
                                            <MsgBoxtBtn Title={`Your don't have any Active Subscriptios.`} Msg={`Please subscribe to a valid pass to mark your daily attendance`} Url={'/'} />
                                        </div>

                                    }

                                </div> :
                                <div style={{ padding: '5px' }}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'50%'} />

                                </div>


                            }

                        </div>

                        <Atthistory />




                    </div>


                </div>








            </div>

            <Sheet isOpen={Attmodal} onClose={() => setAttmodal(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        {Attdata !== null &&
                            <div className={Mstyles.Bottomsheetbox}>

                                {ShowMainAtt &&

                                    <div>
                                        <div className={Mstyles.PMTitle}>
                                            <span>Mark Today's Attendance</span>
                                        </div>
                                        <div style={{ height: '20px' }}> </div>
                                        <div className={Mstyles.AtttypeBox}>
                                            <div className={Mstyles.ShiftTitle}>
                                                <span> {Attdata.ShiftData.title}</span>
                                            </div>
                                            <div className={Mstyles.ShiftTiming}>
                                                <span>{Attdata.ShiftData.uptime} - {Attdata.ShiftData.downtime}</span>
                                            </div>
                                            <div className={Mstyles.SeatTitle}>
                                                <span> {Attdata.SeatData.title}</span>
                                            </div>
                                            <div className={Mstyles.Attmsg}>
                                                <span>I will be {AttText} today !</span>

                                            </div>

                                            <div className={Mstyles.AttbtnSelect}>
                                                <LoadingButton
                                                    onClick={() => FinalMarkAtt('Present',)}
                                                    fullWidth
                                                    size='small'
                                                    desabled={LoadingMarkAtt}
                                                    loading={LoadingMarkAtt}
                                                    loadingPosition="end"
                                                    variant="outlined"

                                                >
                                                    <span>Present</span>
                                                </LoadingButton>
                                                <div style={{ width: '20px' }}></div>
                                                <LoadingButton
                                                    onClick={() => FinalMarkAtt('Absent')}
                                                    fullWidth
                                                    size='small'
                                                    desabled={LoadingMarkAtt}
                                                    loading={LoadingMarkAtt}
                                                    loadingPosition="end"
                                                    variant="outlined"
                                                    style={{ color: 'red' }}

                                                >
                                                    <span>Absent</span>
                                                </LoadingButton>
                                            </div>

                                        </div>
                                    </div>

                                }
                                {DoneAtt &&

                                    <div>
                                        <div className={Mstyles.attdoneLottie} >

                                            <Lottie options={attdoneLottie}
                                                height={null}
                                                width={'100%'}
                                                isStopped={false}
                                                isPaused={false} />


                                        </div>
                                        <div className={Mstyles.PMTitle}>
                                            <span>Attendance Marked Succesfully ✅</span>
                                        </div>
                                        <div style={{ height: '20px' }}> </div>

                                    </div>

                                }
                                {QRScaner &&

                                    <div>
                                        <QrReader
                                            className={Mstyles.QrReader}
                                            delay={delay}

                                            // onError={handleError}
                                            onScan={handleScan}
                                        />
                                        <div style={{ textAlign: 'center' }}>{QRtext}</div>


                                    </div>

                                }


                            </div>
                        }

                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

            <div className={Mstyles.FDevider} ></div>
        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};


