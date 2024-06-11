import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    IconButton,
    styled
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Badge from '@mui/material/Badge';

import TextField from '@mui/material/TextField';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'

import { FaWhatsapp } from "react-icons/fa";

import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight, LuArrowLeft,LuArrowRight } from "react-icons/lu";




import { useRouter, useParams } from 'next/router'

import Image from 'next/image';



const OverviewWrapper = styled(Box)(
    ({ theme }) => `
   
    background: ${theme.palette.common.white};
   
`
);


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const RcAmt = [
    {
        Amt: 100,
    },
    {
        Amt: 200,
    },
    {
        Amt: 300,
    },
    {
        Amt: 400,
    },
    {
        Amt: 500,
    }
]
function Overview() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [BtnLoading, setBtnLoading] = useState(false);
    const [OpenDiloag, setOpenDiloag] = useState(false);
    const [Amount, setAmount] = useState(0);
    const [CreditValue, setCreditValue] = useState(0);
    const [GstAmt, setGstAmt] = useState(0);
    const [GstText, setGstText] = useState('');


    const ClickWhtasApp = () => {
        const Whatsapp= Contextdata.UserBranchData.Whatsapp
        const phoneNumber = Whatsapp;
        const message= `Recharge my wallet, Mobile: ${Contextdata.Data.mobile}, Amount: ${Amount}`
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
      };



    useEffect(() => {
        const { amt } = router.query
        if (amt) {
            setAmount(amt)
            ChangeAmt(amt)
        }


    }, [router.query])


    const ChangeAmt = async (Amt) => {
        if (Amt >= 1) {
            setCreditValue(Amt)

            const taxRate =0; // 0.18 18% tax rate
            const taxAmount = Amt * taxRate;
            setGstAmt(taxAmount.toFixed(2))

        }

    }

    const RechargeProceed = async () => {
        if (Amount >= 1) {
            setBtnLoading(true)

            const Recharge = {
                amount: Amount,
                CreditValue: CreditValue

            }

            const TaxData = {
                TaxAmt: GstAmt,
                GstText: GstText

            }

            const sendUM = {
                Recharge: Recharge,
                TaxData: TaxData,
            };

            try {
                const response = await fetch("/api/Users/Wallet/CreateUserWalletRechargeOrder", {
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

                if (parsed.ReqD.done) {

                    const PGUrl = parsed.ReqD.order.qr_data.payment_url
                    console.log(PGUrl);
                    // router.push(PGUrl);

                } else {
                    setBtnLoading(false)
                    setOpenDiloag(true)
                }


            } catch (error) {
                console.error('Error fetching data:', error);

            }

        } else {
            alert('Please enter valid amount')
        }

    }

    const SelectAmt = async (AmtData) => {
        setAmount(AmtData)

        ChangeAmt(AmtData)

    }

    return (
        <OverviewWrapper>
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>
            <NavbarTitle Title={'Wallet Recharge'} />

            <div className={Mstyles.Minh100vh}>
                <div className={Mstyles.MboxSmall}>
                    <div className={Mstyles.OnlyDesktop}>
                        <div style={{ height: '20px' }}></div>
                    </div>
                    <div className={Mstyles.RechargeBox}>
                        <div className={Mstyles.RechargeBoxA}>
                            <form onSubmit={RechargeProceed}>

                                <div className={Mstyles.RechargeBoxATop}>
                                    <span>Recharge Your Wallet</span>
                                    <div style={{ height: '5px' }}></div>
                                    <small>wallet balance can be use for make any types of purachage on this website.</small>
                                </div>
                                <div className={Mstyles.LoginBox_input}>

                                    <TextField
                                        required
                                        label="Enter Amount"
                                        fullWidth
                                        value={Amount}
                                        onInput={e => setAmount(e.target.value)}
                                        onChange={e => ChangeAmt(e.target.value)}
                                        type="number"
                                    />
                                </div>
                                <div className={Mstyles.RcAmtgridBox}>

                                    <div className={Mstyles.RcAmtgrid} >

                                        {RcAmt.map((item, index) => {
                                            return <div className={Mstyles.RcAmtItem} key={index} onClick={() => SelectAmt(item.Amt)}>

                                                <span>₹ {item.Amt}</span>

                                            </div>

                                        }

                                        )}
                                    </div>

                                </div>


                                <div>
                                    {Amount >= 1 &&

                                        <div className={Mstyles.Rbbox}>
                                            <div className={Mstyles.RbboxItem}>
                                                <div className={Mstyles.RbboxItemA}>
                                                    <span>Credit Value</span>
                                                </div>
                                                <div className={Mstyles.RbboxItemB}>
                                                    <span>₹ {CreditValue}</span>
                                                </div>
                                            </div>
                                            <div className={Mstyles.RbboxItem}>
                                                <div className={Mstyles.RbboxItemA}>
                                                    <span>GST (18.00%)</span>
                                                </div>
                                                <div className={Mstyles.RbboxItemB}>
                                                    <span>₹ {GstAmt}</span>
                                                </div>
                                            </div>
                                            <div className={Mstyles.RbboxItem}>
                                                <div className={Mstyles.RbboxItemA}>
                                                    <span>Total Amount *</span>
                                                </div>
                                                <div className={Mstyles.RbboxItemB}>
                                                    <span>₹ {parseInt(Amount) + parseInt(GstAmt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className={Mstyles.Rechargebtn}>
                                    <div style={{ height: '15px' }}></div>
                                    <LoadingButton

                                        onClick={RechargeProceed}
                                        endIcon={<LuChevronRight />}
                                        loading={BtnLoading}
                                        desabled={BtnLoading}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Recharge</span>
                                    </LoadingButton>
                                </div>
                            </form>


                        </div>


                        <div className={Mstyles.RechargeBoxB}>
                            <div className={Mstyles.rechargewalletimg}>
                                <Image
                                    src={`/img/web/rechargewallet.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <div className={Mstyles.FDevider} ></div>

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={OpenDiloag}

            >

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


                    <div className={Mstyles.PGDilogBox}>
                        <div>
                            <div className={Mstyles.TitleWithBackHeaderA}>
                                <IconButton aria-label="cart" onClick={() => router.back()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                                <div>
                                    <span>Wallet Recharge</span>
                                </div>
                            </div>

                            <div>
                                <div className={Mstyles.OrderDoneb}>
                                    
                                    <div className={Mstyles.OrderDoneboxFooter}>
                                        <div className={Mstyles.OrderDoneboxText}>
                                            <h1>Contact us</h1>
                                            <span>Currently, we are not supporting online payment due to some technical error,  you can recharge your wallet by sending a WhatsApp message.</span>
                                        </div>
                                        <div style={{ height: '10px' }}></div>
                                        <LoadingButton
                                            onClick={ClickWhtasApp}
                                            startIcon={<FaWhatsapp />}

                                            loadingPosition="end"
                                            variant="contained"
                                        >
                                            <span>Recharge Via WhatsApp</span>
                                        </LoadingButton>

                                        <div style={{ height: '20px' }}></div>
                                    </div>


                                </div>
                            </div>

                        </div>



                    </div>
                </div>


            </Backdrop>
        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


