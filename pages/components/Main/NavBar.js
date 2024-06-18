import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/main.module.css';

import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';

import { LuUserCircle2 } from "react-icons/lu";


import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { ShortAbout, MediaFilesUrl, MediaFilesFolder, Contactinfo, DomainURL } from '/Data/config';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { LuArrowLeft } from "react-icons/lu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const NavBar = () => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (Contextdata.WebData) {
            setLoading(false);
        }
    }, [Contextdata.WebData, Contextdata.Data]);



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={`${Mstyles.navbar} ${scrolled ? Mstyles.scrolled : ''}`}>
            <div className={Mstyles.navContent}>
                <div className={Mstyles.navContentA}>
                    <div className={Mstyles.NavLogo}>
                        <img src={`/logo/logo.png`} alt='logo' width={'100%'} />

                    </div>
                </div>
                <div className={Mstyles.navContentB}>
                    gtyfy
                </div>
            </div>

        </nav>
    );
};

export default NavBar;
