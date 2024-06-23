import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';

import NavBar from './components/Main/NavBar'

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../Styles/main.module.css'
import CheckloginContext from '../context/auth/CheckloginContext'

import Head from 'next/head';
import HeroBox from './components/Main/HomePage/HeroBox'
import Highlights from './components/Main/HomePage/Highlights'
import HighlightsA from './components/Main/HomePage/HighlightsA'
import KeyFeatures from './components/Main/HomePage/KeyFeatures'
import GoliveSteps from './components/Main/HomePage/GoliveSteps'
import FooterStickey from './components/Main/HomePage/FooterStickey'
import DemoBox from './components/Main/HomePage/DemoBox'
import SubscriptionsPlan from './components/Main/HomePage/SubscriptionsPlan'
import MainFooter from './components/Main/MainFooter'
import { AppDesc, AppName } from '../Data/config'
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
        <title>My Smart Library : One Stop Solution for Self Study Center Business.</title>
      </Head>

      <NavBar />

      <div className={Mstyles.Container}>

        <HeroBox />
        <div className={Mstyles.MainDevidor}> </div>
        <HighlightsA />
        <div className={Mstyles.MainDevidor}> </div>
        <KeyFeatures />
        <div className={Mstyles.MainDevidor}> </div>
        <DemoBox />
        <div className={Mstyles.MainDevidor}> </div>
        <GoliveSteps />
        <div className={Mstyles.MainDevidor}> </div>
        <Highlights />
  
        <div className={Mstyles.MainDevidor}> </div>
        <SubscriptionsPlan />
  
      </div>
      <div className={Mstyles.MainDevidor}> </div>
      <FooterStickey/>
      <div className={Mstyles.MainDevidor}> </div>
 
      <MainFooter/>



    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};


