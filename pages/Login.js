import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/router'
import Head from 'next/head'
import CheckloginContext from '../context/auth/CheckloginContext'
import Mstyles from '../Styles/home.module.css'
import Lottie from 'react-lottie'
import TextField from '@mui/material/TextField';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { BASE_URL, AppName, CryptoJSKEY } from '../Data/config'
import * as animationData from '../Data/Lottie/loginone.json'
import * as animationData2 from '../Data/Lottie/AnimationOtp.json'
import * as animationData3 from '../Data/Lottie/AnimationOtp.json'
import CryptoJS from "crypto-js";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingButton from '@mui/lab/LoadingButton';
const Login = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [loading, setLoading] = React.useState(false);
    const [usermobile, setMob] = useState('');
    const [sot, setSot] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [mobilebox, setMobilebox] = useState(true);
    const [Otpbox, setOtpbox] = useState(false);
    const [UserType, setUserType] = useState('');

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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions3 = {
        loop: false,
        autoplay: true,
        animationData: animationData3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    useEffect(() => {
     
        if (Contextdata.IsLogin == true) {
            router.back();
        }
    });

    const handleChangeMob = () => {
        setIsalert(false);
        const mobA = document.querySelector('#userm').value
        if (mobA.length <= 10) {
            setMob(mobA)
        }

    }
    // On submit mobile
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usermobile.length == 10) {
            setLoading(true)
            const sendUM = { usermobile: usermobile }
            const data = await fetch("/api/V2/auth/ProcessMobile", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                   
                    if (parsed.ReqS == true) {
                        decryptData(parsed.RetD)

                    } else {
                        setLoading(false)
                        
                        notify('😒 Something Went Wrong please contact support')
                    }


                })

        } else {

            setIsalert(true);
            notify('Invalid Mobile Number')
        }


    }
    // decryptData mobile data //
    const decryptData = (e) => {
        const bytes = CryptoJS.AES.decrypt(e, CryptoJSKEY);
        const dataNew = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (dataNew.data.return == true) {
            setLoading(false)
            setUserType(dataNew.type)
            setMobilebox(false)
            setOtpbox(true)
            


        } else {
            notify('😒 Something Went Wrong please contact support')
        }


    };
    // On submit mobile //
    // Submit OTP button
    const handleChangeOTP = () => {
        setIsalert(false);
        const otpin = document.querySelector('#otpinput').value
        if (otpin.length <= 6) {
            setSot(otpin)
        }
    }

    const verifyOTPBTN = async (e) => {
        e.preventDefault();
        if (sot !== '') {
            setLoading(true)
            const sendUM = { usermobile: usermobile, EnterText: sot }
            const data = await fetch("/api/V2/auth/CheckMobileOTP", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();


            })
                .then((parsedFinal) => {
                    if (parsedFinal.ReqD.Ls == true) {
                        localStorage.setItem('Token', parsedFinal.ReqD.token)
                        notify('😀Login Successful')
                        setTimeout(function () {
                            router.back();
                        }, 2000);

                    } else {
                        setLoading(false)
                       
                        notify('😒 Invalid OTP')
                    }

                })


        } else {
           
            notify('🤦‍♀️ Please Enter OTP')

        }
    }



    const ShowMobile = async () => {
        setOtpbox(false)
        setMobilebox(true)
    }
    return (
        <>
            <Head>
               

            </Head>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />

            <div className={Mstyles.LoginFull}>
                <div className={Mstyles.LoginBox}>

                    {/* mobile number box */}

                    {mobilebox && (
                        <div className={Mstyles.LoginBoxItem}>

                            <div className={Mstyles.LoginBoxItemLottie}>
                                <Lottie options={defaultOptions}
                                    height={null}
                                    width={'100%'}

                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                            <div className={Mstyles.logomainBox}>
                                <div style={{ height: '10px' }}> </div>
                                <div className={Mstyles.logomain}>
                                    <img src='/img/mainlogo.svg' alt='logo' />
                                </div>
                                <div><h3>Log in to your Account </h3>
                                    <small>Enter your Phone number to continue OTP will be sent on this number for verfification</small>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField fullWidth label="Enter Mobile Number" id="userm" type="number" onChange={handleChangeMob} value={usermobile} />
                                    </div>
                                </form>

                                <div style={{ height: '20px' }}> </div>
                                {isalert && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                        <Alert severity="warning">Please enter correct Mobile Number</Alert>

                                    </Stack>
                                )}
                                <div style={{ height: '10px' }}> </div>

                                <LoadingButton
                                    fullWidth
                                    onClick={handleSubmit}
                                    endIcon={<FiChevronRight />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                >
                                    <span>Get OTP</span>
                                </LoadingButton>
                                <div style={{ height: '10px' }}> </div>

                                <div style={{ height: '5px' }}> </div>
                                <small>By signing up, you agree to our <span className={Mstyles.url}>Terms of use</span> and <span className={Mstyles.url}>Privacy Policy</span></small>
                            </div>
                        </div>
                    )}
                    {/* Otp box */}
                    {Otpbox && (
                        <div className={Mstyles.LoginBoxItem}>
                            <div className={Mstyles.LoginBoxItemLottie}>
                                <Lottie options={defaultOptions2}
                                    height={null}
                                    width={'100%'}

                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                            <div className={Mstyles.logomainBox}>

                                <div style={{ height: '10px' }}> </div>

                                <div><h3>Enter OTP </h3>
                                    <span>OTP Succesfully Sent on +91{usermobile}</span> <span style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} onClick={ShowMobile}><FiEdit /></span>
                                </div>
                                <form onSubmit={verifyOTPBTN}>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField fullWidth label="Enter OTP" id="otpinput" type="number" onChange={handleChangeOTP} autoFocus />
                                    </div>
                                </form>

                                <div style={{ height: '20px' }}> </div>
                                {isalert && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                        <Alert severity="warning">Invalid OTP</Alert>

                                    </Stack>
                                )}
                                <div style={{ height: '20px' }}> </div>

                                <LoadingButton
                                    fullWidth
                                    onClick={verifyOTPBTN}
                                    endIcon={<FiChevronRight />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                >
                                    <span>Verify OTP</span>
                                </LoadingButton>

                                <div style={{ height: '10px' }}> </div>

                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default Login