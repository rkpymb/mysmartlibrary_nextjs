import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import {
    Box,
    Card,

    styled
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Head from 'next/head';
import Bookingmodal from '../../components/Library/Bookingmodal'
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Badge from '@mui/material/Badge';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import { LuArrowLeft, LuCheckCircle } from "react-icons/lu";
import { BiCheckCircle } from "react-icons/bi";
import { FiX, FiChevronRight, FiClock, FiPlus } from "react-icons/fi";
import * as animationData from '/Data/Lottie/doneanimation.json'
import Lottie from 'react-lottie'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter, useParams } from 'next/router'

import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


import { MediaFilesUrl, MediaFilesFolder, AppName } from '../../../Data/config'
export async function getServerSideProps(context) {
    const passid = context.query.pageno[0];
    const Branchcode = context.query.pageno[1];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passid: passid, Branchcode: Branchcode, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/LBPassData`, requestOptions);
    const PassD = await response.json();
    return {
        props: { PassD }, // will be passed to the page component as props
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

function Overview({ PassD }) {
    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [LoadingSeats, setLoadingSeats] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [Alldone, setAlldone] = useState(false);
    const [ShowPaybtn, setShowPaybtn] = useState(false);
    const [AddonLoading, setAddonLoading] = useState(true);
    const [ShwoSeatsModal, setShwoSeatsModal] = useState(false);
    const [Step, setStep] = useState(1);
    const [DataMian, setDataMian] = useState({});
    const [ShiftsList, setShiftsList] = useState([]);
    const [Seats, setSeats] = useState([]);
    const [Addons, setAddons] = useState([]);
    const [CurrentShift, setCurrentShift] = useState({});
    const [CurrentSeat, setCurrentSeat] = useState({});
    const [Totalamt, setTotalamt] = useState();
    const [selectedItems, setSelectedItems] = useState([]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }


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
        setShowPaybtn(false);
        setAddonLoading(true)
        setSelectedItems([])
    };


    const handleClickOpen = () => {
        setShwoSeatsModal(true);
    };

    const LibraryShiftbyPassid = async (e) => {
        const sendUM = { Branchcode: PassD.PassData[0].Branchcode }
        const data = await fetch("/api/V3/Library/LibraryShift", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();


        })
            .then((parsedFinal) => {
                if (parsedFinal.ReqD.Shift) {
                    setShiftsList(parsedFinal.ReqD.Shift)

                    setLoading(false)
                }

            })
    }
    const getAddons = async () => {
        const sendUM = { JwtToken: Contextdata.JwtToken, Branchcode: PassD.PassData[0].Branchcode }
        const data = await fetch("/api/V3/Library/Lbaddonslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();


        })
            .then((parsedFinal) => {
                setShowPaybtn(true)
                if (parsedFinal.ReqData.Addons.length > 0) {
                    setAddons(parsedFinal.ReqData.Addons)
                    console.log(parsedFinal.ReqData.Addons)
                    setAddonLoading(false)
                }

            })
    }


    const Showseats = async (e) => {
        setCurrentShift(e)
        console.log(e.Shiftid)
        const sendUser = { JwtToken: Contextdata.JwtToken, Branchcode: PassD.PassData[0].Branchcode,Shiftid:e.Shiftid }
        const data = fetch("/api/V3/Library/GetLBSeatsbyBranchCode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        }).then((a) => {
            return a.json();
        })
            .then((ParseSeats) => {

                if (ParseSeats.ReqData.SeatsList) {
                    setSeats(ParseSeats.ReqData.SeatsList)
                    handleClickOpen(true)
                    setLoadingSeats(false)
                }
            })
    }
    const SeatSeleted = async (e) => {
        setCurrentSeat(e)
        setSelectedItems([])
        setTotalamt(CurrentShift.sprice * DataMian.Validity)
        getAddons()
    }

    const CreateOrderBtn = async () => {
        setLoadingBtn(true)
        const datasend = { JwtToken: Contextdata.JwtToken, PassData: PassD.PassData[0], Addons: selectedItems, Sift: CurrentShift, Seat: CurrentSeat }

        const data = fetch("/api/V3/Library/LibraryCreateOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datasend)
        }).then((a) => {
            return a.json();
        })
            .then((OrderParse) => {

                if (OrderParse.ReqData.done) {
                    initiatePayment(OrderParse.ReqData.done)
                } else {
                    setLoadingBtn(false)
                    alert('Something Went Wrong')

                }

            })
    }

    useEffect(() => {

        if (PassD.PassData) {

            setDataMian(PassD.PassData[0])
            LibraryShiftbyPassid()


        } else {
            alert('Something went wrong')
        }


    }, []);

    const handleToggleSelection = (product) => {
        const isSelected = selectedItems.some((item) => item._id === product._id);
        if (isSelected) {
            setTotalamt(parseInt(Totalamt) - parseInt(product.sprice));
            setSelectedItems(selectedItems.filter((item) => item._id !== product._id));
        } else {
            setTotalamt(parseInt(Totalamt) + parseInt(product.sprice));
            setSelectedItems([...selectedItems, product]);
        }
    };


    // Paytm data

    const initiatePayment = async (e) => {
        console.log(e)
        
        setLoadingBtn(true)
        let ODRERID = e.Orderid
        let amount = e.amt

        // Get Transcation Token
        const sendUser = { ODRERID: ODRERID, amount: amount, custId: Contextdata.Data.mobile }
        const a = await fetch("/api/Paytm/Library/pretransaction", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        })

        let txnData = await a.json()
        const txnToken = txnData.txnToken
        setShwoSeatsModal(false)

        // Get Transcation Token end
        var config = {
            "root": "",
            "data": {
                "orderId": ODRERID,
                "token": txnToken,
                "tokenType": "TXN_TOKEN",
                "amount": amount /* update amount */
            },
            "merchant": {
                "redirect": false
            },
            "handler": {
                "notifyMerchant":
                    function notifyMerchant(eventName, data) {
                        setLoadingBtn(false)
                       
                    },
                "transactionStatus":
                    function transactionStatus(paymentStatus) {
                        UpdateOrder(paymentStatus)
                    },


            },



        };

        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {

            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("Error => ", error);
        });
    }

    // Paytm

    const UpdateOrder = async (DataRec) => {
        setLoadingBtn(true)
        const sendData = { JwtToken: Contextdata.JwtToken, DataRec: DataRec }
        const data = fetch("/api/Paytm//Library/posttransaction", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then((a) => {
            return a.json();
        })
            .then((parsedUpdated) => {
                setLoadingBtn(false)
                var element = document.getElementById("paytm-checkoutjs");
                if (element) {
                    element.style.display = "none";
                }
                if (parsedUpdated.ReqData.done) {
                    notify('😎 Subscription Successfully Added to your Account')
                    setShowPaybtn(false)
                    setAlldone(true)

                } else {
                    notify(parsedUpdated.ReqData.message)

                }

            })


    }


    return (
        <OverviewWrapper>

            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />

                <script type="application/javascript" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/iykuMk16010130075351.js`} crossorigin="anonymous"></script>


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


            {Step == 1 &&
                <div className={Mstyles.PassContainerMain}>
                    <div className={Mstyles.PassContainer}>
                        <div className={Mstyles.PassContainerPadding}>
                            <div className={Mstyles.Passimagebox}>
                                <div className={Mstyles.PassimageboxA}>
                                    <Image
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${DataMian.img}`}
                                        alt="image"

                                        placeholder='blur'
                                        width={50}
                                        height={50}
                                        quality={100}
                                        blurDataURL={blurredImageData}

                                    />

                                </div>
                                <div className={Mstyles.PassimageboxB}>
                                    <h3>{DataMian.title}</h3>
                                    <div>
                                        <small>{DataMian.details}</small>
                                    </div>
                                    <div>
                                        <small style={{ fontWeight: 500 }}>Validity: {DataMian.Validity} Days</small>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontWeight: 500, fontSize: '12px', textAlign: 'center', padding: 10 }}>
                                <small >This Pass is only Valid for {DataMian.Branchcode}</small>
                            </div>


                        </div>
                        <div className={Mstyles.PassContainerPadding} style={{ backgroundColor: 'white' }}>
                            <div >
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ fontWeight: 600, fontSize: '12px', }}>  <span>Avaliable Shifts</span></div>
                                    <div style={{ marginTop: '10px' }}>
                                        {!Loading &&
                                            <div className={Mstyles.Shiftgrid}>
                                                {ShiftsList.map((item) => {
                                                    return <div className={Mstyles.Shiftitem} key={item._id} onClick={() => Showseats(item)} >
                                                        <div className={Mstyles.ShiftitemA}>
                                                            <div>  <span style={{ fontWeight: 600 }}>{item.title}</span></div>
                                                            <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>{item.uptime} - {item.downtime}</span></div>
                                                            <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>Price  <del>{item.mprice * DataMian.Validity}</del> <span style={{ fontWeight: 700 }}>₹{item.sprice * DataMian.Validity}</span> (for {DataMian.Validity} days)</span></div>
                                                        </div>
                                                        <div className={Mstyles.ShiftitemB}>
                                                            <LoadingButton
                                                                fullWidth
                                                                size='small'
                                                                endIcon={<FiChevronRight />}
                                                                loading={LoadingBtn}
                                                                loadingPosition="end"
                                                                variant="outlined"

                                                            >
                                                                <span>Book Now</span>
                                                            </LoadingButton>
                                                        </div>
                                                    </div>
                                                }

                                                )}
                                            </div>

                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={Mstyles.PassContainerPadding} style={{ backgroundColor: 'white', marginTop: '10px' }}>
                            <div >
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ fontWeight: 600, fontSize: '12px', }}>  <span>Subscription Benifits</span></div>
                                    <div>
                                        <small>{DataMian.details}</small>
                                    </div>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ fontWeight: 600, fontSize: '12px', }}>  <span>Terms and Conditions</span></div>
                                    <div>
                                        <small>{DataMian.details}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}></div>

                </div>
            }
            {Step == 2 &&
                <div className={Mstyles.PassContainerMain}>
                    <div className={Mstyles.PassContainer}>

                    </div>

                </div>
            }

            <React.Fragment>

                <Dialog
                    fullScreen
                    open={ShwoSeatsModal}
                    onClose={handleClose}
                    TransitionComponent={Transition}>
                    <div className={Mstyles.secndHeder}>
                        <div className={Mstyles.secndHederBox}>
                            <div>
                                <IconButton aria-label="cart" onClick={() => handleClose()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                            </div>
                            <div className={Mstyles.secndHederBoxB}>
                                <span>Choose Your Seat</span>
                                <div>
                                    <small>{CurrentShift.title}</small>
                                    <small style={{ color: '#99A3A4' }}>︱</small>
                                    <small>{CurrentShift.uptime} - {CurrentShift.downtime}</small>
                                    <small style={{ color: '#99A3A4' }}>︱</small>
                                    <small>₹{CurrentShift.sprice * DataMian.Validity} </small>
                                    <small style={{ color: '#99A3A4' }}>︱</small>

                                    <small>Validity : {DataMian.Validity} days </small>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={Mstyles.PassContainerMain}>
                        <div style={{ marginTop: '40px' }}> </div>
                        <div className={Mstyles.PassContainer}>
                            <div className={Mstyles.SeatBox} style={{ backgroundColor: 'White' }}>
                                <div style={{ height: '20px' }}> </div>
                                {!LoadingSeats &&
                                    <div className={Mstyles.SeatGrid}>
                                        {Seats.map((item) => {
                                            return <div className={ item.isActive === 3 ? Mstyles.SeatGridItem :Mstyles.SeatGridItemOccupied}
                                                key={item.SeatCode}
                                                onClick={() => item.isActive === 3 ? SeatSeleted(item) : null}
                                            >
                                                <span style={{ fontWeight: 500, fontSize: 10 }}>{item.SeatCode}</span>

                                            </div>
                                        }

                                        )}
                                    </div>

                                }
                                <div style={{ height: '20px' }}> </div>
                            </div>
                            <div style={{ height: '10px' }}> </div>
                            {!AddonLoading &&
                                <div className={Mstyles.SeatBox} style={{ backgroundColor: 'White' }}>
                                    <div style={{ fontWeight: 600, fontSize: '12px', }}>  <span>Avaliable Addons</span></div>

                                    <div style={{ marginTop: 10 }}>

                                        <div className={Mstyles.Shiftgrid}>
                                            {Addons.map((item) => {
                                                return <div className={Mstyles.Shiftitem} key={item._id}
                                                    onClick={() => handleToggleSelection(item)}

                                                >
                                                    <div className={Mstyles.ShiftitemA}>
                                                        <div>  <span style={{ fontWeight: 600 }}>{item.title}</span></div>

                                                        <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>Price  <del>{item.mprice}</del> <span style={{ fontWeight: 700 }}>₹{item.sprice}</span> </span></div>
                                                    </div>
                                                    <div className={Mstyles.ShiftitemB} style={{ margin: 5 }}>
                                                        <LoadingButton
                                                            fullWidth
                                                            size='small'
                                                            color={selectedItems.some((p) => p._id === item._id) ? 'error' : 'primary'}
                                                            endIcon={selectedItems.some((p) => p._id === item._id) ? <FiX /> : <FiPlus />}
                                                            loading={LoadingBtn}
                                                            loadingPosition="end"
                                                            variant="outlined"

                                                        >


                                                            {selectedItems.some((p) => p._id === item._id) ? 'Remove' : 'Add'}
                                                        </LoadingButton>
                                                    </div>
                                                </div>
                                            }

                                            )}
                                        </div>
                                    </div>
                                    <div style={{ height: '20px' }}> </div>
                                </div>
                            }


                        </div>
                    </div>



                </Dialog>
            </React.Fragment>


            <React.Fragment>

                <Dialog
                    fullScreen
                    open={Alldone}
                    onClose={handleClose}
                    TransitionComponent={Transition}>


                    <div style={{ backgroundColor: 'white' }}>
                        <Lottie options={defaultOptions}
                            height={null}
                            width={'80%'}
                            isStopped={false}
                            isPaused={false} />
                        <div style={{ padding: 20 , textAlign:'center'}}>
                            <h2 style={{margin:0}}>Subscription Added</h2>
                            <p>Subscription Succesfully Added to your Account</p>

                            <LoadingButton
                                fullWidth
                                endIcon={<FiChevronRight />}
                                loading={false}
                                loadingPosition="end"
                                variant="contained"

                            >
                                <span>Go to Home page</span>
                            </LoadingButton>
                        </div>

                    </div>



                </Dialog>
            </React.Fragment>
            {ShowPaybtn &&
                <div className={Mstyles.LbFooterStikey}>
                    <LoadingButton
                        fullWidth
                        endIcon={<FiChevronRight />}
                        loading={LoadingBtn}
                        loadingPosition="end"
                        variant="contained"
                        onClick={CreateOrderBtn}
                    >
                        <span>Pay ₹ {Totalamt}</span>
                    </LoadingButton>
                </div>
            }


        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
