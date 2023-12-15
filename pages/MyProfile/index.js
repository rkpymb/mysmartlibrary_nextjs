import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import Mstyles from '../../Styles/home.module.css'
import MYS from '../../Styles/mystyle.module.css'
import { FiEdit, FiChevronLeft } from "react-icons/fi";
import Footer from 'src/components/Footer';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import LoadingButton from '@mui/lab/LoadingButton';
import MyTSSubmitlist from '../components/List/MyTSSubmitlist';
import EditUserProfile from '../components/Edit/EditUserProfile'
import { useRouter } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from 'Data/config'
import {

  styled
} from '@mui/material';
function DashboardCrypto() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    Contextdata.ChangeMainTitle(`${Contextdata.Data.name}'s Profile`)

  });

  return (
    <>
      <Head>
        <title>{Contextdata.Data.name}'s Profile</title>
      </Head>
      <div className={Mstyles.Containerpadding}>
      <div className={Mstyles.OnlyMobile}>
          <div style={{ minHeight: '30px' }}></div>
        </div>
        <div className={MYS.DbUserProfileBox}>
          <div className={MYS.DbUserProfileBox1}>
            <div> 
              <Avatar 
               sx={{ width: 150, height: 150 }}
            
            alt={Contextdata.Data.name} src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.image}`} 
            />
            </div>
            <div className={MYS.DbUserProfileBoxB}>
              <div className={MYS.PorifleName}>
                <span>{Contextdata.Data.name}</span>
                <small>{Contextdata.Data.mobile}</small>
                <small>{Contextdata.Data.email}</small>
              </div>
              <div style={{ minHeight: '10px' }}></div>
              <EditUserProfile />
             
            </div>
          </div>

        </div>

      </div>


      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
