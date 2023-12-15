import { useState, useEffect, useContext } from 'react';
import {

  Box,
  Card,

  styled
} from '@mui/material';
import TSlistGrid from '../components/List/TSlistGrid'
import TSCatList from '../components/List/TSCatList'

import Footer from '../../src/components/Parts/Footer'


import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';

import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'

import { useRouter, useParams } from 'next/router'


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
 
  const Contextdata = useContext(CheckloginContext)
 

  return (
    <OverviewWrapper>
      <Head>
        <title>All Test Series</title>
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
              <span><span className={Mstyles.linkpageitemClick}>Test Series</span> </span>
              </div>
            </div>
            <div className={Mstyles.secndHederBoxB}>
            </div>
          </div>
        </div>


        <div className={Mstyles.MainBoxContainerInner}>
        <div className={Mstyles.ContainerSec}>
              <div className={Mstyles.SmallConntetboxTopDevider}></div>
              <div className={Mstyles.PagePosters}>
                <div className={Mstyles.PagePostersA}>
                  <span>Attempt Our Best <span className={Mstyles.HeroBoxTwoTitleBottom}>Test Series</span></span>
                  <div style={{ minHeight: '5px' }}></div>
                  <small>we have listed Test Series for you made by Top Educators and industry experts</small>
                </div>
                <div className={Mstyles.PagePostersB}>
                  <img src={`/img/Exam-PNG-Download-Image.png`} alt='img' />
                </div>
              </div>

              <div className={Mstyles.Coursecatbox}>
                <div className={Mstyles.CoursecatboxTitle}>
                  <h1>Test Series by Topic</h1>
                  <span>Choose a category of Topic to Join Test Series</span>
                </div>
                <div style={{ minHeight: '20px' }}></div>
                <TSCatList />
              </div>
              <div style={{ minHeight: '20px' }}></div>
              <div className={Mstyles.CoursecatboxTitle} >
                <h1 style={{ color: 'black' }}>Recomended Test Series For You</h1>
                <span style={{ color: 'black' }}>Enroll into Experts made Test Series and Accelerate Your Career Growth & Upskill Yourself</span>
              </div>
              <div style={{ minHeight: '20px' }}></div>
              <TSlistGrid />

              <div style={{ minHeight: '50px' }}></div>
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
