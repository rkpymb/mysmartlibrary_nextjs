import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';
import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import WebsiteMainCounter from '/src/components/Parts/StudyCenter/WebsiteMainCounter'

import WhyChooseus from '/src/components/Parts/StudyCenter/WhyChooseus'

import LbContactboxHome from '/src/components/Parts/StudyCenter/LbContactboxHome'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'


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
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
   
`
);


export async function getServerSideProps(context) {

    const webid = context.query.sites;
    const PageSlug = 'terms-and-conditions';
   
    const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webid: webid, PageSlug: PageSlug, token: process.env.MYKEY })
    };

    const response = await fetch(`${process.env.API_URL}Openendpoint/get_page`, requestOptions);
    const PD = await response.json();
    return {
        props: { PD },
    }

}


function Overview({ PD }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)

    useEffect(() => {
        setLoading(true)
        console.log(PD.PStatus)
            if (Contextdata.WebData && PD && PD.PStatus == true) {
    
                setLoading(false)
    
            } 
        }, [Contextdata.WebData, router.query]);
    





    return (
        <OverviewWrapper>
            <WebsiteData />

            {!Loading &&

                <div>
                    <Head>
                    <title>{PD && PD.Pdata.PageTitle}</title>
                    </Head>
                    <NavBarTop SubTitle={false} SubTitleText={null} />
                    <div className={Mstyles.MNavDevider} ></div>
                    <div className={Mstyles.Minh100vh}>
                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.MSecDevider} ></div>

                            <div className={Mstyles.P7}>
                                <div className={Mstyles.Aboutbox}>
                                    <div className={Mstyles.AboutboxText}>
                                        <h1>{PD.Pdata.PageTitle} </h1>

                                        <div className={Mstyles.HeroBoxTwoTitlespan} ><span>{PD.Pdata.PageData}</span></div>

                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.MSecDevider} ></div>

                    </div>

                    <Footer />

                </div>

            }

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};


