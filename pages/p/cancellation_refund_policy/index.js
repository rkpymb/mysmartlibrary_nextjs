import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,

    styled
} from '@mui/material';

import NavBar from '../../components/Main/NavBar'

import Mstyles from '/Styles/main.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';


import MainFooter from '../../components/Main/MainFooter'
import { AppDesc, Contactinfo } from '/Data/config'
import { useRouter, useParams } from 'next/router'



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
   
    background: ${theme.palette.common.white};
   
`
);

function Overview() {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {
        setLoading(false)

        Contextdata.ChangeMainLoader(false)
    });
    return (
        <OverviewWrapper>
            <Head>
                <title>Cancellation Refund Policy My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
                <div className={Mstyles.SecInTitle}>
                    <h1>Cancellation Refund Policy</h1>
                    <span>Updated on : 20/06/2024</span>
                </div>

                <div className={Mstyles.SmallDevidor}> </div>


                <div className={Mstyles.AboutPage}>

                    <section>
                        <p>My Smart Library believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
                    </section>

                    <section>
                        <h3>Your use of the website and/or purchase from us are governed by following Terms and Conditions:</h3>
                        <li>Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                        <li>My Smart Library does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
                        <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.</li>
                        <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                        <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
                        <li>In case of any Refunds approved by the My Smart Library, it’ll take 16-30 days for the refund to be processed to the end customer.</li>
                    </section>

                    

               

                    <section>
                        <h3>Contact Us</h3>
                        <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                        <p>Email: {Contactinfo.ContactEmail}</p>

                    </section>

                </div>
            </div>

            <div className={Mstyles.MainDevidor}> </div>
            <MainFooter />



        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


