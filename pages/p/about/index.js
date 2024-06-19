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
import { AppDesc, AppName } from '/Data/config'
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
                <title>About My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
                <div className={Mstyles.SecInTitle}>
                    <h1>About My Smart Library</h1>
                    <span>One Stop Solution for Self Study Center Business.</span>
                </div>

                <div className={Mstyles.SmallDevidor}> </div>


                <div className={Mstyles.AboutPage}>
                
                    <section>
                        <p>Welcome to <strong>My Smart Library</strong>, the ultimate platform designed specifically for Self Study Center owners. Our mission is to empower you with the tools to create and manage your own website and app effortlessly, ensuring that your study center operates smoothly and efficiently.</p>
                    </section>

                    <section>
                        <h3>Who We Are</h3>
                        <p>At My Smart Library, we understand the unique needs of self-study centers. Our team is dedicated to providing a comprehensive solution that allows you to focus on what truly matters – facilitating an excellent study environment for your users.</p>
                    </section>

                    <section>
                        <h3>Our Services</h3>
                        <p>With My Smart Library, you can seamlessly manage multiple aspects of your study center, including:</p>
                        <ul>
                            <li><strong>Multiple Branches</strong>: Easily oversee all your branches from a single platform, ensuring consistent quality and streamlined operations across locations.</li>
                            <li><strong>Shifts Management</strong>: Optimize your resources by scheduling and managing different shifts effortlessly.</li>
                            <li><strong>Seats Management</strong>: Keep track of seat availability and bookings in real-time to ensure maximum utilization.</li>
                            <li><strong>User Subscriptions</strong>: Manage user subscriptions and memberships with ease, offering flexible plans to suit different needs.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Why Choose Us</h3>
                        <ul>
                            <li><strong>User-Friendly Interface</strong>: Our platform is designed with simplicity in mind, making it easy for you to navigate and utilize all its features without any technical expertise.</li>
                            <li><strong>Comprehensive Management</strong>: From branches to seats, and shifts to subscriptions, My Smart Library provides an all-in-one solution to manage your study center efficiently.</li>
                            <li><strong>Customization</strong>: Tailor your website and app to reflect your brand and meet the specific requirements of your study center.</li>
                            <li><strong>Reliability</strong>: With our robust platform, you can rest assured that your operations will run smoothly without any disruptions.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Our Vision</h3>
                        <p>We aim to revolutionize the way self-study centers operate by providing a state-of-the-art platform that enhances management capabilities, improves user experiences, and supports the growth and success of study centers worldwide.</p>
                        <p>Join us at My Smart Library and take your self-study center to the next level.</p>
                        <p>For more information or to get started, contact us today!</p>
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


