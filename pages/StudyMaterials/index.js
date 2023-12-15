import { useState, useEffect, useContext } from 'react';
import {
  
  Box,
  Card,
 
  styled
} from '@mui/material';



import Footer from '../../src/components/Parts/Footer'

import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';
import SMlist from '../components/List/SMlist'
import SMCategorylist from '../components/List/SMCategorylist'
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
        <title>Study Materials</title>
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
                <span><span className={Mstyles.linkpageitemClick}>Study Materials</span>  </span>
              </div>
            </div>
            <div className={Mstyles.secndHederBoxB}>
            </div>
          </div>
        </div>

        <div className={Mstyles.MainBoxContainerInner}>
        <div className={Mstyles.SmallConntetboxTopDevider}></div>
          <div className={Mstyles.FreevideoBoxMian}>
            
            <SMCategorylist />
            <div style={{ minHeight: '30px' }}></div>
            <SMlist />


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
