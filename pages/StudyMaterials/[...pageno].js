import { useState, useEffect, useContext } from 'react';
import {
    
    Box,
    
    styled
} from '@mui/material';

import Footer from '../../src/components/Parts/Footer'

import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';
import SMlistMainCat from '../components/List/SMlistMainCat'
import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'

import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {
    const slug = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/MainCatData`, requestOptions);
    const DataA = await response.json();


    return {

        props: { DataA }, // will be passed to the page component as props
    }

}



const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Overview({ DataA }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);

    const Contextdata = useContext(CheckloginContext)

    
    const [CatMainData, setCatMainData] = useState({});

    useEffect(() => {
        setCatMainData(DataA.MainCatdata[0])
        setLoading(false)
    }, [Contextdata.IsLogin]);

    return (
        <OverviewWrapper>
            <Head>
                <title>Study Materials : {CatMainData && CatMainData.name}</title>
            </Head>
            <MainNavBarSecond CheckPComplete={false} />
            <div className={Mstyles.MainBoxContainer}>
                <div className={Mstyles.secndHeder}>
                    <div className={Mstyles.secndHederBox}>
                        <div className={Mstyles.secndHederBoxA}>
                            <div>
                                <IconButton aria-label="cart" onClick={() => router.back()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                            </div>
                            <div>
                                {!Loading &&

                                    <span><span className={Mstyles.linkpageitemClick}>Study Materials</span>  / <span className={Mstyles.linkpageitem}>{CatMainData && CatMainData.name.slice(0, 60)}</span></span>
                                }


                            </div>
                        </div>
                        <div className={Mstyles.secndHederBoxB}>
                        </div>
                    </div>
                </div>

                <div className={Mstyles.MainBoxContainerInner}>
                    <div>
                    <div className={Mstyles.SmallConntetboxTopDevider}></div>

                        {!Loading &&
                            <SMlistMainCat slug={CatMainData && CatMainData.slug} />
                        }
                    </div>

                </div>


            </div>




            <div className={Mstyles.containerFull}>
                <div className={Mstyles.OnlyDesktop}>
                    <div style={{ minHeight: '20px' }}></div>
                </div>
                <Footer />

            </div>




        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
