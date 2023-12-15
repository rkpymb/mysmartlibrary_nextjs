import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled
} from '@mui/material';
import { useRef, useState } from 'react';

import Mstyle from '../../../../../Styles/home.module.css'



function MobileLogo() {

  return (
    <>
      <div className={Mstyle.OnlyMobile}>
        <div className={Mstyle.logomainDBimgMob}>
          <img src='/logo/mainlogonav.svg' alt='logo' />
        </div>
      </div>
    </>
  );
}

export default MobileLogo;
