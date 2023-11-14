import React from 'react'
import Mstyles from '../../../Styles/home.module.css'
import { BASE_URL, AppName } from '../../../Data/config'
import Link from 'next/link';
import Image from 'next/image'

const HeroBox2 = () => {
    
    return (
        <div className={Mstyles.container}>
            <div style={{ minHeight: '20px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle} style={{ textAlign: 'center' }}>
                <h1>Prepare to Crack Your Exams with 100% Guarantee*</h1>
                <span style={{textAlign: 'center'}}>We can assure you 100% about our programme and our ability to get you succeeded 👍
                    SuperMarks is the best of the best edu portal for aspirant those who dreams for IIT, NIT, NEET, SSC, Banking, Railways, Class 9, Class 10 and Intermediate.</span>
            </div>
            <div style={{ minHeight: '30px' }}></div>

            <div className={Mstyles.HeroBox2}>
                <div className={Mstyles.HeroBox2A}>
                    <div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Topic-wise Live and Recorded Classes</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Live Doubt Solving Sessions</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Exam-wise Unlimited Test Series</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Structured And Targeted Study Material</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Tests On Regular Basis For Progress Tracking</span>
                            </div>
                        </div>

                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Previous Year Practice Set With Solution</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>Dedicated Educator for Doubts Clear</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>ASK Doubt with SM AI and get Solutions instantly</span>
                            </div>
                        </div>
                        <div className={Mstyles.FeaturesItem}>
                            <div className={Mstyles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={Mstyles.FeaturesItemText}>
                                <span>24*7 Help & Support </span>
                            </div>
                        </div>
                        <div style={{ height: '20px' }}> </div>
                        <Link href='/AllCourses' style={{ textDecoration: 'none' }}>
                            <div className={Mstyles.GetStartedBTN}>
                                <span>Get Started Today</span>
                            </div>
                        </Link>
                        <div style={{ height: '20px' }}> </div>
                    </div>

                </div>
                <div className={Mstyles.HeroBox2B}>
                    <img src='/courugg.png' />
                </div>
            </div>

            <div className={Mstyles.dataspacer}> </div>
        </div>


    )
}

export default HeroBox2
