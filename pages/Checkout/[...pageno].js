import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import CircularProgress from '@mui/material/CircularProgress'
import Head from 'next/head';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Navbarmain from '../../src/components/Parts/Navbarmain'
import { BiCheckCircle } from "react-icons/bi";
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import { useRouter, useParams } from 'next/router'
import CryptoJS from "crypto-js";
import CheckoutFree from '../components/Checkout/CheckoutFree'
import { DO_SPACES_URL, DO_SPACES_FOLDER, AppName } from '../../Data/config'
export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: DataSlug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}home/getcTSbyid`, requestOptions);
    const CourseFullData = await response.json();

    return {

        props: { CourseFullData }, // will be passed to the page component as props
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

function Overview({ CourseFullData }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [ShowBtnloader, setShowBtnloader] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [ShowEdulist, setShowEdulist] = useState(false);
    const [DataMian, setDataMian] = useState(CourseFullData.TSData);
    const [UserData, setUserData] = useState();
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {
        console.log(CourseFullData.TSData)
        if (Contextdata.IsLogin == true) {
            setUserData(Contextdata.Data)
            setLoading(false)
        } else {
            router.push('/Login')
        }

    });

    const CreateOrderBTN = async () => {
        if (Contextdata.IsLogin == true) {
            setShowBtnloader(true)
            const RandA = Math.floor(Math.random() * 100000) + 1;
            const RandB = Math.floor(Math.random() * 100000) + 10;
            const OrderID = 'SMORD23' + RandA + RandB + DataMian._id;
            const TotalAmt = 0;
            const CouponApplied = 'FREE';
            const CodeDiscount = DataMian.mprice;
            const ProductDiscount = DataMian.mprice - DataMian.sprice;
            const TotalDiscount = CodeDiscount + ProductDiscount;
            const ProductType = 'course';
            const Paymentid = 'N/A';
            const refid = 'N/A';
            const date = 'N/A';
            const time = 'N/A';
            const OrderStatus = '0';
            const PayStatus = '0';
            const OrderStatusText = 'Order Created';
            const PayStatusText = 'Pendign Payment';
            const validity = '1';
            const OrderTitle = DataMian.title;
            const JwtToken = localStorage.getItem('Token');
            const OrderData = {
                OrderID: OrderID,
                amt: TotalAmt,
                Discount: ProductDiscount,
                Coupon: CouponApplied,
                CouponDiscount: CodeDiscount,
                TotalDiscount: TotalDiscount,
                ProductType: ProductType,
                Paymentid: Paymentid,
                refid: refid,
                date: date,
                time: time,
                OrderStatus: OrderStatus,
                PayStatus: PayStatus,
                OrderStatusText: OrderStatusText,
                PayStatusText: PayStatusText,
                validity: validity,
                OrderTitle: OrderTitle,

            }
            const sendUser = { JwtToken: JwtToken, userData: Contextdata.Data, CourseData: DataMian, OrderData: OrderData }
            const CryptoJSKEY = 'XYZ'
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sendUser), CryptoJSKEY).toString();
            const SendFinalData = { encryptedData: encryptedData }
            const data = fetch("/api/V2/CourseOrders/CheckingCourseAvailability", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(SendFinalData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedIfAvail) => {
                    setShowBtnloader(false)
                   
                    if (parsedIfAvail.ReqS == false) {
                        alert(parsedIfAvail.ReqData.RetOrderData)
                       

                    } else {
                        
                        router.push(`/OrderInovice/${parsedIfAvail.ReqData.RetOrderData.Orderid}`)

                    }

                })
        } else {
            router.push('/Login')
        }




    }

    return (
        <OverviewWrapper>
            <Head>
                <title>Checkout : {DataMian && DataMian.title}</title>
                <meta name="description" content={DataMian && DataMian.title} />
                {/* <meta property="og:image" content={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${DataMian.img} && DataMian.img}`} /> */}

            </Head>
            <Navbarmain />
            {!Loading &&

                <div>
                    {DataMian && DataMian.isFree &&
                        <div>
                            <div className={Mstyles.OnlyDesktop}>
                                <div style={{ minHeight: '100px' }}></div>
                            </div>
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
                                        <div>
                                            <div style={{ minHeight: '20px' }}></div>
                                            {!ShowBtnloader &&
                                                <div className={Mstyles.CreateOrderBtnfinal} style={{ backgroundColor: '#212cff', width: '200px' }} onClick={CreateOrderBTN}>
                                                    <span>Confirm & Enroll</span>
                                                </div>
                                            }
                                            {ShowBtnloader &&
                                                <div style={{ margin: '10px' }}><CircularProgress color="inherit" /></div>
                                            }
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className={Mstyles.CheckoutContainerB}>
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "195px",
                                            backgroundColor: '#c5d6e3',
                                        }}
                                    >
                                        <Image
                                            placeholder='blur'
                                            blurDataURL={blurredImageData}
                                            src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${DataMian.img}`}
                                         alt="Vercel Logo" layout='fill' />
                                    </div>

                                </div>
                            </div>

                        </div>
                    }

                </div>

            }











        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
