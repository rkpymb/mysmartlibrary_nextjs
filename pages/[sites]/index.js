import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';

import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';
import InstallModal from '../../src/components/InstallModal';

import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'

import FooterNav from '/src/components/Parts/Navbar/FooterNav'
import BranchPosterSlider from '../../src/components/Parts/StudyCenter/BranchPosterSlider'
import HomeAbout from '../../src/components/Parts/StudyCenter/HomeAbout'
import BranchPhotos from '../../src/components/Parts/StudyCenter/BranchPhotos'
import Lbreviews from '../../src/components/Parts/StudyCenter/Lbreviews'
import LbAmenities from '../../src/components/Parts/StudyCenter/LbAmenities'
import WhyChooseus from '../../src/components/Parts/StudyCenter/WhyChooseus'
import LbContactboxHome from '../../src/components/Parts/StudyCenter/LbContactboxHome'
import LBPassList from '../../src/components/Parts/StudyCenter/LBPassList'
import UserBoxHome from '/src/components/Parts/StudyCenter/UserBoxHome'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { API_URL, DomainURL } from '/Data/config'
import Footer from '/src/components/Parts/Footer'

import { useRouter, useParams } from 'next/router'
import SelectBranch from '../../src/components/Parts/StudyCenter/SelectBranch'


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
   
    const Contextdata = useContext(CheckloginContext)

    useEffect(() => {
        if (WD.WebData && WD.WebData.isActive) {
            Contextdata.ChangeWebData(WD.WebData)
            Contextdata.ChangeWebSettings(WD.WebSetings.SettingsData)
            setLoading(false)

        } else {
            alert('Website not Found')
            router.push('/')
        }
    }, [Contextdata.WebData, Contextdata.Data]);

    return (
        <OverviewWrapper>
            <Head>
                <title>{WD.WebData && WD.WebData.WebName}</title>

                <meta property="og:title" name="og:title" content={WD.WebData && WD.WebData.WebName} />

                <meta name="description" property="og:description" content={WD.WebData && WD.WebData.WebData.ShortDesc} />
                <meta property="og:image" name="og:image" content={WD.WebData && `${DomainURL}${WD.WebData.WebData.Logo}`} />
                <meta property="og:url" name="og:url" content={WD.WebData && `${DomainURL}${WD.webid}`} />
               
            </Head>

            {!Loading &&

                <div>

                    <NavBarTop SubTitle={false} SubTitleText={null} />

                    <div className={Mstyles.Minh100vh}>
                        {!Contextdata.UserBranchData ?

                            <div className={Mstyles.SelectBranchMb}>
                                <div className={Mstyles.SelectBranchMbText}>
                                    <span>Select Branch</span>
                                    <small>Please Select a Branch to Continue</small>

                                </div>
                                <div style={{ height: '10px' }}></div>


                                <div className={Mstyles.SelectBranchMbBtn}>
                                    <SelectBranch ShowType={2} />

                                </div>
                            </div>
                            :
                            <div className={Mstyles.Minh100vh}>

                                <div className={Mstyles.OnlyDesktop} >
                                    <div className={Mstyles.Mbox} >
                                        <UserBoxHome />
                                    </div>
                                </div>

                                <div className={Mstyles.Mbox} >
                                    <div className={Mstyles.P7}>
                                        <BranchPosterSlider />
                                    </div>
                                </div>
                                <div className={Mstyles.OnlyMobile} >
                                    <div className={Mstyles.MSecDeviderSmall} ></div>
                                    <div className={Mstyles.Mbox} >
                                        <UserBoxHome />
                                    </div>
                                    <div className={Mstyles.MSecDevider} ></div>
                                </div>
                                <div className={Mstyles.Mbox} >
                                    <div className={Mstyles.MobileDiv} >
                                        <HomeAbout />
                                    </div>
                                </div>

                                <div className={Mstyles.MSecDevider} ></div>

                                <div className={Mstyles.Mbox} >
                                    <WhyChooseus />
                                </div>
                                <div className={Mstyles.OnlyMobile} >
                                    <div className={Mstyles.MSecDevider} ></div>
                                </div>


                                <div className={Mstyles.OnlyDesktop} >
                                    <div className={Mstyles.MSecDevider} ></div>
                                </div>
                                <div className={Mstyles.Mbox} >
                                    <div className={Mstyles.MobileDiv} >
                                        <LbAmenities />
                                    </div>
                                </div>

                                <div className={Mstyles.OnlyMobile} >
                                    <div className={Mstyles.MSecDevider} ></div>
                                </div>

                                <div className={Mstyles.Mbox} >
                                    <BranchPhotos />
                                </div>


                                <div className={Mstyles.Mbox} >
                                    <LBPassList />
                                </div>


                                <div className={Mstyles.Mbox} >
                                    <Lbreviews />
                                </div>



                                <div className={Mstyles.Mbox} >
                                    <LbContactboxHome />
                                </div>

                            </div>
                        }




                    </div>
                    {Contextdata.UserBranchData &&
                        <div>
                            {isMobile &&
                                <FooterNav />

                            }


                            <Footer />
                        </div>

                    }
                    <InstallModal />




                </div>

            }

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


