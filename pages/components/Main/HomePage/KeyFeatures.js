import React from 'react'
import Mstyles from '/Styles/main.module.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Image from 'next/image';
const KeyFeatures = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.SecInTitle}>
                <h1>One Stop Solution for Self Study Center Business</h1>
                <span>are you running a self study center and facing issues with managing Attendance, Fee and User Subscription ? One Stop Solution for Self Study Center Business , manage your Study Center with My Smart Library Software seamlessly.</span>
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
                                <small>You can add multiple shifts for your self study center branch.</small>
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
                                <small>The seating management of your library center has become even easier.</small>
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
                                <small>Easily accept payments from your users and manage their fees.</small>
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
                                <small>Create subscription passes for your study center and sell them online.</small>
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
                                <small>You can also add addon products like laptop,Tablet, locker box, other items.</small>
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
                                <small>Manage the accounts of all your users easily.</small>
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
                                <small>Wallet features give your users access to a digital wallet Stystem that they can easily use to make purchases on your website.</small>
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
                                <small>Now make the attendance of your library center even easier with QR based attendance system.</small>
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
                                <span>Notification and Reminders</span>
                                <small>Send Instant and autometic Reminders and Notification to your Users.</small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default KeyFeatures
