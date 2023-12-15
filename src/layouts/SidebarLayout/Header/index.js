import { useState, useEffect, useContext } from 'react';


import Mstyles from '../../../../Styles/home.module.css'
import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import HeaderUserbox from './Userbox';
import { LuArrowLeft } from "react-icons/lu";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { FiMenu } from "react-icons/fi";
import Badge from '@mui/material/Badge';
import Image from 'next/image'
import CheckloginContext from '../../../../context/auth/CheckloginContext'
import { useRouter } from 'next/router'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";

import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  border-bottom: 1px solid #F2F4F4;
 
  right: 0;
  z-index: 6;
  
  backdrop-filter: blur(3px);
  position: fixed;
  justify-content: space-between;
  width: 100%;
  @media (min-width: ${theme.breakpoints.values.lg}px) {
      left: ${theme.sidebar.width};
      width: auto;
  }
`
);

function Header() {
  const router = useRouter()
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  const Contextdata = useContext(CheckloginContext)
  const [scrolling, setScrolling] = useState(false);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

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
    <HeaderWrapper
      display="flex"
      alignItems="center"

    >

      {!scrolling &&
        <nav className={Mstyles.navbarMaindbNoScroll}>
          <div className={Mstyles.NavbarDb}>
            <div className={Mstyles.NavAdb}>
              <div className={Mstyles.OnlyMobile}>
                <Link href='/'>
                  <div className={Mstyles.logomainDBNav}>
                    <img src='/logo/weblogo.png' alt='logo' width={'100%'} />
                  </div>
                </Link>
              </div>
              <div className={Mstyles.OnlyDesktop}>
                <div className={Mstyles.navbarMaindbAfterScrollA}>
                  <IconButton aria-label="cart" onClick={() => router.back()}>
                    <StyledBadge color="secondary" >
                      <LuArrowLeft />
                    </StyledBadge>
                  </IconButton>
                  <span>{Contextdata.MainTitle}</span>
                </div>
              </div>

            </div>
            <div className={Mstyles.NavLeftdb}>
              <div>
                {Contextdata.IsLogin && (
                  <div className={Mstyles.DbNavRightBox}>
                    <div className={Mstyles.OnlyMobile}>
                      <IconButton color="primary" onClick={toggleSidebar}>
                        {!sidebarToggle ? (
                          <StyledBadge color="secondary" >
                            <FiMenu />
                          </StyledBadge>
                        ) : (

                          <StyledBadge color="secondary" >
                            <CloseTwoToneIcon />
                          </StyledBadge>

                        )}
                      </IconButton>

                    </div>

                    <HeaderUserbox />

                  </div>

                )}

              </div>


            </div>
          </div>
        </nav>
      }

      {scrolling &&
        <nav className={Mstyles.navbarMaindbAfterScroll}>
          <div className={Mstyles.navbarMaindbAfterScrollA}>
            <IconButton aria-label="cart" onClick={() => router.back()}>
              <StyledBadge color="secondary" >
                <LuArrowLeft />
              </StyledBadge>
            </IconButton>
            <span>{Contextdata.MainTitle}</span>
          </div>
          <div className={Mstyles.navbarMaindbAfterScrollB}>

          </div>
        </nav>

      }



    </HeaderWrapper>
  );
}

export default Header;
