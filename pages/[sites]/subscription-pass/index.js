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


import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'

import LBPassList from '/src/components/Parts/StudyCenter/LBPassList'


import { useRouter, useParams } from 'next/router'

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
   
    background: ${theme.palette.common.white};
   
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
            <NavbarTitle Title={'Subscription Passes'} />
           
            <div>


                <div className={Mstyles.Minh100vh}>

                    <div className={Mstyles.Mbox}>
                        <div className={Mstyles.P7}>
                            <LBPassList />
                        </div>
                    </div>

                </div>

            </div>
            <div className={Mstyles.FDevider} ></div>
        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};


