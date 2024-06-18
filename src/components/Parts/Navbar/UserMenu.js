import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'
import IconButton from '@mui/material/IconButton';

import { LuHome, LuListOrdered, LuTicket, LuCalendarCheck, LuChevronRight, LuSettings, LuUserCog2, LuCode2, LuWallet, LuLineChart, LuX, LuLogOut } from "react-icons/lu";
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


import Drawer from '@mui/material/Drawer';
import LoadingButton from '@mui/lab/LoadingButton';
// import ThemeSwitch from './ThemeSwitch'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

import { useRouter, useParams } from 'next/router'

const UserMenu = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [OpenMenu, setOpenMenu] = React.useState(false);


    const HandleOpenMenu = async () => {
        setOpenMenu(true)
    }
    const HandleCloseMenu = async () => {
        setOpenMenu(false)
    }

    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.reload();
    };

    const LogoutBtn = async () => {

        let text = "Do you Really want to log out?";
        if (confirm(text) == true) {
            removeCookie('jwt_token');

        }
    };


    return (
        <div style={{ cursor: 'pointer' }}>

            <div className={Mstyles.Topdpbox} onClick={HandleOpenMenu}>
                <div className={Mstyles.TopdpboxA}>
                    <Avatar
                        alt={Contextdata.Data.name}
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.dp}`}
                        sx={{ width: 35, height: 35 }}
                    />
                </div>
                <div className={Mstyles.TopdpboxB}>
                    <small>Welcome</small>
                    <span>{Contextdata.Data.name}</span>
                </div>
            </div>
            <Drawer
                anchor={'right'}
                open={OpenMenu}
                onClose={HandleCloseMenu}
                onOpen={HandleOpenMenu}
            >
                <div className={Mstyles.OnlyMobile}>
                    <div style={{ height: 10 }}></div>
                </div>
                <div className={Mstyles.VmenuHeader}>
                    <div className={Mstyles.VmenuHeaderA}>
                        <div className={Mstyles.Avatarbox}>
                            <Avatar
                                onClick={HandleOpenMenu}
                                alt={Contextdata.Data.name}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.dp}`}
                                sx={{ width: 40, height: 40 }}
                            />


                            <div style={{ width: 10 }}></div>
                            <div>
                                <div>  <span>{Contextdata.Data.name}</span></div>
                                <div className={Mstyles.unametext}>  <small>{Contextdata.Data.mobile}</small></div>
                                <div style={{ height: 10 }}></div>

                            </div>
                        </div>
                    </div>
                    <div className={Mstyles.VmenuHeaderB} >

                        <IconButton
                            onClick={HandleCloseMenu}
                        >
                            <LuX size={20} />
                        </IconButton>
                    </div>
                </div>
                <div className={Mstyles.Vmenu} onClick={HandleCloseMenu}>

                    {/* <ThemeSwitch/> */}
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}`)}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuHome size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Home
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/profile_settings`)}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuSettings size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Profile Settings
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/pass`)}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuTicket size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                My Pass
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/attendance`)}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuCalendarCheck size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Attendance
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>


                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/wallet`)}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuWallet size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                My Wallet
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>


                    <div className={Mstyles.VmenuItemMainC}>

                        <div className={Mstyles.VmSmallItem} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/about`)}>
                            <span>• About us</span>
                        </div>

                        <div className={Mstyles.VmSmallItem} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/contact`)}>
                            <span>• Contact us</span>
                        </div>
                        <div className={Mstyles.VmSmallItem} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/privacy-policy`)}>
                            <span>• Privacy Policy</span>
                        </div>
                        <div className={Mstyles.VmSmallItem} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/terms-and-conditions`)}>
                            <span>• Terms and Conditions</span>
                        </div>

                    </div>




                </div>

                <div className={Mstyles.VmenuFotter}>
                    <LoadingButton
                        onClick={LogoutBtn}
                        size='small'
                        startIcon={<LuLogOut />}
                        loading={false}
                        loadingPosition="end"
                        variant="outlined"
                        fullWidth
                    >
                        <span>Logout</span>
                    </LoadingButton>
                </div>
            </Drawer>
        </div>
    );
}


export default UserMenu;