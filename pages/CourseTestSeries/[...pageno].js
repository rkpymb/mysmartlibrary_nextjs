import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import Mstyles from '../../Styles/home.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TslistbyCourse from '../components/Courses/TslistbyCourse';
import CheckloginContext from '../../context/auth/CheckloginContext'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import {
    IconButton,
    Typography,
    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    return {
        props: { DataSlug },
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

function DashboardCrypto(DataSlug) {
    const router = useRouter()
    const [TSID, setTSID] = useState(DataSlug.DataSlug);
    const [isLoading, setIsLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {
        Contextdata.ChangeMainTitle('Exams and Test Series')
        if (Contextdata.IsLogin == true) {
            setIsLoading(false);
        } else {

            router.push('/Login')

        }
    });

    return (
        <>
            <Head>
                <title>Exam and Test Series : {DataSlug.DataSlug}</title>
            </Head>



            <div className={Mstyles.Containerpadding}>
                <div className={Mstyles.OnlyMobile}>
                    <div style={{ minHeight: '30px' }}></div>
                </div>

                {!isLoading &&
                    <TslistbyCourse courseid={DataSlug.DataSlug} />
                }
            </div>


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
