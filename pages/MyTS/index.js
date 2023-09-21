import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import PageHeader from 'src/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import NextLink from 'next/link';

import MyTSList from '../components/List/MyTSList';

import AddTs from '../components/Add/AddTs'
import {
  Button,
  Card,

  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
function DashboardCrypto() {
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      console.log('Login')
    } else {
      // setIsLoading(true);
      // router.push('/Login')
      console.log('Not Login')
    }
  });
  return (
    <>
      <Head>
        <title>My Test Series</title>
      </Head>

      <Container className={MYS.min100vh}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pb: 3, mt: 5
          }}
        >
          <Typography variant="h3">My Test Series</Typography>
       
        </Box>
        <MyTSList />
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
