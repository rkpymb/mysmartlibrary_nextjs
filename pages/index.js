import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../Styles/home.module.css'
import CheckloginContext from '../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';

import MainNavBar from '../src/components/Parts/Navbar/MainNavBar'
import HeroBox from '../src/components/Parts/HeroBox'
import HeroBoxTwo from '../src/components/Parts/HeroBoxTwo'
import HeroBoxThree from '../src/components/Parts/HeroBoxThree'
import HeroBoxSix from '../src/components/Parts/HeroBoxSix'
import HeroBoxFive from '../src/components/Parts/HeroBoxFive'
import AppHeroBox from '../src/components/Parts/AppHeroBox'
import Footer from '../src/components/Parts/Footer'
import VideoListHome from './components/List/VideoListHome'
import TSlistGridHome from './components/List/TSlistGridHome'
import SMlistHome from './components/List/SMlistHome'
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
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    setLoading(false)
    if (Contextdata.IsLogin == true) {
      // router.push('/dashboards/main')
    } else {
      // router.push('/Login')
    }

  });
  return (
    <OverviewWrapper>
      <Head>
      
      </Head>
      <MainNavBar />
      {!Loading &&
        <div>
          <div className={Mstyles.containerFull} >
            <HeroBox />
          </div>

          <div className={Mstyles.HeroBoxTwoV}>
            <HeroBoxTwo />

          </div>




          <div>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>
            <div className={Mstyles.mobilepadding}>
              <HeroBoxThree />
            </div>

          </div>

          <div>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>
            <div className={Mstyles.mobilepadding}>
              <HeroBoxFive />
            </div>

          </div>

          <div className={Mstyles.HeroBoxTwoVBox}>
            <div className={Mstyles.container}>
              <HeroBoxSix />
            </div>
          </div>
          <div className={Mstyles.container} >
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>

            <div className={Mstyles.mobilepadding}>
              <TSlistGridHome />
            </div>
          </div>
          <div className={Mstyles.container} >
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>

            <div className={Mstyles.mobilepadding}>
              <VideoListHome />
            </div>
          </div>
          <div className={Mstyles.container} >
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>

            <div className={Mstyles.mobilepadding}>
              <SMlistHome />
            </div>
          </div>
          <div className={Mstyles.container}>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '80px' }}></div>
            </div>
            <div className={Mstyles.mobilepadding}>
              <AppHeroBox />
            </div>
            <div style={{ minHeight: '50px' }}></div>
          </div>

          <div className={Mstyles.containerFull}>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ minHeight: '20px' }}></div>
            </div>
            <Footer />

          </div>

        </div>

      }



    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
