import React, { useState, useEffect, useContext } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import UploadDp from './UploadDp'
import { LuArrowRight } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import MYS from '/Styles/library.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  styled,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditProfile = () => {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [Btnloading, setBtnloading] = useState(false);
  const [Loading, setLoading] = useState(true);

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [UserDp, setUserDp] = useState('');

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



  useEffect(() => {

    if(Contextdata.Data){
      setName(Contextdata.Data.name)
      setEmail(Contextdata.Data.email)
      setUserDp(Contextdata.Data.dp)
      setLoading(false)
  
    }
    


  }, [Contextdata.Data,Contextdata.WebData]);

  const UpdateProfile = (e) => {
    e.preventDefault();

    if (Name !== '' && Email !== '') {

      setBtnloading(true)
      UpdateData()
    } else {

      notify('All Fields are required*')
    }
  };

  const UpdateData = async () => {

    const sendUM = { name: Name, email: Email }
    const data = await fetch("/api/Users/UpdateProfile", {
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

        } else {
          notify('Something went wrong')
        }



      })
  }


  const onImageUpload = (Filedata) => {
    if (Filedata) {
      setUserDp(Filedata)
    } else {
      setUserDp(null)
    }


  };


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
      {!Loading &&

        <div className={MYS.EdiPBox}>

          <div className={MYS.EdiPBoxA}>
            <UploadDp onImageUpload={onImageUpload} />
          </div>
          <div className={MYS.EdiPBoxB}>
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


              <div className={MYS.inputlogin}>
                <div className={MYS.MBtnbox}>
                  <LoadingButton

                    fullWidth
                    onClick={UpdateProfile}
                    endIcon={<LuArrowRight />}
                    loading={Btnloading}
                    desabled={Btnloading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    <span>Update</span>
                  </LoadingButton>
                </div>
              </div>


            </form>
          </div>

        </div>
      }


    </div>
  )
}

export default EditProfile
