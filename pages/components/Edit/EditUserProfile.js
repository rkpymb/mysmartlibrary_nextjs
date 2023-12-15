import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Badge from '@mui/material/Badge';
import { FiEdit, FiChevronLeft } from "react-icons/fi";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import UploadDp from '../Upload/UploadDp'
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import MYS from '../../../Styles/mystyle.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  styled,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import CheckloginContext from '../../../context/auth/CheckloginContext'
const EditCatModal = (props) => {
  const Contextdata = useContext(CheckloginContext)
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [Name, setName] = useState(Contextdata.Data.name);
  const [Email, setEmail] = useState(Contextdata.Data.email);
  const [UserDp, setUserDp] = useState();

  const notify = (T) => toast(T, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const router = useRouter()
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    setName(Contextdata.Data.name)
    setEmail(Contextdata.Data.email)
    setUserDp(Contextdata.Data.image)

  }, [Contextdata.Data]);

  const UpdateProfile = (e) => {
    e.preventDefault();
    let FinalFileName = document.querySelector('#FinalFileName').value
    if (Name !== '' && Email !== '' && FinalFileName !== '') {
      UpdateData(FinalFileName)
      setBtnloading(true)
    } else {
      handleClose()
      notify('All Fields are required*')
    }
  };

  const UpdateData = async (NewImage) => {

    const sendUM = { image: NewImage, name: Name, email: Email, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Students/UpdateProfile", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        setBtnloading(false)
        if (parsed.ReqData.done) {
          notify('Profile Updated Successfully')
          setOpen(false)
          setTimeout(function () {
            router.push('/MyProfile')
          }, 2000);
        } else {
          notify('Something went wrong')
        }



      })
  }


  return (
    <div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <div>


        <LoadingButton
          fullWidth
          onClick={handleClickOpen('paper')}
          endIcon={<FiEdit />}
          loading={false}
          loadingPosition="end"
          variant="contained"
          size='small'
        >
          <span>Edit Profile</span>
        </LoadingButton>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit Profile</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>

            <UploadDp />
            <form onSubmit={UpdateProfile} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Student's Name"
                  fullWidth
                  value={Name}
                  onInput={e => setName(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Email Address"
                  fullWidth

                  value={Email}
                  onInput={e => setEmail(e.target.value)}

                />
              </div>


              <input type="hidden" value={UserDp} id="FinalFileName" />

              <div style={{ minHeight: 25 }}></div>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={UpdateProfile}
              endIcon={<SendIcon />}
              loading={Btnloading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default EditCatModal
