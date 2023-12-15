import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Link from 'next/link'
import Mstyles from '../../Styles/home.module.css'

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Videolistbychapterid from '../components/Courses/Videolistbychapterid'
import Pdflistbychapterid from '../components/Courses/Pdflistbychapterid'
import Livelistbychapterid from '../components/Courses/Livelistbychapterid'
import Box from '@mui/material/Box';
import Image from 'next/image'
import {
    IconButton,
    Typography,
    styled,
    Card,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
} from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { FiPlayCircle, FiRadio, FiClipboard } from "react-icons/fi";
export async function getServerSideProps(context) {
    const chapterid = context.query.pageno[0];
    const pid = context.query.pageno[1];
    const tabid = context.query.pageno[2];


    return {
        props: { chapterid, pid, tabid },
    }

}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function DashboardCrypto({ chapterid, pid, tabid }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [value, setValue] = useState(1);
    const handleChange = (newValue) => {
        setValue(newValue);
    };
  

    return (
        <>
            <Head>
                <title>Class Room: {pid}</title>
            </Head>



            <div className={Mstyles.Containerpadding}>

                <div className={MYS.StikeyScrollmenu}>
                    <div className={`${value == 1 ? MYS.StikeyScrollmenuItemActive : MYS.StikeyScrollmenuItem}`} onClick={() => { handleChange(1) }}>
                        <div className={MYS.StikeyScrollmenuItemA}>
                            <FiPlayCircle size={20} />

                        </div>
                        <div className={MYS.StikeyScrollmenuItemB}>
                            <span>Video Lectures</span>
                        </div>
                    </div>
                    <div style={{ minWidth: '10px' }}></div>
                    <div className={`${value == 2 ? MYS.StikeyScrollmenuItemActive : MYS.StikeyScrollmenuItem}`} onClick={() => { handleChange(2) }}>
                        <div className={MYS.StikeyScrollmenuItemA}>
                            <FiRadio size={20} />

                        </div>
                        <div className={MYS.StikeyScrollmenuItemB}>
                            <span>Live Sessions</span>
                        </div>
                    </div>
                    <div style={{ minWidth: '10px' }}></div>
                    <div className={`${value == 3 ? MYS.StikeyScrollmenuItemActive : MYS.StikeyScrollmenuItem}`} onClick={() => { handleChange(3) }}>
                        <div className={MYS.StikeyScrollmenuItemA}>
                            <FiClipboard size={20} />

                        </div>
                        <div className={MYS.StikeyScrollmenuItemB}>
                            <span>Notes and Study materials</span>
                        </div>
                    </div>
                </div>
                {value == 1 &&

                    <Videolistbychapterid chapterid={chapterid} pid={pid} />

                }
                {value == 2 &&

                    <Livelistbychapterid chapterid={chapterid} pid={pid} />

                }
                {value == 3 &&

                    <Pdflistbychapterid chapterid={chapterid} pid={pid} />

                }
            </div>



            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
