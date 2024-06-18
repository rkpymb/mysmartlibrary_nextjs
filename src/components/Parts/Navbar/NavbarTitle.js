import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'
import { useRouter, useParams } from 'next/router'
import { LuArrowLeft, LuCheckCircle } from "react-icons/lu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { StickyContainer, Sticky } from 'react-sticky';

import Head from 'next/head';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

import {

    styled
} from '@mui/material';


const YourComponent = ({ Title }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)


    return (
        <> <Head >
            <title>{Title}</title>
        </Head>
            <div className={Mstyles.secndHeder}>
                <div className={Mstyles.secndHederBox}>
                    <div className={Mstyles.secndHederBoxA}>
                        <div>
                            <IconButton aria-label="go back" onClick={() => router.back()}>
                                <StyledBadge color="secondary">
                                    <LuArrowLeft />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.secndHederTitle}>
                            <span>{Title}</span>
                        </div>
                    </div>
                    <div className={Mstyles.secndHederBoxB}></div>
                </div>
            </div>
        </>
    );
};

export default YourComponent;
