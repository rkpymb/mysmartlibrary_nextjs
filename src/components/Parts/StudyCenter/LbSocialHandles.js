import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import CheckloginContext from '/context/auth/CheckloginContext'
import Image from 'next/image';
const FooterMenu1 = () => {
    const Contextdata = useContext(CheckloginContext)
    const [SocialMedia, setSocialMedia] = useState(null);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const ClickUrl = (URL) => {
        const url = URL;
        window.open(url, '_blank');
    };

    useEffect(() => {
       
        setSocialMedia(Contextdata.WebSettings.SocialMediaLink)

    }, [Contextdata.WebData])

    return (
        <div>{SocialMedia &&
            <div className={Mstyles.Socialhandlebox}>
                <div className={Mstyles.SocialhandleItem} onClick={() => ClickUrl(SocialMedia.Facbook)}>
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

                <div className={Mstyles.SocialhandleItem} onClick={() => ClickUrl(SocialMedia.Instagram)}>
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
                <div className={Mstyles.SocialhandleItem} onClick={() => ClickUrl(SocialMedia.YouTube)}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/youtube.png`}
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
                <div className={Mstyles.SocialhandleItem} onClick={() => ClickUrl(SocialMedia.LinkedIn)}>
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
                <div className={Mstyles.SocialhandleItem} onClick={() => ClickUrl(SocialMedia.Xcom)}>
                    <div className={Mstyles.SocialhandleItemA}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/twitter.png`}
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

        }

        </div>
    )
}

export default FooterMenu1
