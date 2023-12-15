import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import Mstyles from '../../Styles/home.module.css'

import Footer from 'src/components/Footer';

import Badge from '@mui/material/Badge';
import MyTSSubmitlist from '../components/List/MyTSSubmitlist';
import { useRouter } from 'next/router'

import {

  styled
} from '@mui/material';
function DashboardCrypto() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    Contextdata.ChangeMainTitle('My Results')
    if (Contextdata.IsLogin == true) {
      setIsLoading(false);
    } else {

      router.push('/Login')

    }
  });

  return (
    <>
      <Head>
        <title>My Courses</title>
      </Head>
      <div className={Mstyles.Containerpadding}>
      <div className={Mstyles.OnlyMobile}>
          <div style={{ minHeight: '30px' }}></div>
        </div>
        {!isLoading &&
          <MyTSSubmitlist />
        }
      </div>


     
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
