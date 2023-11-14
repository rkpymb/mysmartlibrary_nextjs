import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiChevronRight } from "react-icons/fi";
import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBox = (props) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (

        <div className={Mstyles.HeroBoxTwoV}>
            <div style={{ minHeight: '30px' }}></div>
            <div className={Mstyles.HeroBoxTwoTitle}>
                <h1>Everything you need for your Exam at one place</h1>
                <span>Study from content highly focused on the syllabus to be 100% exam ready</span>
            </div>
            <div style={{ minHeight: '30px' }}></div>
            <div className={Mstyles.HeroBoxTwoItemBox}>
                
                  
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fce4ec' }}>
                    <div className={Mstyles.HeroBoxTwoItemIcon}>
                        <Image src={`/icons/StructuredCourses.webp`}
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
                        <span>Structured Courses</span>
                    </div>
                    <div className={Mstyles.HeroBoxTwoItemDetails}>
                        <span>With 1000+ courses you can prepare for every exam!</span>
                    </div>
                    <div className={Mstyles.BtnWithIcon}>
                        <div>
                            <Link href='/Courses' style={{ textDecoration: 'none' }}>
                                <span>Enroll Now</span>
                            </Link>
                           
                        </div>
                        <div>
                            <FiChevronRight size={15}/>
                        </div>
                    </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#e8dfff' }}>
                    <div className={Mstyles.HeroBoxTwoItemIcon}>
                        <Image src={`/icons/TestsSeries.webp`}
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
                            <Link href='/TestSeries' style={{ textDecoration: 'none' }}>
                                <span>Let's Practice</span>
                            </Link>
                          
                        </div>
                        <div>
                            <FiChevronRight size={15}/>
                        </div>
                    </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#b6ffe4'}}>
                    <div className={Mstyles.HeroBoxTwoItemIcon}>
                        <Image src={`/icons/StudyNotes.webp`}
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
                            <Link href='/StudyMaterials' style={{ textDecoration: 'none' }}>
                                <span>Explore more</span>
                            </Link>
                           
                        </div>
                        <div>
                            <FiChevronRight size={15}/>
                        </div>
                    </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fff0cb' }}>
                    <div className={Mstyles.HeroBoxTwoItemIcon} >
                        <Image src={`/icons/VideoLectures.webp`}
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
                            <Link href='/Courses' style={{ textDecoration: 'none' }}>
                                <span>Start Learning</span>
                            </Link>
                        </div>
                        <div>
                            <FiChevronRight size={15}/>
                        </div>
                    </div>
                </div>
              
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#cddeff' }}>
                    <div className={Mstyles.HeroBoxTwoItemIcon}>
                        <Image src={`/icons/BookSummaries.webp`}
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
                        <span>Best Books</span>
                    </div>
                    <div className={Mstyles.HeroBoxTwoItemDetails}>
                        <span>The best teachers and fellow students</span>
                    </div>
                    <div className={Mstyles.BtnWithIcon}>
                        <div>
                            <Link href='/Books' style={{ textDecoration: 'none' }}>
                                <span>Start Reading</span>
                            </Link>
                            
                        </div>
                        <div>
                            <FiChevronRight size={15}/>
                        </div>
                    </div>
                </div>
                


            </div>
        </div>

    )
}

export default HeroBox