import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CheckloginStates from '../context/auth/CheckloginStates'
const clientSideEmotionCache = createEmotionCache();
import BackdropLoader from '/src/components/Parts/BackdropLoader'
import Script from 'next/script';

import '../Styles/globals.css'

import { useEffect } from 'react';
function TokyoApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);








  return (

    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FM1WTL6LJF"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FM1WTL6LJF');
        `}
      </Script>
      <CheckloginStates >
        {/* Same as */}

        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <SidebarProvider>
            <ThemeProvider >
              <BackdropLoader />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </CheckloginStates >
    </>


  );
}

export default TokyoApp;
