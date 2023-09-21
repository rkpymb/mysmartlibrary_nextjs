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
import Navbarmain from '../src/components/Parts/Navbarmain'
import TSlistGrid from '../pages/components/List/TSlistGrid'
import CatlistTagType from '../pages/components/List/CatlistTagType'
import CommingSoon from '../src/components/Parts/CommingSoon'
import Footer from '../src/components/Parts/Footer'

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
   
   
  });
  return (
    <OverviewWrapper>
      <Head> 
        <title>SuperMarks.in</title>
      </Head>
      <Navbarmain/>
      {!Loading &&
        <div>
          
          <div className={Mstyles.ContainerMain}>
            <div className={Mstyles.HeroBoxTwoTitle}>
              <h1> Improve Your Marks with <span className={Mstyles.primaryColor}> Experienced Experts</span> made Test Series</h1>
              <span>All our test series are created by top educators, and each question is meticulously reviewed by the best experts</span>
            </div>
            <div style={{ minHeight: '50px' }}></div>
            <div className={Mstyles.SmallHeadline}>
              <h2>Choose Test Series from<span className={Mstyles.primaryColor}> Different Categories</span></h2>
            </div>
           
            <CatlistTagType />
            <div style={{ minHeight: '50px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle}>
              <h1> Recommended <span className={Mstyles.primaryColor}> Test Series</span> </h1>
              <span>We have listes the best Test series for your best journey for preparation of different category.</span>
            </div>
            <div style={{ minHeight: '50px' }}></div>
           
            <TSlistGrid />
            <div style={{ minHeight: '30px' }}></div>
           
          </div>
          <div style={{ minHeight: '130px' }}></div>
      
       
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
