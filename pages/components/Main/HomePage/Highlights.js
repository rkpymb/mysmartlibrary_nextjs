import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';
const Highlights = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={Mstyles.HighlightsBox}>
            <div className={Mstyles.Highlights}>
                <div className={Mstyles.HighlightsItem}>
                    <div className={Mstyles.HighlightsImg}>
                        <Image
                            src={`/Home/presentation.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={30}
                            height={30}
                            quality={100}
                            blurDataURL={blurredImageData}
                        />
                    </div>
                    <div className={Mstyles.HighlightsDe}>
                        <span>Free Trainig</span>
                        <small>
                            We Provide Free training to run software seamlessly.
                        </small>

                    </div>
                </div>
                <div className={Mstyles.HighlightsItem}>
                    <div className={Mstyles.HighlightsImg}>
                        <Image
                            src={`/Home/customer-service.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={30}
                            height={30}
                            quality={100}
                            blurDataURL={blurredImageData}
                        />
                    </div>
                    <div className={Mstyles.HighlightsDe}>
                        <span>Free Support</span>
                        <small>Live Chat Solution for any queries and problems</small>

                    </div>
                </div>
                <div className={Mstyles.HighlightsItem}>
                    <div className={Mstyles.HighlightsImg}>
                        <Image
                            src={`/Home/classroom.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={30}
                            height={30}
                            quality={100}
                            blurDataURL={blurredImageData}
                        />
                    </div>
                    <div className={Mstyles.HighlightsDe}>
                        <span>Video Tutorial</span>
                        <small>Acces Free Video Tutorials and Docs.</small>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Highlights
