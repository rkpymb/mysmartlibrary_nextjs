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
import Mstyles from '../Styles/library.module.css'
import CheckloginContext from '../context/auth/CheckloginContext'

import Head from 'next/head';

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
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
   
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
        <title>{AppName} : {AppDesc}</title>
      </Head>
    
      <div className={Mstyles.MNavDevider} ></div>
      {!Loading &&
        <div>
          <div style={{ height: '10px' }}></div>
         
         ss
          <div className={Mstyles.MSecDevider} ></div>

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


