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
                <title>Terms and Conditions My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
                <div className={Mstyles.SecInTitle}>
                    <h1>Terms and Conditions</h1>
                    <span>Updated on : 01/06/2024</span>
                </div>

                <div className={Mstyles.SmallDevidor}> </div>


                <div className={Mstyles.AboutPage}>

                    <section>
                        <h3>Introduction</h3>
                        <p>Welcome to My Smart Library. These Terms and Conditions govern your use of our platform and services. By accessing or using My Smart Library, you agree to comply with these terms. If you do not agree with any part of these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h3>Use of Services</h3>
                        <p>You agree to use our services only for lawful purposes and in accordance with these Terms and Conditions. You must not use our services in any way that may harm, disrupt, or interfere with the functioning of our platform or the experience of other users.</p>
                    </section>

                    <section>
                        <h3>Account Registration</h3>
                        <p>To access certain features of our platform, you may need to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                    </section>

                    <section>
                        <h3>Intellectual Property</h3>
                        <p>All content on My Smart Library, including text, graphics, logos, and software, is the property of My Smart Library or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from our platform without our express written permission.</p>
                    </section>

                    <section>
                        <h3>Subscription and Payments</h3>
                        <p>Certain features of our platform may require a subscription or payment. By subscribing or making a payment, you agree to our pricing and payment terms. All payments are non-refundable unless otherwise stated.</p>
                    </section>

                    <section>
                        <h3>Termination</h3>
                        <p>We reserve the right to suspend or terminate your access to our platform at any time, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties.</p>
                    </section>

                    <section>
                        <h3>Limitation of Liability</h3>
                        <p>My Smart Library and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our platform. Our total liability to you for any claims arising from the use of our services is limited to the amount you paid us in the past twelve months.</p>
                    </section>

                    <section>
                        <h3>Governing Law</h3>
                        <p>These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which My Smart Library operates, without regard to its conflict of law principles.</p>
                    </section>

                    <section>
                        <h3>Changes to Terms and Conditions</h3>
                        <p>We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
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


