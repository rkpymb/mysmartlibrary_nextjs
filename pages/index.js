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
import KeyFeatures from './components/Main/HomePage/KeyFeatures'
import GoliveSteps from './components/Main/HomePage/GoliveSteps'

import Footer from '../src/components/Parts/Footer'

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
        <title>My Smart Library</title>
      </Head>

      <NavBar />

      <div className={Mstyles.Container}>

        <HeroBox />
        <div className={Mstyles.MainDevidor}> </div>
        <Highlights />
        <div className={Mstyles.MainDevidor}> </div>
        <KeyFeatures />
        <div className={Mstyles.MainDevidor}> </div>
        <GoliveSteps />
        <div className={Mstyles.MainDevidor}> </div>
      </div>




    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};


