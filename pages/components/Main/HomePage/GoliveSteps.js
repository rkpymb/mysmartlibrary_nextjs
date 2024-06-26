import React from 'react'
import Mstyles from '/Styles/main.module.css';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter, useParams } from 'next/router'

import { LuLogIn, LuArrowRight } from "react-icons/lu";
const GoliveSteps = () => {
    const router = useRouter()
   
    return (
        <div>
            <div className={Mstyles.SecInTitle}>
                <h1>Go Live Within Minutes 🚀</h1>
                <span>Create a website for your self study center Business in minutes.</span>
            </div>

            <div className={Mstyles.Golivebox}>
                <div className={Mstyles.GoliveImg}>
                    <img
                        src={`/Home/golivestep.png`}
                        alt="image"

                    />

                </div>


                <div className={Mstyles.GoliveBtn}>
                    <LoadingButton
                        endIcon={<LuArrowRight />}
                        loadingPosition="end"
                        variant="contained"
                        loading={false}
                        fullWidth
                        onClick={() => router.push(`https://dashboard.mysmartlibrary.in/Signup`)}
                    >
                        <span>Start Free Trial</span>
                    </LoadingButton>
                </div>



            </div>

        </div>
    )
}

export default GoliveSteps
