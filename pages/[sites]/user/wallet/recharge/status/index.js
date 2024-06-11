import { useState, useEffect, useContext } from 'react';
import OrderInvoice from './Comp/OrderInvoice'
import CheckloginContext from '/context/auth/CheckloginContext'
import {

    Box,

    styled
} from '@mui/material';
import Mstyles from '/Styles/library.module.css'
import * as PendingAnimation from '/Data/Lottie/pending.json'
import * as paymentdoneAnimation from '/Data/Lottie/doneanim.json'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'


import Lottie from 'react-lottie'

import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';

import { useRouter, useParams } from 'next/router'

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
   
    background: ${theme.palette.common.white};
    overflow-x: hidden;
`
);

function Overview() {
    const router = useRouter()
    const { order } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [OrderData, setOrderData] = useState(null);
    
    const Contextdata = useContext(CheckloginContext)

    const PendingLottie = {
        loop: false,
        autoplay: true,
        animationData: PendingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const PayDone = {
        loop: false,
        autoplay: true,
        animationData: paymentdoneAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const GetData = async () => {
        setIsLoading(true)
        const sendUM = {
            Orderid: order,
        };

        try {
            const response = await fetch("/api/V3/Open/RechargeStatus", {
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
            if (parsed.ReqD) {
                console.log(parsed.ReqD.OrderData)
                setOrderData(parsed.ReqD.OrderData)
                setIsLoading(false);
                Contextdata.ChangeMainLoader(false);

            } else {
                alert('Invalid Order')
            }




        } catch (error) {
            console.error('Error fetching data:', error);

        }

    }

    useEffect(() => {
        if (order) {
            GetData()
        }


    }, [router.query], order);
    return (
        <OverviewWrapper>
            <Head>
                <title>Recharge Status </title>
            </Head>
            <WebsiteData />
            <div className={Mstyles.OrderStatusBox}>


                {isLoading ?
                    null :
                    <div>
                        {OrderData.OrderStatus === true && OrderData.PayStatus === true ?
                            <div className={Mstyles.OrderDoneLottie} >

                                <Lottie options={PayDone}
                                    height={null}
                                    width={'100%'}
                                    isStopped={false}
                                    isPaused={false} />


                            </div> :
                            <div className={Mstyles.OrderDoneLottie} >

                                <Lottie options={PendingLottie}
                                    height={null}
                                    width={'100%'}
                                    isStopped={false}
                                    isPaused={false} />


                            </div>

                        }
                        <OrderInvoice OrderData={OrderData} />
                    </div>


                }



            </div>

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
