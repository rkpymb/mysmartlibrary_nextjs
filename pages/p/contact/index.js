import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,

    styled
} from '@mui/material';
import { LuPhoneCall, LuMail, LuMapPin } from "react-icons/lu";

import NavBar from '../../components/Main/NavBar'

import Mstyles from '/Styles/main.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';


import MainFooter from '../../components/Main/MainFooter'
import { AppDesc, Contactinfo } from '/Data/config'
import { useRouter, useParams } from 'next/router'


import ContactForm from './Comp/ContactForm'
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
                <title>Contact My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
                <div className={Mstyles.SecInTitle}>
                    <h1>We're here to help 😊</h1>
                    <span>Have any questions? We'd love to hear from you</span>
                </div>

                <div className={Mstyles.SmallDevidor}> </div>
                <div className={Mstyles.Contactusp}>
                    <div className={Mstyles.ContactuspA}>

                        <div>
                            <div className={Mstyles.ContacTTitle}>
                                <span>Contact us</span>
                            </div>
                            <div className={Mstyles.FmenuBox}>
                                <div className={Mstyles.ContactItem}>
                                    <div className={Mstyles.ContactItemA}>
                                        <LuPhoneCall size={20} />
                                    </div>
                                    <div className={Mstyles.ContactItemB}>
                                    {Contactinfo.MainMobile}
                                    </div>
                                </div>
                                <div className={Mstyles.ContactItem}>
                                    <div className={Mstyles.ContactItemA}>
                                        <LuMail size={20} />
                                    </div>
                                    <div className={Mstyles.ContactItemB}>
                                    {Contactinfo.ContactEmail}
                                    </div>
                                </div>
                                <div className={Mstyles.ContactItem}>
                                    <div className={Mstyles.ContactItemA}>
                                        <LuMapPin size={20} />
                                    </div>
                                    <div className={Mstyles.ContactItemB}>
                                    {Contactinfo.MainAddress}
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

            <div className={Mstyles.MainDevidor}> </div>
            <MainFooter />



        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


