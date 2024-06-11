import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import { LuPhoneCall, LuMail, LuMapPin } from "react-icons/lu";
// import MainContactForm from '../src/components/Forms/MainContactForm'
import Head from 'next/head';
import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import WebsiteMainCounter from '/src/components/Parts/StudyCenter/WebsiteMainCounter'

import WhyChooseus from '/src/components/Parts/StudyCenter/WhyChooseus'

import LbContactboxHome from '/src/components/Parts/StudyCenter/LbContactboxHome'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'
import ContactForm from './ContactForm'

import Footer from '/src/components/Parts/Footer'

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

        if (Contextdata.WebData) {

            setLoading(false)

        }
    }, [Contextdata.WebData, router.query]);





    return (
        <OverviewWrapper>
            <WebsiteData />

            {!Loading &&

                <div>
                    <Head>
                        <title>Contact us</title>
                    </Head>
                    <NavBarTop SubTitle={false} SubTitleText={null} />
                    <div className={Mstyles.MNavDevider} ></div>
                    <div className={Mstyles.Minh100vh}>
                        <div className={Mstyles.MboxSmall} >
                            <div className={Mstyles.MSecDevider} ></div>
                            <div className={Mstyles.HowWorksTitle}>
                                <h1>We're here to help 😊</h1>
                                <span>Have any questions? We'd love to hear from you
                                </span>

                            </div>
                            <div className={Mstyles.MSecDevider} ></div>
                            <div className={Mstyles.Contactusp}>
                                <div className={Mstyles.ContactuspA}>

                                    <div className={Mstyles.FooterAbout}>
                                        <div className={Mstyles.FooterTitle}>
                                            <span>Contact us</span>
                                        </div>
                                        <div className={Mstyles.FmenuBox}>
                                            <div className={Mstyles.ContactItem}>
                                                <div className={Mstyles.ContactItemA}>
                                                    <LuPhoneCall size={20} />
                                                </div>
                                                <div className={Mstyles.ContactItemB}>
                                                {Contextdata.UserBranchData.MobileNum}
                                                </div>
                                            </div>
                                            <div className={Mstyles.ContactItem}>
                                                <div className={Mstyles.ContactItemA}>
                                                    <LuMail size={20} />
                                                </div>
                                                <div className={Mstyles.ContactItemB}>
                                                {Contextdata.UserBranchData.Email}
                                                </div>
                                            </div>
                                            <div className={Mstyles.ContactItem}>
                                                <div className={Mstyles.ContactItemA}>
                                                    <LuMapPin size={20} />
                                                </div>
                                                <div className={Mstyles.ContactItemB}>
                                                {Contextdata.UserBranchData.Address} ,{Contextdata.UserBranchData.City} ,{Contextdata.UserBranchData.State} {Contextdata.UserBranchData.pincode}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={Mstyles.ContactuspB}>
                                    <ContactForm />

                                </div>


                            </div>
                        </div>
                        <div className={Mstyles.MSecDevider} ></div>



                    </div>

                    <Footer />

                </div>

            }

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


