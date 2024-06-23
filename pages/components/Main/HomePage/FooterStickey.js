import React from 'react'
import Mstyles from '/Styles/main.module.css';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter, useParams } from 'next/router'
import { LuLogIn, LuArrowRight } from "react-icons/lu";
const FooterStickey = () => {
    const router = useRouter()
    return (
        <div className={Mstyles.FooterStickey}>
            <div className={Mstyles.FooterStickeyBox}>
                <div className={Mstyles.FooterStickeyBoxA}>
                    <div className={Mstyles.FScontent}>
                        <span>Book A <span className={Mstyles.PrimaryColor}>Free Demo</span> Today</span>
                        <small>Transform your self-study center Business !</small>
                    </div>
                   
                </div>
                <div className={Mstyles.FooterStickeyBoxB}>
                    <LoadingButton
                        endIcon={<LuArrowRight />}
                        loadingPosition="end"
                        variant="contained"
                        loading={false}
                        fullWidth
                        onClick={() => router.push(`/p/contact`)}
                    >
                        <span>Contact us</span>
                    </LoadingButton>
                </div>
            </div>


        </div>
    )
}

export default FooterStickey
