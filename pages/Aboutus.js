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
                <title>All Courses and Live Batches</title>
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
                                <span><span className={Mstyles.linkpageitemClick}>About DR. IT Education</span> </span>
                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>


                <div className={Mstyles.MainBoxContainerInner}>

                    <div className={Mstyles.ContainerSec}>
                        <div className={Mstyles.SmallConntetboxTopDevider}></div>
                        <div className={Mstyles.guygyuyufytfty}>
                           

                            <p>Welcome to DR. IT Education, where innovation meets education for a brighter tomorrow. At DR. IT, we are on a mission
                                to revolutionize the way IT education is delivered, making it accessible, engaging, and tailored to the needs of
                                the ever-evolving tech landscape.</p>

                            <h3>Our Vision</h3>

                            <p>Empowering individuals with the knowledge and skills needed to thrive in the digital age, DR. IT Education
                                envisions a world where every learner has the opportunity to excel in Information Technology. We believe that
                                education should be a dynamic and personalized experience, fostering a deep understanding of IT concepts and
                                encouraging a passion for continuous learning.</p>

                            <h3>What Sets Us Apart</h3>

                            <ul>
                                <li><strong>Cutting-Edge Curriculum:</strong> Our courses are meticulously crafted by industry experts,
                                    keeping pace with the latest trends and technologies.</li>
                                <li><strong>Interactive Learning:</strong> Learning with DR. IT is an immersive experience. Our platform
                                    integrates cutting-edge technologies to provide hands-on, interactive learning experiences.</li>
                                <li><strong>Expert Instructors:</strong> Our team of seasoned instructors comprises industry veterans and
                                    subject matter experts.</li>
                                <li><strong>Community-driven Approach:</strong> At DR. IT, we believe in the strength of community. Join a
                                    vibrant network of learners, collaborate on projects, and engage in discussions to enhance your
                                    understanding of IT concepts.</li>
                            </ul>

                            <h3>Our Commitment</h3>

                            <p>DR. IT Education is committed to democratizing IT education. We strive to make quality learning resources
                                accessible to learners worldwide, breaking down barriers and empowering individuals to pursue fulfilling careers
                                in the ever-expanding field of Information Technology.</p>

                            <p>Join us on this exciting journey of knowledge, innovation, and growth. Together, let's redefine IT education and
                                shape a future where technology is a tool for empowerment.</p>

                            <p>Discover. Learn. Excel. Welcome to DR. IT Education.</p>
                        </div>


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
