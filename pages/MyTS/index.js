import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import Mstyles from '../../Styles/home.module.css'

import Footer from 'src/components/Footer';

import Badge from '@mui/material/Badge';
import MyTSList from '../components/List/MyTSList';
import { useRouter } from 'next/router'

import {

  styled
} from '@mui/material';
function DashboardCrypto() {
  const router = useRouter()
  
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    Contextdata.ChangeMainTitle('My Test Series')
   
  },[router.query]);

  return (
    <>
      <Head>
        <title>My Test Series</title>
      </Head>
      <div className={Mstyles.Containerpadding}>
      <div className={Mstyles.OnlyMobile}>
          <div style={{ minHeight: '30px' }}></div>
        </div>
      <MyTSList />
      </div>


     
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
