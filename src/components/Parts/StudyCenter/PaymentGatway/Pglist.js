import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@mui/material/Dialog';

import Sheet from 'react-modal-sheet';
import Slide from '@mui/material/Slide';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { BiCheckCircle } from "react-icons/bi";
import { FiChevronRight, FiClock, FiPlus } from "react-icons/fi";

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

import LBPassList from '/src/components/Parts/StudyCenter/LBPassList'
import Footer from '/src/components/Parts/Footer'

import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, AppName } from '/Data/config'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const UpiConnector = ({OrderData}) => {
    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [PM, SetPM] = useState([]);
    const [Open, setOpen] = useState(false);
    const [PMData, setPMData] = useState({});

    const [CreateOrderLoader, setCreateOrderLoader] = useState(false);

    const GetPglist = async () => {

        const webid = Contextdata.UserBranchData.WebData.webid

        const sendUM = {

            webid: webid
        }
        const data = await fetch("/api/V3/Library/PMlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();


        })
            .then((parsedFinal) => {
              
                if (parsedFinal.ReqData.PM) {
                    SetPM(parsedFinal.ReqData.PM)
                    console.log(parsedFinal.ReqData.PM)
                    setOpen(true)

                }

            })
    }
    const UpdateOrderpg = async (OID,Pg) => {
        const sendUM = {
            Orderid: OID,
            PMData:Pg
        }
        const data = await fetch("/api/Users/UpdateOrderpg", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedFinal) => {
               if(parsedFinal.ReqData.done == true){ 
                const ODataFinal = parsedFinal.ReqData.ODataFinal
                initiatePayment(ODataFinal)
             
               }else{
                alert('Something went wrong')
                 
               setCreateOrderLoader(false)
               }

            })
    }


    const UPI_CONNECTOR = async (ODataFinal) => {
        const Credentials = ODataFinal.PMData.Credentials
        // Destructure necessary credentials
        const { secretkey, providor_id, apikey } = Credentials;

        // Define the data to be sent in the request body
        const requestData = {
            "providor_id": providor_id,
            "order_id": ODataFinal.Orderid,
            "amount": ODataFinal.amt,
            "customer_name": Contextdata.Data.name,
            "customer_mobile": Contextdata.Data.mobile,
            "customer_email": Contextdata.Data.email,
            "redirect_url": `http://localhost:3000/dritlibrary/orderstatus/${ODataFinal.Orderid}`,
            "Custom_data": { "Orderfor": "Library Order" },
        };

        try {
            // Send POST request to the endpoint
            const response = await fetch('https://api.upiconnector.online/qr/v1/order/create_order', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apikey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Check if request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse response data
            const responseData = await response.json();

            // Handle response data as needed
            console.log(responseData)
            if (responseData.success === true) {
               const RedirectURL = responseData.qr_data.payment_url
               router.push(RedirectURL)
               setCreateOrderLoader(false)
            } else {
                alert('Something went wrong, try another payment method')
                setCreateOrderLoader(false)
            }


        
        } catch (error) {
            console.error('Error:', error);
            setCreateOrderLoader(false)
            // Handle error as needed
        }
    }



    const initiatePayment = async (ODataFinal) => {
        if (PMData.PMModeID == "PM_1") {
            console.log('Pay using UPI Connector')
            UPI_CONNECTOR(ODataFinal)
        }


    }


    const HandlePM = async (Pg) => {
        // setCreateOrderLoader(true)
        setPMData(Pg)
        console.log(Pg)
        if (Pg.PMModeID == "PM_1") {
            console.log('UPI CONNECTOR')
            const OID = OrderData.Orderid
            UpdateOrderpg(OID,Pg)
        }
        if (Pg.PMModeID == "PM_0") {
            console.log('OFFLINE PAYMENT')
        }
       

    }

    useEffect(() => {
        console.log(OrderData)

        GetPglist()

    }, []);

    return (
        <div>
            <Sheet isOpen={Open} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className={Mstyles.Bottomsheetbox}>

                            <div className={Mstyles.PMTitle}>
                                <span>Choose Payment Method</span>
                            </div>
                            <div style={{ height: '20px' }}> </div>
                            <div>

                                <div className={Mstyles.PMGrid}>
                                    {PM.map((item) => {
                                        return <div key={item._id} className={Mstyles.PMItemMain} >
                                            <div className={Mstyles.PMItem} >
                                                <div className={Mstyles.PMItemA}>
                                                    <div className={Mstyles.PMItemAImg}>
                                                        <Image
                                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.PMData.Logo}`}
                                                            alt="image"
                                                            layout="responsive"
                                                            placeholder='blur'
                                                            width={50}
                                                            height={50}
                                                            quality={100}
                                                            blurDataURL={blurredImageData}
                                                            objectFit='center'


                                                        />

                                                    </div>
                                                    <div className={Mstyles.PMTypeText}>

                                                        <span>  {item.PMData.PMTitle}</span>
                                                        <small>  {item.PMData.PMType}</small>


                                                    </div>


                                                </div>
                                                <div className={Mstyles.PMItemB}>
                                                    <div className={Mstyles.ShiftitemB} style={{ margin: 5 }}>
                                                        <LoadingButton
                                                            fullWidth
                                                            size='small'
                                                            onClick={() => HandlePM(item)}
                                                            endIcon={<LuArrowRight />}
                                                            loading={CreateOrderLoader}
                                                            desabled={CreateOrderLoader}
                                                            loadingPosition="end"
                                                            variant="outlined"

                                                        >
                                                            Select
                                                        </LoadingButton>
                                                    </div>
                                                </div>


                                            </div>
                                            {item.PMData.PMType == "OFFLINE" ?
                                                <div className={Mstyles.OFFLINEMsg}>
                                                    <span>Note : This Payment method will hold your booking until payment made offline</span>
                                                </div> : null


                                            }
                                        </div>
                                    }

                                    )}
                                </div>
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    )
}

export default UpiConnector
