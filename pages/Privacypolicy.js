import { useState, useEffect, useContext } from 'react';
import {

    Box,
    Card,

    styled
} from '@mui/material';


import Footer from '/src/components/Parts/Footer'

import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/home.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';

import MainNavBarSecond from '/src/components/Parts/Navbar/MainNavBarSecond'

import { useRouter } from 'next/router'


const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
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

function Overview() {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)


    return (
        <OverviewWrapper>
            <Head>
                <title>Privacy Policy</title>
            </Head>
            <MainNavBarSecond CheckPComplete={false} />
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
                                <span><span className={Mstyles.linkpageitemClick}>Privacy Policy</span> </span>
                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>


                <div className={Mstyles.MainBoxContainerInner}>

                    <div className={Mstyles.ContainerSec}>
                        <div className={Mstyles.SmallConntetboxTopDevider}></div>
                        <p>Last updated: 10/11/2023</p>

                        <p>DR. IT Education ("us", "we", or "our") operates the DR. IT Education website (the "Service").</p>

                        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use
                            our Service and the choices you have associated with that data.</p>

                        <h3>Information Collection and Use</h3>

                        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                        <h4>Types of Data Collected</h4>

                        <ul>
                            <li>Personal Data</li>
                            <li>Usage Data</li>
                        </ul>

                        <h4>Use of Data</h4>

                        <p>DR. IT Education uses the collected data for various purposes:</p>

                        <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To provide customer care and support</li>
                            <li>To monitor the usage of the Service</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>

                        <h3>Security</h3>

                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet or
                            method of electronic storage is absolutely secure. While we strive to use commercially acceptable means to
                            protect your Personal Data, we cannot guarantee its absolute security.</p>

                        <h3>Cookies</h3>

                        <p>DR. IT Education uses cookies to track the activity on our Service and store certain information. You can instruct
                            your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept
                            cookies, you may not be able to use some portions of our Service.</p>

                        <h3>Links to Other Sites</h3>

                        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link,
                            you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every
                            site you visit.</p>

                        <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any
                            third-party sites or services.</p>

                        <h3>Changes to This Privacy Policy</h3>

                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
                            Policy on this page.</p>

                        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
                            effective when they are posted on this page.</p>

                        <h3>Contact Us</h3>

                        <p>If you have any questions about this Privacy Policy, please contact us:</p>

                        <ul>

                            <li>By visiting this page on our website: www.driteducation.</li>
                            <li>By email: contact@driteducation.com</li>
                        </ul>

                     


                    </div>

                </div>
            </div>



            <div className={Mstyles.containerFull}>
                <div className={Mstyles.OnlyDesktop}>
                    <div style={{ minHeight: '20px' }}></div>
                </div>
                <Footer />

            </div>




        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
