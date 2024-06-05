import React from 'react'
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import Image from 'next/image';
const FooterMenu1 = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    return (
        <div>
            <div className={Mstyles.Socialhandlebox}>
                <div className={Mstyles.SocialhandleItem}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/facebook.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={80}
                            blurDataURL={blurredImageData}


                        />
                    </div>
                   

                </div>
                <div className={Mstyles.SocialhandleItem}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/twitterx.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={80}
                            blurDataURL={blurredImageData}


                        />
                    </div>
                  

                </div>
                <div className={Mstyles.SocialhandleItem}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/instagram.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={80}
                            blurDataURL={blurredImageData}


                        />
                    </div>
                   

                </div>
                <div className={Mstyles.SocialhandleItem}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/whatsapp.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={80}
                            blurDataURL={blurredImageData}


                        />
                    </div>
                   

                </div>
                <div className={Mstyles.SocialhandleItem}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/linkedin.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={80}
                            blurDataURL={blurredImageData}


                        />
                    </div>
                    

                </div>


            </div>
        </div>
    )
}

export default FooterMenu1
