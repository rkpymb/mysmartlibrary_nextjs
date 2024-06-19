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
import { Contactinfo, AppName } from '/Data/config'
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
                <title>Privacy Policy My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
                <div className={Mstyles.SecInTitle}>
                    <h1>Privacy Policy</h1>
                    <span>Updated on : 01/06/2024</span>
                </div>

                <div className={Mstyles.SmallDevidor}> </div>


                <div className={Mstyles.AboutPage}>

                    <section>
                        <h3>Introduction</h3>
                        <p>Welcome to My Smart Library. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.</p>
                    </section>

                    <section>
                        <h3>Information We Collect</h3>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Information</strong>: This includes your name, email address, phone number, and other details you provide when registering or using our services.</li>
                            <li><strong>Usage Data</strong>: Information about how you interact with our platform, including IP address, browser type, and usage patterns.</li>
                            <li><strong>Cookies and Tracking Technologies</strong>: We use cookies and similar technologies to enhance your experience and gather information about usage patterns.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>How We Use Your Information</h3>
                        <p>We use the information we collect for various purposes, including:</p>
                        <ul>
                            <li>Providing and maintaining our services</li>
                            <li>Improving and personalizing your experience</li>
                            <li>Communicating with you, including sending updates and promotional materials</li>
                            <li>Analyzing usage and trends to improve our platform</li>
                            <li>Ensuring the security and integrity of our services</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Sharing Your Information</h3>
                        <p>We may share your information in the following circumstances:</p>
                        <ul>
                            <li>With service providers who assist us in operating our platform and providing our services</li>
                            <li>When required by law or in response to legal requests</li>
                            <li>In connection with a merger, acquisition, or sale of all or a portion of our assets</li>
                            <li>With your consent or at your direction</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Your Choices and Rights</h3>
                        <p>You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications from us. To exercise these rights, please contact us using the information provided below.</p>
                    </section>

                    <section>
                        <h3>Security</h3>
                        <p>We take the security of your information seriously and implement appropriate measures to protect it. However, please be aware that no method of transmission over the internet or electronic storage is completely secure.</p>
                    </section>

                    <section>
                        <h3>Changes to This Privacy Policy</h3>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>
                    </section>

                    <section>
                        <h3>Contact Us</h3>
                        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
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


