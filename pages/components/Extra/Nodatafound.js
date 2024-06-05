import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from '/Data/Lottie/nodatafound.json'
import MYS from '/Styles/library.module.css';
const nodatafound = ({ Title, Desc }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div>
            <div className={MYS.NodatafoundBox} >
                <Lottie options={defaultOptions}
                    width='100%'

                    isStopped={false}
                    isPaused={false} />

                <div className={MYS.NodatafoundBoxText} >
                    <h2>{Title}</h2>
                    <span>{Desc}</span>
                </div>
            </div>


        </div>
    )
}

export default nodatafound
