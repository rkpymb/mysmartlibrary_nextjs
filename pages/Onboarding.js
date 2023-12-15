import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';

import TextField from '@mui/material/TextField';



import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import { LuShoppingBag, LuSearch, LuChevronRight, LuArrowLeft } from "react-icons/lu";

import Badge from '@mui/material/Badge';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../Styles/home.module.css'
import CheckloginContext from '../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';

import MainNavBarSecond from '../src/components/Parts/Navbar/MainNavBarSecond'
import { FiEdit, FiChevronRight, FiLogOut, FiShoppingCart, FiShoppingBag, FiList, FiMapPin } from 'react-icons/fi';
import { AppDesc, AppName } from '../Data/config'
import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Overview() {
    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const Contextdata = useContext(CheckloginContext)
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [Name, setName] = useState('');

    const [Email, setEmail] = useState('');
    useEffect(() => {
        if (Contextdata.IsLogin == true && Contextdata.Data.email == '') {
            setLoading(false)
        } else {
            router.push('/')
        }

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Name !== '') {
            setLoadingBtn(true)
            try {
                if (localStorage.getItem('Token')) {
                    const JwtToken = localStorage.getItem('Token');
                    const sendUser = {
                        JwtToken: JwtToken,
                        name: Name,
                        email: Email,
                    }
                    const data = fetch("/api/V3/Students/UpdateProfile", {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(sendUser)
                    }).then((a) => {
                        return a.json();
                    })
                        .then((parsedUser) => {
                            router.reload();
                        })
                }
            } catch (error) {
                console.error(error)

            }

        } else {
            setLoadingBtn(false)
            props.notify('Your Name is required for complete registration')

        }


    };
    return (
        <OverviewWrapper>
            <Head>
               
            </Head>
            <MainNavBarSecond CheckPComplete={false} />
            {!Loading &&

                <div>
                    <div className={Mstyles.MainBoxContainer}>
                        <div className={Mstyles.secndHeder}>

                            <div className={Mstyles.secndHederBox}>


                                <div className={Mstyles.secndHederBoxA}>
                                    <div>
                                        <IconButton aria-label="cart" onClick={() => router.back()}>
                                            <StyledBadge color="secondary" >
                                                <LuArrowLeft />
                                            </StyledBadge>
                                        </IconButton>

                                    </div>
                                    <div>
                                        <span>Complete Your Account</span>
                                    </div>
                                </div>
                                <div className={Mstyles.secndHederBoxB}>

                                </div>


                            </div>


                        </div>

                        <div className={Mstyles.MainBoxContainerInner}>
                            {!Loading &&
                                <div className={Mstyles.SmallConntetbox}>
                                    <div className={Mstyles.SmallConntetboxTopDevider}></div>
                                    <form onSubmit={handleSubmit}>
                                        <div className={Mstyles.InputBoxData}>
                                            <div style={{ minHeight: '20px' }}></div>
                                            <span className={Mstyles.InputBoxDataspan}>Please Privide us your Name and Email to Complete your Account</span>
                                            <div style={{ minHeight: '10px' }}></div>
                                            <div className={Mstyles.LoginBox_input}>
                                                <TextField value={Name} fullWidth label="Enter Full name" type="text" onInput={e => setName(e.target.value)} />
                                            </div>
                                            <div className={Mstyles.LoginBox_input}>
                                                <TextField value={Email} fullWidth label="Enter Email Address" type="text" onInput={e => setEmail(e.target.value)} />
                                            </div>
                                        </div>



                                        <div style={{ minHeight: '20px' }}></div>


                                        <div className={Mstyles.Smallbtn}>
                                            <LoadingButton
                                                fullWidth
                                                onClick={handleSubmit}
                                                endIcon={<FiChevronRight />}
                                                loading={LoadingBtn}
                                                loadingPosition="end"
                                                variant="contained"
                                            >
                                                <span>Complete Profile</span>
                                            </LoadingButton>
                                        </div>
                                    </form>


                                    <div style={{ minHeight: '10px' }}></div>
                                </div>

                            }

                        </div>


                    </div>

                    <div className={Mstyles.containerFull}>
                        <div className={Mstyles.OnlyDesktop}>
                            <div style={{ minHeight: '20px' }}></div>
                        </div>


                    </div>

                </div>

            }





        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
