// pages/Overview.js
import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import Mstyles from '/Styles/main.module.css';

import NavBar from './components/Main/NavBar';
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '../context/auth/CheckloginContext';
import Head from 'next/head';
import HeroBox from './components/Main/HomePage/HeroBox';
import Highlights from './components/Main/HomePage/Highlights';
import HighlightsA from './components/Main/HomePage/HighlightsA';
import KeyFeatures from './components/Main/HomePage/KeyFeatures';
import GoliveSteps from './components/Main/HomePage/GoliveSteps';
import DemoBox from './components/Main/HomePage/DemoBox';
import SubscriptionsPlan from './components/Main/HomePage/SubscriptionsPlan';
import MainFooter from './components/Main/MainFooter';
import { AppDesc, AppName } from '../Data/config';
import { useRouter } from 'next/router';
import useSlideUpOnScroll from './hooks/useSlideUpOnScroll'; // Import the custom hook

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
  const router = useRouter();
  const [Loading, setLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext);
  const elementsRef = useSlideUpOnScroll(); // Use the custom hook

  useEffect(() => {
    setLoading(false);
    Contextdata.ChangeMainLoader(false);
  }, [Contextdata]);

  return (
    <OverviewWrapper>
      <Head>
        <title>My Smart Library: One Stop Solution for Self Study Center Business.</title>
      </Head>

      <NavBar />

      <div className={Mstyles.Container}>
        <div ref={el => elementsRef.current[0] = el} className="slideUp">
          <HeroBox />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[1] = el} className="slideUp">
          <HighlightsA />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[2] = el} className="slideUp">
          <KeyFeatures />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[3] = el} className="slideUp">
          <DemoBox />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[4] = el} className="slideUp">
          <GoliveSteps />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[5] = el} className="slideUp">
          <Highlights />
        </div>
        <div  className={Mstyles.MainDevidor}> </div>
        <div ref={el => elementsRef.current[6] = el} className="slideUp">
          <SubscriptionsPlan />
        </div>
      </div>

      <div  className={Mstyles.MainDevidor}> </div>
      <MainFooter />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};
