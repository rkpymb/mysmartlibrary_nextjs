import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/library.module.css';

import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';

import { LuUserCircle2 } from "react-icons/lu";
import SelectBranch from '../../Parts/StudyCenter/SelectBranch'
import UserMenu from './UserMenu'

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

const YourComponent = () => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (Contextdata.WebData) {
            setLoading(false);
        }
    }, [Contextdata.WebData,Contextdata.Data]);



    return (
        <div className={Mstyles.navbarMain}>
            <nav className={Mstyles.navbarMainBox}>
                <div className={Mstyles.Navbar}>
                    <div className={Mstyles.NavA}>
                        <div className={Mstyles.logo} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}`)}>
                            <div className={Mstyles.logomain}>
                                {Loading ? <div>
                                    <Skeleton variant="rounded" animation='wave' width={'100%'} height={30} />
                                </div> :
                                    <div>
                                        <img src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.WebData.WebData.Logo || '1712917586717-101055055.png'}`} alt='logo' width={'100%'} />
                                        
                                    </div>

                                }
                            </div>
                        </div>
                        <div className={Mstyles.OnlyDesktop}>
                            {BrowserView &&
                                <SelectBranch ShowType={1} />

                            }

                        </div>

                    </div>
                    <div className={Mstyles.NavB}>
                    <div className={Mstyles.OnlyMobile}>
                    {MobileView &&
                        <SelectBranch ShowType={1} />
                    }

                </div>
            
                        <div className={Mstyles.loginbtnTopBtns}>
                            {!Contextdata.IsLogin && (
                                <div className={Mstyles.LoginBtnMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/Login`)}>
                                    <span>Log in</span>
                                </div>
                            )}

                            {Contextdata.IsLogin && (
                                <div>
                                    <UserMenu />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
           

        </div>
    );
};

export default YourComponent;
