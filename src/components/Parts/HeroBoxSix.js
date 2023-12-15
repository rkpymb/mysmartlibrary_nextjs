import React from 'react'
import Mstyles from '../../../Styles/home.module.css'
import { BASE_URL, AppName } from '../../../Data/config'
import Link from 'next/link';
import Image from 'next/image'

const HeroBoxSix = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={Mstyles.container}>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle} style={{ textAlign: 'center' }}>
                <h1>Learner  <span className={Mstyles.HeroBoxTwoTitleBottom}>Benefits </span></h1>

            </div>
            <div style={{ minHeight: '30px' }}></div>
            <div className={Mstyles.BenefitsBoxItem}>
                <div className={Mstyles.BenefitsBoxItemA}>
                    <div className={Mstyles.BenefitsBox}>
                        <div className={Mstyles.BenefitsBoxA}>
                            <div className={Mstyles.BenefitsBoxAimgBig}>
                                <Image
                                    src={`/img/learner-pic-1.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>
                        <div className={Mstyles.BenefitsBoxB}>
                            <span className={Mstyles.BenefitsBoxBspan}>World Class Pedagogy</span>
                            <div>

                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Learn from the World's Best Faculty & Industry Experts</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Learn with fun Hands-on Exercises & Assignments</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Participate in Hackathons & Group Activities</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={Mstyles.BenefitsBoxItemB}>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/rate.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>4.8/5 Rating</span>
                    </div>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/online-education.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>Gamified Learning</span>
                    </div>
                </div>

            </div>
            <div style={{ minHeight: '30px' }}></div>
            <div className={Mstyles.BenefitsBoxItem}>
                <div className={Mstyles.BenefitsBoxItemA}>
                    <div className={Mstyles.BenefitsBox}>
                        <div className={Mstyles.BenefitsBoxA}>
                            <div className={Mstyles.BenefitsBoxAimgBig}>
                                <Image
                                    src={`/img/learner-pic-2.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>
                        <div className={Mstyles.BenefitsBoxB}>
                            <span className={Mstyles.BenefitsBoxBspan}>
                                Personalized Guidance & Support</span>
                            <div>

                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Dedicated Learning Managers</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>24*7 learning Support</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Network with Peers & Interact with Industry Leaders</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={Mstyles.BenefitsBoxItemB}>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/customer-service.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>24 x 7 Support</span>
                    </div>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/discussion.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>1:1 Mentorship</span>
                    </div>
                </div>

            </div>
            <div style={{ minHeight: '30px' }}></div>
            <div className={Mstyles.BenefitsBoxItem}>
                <div className={Mstyles.BenefitsBoxItemA}>
                    <div className={Mstyles.BenefitsBox}>
                        <div className={Mstyles.BenefitsBoxA}>
                            <div className={Mstyles.BenefitsBoxAimgBig}>
                                <Image
                                    src={`/img/learner-pic-3.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>
                        <div className={Mstyles.BenefitsBoxB}>
                            <span className={Mstyles.BenefitsBoxBspan}>
                            Career Assistance</span>
                            <div>

                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Resume Building & Mock Interview Prep</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>Exclusive access to Intellipaat Job Portal</span>
                                    </div>
                                </div>
                                <div className={Mstyles.FeaturesItem}>
                                    <div className={Mstyles.FeaturesItemImg}>
                                        <Image
                                            src={`/img/check.png`}
                                            alt="Picture of the author"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className={Mstyles.FeaturesItemText}>
                                        <span>400+ Hiring Partners</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={Mstyles.BenefitsBoxItemB}>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/cv.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>CV Building</span>
                    </div>
                    <div className={Mstyles.Counterhomeitem}>
                        <div className={Mstyles.BenefitsBoxAimg}>
                            <Image
                                src={`/img/businessman.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <span>400+ Hiring Partners</span>
                    </div>
                </div>

            </div>



            <div className={Mstyles.dataspacer}> </div>
        </div>


    )
}

export default HeroBoxSix
