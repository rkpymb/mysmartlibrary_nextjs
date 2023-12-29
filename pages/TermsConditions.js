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
                <title>Terms and Conditions</title>
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
                                <span><span className={Mstyles.linkpageitemClick}>Terms and Conditions</span> </span>
                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>


                <div className={Mstyles.MainBoxContainerInner}>

                    <div className={Mstyles.ContainerSec}>
                        <div className={Mstyles.SmallConntetboxTopDevider}></div>

                        <p>Last updated: 20/08/2023</p>

                        <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the DR. IT Education
                            website (the "Service") operated by DR. IT Education ("us", "we", or "our").</p>

                        <h3>Accounts</h3>

                        <p>When you create an account with us, you must provide information that is accurate, complete, and current at all
                            times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your
                            account on our Service.</p>

                        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or
                            actions under your password, whether your password is with our Service or a third-party service.</p>

                        <h3>Intellectual Property</h3>

                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of DR.
                            IT Education and its licensors. The Service is protected by copyright, trademark, and other laws of both the
                            India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or
                            service without the prior written consent of DR. IT Education.</p>

                        <h3>Links To Other Web Sites</h3>

                        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by DR. IT
                            Education.</p>

                        <p>DR. IT Education has no control over and assumes no responsibility for, the content, privacy policies, or
                            practices of any third-party web sites or services. You further acknowledge and agree that DR. IT Education shall
                            not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by
                            or in connection with the use of or reliance on any such content, goods, or services available on or through any
                            such web sites or services.</p>

                        <h3>Termination</h3>

                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                            including without limitation if you breach the Terms.</p>

                        <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account,
                            you may simply discontinue using the Service.</p>

                        <h3>Governing Law</h3>

                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its
                            conflict of law provisions.</p>

                        <h3>Changes</h3>

                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
                            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
                            material change will be determined at our sole discretion.</p>

                        <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
                            revised terms. If you do not agree to the new terms, please stop using the Service.</p>

                        <h3>Contact Us</h3>

                        <p>If you have any questions about these Terms, please contact us:</p>



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
