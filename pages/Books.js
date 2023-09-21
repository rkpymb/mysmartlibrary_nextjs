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
    if (Contextdata.IsLogin == true) {
      // router.push('/dashboards/main')
    } else {
      // router.push('/Login')
    }
   
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
            <CommingSoon/>
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
