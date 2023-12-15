import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import Mstyles from '../../Styles/home.module.css'
import Footer from 'src/components/Footer';
import TSChaptersList from '../components/List/TSChaptersList';
import CheckloginContext from '../../context/auth/CheckloginContext'

import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import {
    IconButton,
    Typography,
    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    const Title = context.query.pageno[1];
    return {
        props: { DataSlug,Title },
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

function DashboardCrypto({DataSlug,Title}) {
    const router = useRouter()
    const [TSID, setTSID] = useState(DataSlug);
    const [isLoading, setIsLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)

    useEffect(() => {
        Contextdata.ChangeMainTitle(`Chpaters : ${Title}`)
        if (Contextdata.IsLogin == true) {
            setIsLoading(false);
        } else {

            router.push('/Login')

        }
    });

    return (
        <>
            <Head>
                <title>Chapters : {Title}</title>
            </Head>


            <div className={Mstyles.Containerpadding}>

                {!isLoading &&
                    <TSChaptersList tsid={DataSlug} />
                }
            </div>


          
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
