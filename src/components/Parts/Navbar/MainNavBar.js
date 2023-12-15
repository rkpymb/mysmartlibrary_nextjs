// YourComponent.js

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../../context/auth/CheckloginContext'
import Mstyles from '../../../../Styles/home.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import { useRouter, useParams } from 'next/router'
import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'
import { Router } from 'next/router';

const YourComponent = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                console.log(window.scrollY)
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


                                {scrolling ? <div className={Mstyles.logomain}>
                                    <img src='/logo/weblogo.png' alt='logo' width={'100%'} />
                                </div> : <div className={Mstyles.logomain}>
                                    <img src='/logo/weblogoDark.png' alt='logo' width={'100%'} />
                                </div>

                                }

                            </Link>
                        </div>
                        {/* <div style={{marginLeft:'10px'}}>
                        <HeaderMenuLeft/>
                    </div> */}
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                            <Link href='/Courses' style={{ textDecoration: 'none' }}>
                                <li>Courses</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                            <Link href='/TestSeries' style={{ textDecoration: 'none' }}>
                                <li>Tests Series</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                            <Link href='/StudyMaterials' style={{ textDecoration: 'none' }}>
                                <li>Study Materials</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`} >
                            <Link href='/Videos' style={{ textDecoration: 'none' }}>
                                <li>Videos Classes</li>
                            </Link>
                        </div>
                    </div>
                    <div className={Mstyles.NavLeft}>

                        <div className={Mstyles.ContactTop}>
                            <div className={Mstyles.Contact_icon}>
                                <span className={`${scrolling ? Mstyles.ColorDC7633 : Mstyles.ColorYellow}`}><IoIosCall size={30} /></span>
                            </div>
                            <div className={Mstyles.Contact_number}>
                                <div className={`${Mstyles.Contact_number_Text} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                                    <span>Talk to an expert</span>
                                </div>
                                <span className={` ${Mstyles.Mobilenumberblink} ${scrolling ? Mstyles.ColorDC7633 : Mstyles.ColorYellow}`}>{Contactinfo.MainMobile}</span>
                            </div>
                        </div>
                        <div className={Mstyles.loginbtnTopBtns}>
                            {!Contextdata.IsLogin && (
                                <Link href='Login' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMain}`}>
                                        <span><AiOutlineLogin /></span>
                                        <small>Login</small>
                                    </div>
                                </Link>

                            )}
                            {Contextdata.IsLogin && (
                                <Link href='/dashboards/main' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMain}`}>
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
