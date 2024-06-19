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
import SubscriptionsPlan from '../../components/Main/HomePage/SubscriptionsPlan'
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
                <title>Pricing My Smart Library : One Stop Solution for Self Study Center Business.</title>
            </Head>

            <NavBar />

            <div className={Mstyles.Container}>
                <div className={Mstyles.MainDevidor}> </div>
               
      

                <SubscriptionsPlan />
                <div className={Mstyles.SmallDevidor}> </div>


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


