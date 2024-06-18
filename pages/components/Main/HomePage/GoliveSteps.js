import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';
const GoliveSteps = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.SecInTitle}>
                <h1>Explore Usefull Features</h1>
                <span>Whether you’re a startup or an established business, here’s why My Smart Library is your best choice</span>
            </div>

            <div className={Mstyles.KeyFeatures}>
                <div className={Mstyles.KeyFeaturesA}>

                </div>

                <div className={Mstyles.KeyFeaturesB}>

                    <div className={Mstyles.KeyFeaturesAImg}>
                        <Image
                            src={`/Home/mobilef.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={30}
                            height={30}
                            quality={100}
                            blurDataURL={blurredImageData}
                        />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default GoliveSteps
