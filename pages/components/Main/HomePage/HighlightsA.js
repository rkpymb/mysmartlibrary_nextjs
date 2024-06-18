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
                            src={`/Home/landing-page.png`}
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
                        <span>Responsive Website</span>
                        <small>
                        Create Your Study Center Optmized and Secured Website with 99.5% Uptime !
                        </small>

                    </div>
                </div>
                <div className={Mstyles.HighlightsItem}>
                    <div className={Mstyles.HighlightsImg}>
                        <Image
                            src={`/Home/pwamobile.png`}
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
                        <span>PWA APP</span>
                        <small>Progressive web app support for your web App. Free and Quick Installation</small>

                    </div>
                </div>
                <div className={Mstyles.HighlightsItem}>
                    <div className={Mstyles.HighlightsImg}>
                        <Image
                            src={`/Home/admin-panel.png`}
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
                        <span>Admin Panel</span>
                        <small>Manage Fee Collection, Seat, Shift, Users and Multiple Branches with admin panel.</small>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Highlights
