import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'
import { BiHomeAlt2, BiCartAlt, BiCategory, BiPhoneCall, BiQrScan } from "react-icons/bi";
import { LuTicket } from "react-icons/lu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        border: `2px solid ${theme.palette.background.paper}`,
    },
}));

import {

    styled
} from '@mui/material';

const FooterNav = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    return (
        <div>
           
            <div className={Mstyles.FooterNav}>
                    <div className={Mstyles.FIconMenuGrid}>
                        <div className={Mstyles.FIconMenuItem}>
                            <IconButton aria-label="Home" onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}`)}>
                                <StyledBadge color="secondary">
                                    <BiHomeAlt2 />
                                </StyledBadge>
                            </IconButton>
                            <span className={Mstyles.FIconMenuItemText}>Home</span>
                        </div>
                        <div className={Mstyles.FIconMenuItem}>
                            <IconButton aria-label="Pass" onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/subscription-pass`)}>
                                <StyledBadge color="secondary">
                                    <LuTicket />
                                </StyledBadge>
                            </IconButton>
                            <span className={Mstyles.FIconMenuItemText}>Buy Pass</span>
                        </div>
                        <div className={Mstyles.FIconMenuItem}>
                            <IconButton aria-label="Scan" onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/attendance/`)}>
                                <StyledBadge color="secondary">
                                    <BiQrScan />
                                </StyledBadge>
                            </IconButton>
                            <span className={Mstyles.FIconMenuItemText}>Scan</span>
                        </div>
                        <div className={Mstyles.FIconMenuItem}>
                            <IconButton aria-label="Buy Addons" onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/addons`)}>
                                <StyledBadge color="secondary">
                                    <BiCategory />
                                </StyledBadge>
                            </IconButton>
                            <span className={Mstyles.FIconMenuItemText}>Buy Addons</span>
                        </div>

                        <div className={Mstyles.FIconMenuItem}>
                            <IconButton aria-label="Home" onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/contact`)}>
                                <StyledBadge color="secondary">
                                    <BiPhoneCall />
                                </StyledBadge>
                            </IconButton>
                            <span className={Mstyles.FIconMenuItemText}>Contact</span>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default FooterNav
