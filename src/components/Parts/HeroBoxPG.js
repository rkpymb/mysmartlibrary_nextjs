import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { FiCheckCircle } from "react-icons/fi";
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const HeroBox = ({ DataSlug }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    console.log(DataSlug)
    return (
        <div className={Mstyles.HeRoboxV}>
            <div className={Mstyles.HeRoboxAV}>
                <div className={Mstyles.HeRoboxH1V}>
                    <h1><span className={Mstyles.primaryColor}>Improve Your Marks </span>
                         with Experienced Experts made Test Series</h1>
                   
                </div>
                <div className={Mstyles.HeRoboxSubTextV}>
                    <span>SuperMarks stands for Education Revolution</span>
                </div>
                <div style={{ minHeight: '20px' }}></div>
               

                <div className={Mstyles.CheckListBox}>
                    <div className={Mstyles.CheckList}>
                        <div className={Mstyles.CheckListIcon}>
                            <Image src={`/female.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <div className={Mstyles.CheckListText}>
                              <span>Mede By Experienced Educators</span>
                        </div>
                    </div>
                    <div className={Mstyles.CheckList}>
                        <div className={Mstyles.CheckListIcon}>
                            <Image src={`/checkitem.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <div className={Mstyles.CheckListText}>
                            <span>Questions Quality Chacked by Experts</span>
                        </div>
                    </div>
                    <div className={Mstyles.CheckList}>
                        <div className={Mstyles.CheckListIcon}>
                            <Image src={`/motivation.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={100}
                                height={100}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>
                        <div className={Mstyles.CheckListText}>
                            <span>100% Marks Growth Assured</span>
                        </div>
                    </div>
                   
                  
                 
                </div>
                <div style={{ minHeight: '20px' }}></div>

                <div className={Mstyles.HeroBtn}>
                    <span>Start for Free</span>
                </div>
                <div style={{ minHeight: '10px' }}></div>
                <small>Click here for Free Test Series</small>
            </div>
            <div className={Mstyles.HeRoboxBV}>
                <div className={Mstyles.HeRoboxBImgV}>
                    <Image src={`/lp_top_4.avif`}
                        alt="image"
                        layout="responsive"
                        placeholder='blur'
                        width={500}
                        height={300}
                        quality={100}
                        blurDataURL={blurredImageData}

                    />

                </div>
            </div>
           
        </div>
    )
}

export default HeroBox