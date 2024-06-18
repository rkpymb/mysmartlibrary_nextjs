import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/library.module.css'
import Link from 'next/link';
import { useRouter, useParams } from 'next/router'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import FooterMenu1 from './StudyCenter/FooterMenu1'
import MadeByCredit from './StudyCenter/MadeByCredit'
import LbSocialHandles from './StudyCenter/LbSocialHandles'


import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '/context/auth/CheckloginContext'
const Footer = () => {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (Contextdata.WebData) {
      setLoading(false);
    }
  }, [Contextdata.WebData]);
  return (
    <div>
      {!Loading &&
        <div>
          <div className={Mstyles.MSecDevider} ></div>

          <div className={Mstyles.FotterDeviderdot}>

          </div>
          <div style={{ minHeight: '20px' }}></div>
          <div className={Mstyles.MFooter}>

            <div className={Mstyles.MFooterbox}>
              <div className={Mstyles.MFooterboxIt}>
                <div className={Mstyles.MFooterboxItA}>
                  <LbSocialHandles />
                  <FooterMenu1 />
                  <div style={{ minHeight: '20px' }}></div>
                  <div className={Mstyles.Bottom_menu}>
                    <small>© {new Date().getFullYear()} {Contextdata.WebData.domain} All Rights Reserved.</small>
                  </div>
                  <div style={{ minHeight: '10px' }}></div>
                </div>
                <div className={Mstyles.MFooterboxItB}>
                  <MadeByCredit />
                </div>
              </div>
            </div>

          </div>
        </div>


      }

      {isMobile &&
        <div>
          <div className={Mstyles.MSecDevider} ></div>
          <div className={Mstyles.MSecDevider} ></div>
        </div>

      }

    </div>


  )
}

export default Footer