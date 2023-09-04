import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Gridlist from 'src/components/Academics/Gridlist';
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
        <title>Supermarks Dashboard</title>
      </Head>
     
      <Container>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          
          <Grid item lg={8} xs={12}>
            <Gridlist />
          </Grid>
        
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
