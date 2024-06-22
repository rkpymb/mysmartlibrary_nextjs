import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Card,
  styled
} from '@mui/material';

import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'

import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'

import FooterNav from '/src/components/Parts/Navbar/FooterNav'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { API_URL, DomainURL } from '/Data/config'
import Footer from '/src/components/Parts/Footer'

import { AppDesc, AppName } from '/Data/config'
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
    
    background: ${theme.palette.common.white};
   
   
`
);


export async function getServerSideProps(context) {
  const webid = context.query.sites;
  const PageSlug = context.query.pageno[0];
  console.log(webid)
  console.log(PageSlug)
  const requestOptions = {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PageSlug: PageSlug, webid: webid, token: process.env.MYKEY })
  };

  const response = await fetch(`${process.env.API_URL}Openendpoint/get_page`, requestOptions);
  const PageData = await response.json();
  return {
    props: { PageData },
  }

}


function Overview({ PageData }) {
  const router = useRouter()
  const [Loading, setLoading] = useState(false);
  const [manifestURL, setManifestURL] = useState(null);
  const Contextdata = useContext(CheckloginContext)

  useEffect(() => {
    console.log(PageData)

    if (Contextdata.WebData) {
      if (PageData.PStatus == true) {
        setLoading(false)

      } else {
        alert('Website not Found')
        // router.push(`/${Contextdata.WebData.webid}`)
      }

    }
  }, [Contextdata.WebData, Contextdata.Data]);

  return (
    <OverviewWrapper>

      <Head>
        {/* <title>{PageData.WebData && PageData.WebData.WebName}</title>

        <meta property="og:title" name="og:title" content={PageData.WebData && PageData.WebData.WebName} />

        <meta name="description" property="og:description" content={PageData.WebData && PageData.WebData.WebData.ShortDesc} />
        <meta property="og:image" name="og:image" content={PageData.WebData && `${DomainURL}${PageData.WebData.WebData.Logo}`} />
        <meta property="og:url" name="og:url" content={PageData.WebData && `${DomainURL}${PageData.PageSlug}`} />
        <link rel="manifest" href={manifestURL && manifestURL} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" /> */}
      </Head>
      <WebsiteData />
      <NavBarTop />
      <div className={Mstyles.MNavDevider} ></div>
      <NavbarTitle Title={PageData && PageData.Pdata.PageTitle} />
      <div className={Mstyles.Minh100vh}>
        {!Loading &&

          <div className={Mstyles.MboxSmall}>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ height: '20px' }}></div>
            </div>
            <div className={Mstyles.P7}>
              <div className={Mstyles.PageBox}>
                <div className={Mstyles.PageBoxTitle}>
                  <h2>{PageData && PageData.Pdata.PageTitle}</h2>
                </div>

                <div className={Mstyles.PageBoxContent} dangerouslySetInnerHTML={{ __html: PageData && PageData.Pdata.PageData }} />
              </div>

            </div>
          </div>
        }
      </div>

      <div className={Mstyles.FDevider} ></div>

    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <div>{page}</div>;
};


