
import { useState, useEffect, useContext, useRef } from 'react';
import NextLink from 'next/link';
import CheckloginContext from 'context/auth/CheckloginContext'
import { MediaFilesUrl, MediaFilesFolder } from 'Data/config'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/userdp.png',
    jobtitle: 'Project Manager'
  };

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

  };

  const LogOut = () => {
    const confirmation = confirm("Do you Really want to log out?");
    if (confirmation) {
      localStorage.clear();
      alert("You are Logged Out");
      location.reload();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Contextdata = useContext(CheckloginContext)
  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          sx={{ width: 50, height: 50 }}

          alt={Contextdata.Data.name} src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.image}`}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{Contextdata.Data.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              STUDENT
            </UserBoxDescription>
         
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            sx={{ width: 50, height: 50 }}

            alt={Contextdata.Data.name} src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.image}`}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{Contextdata.Data.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              STUDENT
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <NextLink href="/MyProfile" passHref>
            <ListItem button>
              <AccountBoxTwoToneIcon fontSize="small" />
              <ListItemText primary="My Profile" />
            </ListItem>
          </NextLink>
          {/* <NextLink href="/applications/messenger" passHref>
            <ListItem button>
              <InboxTwoToneIcon fontSize="small" />
              <ListItemText primary="Messenger" />
            </ListItem>
          </NextLink> */}
          {/* <NextLink href="/management/profile/settings" passHref>
            <ListItem button>
              <AccountTreeTwoToneIcon fontSize="small" />
              <ListItemText primary="Account Settings" />
            </ListItem>
          </NextLink> */}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={LogOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
