import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TSChaptersList from '../components/List/TSChaptersList';
import AddTsChapters from '../components/Add/AddTsChapters'
import {
    Button,
    Card,

    Box,
    CardContent,
    Typography,
    Avatar,
    alpha,
    Tooltip,
    CardActionArea,
    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ GETID: DataSlug, updatekey: KEY })
    // };
    // const response = await fetch(`${process.env.API_URL}Website/Course/CourseData.php`, requestOptions);
    // const CourseFullData = await response.json();

    return {

        props: { DataSlug }, // will be passed to the page component as props
    }

}


function DashboardCrypto(DataSlug) {
    console.log(DataSlug.DataSlug)
    const [TSID, setTSID] = useState(DataSlug.DataSlug);
    return (
        <>
            <Head>
                <title>Test Series</title>
            </Head>

            <Container className={MYS.min100vh}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        pb: 3, mt: 5
                    }}
                >
                    <Typography variant="h3">Chapters</Typography>
                   
                </Box>
                <TSChaptersList tsid={DataSlug.DataSlug}/>
            </Container>
            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
