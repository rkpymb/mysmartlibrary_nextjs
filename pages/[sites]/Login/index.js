import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/router'
import Head from 'next/head'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'

import TextField from '@mui/material/TextField';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MediaFilesUrl, MediaFilesFolder, CryptoJSKEY } from '/Data/config'
import WebsiteData from '../../../src/components/Parts/StudyCenter/WebsiteData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [usermobile, setUsermobile] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [OtpText, setOtpText] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [mobilebox, setMobilebox] = useState(true);
    const [Otpbox, setOtpbox] = useState(false);
    const [RegBox, setRegBox] = useState(false);


    useEffect(() => {
        setIsalert(false)
    }, [usermobile,FullName,Email,OtpText,]);

    useEffect(() => {
        if (Contextdata.WebData) {
            if (Contextdata.IsLogin == true) {
                
                router.push(`/${Contextdata.WebData.webid}`);
            }else{
                Contextdata.ChangeMainLoader(false);
                setLoading(false);
            }
        }
    }, [Contextdata.WebData, Contextdata.IsLogin]);

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


    const CheckMob = async (e) => {
        e.preventDefault();
        if (usermobile.length == 10) {
            setLoadingBtn(true)

            const sendUM = { mobile: usermobile, webid: Contextdata.UserBranchData.WebData.webid }
            const data = await fetch("/api/V2/auth/CheckMobile", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD)
                    setTimeout(function () {
                        if (parsed.ReqD.SignUp) {
                            setMobilebox(false);
                            setRegBox(true);
                        }

                        if (parsed.ReqD.ShowOtp) {
                            setMobilebox(false);
                            setOtpbox(true);
                        }

                        if (parsed.ReqD.error) {
                            alert(parsed.ReqD.error)
                        }
                        setLoadingBtn(false);
                    }, 2000);
                })

        } else {
            setIsalert(true);
            notify('Invalid Mobile Number')
        }


    }
    const CreateAccount = async (e) => {
        e.preventDefault();
        if (usermobile.length == 10 && FullName !== '' && Email !== '') {
            setLoadingBtn(true)

            const sendUM = {
                webid: Contextdata.UserBranchData.WebData.webid,
                name: FullName,
                mobile: usermobile,
                email: Email,
            }
            const data = await fetch("/api/V2/auth/CreateAccount", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD)
                    setTimeout(function () {
                        if (parsed.ReqD.ShowOtp) {
                            setMobilebox(false);
                            setRegBox(false);
                            setOtpbox(true);
                        }
                        if (parsed.ReqD.error) {
                            alert(parsed.ReqD.error)
                        }
                        setLoadingBtn(false);
                    }, 2000);
                })

        } else {
            setIsalert(true);
            notify('all failed are required')
        }


    }

    const verifyOTPBTN = async (e) => {
        e.preventDefault();
        if (usermobile.length == 10 && OtpText !== '') {
            setLoadingBtn(true)
            const sendUM = {

                webid: Contextdata.WebData.webid,
                otp: OtpText,
                mobile: usermobile,

            }
            const data = await fetch("/api/V2/auth/verifyOtp", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setTimeout(function () {
                        if (parsed.ReqD.token && parsed.ReqD.OtpStatus == true) {
                            const newToken = parsed.ReqD.token;

                            document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;


                            notify('😀Login Successful')
                            Contextdata.CheckUSerLogin()
                            setTimeout(function () {
                                router.push(`/${Contextdata.WebData.webid}`);
                            }, 1000);
                        } else {
                            setLoadingBtn(false);
                        }
                        if (parsed.ReqD.error) {
                            notify(parsed.ReqD.error)
                            setLoadingBtn(false);
                        }

                    }, 2000);
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
                <title>Login / Sign up</title>
            </Head>
            <WebsiteData />

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
            {!Loading && !Contextdata.IsLogin &&
                <div className={Mstyles.LoginFull}>
                    <div className={Mstyles.LoginBox}>

                        {/* mobile number box */}

                        {mobilebox && (
                            <div className={Mstyles.LoginBoxItem}>
                                <div className={Mstyles.logomainBox}>
                                    <div style={{ height: '10px' }}> </div>
                                    <div className={Mstyles.logomain}>
                                        <img src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.WebData.WebData.Logo}`} alt='logo' />
                                    </div>
                                    <div style={{ height: '10px' }}> </div>
                                    <div><h3 style={{ margin: 0 }}>Log in to your Account </h3>
                                        <small>Enter your Phone number to continue OTP will be sent on this number for verfification</small>
                                    </div>
                                    <form onSubmit={CheckMob}>
                                        <div className={Mstyles.LoginBox_input}>

                                            <TextField
                                                required
                                                label="Enter Mobile Number"
                                                fullWidth
                                                value={usermobile}

                                                onInput={e => setUsermobile(e.target.value)}
                                                type="number"
                                            />
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
                                        onClick={CheckMob}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
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
                        {RegBox && (
                            <div className={Mstyles.LoginBoxItem}>
                                <div className={Mstyles.logomainBox}>
                                    <div style={{ height: '10px' }}> </div>
                                    <div className={Mstyles.logomain}>
                                        <img src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.WebData.WebData.Logo}`} alt='logo' />
                                    </div>
                                    <div style={{ height: '10px' }}> </div>
                                    <div><h3 style={{ margin: 0 }}>Create your Account </h3>
                                        <small>Please Enter required details to create your Account.</small>
                                    </div>
                                    <form onSubmit={CreateAccount}>
                                        <div className={Mstyles.LoginBox_input}>

                                            <TextField
                                                required
                                                label="Enter Mobile Number"
                                                fullWidth
                                                value={usermobile}

                                                onInput={e => setUsermobile(e.target.value)}
                                                type="number"
                                            />
                                        </div>
                                        <div className={Mstyles.LoginBox_input}>

                                            <TextField
                                                required
                                                label="Full Name"
                                                fullWidth
                                                value={FullName}

                                                onInput={e => setFullName(e.target.value)}

                                            />
                                        </div>
                                        <div className={Mstyles.LoginBox_input}>

                                            <TextField
                                                required
                                                label="Email Address"
                                                fullWidth
                                                value={Email}

                                                onInput={e => setEmail(e.target.value)}

                                            />
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
                                        onClick={CreateAccount}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Create Account</span>
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

                                <div className={Mstyles.logomainBox}>

                                    <div style={{ height: '10px' }}> </div>

                                    <div><h3>Enter OTP </h3>
                                        <span>OTP Succesfully Sent on +91{usermobile}</span> <span style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} onClick={ShowMobile}><FiEdit /></span>
                                    </div>
                                    <form onSubmit={verifyOTPBTN}>
                                        <div className={Mstyles.LoginBox_input}>

                                            <TextField
                                                required
                                                label="Enter OTP"
                                                fullWidth
                                                value={OtpText}

                                                onInput={e => setOtpText(e.target.value)}
                                                type="number"
                                            />
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
                                        loading={LoadingBtn}
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
            }




        </>
    )
}

export default Login