import React from 'react'
import Mstyles from '/Styles/library.module.css'
import Image from 'next/image';

const WhyChooseus = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={Mstyles.WhyChooseusBox}>
            <div className={Mstyles.WhyChooseusBoxGrid}>
                <div className={Mstyles.WhyChooseusItem}>
                    <div className={Mstyles.WhyChooseusItemA}>
                        <div className={Mstyles.WhyChooseusItemAimg}>
                            <Image
                                src={`/img/premiumq.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={50}
                                height={50}
                                quality={100}
                                blurDataURL={blurredImageData}
                            />
                        </div>
                    </div>
                    <div className={Mstyles.WhyChooseusItemB}>
                        <span>Best Self Study Center</span>
                        <div style={{ height: '5px' }}></div>
                        <small>#1 Self Study Center of the City</small>
                    </div>
                </div>
                <div className={Mstyles.WhyChooseusItem}>
                    <div className={Mstyles.WhyChooseusItemA}>
                        <div className={Mstyles.WhyChooseusItemAimg}>
                            <Image
                                src={`/img/calm.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={50}
                                height={50}
                                quality={100}
                                blurDataURL={blurredImageData}
                            />
                        </div>
                    </div>
                    <div className={Mstyles.WhyChooseusItemB}>
                        <span>Fress Environment</span>
                        <div style={{ height: '5px' }}></div>
                        <small>Fresh and Calm Environment for your better Study</small>
                    </div>
                </div>
                <div className={Mstyles.WhyChooseusItem}>
                    <div className={Mstyles.WhyChooseusItemA}>
                        <div className={Mstyles.WhyChooseusItemAimg}>
                            <Image
                                src={`/img/rupee.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={50}
                                height={50}
                                quality={100}
                                blurDataURL={blurredImageData}
                            />
                        </div>
                    </div>
                    <div className={Mstyles.WhyChooseusItemB}>
                        <span>Affordable price</span>
                        <div style={{ height: '5px' }}></div>
                        <small>Book Your Seats at very affordable price</small>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default WhyChooseus
