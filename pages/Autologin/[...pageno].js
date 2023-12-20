import { useState, useEffect, useContext } from 'react';
import {

    Box,

    styled
} from '@mui/material';
import MYS from '../../Styles/mystyle.module.css'
import Avatar from '@mui/material/Avatar';
import { LuArrowRight } from "react-icons/lu";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";


import YtplayerVideo from '../components/Player/YtplayerVideo';
import Footer from '../../src/components/Parts/Footer'
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';

import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {
    const JwtToken = context.query.pageno[0];
    return {

        props: { JwtToken }, // will be passed to the page component as props
    }

}
const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);
function Overview({ JwtToken }) {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('Token')) {

            alert('login')
        } else {
            localStorage.setItem('Token', JwtToken)
            window.location.reload();
        }

    }, [router.query]);

    return (
        <>
            <div>
               
            </div>
        </>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
