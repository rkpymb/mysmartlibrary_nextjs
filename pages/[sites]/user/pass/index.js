import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';
import Image from 'next/image';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'
import MyLBPassList from './MyLBPassList'

import { useRouter, useParams } from 'next/router'


const OverviewWrapper = styled(Box)(
    ({ theme }) => `
  
    background: ${theme.palette.common.white};
  
   
`
);

function Overview() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    return (
        <OverviewWrapper >
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>
            <NavbarTitle Title={'Subscription Pass'} />
            <div className={Mstyles.Minh100vh}>
                <div className={Mstyles.MboxSmall}>
                    <div className={Mstyles.OnlyDesktop}>
                        <div style={{ height: '20px' }}></div>
                    </div>
                  
                    <MyLBPassList />
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


