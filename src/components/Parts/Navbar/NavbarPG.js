// YourComponent.js

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../../context/auth/CheckloginContext'
import Mstyles from '../../../../Styles/home.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";

import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'

const YourComponent = () => {
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
             
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`${Mstyles.navbarMain} ${scrolling ? Mstyles.white : Mstyles.transparent}`}>
                <div className={Mstyles.Navbar}>
                    <div className={Mstyles.NavA}>
                        <div className={Mstyles.logo}>
                            <Link href='/'>
                                <div className={Mstyles.logomain}>
                                    <img src='/img/mainlogo.svg' alt='logo' width={'100%'} />
                                </div>
                            </Link>
                        </div>
                      
                       
                       
                       
                    </div>
                    <div className={Mstyles.NavLeft}>

                        <div className={Mstyles.ContactTop}>
                            <div className={Mstyles.Contact_icon}>
                                <span><IoIosCall size={30} /></span>
                            </div>
                            <div className={Mstyles.Contact_number}>
                                <div className={Mstyles.Contact_number_Text}>
                                    <span>Talk to an expert</span>
                                </div>
                                <span>{Contactinfo.MainMobile}</span>
                            </div>
                        </div>
                        <div className={Mstyles.loginbtnTopBtns}>
                            {!Contextdata.IsLogin && (
                                <Link href='Login' style={{ textDecoration: 'none' }}>
                                    <div className={Mstyles.loginbtnTop}>
                                        <span><AiOutlineLogin /></span>
                                        <small>Login</small>
                                    </div>
                                </Link>

                            )}
                            {Contextdata.IsLogin && (
                                <Link href='/dashboards/main' style={{ textDecoration: 'none' }}>
                                    <div className={Mstyles.loginbtnTop}>
                                        <span><VscAccount /></span>
                                        <small>Dashboard</small>
                                    </div>
                                </Link>

                            )}

                        </div>

                        {/* <div className={Mstyles.loginbtnTopBtns}>
                        <Link href='/educators' style={{ textDecoration: 'none' }}>
                            <div className={Mstyles.loginbtnTop}>
                                <span><BsFillEmojiSunglassesFill /></span>
                                <small>Become Educator</small>
                            </div>
                        </Link>

                    </div> */}


                    </div>
                </div>
            </nav>
        </>
    );
};

export default YourComponent;
