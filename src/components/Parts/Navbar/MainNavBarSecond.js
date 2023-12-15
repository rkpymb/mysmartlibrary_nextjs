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
import { useRouter, useParams } from 'next/router'
const YourComponent = ({ CheckPComplete }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        if (CheckPComplete == true) {
            if (Contextdata.Data.email == '') {
                router.push('/Onboarding')
            }
        }
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
            <nav className={`${Mstyles.navbarMainSecond} ${scrolling ? Mstyles.white : Mstyles.white}`}>
                <div className={Mstyles.Navbar}>
                    <div className={Mstyles.NavA}>
                        <div className={Mstyles.logo}>
                            <Link href='/'>
                                <div className={Mstyles.logomain}>
                                    <img src='/logo/weblogo.png' alt='logo' width={'100%'} />
                                </div>
                            </Link>
                        </div>
                        {/* <div style={{marginLeft:'10px'}}>
                        <HeaderMenuLeft/>
                    </div> */}
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorBlack}`}>
                            <Link href='/Courses' style={{ textDecoration: 'none' }}>
                                <li>Courses</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorBlack}`}>
                            <Link href='/TestSeries' style={{ textDecoration: 'none' }}>
                                <li>Tests Series</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorBlack}`}>
                            <Link href='/StudyMaterials' style={{ textDecoration: 'none' }}>
                                <li>Study Materials</li>
                            </Link>
                        </div>
                        <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorBlack}`} >
                            <Link href='/Videos' style={{ textDecoration: 'none' }}>
                                <li>Videos Classes</li>
                            </Link>
                        </div>
                    </div>
                    <div className={Mstyles.NavLeft}>

                        <div className={Mstyles.ContactTop}>
                            <div className={Mstyles.Contact_icon}>
                                <span className={`${scrolling ? Mstyles.ColorDC7633 : Mstyles.ColorDC7633}`}><IoIosCall size={30} /></span>
                            </div>
                            <div className={Mstyles.Contact_number}>
                                <div className={`${Mstyles.Contact_number_Text} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorBlack}`}>
                                    <span>Talk to an expert</span>
                                </div>
                                <span className={` ${Mstyles.Mobilenumberblink} ${scrolling ? Mstyles.ColorDC7633 : Mstyles.ColorDC7633}`}>{Contactinfo.MainMobile}</span>
                            </div>
                        </div>
                        <div className={Mstyles.loginbtnTopBtns}>
                            {!Contextdata.IsLogin && (
                                <Link href='Login' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMainScroll}`}>
                                        <span><AiOutlineLogin /></span>
                                        <small>Login</small>
                                    </div>
                                </Link>

                            )}
                            {Contextdata.IsLogin && (
                                <Link href='/dashboards/main' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMainScroll}`}>
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
