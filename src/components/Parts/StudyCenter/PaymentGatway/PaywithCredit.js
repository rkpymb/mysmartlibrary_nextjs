import { useState, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight, LuArrowLeft } from "react-icons/lu";
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import CheckloginContext from '/context/auth/CheckloginContext'
import * as paymentdoneAnimation from '/Data/Lottie/doneanim.json'

import Lottie from 'react-lottie'
import Image from 'next/image'

import { LuArrowRight } from "react-icons/lu";

import { useRouter, useParams } from 'next/router'
import Mstyles from '/Styles/library.module.css'
import {

    IconButton,

    styled
} from '@mui/material';
export default function SimpleBackdrop({ PaymentData }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [open, setOpen] = useState(true);
    const [BtnLoading, setBtnLoading] = useState(false);

    const [StepA, setStepA] = useState(true);
    const [DoneOrder, setDoneOrder] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [Balance, setBalance] = useState(0);
    const [PayCredit, setPayCredit] = useState(0);
    const [Validity, setValidity] = useState(0);
    const [OrderTitle, setOrderTitle] = useState('');
    const [Discount, setDiscount] = useState(0);
    const [Mprice, setMprice] = useState(0);
    const [Sprice, setSprice] = useState(0);

    const PayDone = {
        loop: false,
        autoplay: true,
        animationData: paymentdoneAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }


    const UserPaywithWallet = async () => {

        try {
            setBtnLoading(true)
            const sendUM = {
                Orderid: PaymentData.Orderid,
            }
            const data = await fetch("/api/Users/Wallet/UserPaywithWallet", {
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
                    if (parsed.ReqD.done) {

                        setTimeout(function(){
                            setStepA(false);
                            setDoneOrder(true)
                       }, 2000);


                    }
                    
                })
        } catch (error) {
            console.log(error)
            alert('Something went Wrong, please try again')
            setBtnLoading(false)

        }


    };

    const GetData = async () => {

        const sendUM = {

        };

        try {
            const response = await fetch("/api/Users/Wallet/UserWalletBalance", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await response.json();

            if (parsed.ReqData) {
                if (parsed.ReqData.Balance) {
                    setBalance(parsed.ReqData.Balance)
                }
                setTimeout(function () {
                    setLoading(false)
                }, 2000);
                
            }
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    useEffect(() => {
       
        setPayCredit(PaymentData.amt)
        setOrderTitle(PaymentData.OrderTitle)
        setValidity(PaymentData.validity)
        setSprice(PaymentData.amt)
        setMprice(PaymentData.mprice)
        setDiscount(PaymentData.TotalDiscount)



        GetData()

    }, [PaymentData])


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));



    return (
        <div>

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


                    <div className={Mstyles.PGDilogBox}>
                        {StepA &&

                            <div>
                                {!Loading &&
                                    <div className={Mstyles.TitleWithBackHeaderA}>
                                        <IconButton aria-label="cart" onClick={() => router.back()}>
                                            <StyledBadge color="secondary" >
                                                <LuArrowLeft />
                                            </StyledBadge>
                                        </IconButton>
                                        <div>
                                            <span>Pay using Credits</span>
                                        </div>
                                    </div>
                                }

                                {Loading ?
                                    <div className={Mstyles.CreditBBoxPbox}>

                                        <Skeleton variant="text" width={'100%'} sx={{ fontSize: '1rem' }} />
                                        <div style={{ height: "2px" }}></div>
                                        <Skeleton variant="text" width={'50%'} sx={{ fontSize: '1rem' }} />
                                        <div style={{ height: "15px" }}></div>
                                        <Skeleton variant="text" width={'50px'} sx={{ fontSize: '2rem' }} />
                                    </div> :
                                    <div className={Mstyles.CreditBBoxPbox} >

                                        <div style={{ height: "10px" }}></div>
                                        <div className={Mstyles.CreditBBox}>
                                            <div className={Mstyles.CreditBBoxA}>
                                                <span>Credit Balance</span>
                                            </div>
                                            <div className={Mstyles.CreditBBoxB}>
                                                ₹ {Balance}
                                            </div>
                                        </div>
                                        <div style={{ height: "20px" }}></div>
                                        <div className={Mstyles.InvBox}>

                                            <div className={Mstyles.InvBoxItem}>
                                                <div className={Mstyles.InvBoxItemA}>
                                                    <span>Order</span>
                                                </div>
                                                <div className={Mstyles.InvBoxItemB}>
                                                    {OrderTitle}
                                                </div>
                                            </div>
                                            <div className={Mstyles.InvBoxItem}>
                                                <div className={Mstyles.InvBoxItemA}>
                                                    <span>Validity</span>
                                                </div>
                                                <div className={Mstyles.InvBoxItemB}>
                                                    {Validity}
                                                </div>
                                            </div>
                                            <div className={Mstyles.InvBoxItem}>
                                                <div className={Mstyles.InvBoxItemA}>
                                                    <span>Price</span>
                                                </div>
                                                <div className={Mstyles.InvBoxItemB}>
                                                    ₹ {Mprice}
                                                </div>
                                            </div>
                                            <div className={Mstyles.InvBoxItem}>
                                                <div className={Mstyles.InvBoxItemA}>
                                                    <span>Discount</span>
                                                </div>
                                                <div className={Mstyles.InvBoxItemB}>
                                                    - ₹ {Discount}
                                                </div>
                                            </div>
                                            <div className={Mstyles.InvBoxItem}>
                                                <div className={Mstyles.InvBoxItemA}>
                                                    <span>Total</span>
                                                </div>
                                                <div className={Mstyles.InvBoxItemB}>
                                                    ₹ {PayCredit}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ height: "20px" }}></div>
                                        <div>
                                            {parseFloat(Balance) < parseFloat(PayCredit) ?

                                                <div>
                                                    <div className={Mstyles.BtnboxPageB}>
                                                        <LoadingButton
                                                            endIcon={<LuChevronRight />}
                                                            loading={false}
                                                            loadingPosition="end"
                                                            variant="contained"
                                                            fullWidth
                                                            onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/wallet/recharge?amt=${PayCredit}`)}
                                                        >
                                                            <span>Recharge Now</span>
                                                        </LoadingButton>
                                                    </div>

                                                    <div className={Mstyles.PassOrdermsg}>
                                                        <span> ⚠️ ₹ Insufficient Credit Wallet Balance </span>
                                                    </div>

                                                </div> :
                                                <div>
                                                    <div className={Mstyles.BtnboxPageB}>
                                                        <LoadingButton
                                                            endIcon={<LuChevronRight />}
                                                            loading={BtnLoading}
                                                            desabled={BtnLoading}
                                                            loadingPosition="end"
                                                            variant="contained"
                                                            fullWidth
                                                            onClick={UserPaywithWallet}
                                                        >
                                                            <span>Pay  Now</span>
                                                        </LoadingButton>
                                                    </div>

                                                    <div className={Mstyles.PassOrdermsg}>
                                                        <span> ℹ️ ₹ {PayCredit} will be used form your Credit Wallet </span>
                                                    </div>

                                                </div>


                                            }
                                        </div>

                                    </div>

                                }

                            </div>

                        }

                        {DoneOrder &&

                            <div>
                                <div className={Mstyles.OrderDoneb}>
                                    <div className={Mstyles.OrderDonebLott} >

                                        <Lottie options={PayDone}
                                            height={null}
                                            width={'100%'}
                                            isStopped={false}
                                            isPaused={false} />

                                    </div>

                                    <div className={Mstyles.OrderDoneboxFooter}>
                                        <div className={Mstyles.OrderDoneboxText}>
                                            <h1>Subscriptions Succesfully Added</h1>
                                            <span>Congratulations! Your subscriptions have been successfully added. Now it will be easier for you to access your favorite services and updates. Keep enjoying!</span>
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <LoadingButton
                                           onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/`)}
                                            endIcon={<LuArrowRight />}

                                            loadingPosition="end"
                                            variant="contained"
                                        >
                                            <span>Go to Home</span>
                                        </LoadingButton>
                                        <div style={{ height: '10px' }}></div>
                                    </div>


                                </div>
                            </div>
                        }


                    </div>
                </div>


            </Backdrop>
        </div>
    );
}
