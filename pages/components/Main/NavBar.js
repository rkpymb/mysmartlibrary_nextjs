import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/main.module.css';
import HomeNav from './HomeMenu'
import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';

import { LuLogIn, LuUser2 } from "react-icons/lu";

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
        <nav className={`${Mstyles.navbar} ${scrolled ? Mstyles.White : Mstyles.Transprent}`}>
            <div className={Mstyles.navContent}>
                <div className={Mstyles.navContentA}>
                    <div className={Mstyles.NavLogo}>
                        <img src={`/logo/logo.png`} alt='logo' width={'100%'} />

                    </div>
                </div>
                <div className={Mstyles.navContentB}>
                    <div>
                        <HomeNav />
                    </div>
                    <div className={Mstyles.OnlyDesktop}>
                        <div className={Mstyles.NavBtn}>

                            <LoadingButton
                                startIcon={<LuUser2 />}
                                loadingPosition="end"
                                variant="outlined"
                                loading={false}
                                fullWidth
                                size='small'

                            >
                                <span>Signup</span>
                            </LoadingButton>
                            <div style={{ width: '10px' }} ></div>
                            <LoadingButton

                                startIcon={<LuLogIn />}
                                loadingPosition="end"
                                variant="contained"
                                loading={false}
                                fullWidth
                                size='small'
                               
                            >
                                <span>Login</span>
                            </LoadingButton>
                           
                        </div>
                    </div>
                    <div className={Mstyles.OnlyMobile}>
                        <div className={Mstyles.NavBtn}>

                           
                            <div style={{ width: '10px' }} ></div>
                            <LoadingButton

                                startIcon={<LuLogIn />}
                                loadingPosition="end"
                                variant="outlined"
                                loading={false}
                                fullWidth
                                size='small'
                               
                            >
                                <span>Login</span>
                            </LoadingButton>
                           
                        </div>
                    </div>

                </div>
            </div>

        </nav>
    );
};

export default NavBar;
