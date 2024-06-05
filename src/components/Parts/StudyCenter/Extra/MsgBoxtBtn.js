import React from 'react'
import * as animationData from '/Data/Lottie/eliphant.json'
import Mstyles from '/Styles/library.module.css'
import Lottie from 'react-lottie'
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";


import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter, useParams } from 'next/router'

const Nopassmsg = ({ Title, Msg, Url }) => {
    const router = useRouter();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <div className={Mstyles.MsgBoxWarnig}>
            <div className={Mstyles.MsgBoxWarnigLottie}>
                <Lottie options={defaultOptions}
                    height={null}
                    width={'100%'}

                    isStopped={false}
                    isPaused={false} />
            </div>
            <div className={Mstyles.MsgBoxWarnigDetails}>
                <div className={Mstyles.MsgBoxWarnigTitle}>
                    <h2>{Title}</h2>
                    <small>{Msg}</small>
                    <div style={{ height: '20px' }}></div>

                </div>
                <LoadingButton
                    onClick={() => router.push(Url)}
                    fullWidth
                    size='small'
                    endIcon={<LuArrowRight />}
                    loading={false}
                    loadingPosition="end"
                    variant="outlined"

                >
                    <span>Buy Subscription</span>
                </LoadingButton>
            </div>
        </div>
    )
}

export default Nopassmsg
