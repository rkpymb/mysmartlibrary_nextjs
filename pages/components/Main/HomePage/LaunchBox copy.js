import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';
const LaunchBox = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.LaunchBox}>
                <div className={Mstyles.LaunchBoxA}>
                    <div className={Mstyles.LaunchBoxAImg}>
                        <Image
                            src={`/Home/launchfast.svg`}
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

                <div className={Mstyles.LaunchBoxB}>
                    <div className={Mstyles.SecInTitle}>
                        <span>Launch Fast</span>
                        <small>Whether you’re a startup or an established business, here’s why Dukaan is your best choice</small>
                    </div>

                    <div className={Mstyles.timeline}>
                        <div className={`${Mstyles.timelineItem} ${Mstyles.left}`}>
                            <div className={Mstyles.content}>
                                <h2>Event 1</h2>
                                <p>Description of event 1.</p>
                            </div>
                        </div>
                        <div className={`${Mstyles.timelineItem} ${Mstyles.right}`}>
                            <div className={Mstyles.content}>
                                <h2>Event 2</h2>
                                <p>Description of event 2.</p>
                            </div>
                        </div>
                        <div className={`${Mstyles.timelineItem} ${Mstyles.left}`}>
                            <div className={Mstyles.content}>
                                <h2>Event 3</h2>
                                <p>Description of event 3.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default LaunchBox
