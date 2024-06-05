import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';

import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import AddonList from '../../../src/components/Parts/StudyCenter/Addon/AddonList'

import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'


import { useRouter, useParams } from 'next/router'

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
        if (Contextdata.WebData) {
            setLoading(false)
        }
    }, [Contextdata.WebData]);

    return (
        <OverviewWrapper>
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>
            <NavbarTitle Title={'Buy Addons'} />

            <div>


                <div className={Mstyles.Minh100vh}>
                    {!Loading &&
                     <div className={Mstyles.MboxSmall}>
                     <div className={Mstyles.OnlyDesktop}>
                         <div style={{ height: '20px' }}></div>
                     </div>
                     <div className={Mstyles.P7}>
                         <AddonList />
                     </div>
                 </div>
                    }

                   

                </div>

            </div>
            <div className={Mstyles.FDevider} ></div>
        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};


