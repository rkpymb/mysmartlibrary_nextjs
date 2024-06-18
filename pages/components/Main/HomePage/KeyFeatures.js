import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';
const KeyFeatures = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.SecInTitle}>
                <h1>Explore Usefull Features</h1>
                <span>Whether you’re a startup or an established business, here’s why My Smart Library is your best choice</span>
            </div>

            <div className={Mstyles.KeyFeatures}>
                <div className={Mstyles.KeyFeaturesA}>
                    <div className={Mstyles.KeyFeaturesAImg}>
                        <Image
                            src={`/Home/featureimg1.png`}
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

                <div className={Mstyles.KeyFeaturesB}>

                    <div className={Mstyles.FeatursGrid}>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Multiple Branches</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>
                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Branche's Shifts</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>

                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Seating Management</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>

                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Fees Collection</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>

                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Subscription Passes</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>

                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Addons Products</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>
                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Users Accounts</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>
                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Users Wallet</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>
                        </div>
                        <div className={Mstyles.FeatursItem}>
                            <div className={Mstyles.FeatursItemA}>
                                <Image
                                    src={`/Home/check-circle-solid.svg`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={30}
                                    height={30}
                                    quality={100}
                                    blurDataURL={blurredImageData}
                                />
                            </div>
                            <div className={Mstyles.FeatursItemB}>
                                <span>Users Attendance</span>
                                <small>Manage Multiple Branches of your Self Study center from Single Dashboard.</small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default KeyFeatures
