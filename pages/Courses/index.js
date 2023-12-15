import { useState, useEffect, useContext } from 'react';
import {
 
  Box,
  Card,
  
  styled
} from '@mui/material';


import CourseCatList from '../components/List/CourseCatList'
import Footer from '../../src/components/Parts/Footer'

import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';
import CourselistGrid from '../components/List/CourselistGrid'
import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'

import { useRouter } from 'next/router'


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
  const [Loading, setLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)

 
  return (
    <OverviewWrapper>
      <Head>
        <title>All Courses and Live Batches</title>
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
              <span><span className={Mstyles.linkpageitemClick}>All Courses</span> </span>
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
                <span><span className={Mstyles.HeroBoxTwoTitleBottom}>Best Courses</span> For You</span>
                <div style={{ minHeight: '5px' }}></div>
                <small>we have listed Course for you made by Top Educators and industry experts</small>
              </div>
              <div className={Mstyles.PagePostersB}>
                <img src={`/img/studentcourseposter.png`} alt='img' />
              </div>
            </div>

            <div className={Mstyles.Coursecatbox}>
              <div className={Mstyles.CoursecatboxTitle}>
                <h1>What Do you want Learn ?</h1>
                <span>Choose a category of Topic to Learn</span>
              </div>
              <div style={{ minHeight: '20px' }}></div>
              <CourseCatList />
            </div>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.CoursecatboxTitle} >
              <h1 style={{ color: 'black' }}>Recomended Course For You</h1>
              <span style={{ color: 'black' }}>Enroll into Experts made course and Accelerate Your Career Growth & Upskill Yourself</span>
            </div>
            <div style={{ minHeight: '20px' }}></div>
            <CourselistGrid />

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
