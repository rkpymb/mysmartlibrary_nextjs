import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiDownload ,FiArrowRight} from "react-icons/fi";
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBox = () => {
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (

        <div className={Mstyles.HeroBoxTwoVT}>
            <div className={Mstyles.Gredientbox}>
                <div className={Mstyles.Gredientboxh1}>
                    <div style={{ minHeight: '30px' }}></div>
                    <h1>Accelerate Your Career Growth & <span className={Mstyles.HeroBoxTwoTitleBottom}>Upskill Yourself</span></h1>
                    <div style={{ minHeight: '5px' }}></div>
                    <span className={Mstyles.HeroBoxTwoTitlespan}>Study from Top Educators, highly focused content on the syllabus to be 100% Job ready !</span>
                    <div style={{ minHeight: '10px' }}></div>
                    <a href={SocialHandles.Playstore} target='_blank' style={{ textDecoration: 'none' }}>
                        <div>
                            <LoadingButton
                                fullWidth

                                startIcon={<FiDownload />}
                                loading={false}
                                loadingPosition="end"
                                variant="contained"

                            >
                                <span>DOWNLOAD APP NOW</span>
                            </LoadingButton>
                        </div>
                    </a>


                </div>

            </div>


            <div className={Mstyles.GridItemHomeBox}>

                <div>
                    <div className={Mstyles.GridItemHome}>
                        <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fce4ec' }} onClick={() => router.push('/Courses')}>
                            <div className={Mstyles.HeroBoxTwoItemIcon}>
                                <Image src={`/img/elearning.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData} x

                                />
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemText}>
                                <span>Structured Courses</span>
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemDetails}>
                                <span>With 1000+ courses you can prepare for every exam!</span>
                            </div>
                            <div className={Mstyles.BtnWithIcon}>
                                <div>
                                    <span>Enroll Now</span>

                                </div>
                                <div>
                                    <FiArrowRight size={15} />
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#e8dfff' }} onClick={() => router.push('/TestSeries')}>
                            <div className={Mstyles.HeroBoxTwoItemIcon}>
                                <Image src={`/img/exam.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemText}>
                                <span>Tests Series</span>
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemDetails}>
                                <span>Practice every topic with over 15M+ questions in 75K+ tests</span>
                            </div>
                            <div className={Mstyles.BtnWithIcon}>
                                <div>
                                    <span>Let's Practice</span>

                                </div>
                                <div>
                                    <FiArrowRight size={15} />
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#b6ffe4' }} onClick={() => router.push('/StudyMaterials')}>
                            <div className={Mstyles.HeroBoxTwoItemIcon}>
                                <Image src={`/img/learning-tools.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemText}>
                                <span>Study Materials</span>
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemDetails}>
                                <span>With relevant content to help you prepare for exams in the best way</span>
                            </div>
                            <div className={Mstyles.BtnWithIcon}>
                                <div>
                                    <span>Explore more</span>

                                </div>
                                <div>
                                    <FiArrowRight size={15} />
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fff0cb' }} onClick={() => router.push('/Videos')}>
                            <div className={Mstyles.HeroBoxTwoItemIcon} >
                                <Image src={`/img/online-learning.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={100}
                                    height={100}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemText}>
                                <span>Video Lectures</span>
                            </div>
                            <div className={Mstyles.HeroBoxTwoItemDetails}>
                                <span>With 100K+ videos & 250K+ notes clear all your concepts</span>
                            </div>
                            <div className={Mstyles.BtnWithIcon}>
                                <div>
                                    <span>Start Learning</span>
                                </div>
                                <div>
                                    <FiArrowRight size={15} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: '20px' }}></div>
        </div>

    )
}

export default HeroBox