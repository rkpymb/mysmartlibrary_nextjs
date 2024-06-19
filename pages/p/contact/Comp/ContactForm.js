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

import Lottie from 'react-lottie'

import * as animationData from '/Data/Lottie/formdone.json'

import LoadingButton from '@mui/lab/LoadingButton';

const ContactForm = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [FormDone, setFormDone] = useState(false);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [MobileNumber, setMobileNumber] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Message, setMessage] = useState('');


    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }



    const SendEnq = async (e) => {
        const webid = Contextdata.UserBranchData.WebData.webid
        const Branchcode = Contextdata.UserBranchData.BranchCode

        e.preventDefault();
        if (MobileNumber.length > 9 && FullName !== '' && Email !== '' && Message !== '') {
            setLoadingBtn(true)

            const sendUM = {
                webid:webid,
                Branchcode:Branchcode,
                FullName: FullName,
                MobileNumber: MobileNumber,
              
                Email: Email,
                Message: Message,
              

            }
            const data = await fetch("/api/V3/Library/CreateEnq", {
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
                    if (parsed.ReqD.done) {
                        setFormDone(true)
                    }
                    if (parsed.ReqD.error) {
                        alert('Something went wrong')
                    }
                    setTimeout(function () {
                      
                        setLoadingBtn(false);
                    }, 2000);
                })

        } else {

            alert('all failed are required')
        }


    }


    return (
        <div>
            {FormDone ? <div className={Mstyles.CformItem}>
                <div className={Mstyles.Formdone}>
                    <Lottie options={defaultOptions}
                        height={null}
                        width={'100%'}
                        isStopped={false}
                        isPaused={false} />
                </div>

            </div> :
                 <div className={Mstyles.CformItem}>
                 <div>
                     <div><h3 style={{ margin: 0 }}>Send Enquiry </h3>
                         <small>Send us your enquiry we will be get back to you.</small>
                     </div>
                     <form onSubmit={SendEnq}>
                         <div className={Mstyles.LoginBox_input}>

                             <TextField
                                 required
                                 label="Enter Mobile Number"
                                 fullWidth
                                 value={MobileNumber}

                                 onInput={e => setMobileNumber(e.target.value)}
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
                         <div className={Mstyles.LoginBox_input}>

                             <TextField
                                 required
                                 label="Message"
                                 fullWidth
                                 value={Message}
                                 onInput={e => setMessage(e.target.value)}

                             />
                         </div>

                     </form>
                     <div style={{ height: '20px' }}> </div>

                     <div style={{ height: '10px' }}> </div>

                     <LoadingButton
                         fullWidth
                         onClick={SendEnq}
                         endIcon={<FiChevronRight />}
                         loading={LoadingBtn}
                         loadingPosition="end"
                         variant="contained"
                     >
                         <span>Send Enquiry</span>
                     </LoadingButton>



                 </div>
             </div>
            }





        </div>
    )
}

export default ContactForm