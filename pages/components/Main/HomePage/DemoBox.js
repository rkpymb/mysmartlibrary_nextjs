import { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';

import LoadingButton from '@mui/lab/LoadingButton';
import ReactPlayer from 'react-player/youtube';
import { LuLogIn, LuArrowRight } from "react-icons/lu";
const GoliveSteps = () => {
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=OLmwmvuYlfA');
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.SecInTitle}>
                <h1>Software Demo Video ✅</h1>
                <span>Watch Complete Software Demo here.</span>
            </div>

            <div className={Mstyles.playerwrapper}>
                <div className={Mstyles.reactplayer}>
                    <ReactPlayer
                        className="react-player"
                        url={url}
                        width="100%"
                        height="100%"
                        controls={true}
                    />

                </div>
            </div>

        </div>
    )
}

export default GoliveSteps
