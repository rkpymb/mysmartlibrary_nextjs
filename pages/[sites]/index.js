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
import BranchPosterSlider from '../../src/components/Parts/StudyCenter/BranchPosterSlider'
import HomeAbout from '../../src/components/Parts/StudyCenter/HomeAbout'
import BranchPhotos from '../../src/components/Parts/StudyCenter/BranchPhotos'
import Lbreviews from '../../src/components/Parts/StudyCenter/Lbreviews'
import LbAmenities from '../../src/components/Parts/StudyCenter/LbAmenities'
import WhyChooseus from '../../src/components/Parts/StudyCenter/WhyChooseus'
import LbContactboxHome from '../../src/components/Parts/StudyCenter/LbContactboxHome'
import LBPassList from '../../src/components/Parts/StudyCenter/LBPassList'
import UserBoxHome from '/src/components/Parts/StudyCenter/UserBoxHome'

import {API_URL} from '/Data/config'
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

    const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webid: webid, token: process.env.MYKEY })
    };

    const response = await fetch(`${process.env.API_URL}Openendpoint/getwebdata`, requestOptions);
    const WD = await response.json();
    return {
        props: { WD },
    }

}


function Overview({ WD }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [manifestURL, setManifestURL] = useState(null);
    const Contextdata = useContext(CheckloginContext)

    useEffect(() => {

        if (WD && WD.WebData.isActive) {
            Contextdata.ChangeWebData(WD.WebData)

            setManifestURL(`${API_URL}Openendpoint/manifest.json?webid=${WD.WebData.webid}`)
            setLoading(false)

        } else {
            alert('Website not Found')
        }
    }, [Contextdata.WebData, Contextdata.Data]);

    return (
        <OverviewWrapper>

            {!Loading && manifestURL &&

                <div>
                    <Head>
                        <title>{Contextdata.WebData && Contextdata.WebData.WebName}</title>

                        <link rel="manifest" href={manifestURL} />
                        <meta name="theme-color" content="#ffffff" />
                        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                    </Head>
                    <NavBarTop SubTitle={false} SubTitleText={null} />
                    <div className={Mstyles.MNavDeviderSmall} ></div>
                    <div className={Mstyles.Minh100vh}>

                        <div className={Mstyles.Mbox} >

                            <div className={Mstyles.P7}>
                                <UserBoxHome />
                            </div>
                        </div>

                        <div className={Mstyles.Mbox} >

                            <div className={Mstyles.P7}>
                                <BranchPosterSlider />
                            </div>
                        </div>
                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.P7}>
                                <HomeAbout />
                            </div>
                        </div>
                        <div className={Mstyles.MSecDevider} ></div>

                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.P7}>
                                <WhyChooseus />
                            </div>
                        </div>
                        <div className={Mstyles.MSecDevider} ></div>
                        <div className={Mstyles.Mbox} >
                            <LbAmenities />
                        </div>

                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.P7}>
                                <BranchPhotos />
                            </div>
                        </div>


                        <div className={Mstyles.Mbox} >
                            <LBPassList />
                        </div>


                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.P7}>
                                <Lbreviews />
                            </div>
                        </div>



                        <div className={Mstyles.Mbox} >
                            <div className={Mstyles.P7}>
                                <LbContactboxHome />
                            </div>
                        </div>
                        <div className={Mstyles.MSecDevider} ></div>
                        <div style={{ textAlign: 'center', margin: 'auto', margin: '50px' }} >
                            <b>Yay! You have seen it all 🎉</b>
                        </div>

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


