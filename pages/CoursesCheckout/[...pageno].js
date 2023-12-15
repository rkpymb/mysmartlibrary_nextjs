import { useState, useEffect, useContext } from 'react';
import {
    Box,
    styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiClock } from "react-icons/fi";
import { LuArrowLeft } from "react-icons/lu";

import { MediaFilesUrl, MediaFilesFolder, AppName } from '../../Data/config'
import Head from 'next/head';

import Badge from '@mui/material/Badge';

import IconButton from '@mui/material/IconButton';
import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import CryptoJS from "crypto-js";

export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: DataSlug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/GetCoursedatabyid`, requestOptions);
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

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview({ CourseFullData, PAYTM_MID, PAYTM_HOST }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()

    const [Loading, setLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    
    const [DataMian, setDataMian] = useState(CourseFullData.CourseData[0]);
    const [UserData, setUserData] = useState();
    const [TotalDiscount, setTotalDiscount] = useState(0);
    const [OrderPrice, setOrderPrice] = useState(0);
    const [TotalAmt, setTotalAmt] = useState(0);
    const [CouponDiscount, setCouponDiscount] = useState(0);
    const [ProductDiscount, setProductDiscount] = useState(0);
    const [CouponApplied, setCouponApplied] = useState('N/A');
    const [OrderID, setOrderID] = useState('');

    const Contextdata = useContext(CheckloginContext)

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

    useEffect(() => {
        if (Contextdata.IsLogin == true) {
            if (CourseFullData.CourseData.length > 0) {
                setUserData(Contextdata.Data)

                const RandA = Math.floor(Math.random() * 100000) + 1;
                const RandB = Math.floor(Math.random() * 100) + 10;
              

                if (DataMian.isFree === false) {
                    setOrderID('DRITPC24' + RandA + RandB);
                    setTotalDiscount(parseInt(DataMian.mprice) - parseInt(DataMian.sprice))
                    setTotalAmt(parseInt(DataMian.sprice))
                    setOrderPrice(parseInt(DataMian.mprice))
                }

                if (DataMian.isFree === true) {
                    setOrderID('DRITFC24' + RandA + RandB);
                    setTotalDiscount(parseInt(DataMian.mprice))
                    setTotalAmt(0)
                    setOrderPrice(parseInt(DataMian.mprice))
                    setProductDiscount(DataMian.mprice)
                    setCouponDiscount(DataMian.mprice)
                    setCouponApplied('FREE')

                }
                setLoading(false)

            } else {
                alert('Something went wrong')
                router.push('/')
            }
        } else {
            router.push('/')
        }
    }, [Contextdata.IsLogin]);

    const CreateOrderBTN = async () => {
        if (Contextdata.IsLogin == true) {
            setLoadingBtn(true)
            const OrderData = {
                OrderID: OrderID,
                TotalAmt: TotalAmt,
                Discount: ProductDiscount,
                Coupon: CouponApplied,
                CouponDiscount: CouponDiscount,
                TotalDiscount: TotalDiscount,
                OrderTitle: DataMian.title,

            }
            const sendUser = { JwtToken: Contextdata.JwtToken, OrderData: OrderData, CourseData: DataMian }
            const CryptoJSKEY = 'XYZ'
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sendUser), CryptoJSKEY).toString();
            const SendFinalData = { encryptedData: encryptedData }
            const data = fetch("/api/V2/CourseOrders/FreeCheckout", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(SendFinalData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedIfAvail) => {

                    setTimeout(function () {
                        setLoadingBtn(false)
                        if (parsedIfAvail.ReqData.done) {

                            notify('😎 Free Course Successfully Added to your Learning Dashboard')
                            setTimeout(function () {
                                router.push('/MyCourses')
                            }, 2000);
                        } else {
                            notify(parsedIfAvail.ReqData.message)

                        }
                    }, 2000);


                })
        } else {
            router.push('/Login')
        }




    }
    const CreateOrderPaid = async () => {
        if (Contextdata.IsLogin == true) {
            setLoadingBtn(true)

            const OrderData = {
                OrderID: OrderID,
                TotalAmt: TotalAmt,
                Discount: ProductDiscount,
                Coupon: CouponApplied,
                CouponDiscount: CouponDiscount,
                TotalDiscount: TotalDiscount,
                OrderTitle: DataMian.title,

            }
            const sendUser = { JwtToken: Contextdata.JwtToken, CourseData: DataMian, OrderData: OrderData }
            const CryptoJSKEY = 'XYZ'
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sendUser), CryptoJSKEY).toString();
            const SendFinalData = { encryptedData: encryptedData }
            const data = fetch("/api/V2/CourseOrders/CreateCourseSalesOrder", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(SendFinalData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedIfAvail) => {

                    setTimeout(function () {

                        if (parsedIfAvail.ReqData.done) {
                            const CurrentOID = parsedIfAvail.ReqData.done
                            initiatePayment(CurrentOID)
                        } else {
                            setLoadingBtn(false)
                            notify(parsedIfAvail.ReqData.message)

                        }
                    }, 2000);


                })
        } else {
            router.push('/Login')
        }




    }
    const UpdateOrder = async (DataRec) => {
        const sendData = { JwtToken: Contextdata.JwtToken, DataRec: DataRec }
        const CryptoJSKEY = 'XYZ'
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sendData), CryptoJSKEY).toString();
        const SendFinalData = { encryptedData: encryptedData }
        const data = fetch("/api/Paytm//Course/posttransaction", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(SendFinalData)
        }).then((a) => {
            return a.json();
        })
            .then((parsedUpdated) => {
                var element = document.getElementById("paytm-checkoutjs");
                if (element) {
                    element.style.display = "none";
                }
                if (parsedUpdated.ReqData.done) {
                    notify('😎 Course Successfully Added to your Learning Dashboard')
                    setTimeout(function () {
                        router.push('/MyCourses')
                    }, 3000);
                } else {
                    notify(parsedUpdated.ReqData.message)
                    setTimeout(function () {
                        router.back()
                    }, 3000);
                }

            })


    }



    // Paytm

    const initiatePayment = async (e) => {
        console.log(e)
        setLoadingBtn(true)
        let ODRERID = e.Orderid
        let amount = e.amt

        // Get Transcation Token
        const sendUser = { ODRERID: ODRERID, amount: amount, custId: UserData.mobile }
        const a = await fetch("/api/Paytm/Course/pretransaction", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        })

        let txnData = await a.json()
        const txnToken = txnData.txnToken

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
                        // console.log("eventName =>", eventName);
                        // console.log("data =>", data);
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
    return (
        <OverviewWrapper>

            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />

                <script type="application/javascript" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/iykuMk16010130075351.js`} crossorigin="anonymous"></script>

                {/* <script type="application/javascript" src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/DXeYMu50879259209190.js`} crossorigin="anonymous"></script> */}


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
            <MainNavBarSecond CheckPComplete={false} />
            {!Loading &&

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
                                    <span>{DataMian && DataMian.title}</span>
                                </div>

                            </div>
                            <div className={Mstyles.secndHederBoxB}>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '51px' }}></div>


                </div>


            }
            {!Loading &&

                <div>
                    {DataMian && DataMian.isFree === true &&
                        <div>
                            <div style={{ minHeight: '20px' }}></div>
                            <div className={Mstyles.HeroBoxTwoTitle}>
                                <h1><span className={Mstyles.primaryColor}>Free</span> Checkout</h1>
                                <span>Please complete your order</span>
                            </div>
                            <div style={{ minHeight: '30px' }}></div>
                            <div className={Mstyles.CheckoutContainer}>
                                <div className={Mstyles.CheckoutContainerA}>
                                    <div className={Mstyles.FreeCheckoutBox}>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                Order Title
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <span>{DataMian.title}</span>
                                            </div>
                                        </div>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                <span>Order By</span>
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <div>
                                                    <span>{UserData.name}</span>
                                                </div>
                                                <div>
                                                    <span>{UserData.mobile}</span>
                                                </div>
                                                <div>
                                                    <span>{UserData.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Mstyles.OnlyDesktop}>
                                            <div style={{ minHeight: '20px' }}></div>
                                            {Contextdata.IsLogin &&
                                                <div className={Mstyles.OnlyDesktop}>
                                                    <div style={{ minHeight: '5px' }}></div>
                                                    <LoadingButton
                                                        fullWidth
                                                        onClick={CreateOrderBTN}
                                                        endIcon={<FiChevronRight />}
                                                        loading={LoadingBtn}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Confirm and Enroll</span>
                                                    </LoadingButton>

                                                    <div style={{ minHeight: '5px' }}></div>
                                                </div>

                                            }
                                         

                                        </div>

                                    </div>
                                </div>
                                <div className={Mstyles.CheckoutContainerB}>
                                    <img src={`${MediaFilesUrl}${MediaFilesFolder}/${DataMian.img}`} alt='img' width={'100%'} />

                                </div>
                            </div>

                        </div>
                    }

                  

                    {DataMian && DataMian.isFree === false &&

                        <div>
                            <div style={{ minHeight: '20px' }}></div>
                            <div className={Mstyles.HeroBoxTwoTitle}>
                                <h1><span className={Mstyles.primaryColor}>Course</span> Checkout</h1>
                                <span>Please complete your order</span>
                            </div>
                            <div style={{ minHeight: '30px' }}></div>
                            <div className={Mstyles.CheckoutContainer}>
                                <div className={Mstyles.CheckoutContainerA}>
                                    <div className={Mstyles.FreeCheckoutBox}>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                Order Title
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <span>{DataMian.title}</span>
                                            </div>
                                        </div>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                Order Price
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <span>₹ {OrderPrice}</span>
                                            </div>
                                        </div>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                Order Discount
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <span>₹ {TotalDiscount}</span>
                                            </div>
                                        </div>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                Total
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <b>₹ {DataMian.sprice}</b>
                                            </div>
                                        </div>
                                        <div className={Mstyles.CheckoutListItem}>
                                            <div className={Mstyles.CheckoutListItemTitle}>
                                                <span>Order By</span>
                                            </div>
                                            <div className={Mstyles.CheckoutListItemText}>
                                                <div>
                                                    <span>{UserData.name}</span>
                                                </div>
                                                <div>
                                                    <span>{UserData.mobile}</span>
                                                </div>
                                                <div>
                                                    <span>{UserData.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Mstyles.OnlyDesktop}>
                                            <div style={{ minHeight: '20px' }}></div>
                                            {Contextdata.IsLogin &&
                                                <div className={Mstyles.OnlyDesktop}>
                                                    <div style={{ minHeight: '5px' }}></div>

                                                    {/* <CoursePaytm /> */}
                                                    <LoadingButton
                                                        fullWidth
                                                        onClick={CreateOrderPaid}
                                                        endIcon={<FiChevronRight />}
                                                        loading={LoadingBtn}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                    >
                                                        <span>Pay Now</span>
                                                    </LoadingButton>
                                                    <div style={{ minHeight: '5px' }}></div>
                                                </div>

                                            }
                                            

                                        </div>

                                    </div>
                                </div>
                                <div className={Mstyles.CheckoutContainerB}>
                                    <img src={`${MediaFilesUrl}${MediaFilesFolder}/${DataMian.img}`} alt='img' width={'100%'} />

                                </div>
                            </div>

                        </div>

                    }


                    <div className={Mstyles.FootermobileBtnCourse}>
                        <div className={Mstyles.FootermobileBtnCourseBox}>

                            {DataMian.isFree == true ?
                                <div>
                                    <LoadingButton
                                        fullWidth
                                        onClick={CreateOrderBTN}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Confirm & Enroll</span>
                                    </LoadingButton>
                                </div>
                                :
                                <div>
                                    <LoadingButton
                                        fullWidth
                                        onClick={CreateOrderPaid}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingBtn}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Pay Now</span>
                                    </LoadingButton>
                                </div>


                            }

                        </div>
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
