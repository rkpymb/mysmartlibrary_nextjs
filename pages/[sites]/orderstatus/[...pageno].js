import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';


import Slide from '@mui/material/Slide';



import Badge from '@mui/material/Badge';


import Lottie from 'react-lottie'


import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'


import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'

import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'
import OrderInvoice from '/src/components/Parts/StudyCenter/Invoice/OrderInvoice'


import { useRouter, useParams } from 'next/router'

import * as animationData from '/Data/Lottie/paymentdone.json'

import * as pending from '/Data/Lottie/pending.json'




export async function getServerSideProps(context) {
    const Orderid = context.query.pageno[0];
    const webid = context.query.pageno[2];
    const Branchcode = context.query.pageno[1];

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Orderid: Orderid, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/OrderDetails`, requestOptions);
    const OrderData = await response.json();
    return {
        props: { OrderData },
    }

}

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
   
`
);

function Overview({ OrderData }) {
    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
    const [Loading, setLoading] = useState(true);
    const [LoadingSeats, setLoadingSeats] = useState(false);
    const [ShiftsList, setShiftsList] = useState([]);
    const [Seats, setSeats] = useState([]);
    const [ShwoSeatsModal, setShwoSeatsModal] = useState(false);
    const [DataMian, setDataMian] = useState({});
    const [ShowPaybtn, setShowPaybtn] = useState(false);
    const [Addons, setAddons] = useState([]);
    const [PM, SetPM] = useState([]);
    const [CurrentShift, setCurrentShift] = useState({});
    const [CurrentSeat, setCurrentSeat] = useState({});
    const [Totalamt, setTotalamt] = useState();
    const [SelectedSeatCode, setSelectedSeatCode] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [PMData, setPMData] = useState(null);
    const [AddonLoading, setAddonLoading] = useState(true);
    const [CreateOrderLoader, setCreateOrderLoader] = useState(false);
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

    };


    const handleClickOpen = () => {
        setShwoSeatsModal(true);
    };


    useEffect(() => {
        // console.log(OrderData)
        if (OrderData.OrderData) {


            setLoading(false);


        } else {
            alert('Invalid Order')
        }


    }, []);





    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const PendingLottie = {
        loop: false,
        autoplay: true,
        animationData: pending,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <OverviewWrapper>
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>

            <div className={Mstyles.OrderStatusBox}>


                {Loading ?
                    <div>Loading</div> :
                    <div>
                        {OrderData.OrderData.OrderStatus === true && OrderData.OrderData.PayStatus === true ?
                            <div className={Mstyles.OrderDoneLottie} >

                                <Lottie options={PendingLottie}
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
                        <OrderInvoice OrderData={OrderData.OrderData} />
                    </div>


                }



            </div>
            <div style={{ height: '420px' }}></div>


        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};


