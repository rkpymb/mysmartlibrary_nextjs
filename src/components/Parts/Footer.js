import React, { useState, useEffect, useContext } from 'react';
import styles from '../../../Styles/home.module.css'
import Link from 'next/link';
import { useRouter, useParams } from 'next/router'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";
import { HiLocationMarker, HiPhone, HiOutlineMail } from "react-icons/hi";

import CheckloginContext from '../../../context/auth/CheckloginContext'
const Footer = () => {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.Data.email == '') {
      router.push('/Onboarding')

    }
  }, [Contextdata.Data]);
  return (
    <div>
      <div className={styles.FotterDeviderdot}>

      </div>
      <div className={styles.Ffuul}>
      <div style={{ minHeight: '20px' }}></div>
        <div className={styles.container}>
          <div className={styles.FooterBox}>
            <div className={styles.FooterBox_compnay}>
              <div className={styles.dataspacer}> </div>
              <Link href='/' style={{ textDecoration: 'none' }}>
                <div className={styles.logomain}>
                  <img src='/logo/weblogodark.png' alt='logo' className={styles.NavLogo} />
                </div>
              </Link>
              <p>{AppName} {ShortAbout}</p>
              <div style={{ minHeight: '20px' }}></div>
              <div className={styles.FooterBox_socialIcons}>
                <a href={SocialHandles.Facebook} target='_blank' rel="noreferrer">
                  <div className={styles.colorwhite}> <BsFacebook size={20} /> </div>
                </a>
                <div style={{ minWidth: '15px' }}></div>
                <a href={SocialHandles.Instagram} target='_blank' rel="noreferrer">
                  <div className={styles.colorwhite}> <BsInstagram size={20} /> </div>
                </a>
                <div style={{ minWidth: '15px' }}></div>
                <a href={SocialHandles.Twitter} target='_blank' rel="noreferrer">
                  <div className={styles.colorwhite}> <BsTwitter size={20} /> </div>
                </a>
                <div style={{ minWidth: '15px' }}></div>
                <a href={SocialHandles.Linkedin} target='_blank' rel="noreferrer">
                  <div className={styles.colorwhite}> <BsLinkedin size={20} /> </div>
                </a>
                <div style={{ minWidth: '15px' }}></div>
                <a href={SocialHandles.Youtube} target='_blank' rel="noreferrer">
                  <div className={styles.colorwhite}> <BsYoutube size={20} /> </div>
                </a>
              </div>

            </div>
            <div className={styles.FooterBox_menu}>
              <h3>Important Links</h3>
              <Link href='/Aboutus' style={{ textDecoration: 'none', color: 'white' }}>
                <li>About us </li>
              </Link>
              <Link href='/Contact' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Contact us </li>
              </Link>
              <Link href='/Privacypolicy' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Privacy Policy </li>
              </Link>
              <Link href='/TermsConsitions' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Terms & Conditions </li>
              </Link>
            </div>
            <div className={styles.FooterBox_menu}>
              <h3>Link For Students</h3>
              <Link href='https://erp.driteducation.com/verification/studentdocsverification' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Certificate Verification </li>
              </Link>

              <Link href='/dashboards/main' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Student's Dashboard </li>
              </Link>
              <Link href='https://erp.driteducation.com/' style={{ textDecoration: 'none', color: 'white' }}>
                <li>Center ERP LOGIN</li>
              </Link>




            </div>
            <div className={styles.FooterBox_address}>
              <h3>Contact us</h3>
              <div className={styles.FooterBox_address_item}>
                <span><HiLocationMarker /></span>
                <small> {Contactinfo.MainAddress}</small>
              </div>
              <div className={styles.FooterBox_address_item}>
                <span><HiPhone /></span>
                <small>{Contactinfo.MainMobile}</small>
              </div>
              <div className={styles.FooterBox_address_item}>
                <span><HiOutlineMail /></span>
                <small>{Contactinfo.ContactEmail}</small>
              </div>
              <div style={{ height: '20px' }}> </div>
              <a target='_blank' href={SocialHandles.Playstore} style={{ textDecoration: 'none', color: 'white' }}>
                <div className={styles.AppLogoBoxB}>
                  <img src='/img/playstoreicon.png' width='100%' />
                </div>

              </a>

            </div>
          </div>
          <div className={styles.Bottom_menu}>
            <small>© {new Date().getFullYear()} {DomainURL} All Rights Reserved.</small>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Footer