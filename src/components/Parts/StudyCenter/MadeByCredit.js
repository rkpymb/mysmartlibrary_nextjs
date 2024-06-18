import React from 'react'
import Mstyles from '/Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder,MainLogo } from '/Data/config'
import { useRouter, useParams } from 'next/router'
import Image from 'next/image';
const MadeByCredit = () => {
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    return (
        <div>
            <div className={Mstyles.Ceditbox} onClick={() => router.push('https://mysmartlibrary.in')}>
                <div className={Mstyles.CeditboxTex}>Made in <div style={{ width: '5px' }}></div>

                    <Image
                        src={`/img/indiaflag.svg`}
                        alt="image"

                        placeholder='blur'
                        blurDataURL={blurredImageData}
                        objectFit='center'
                        width={15}
                        height={15}

                    /> <div style={{ width: '5px' }}></div> Bharat

                </div>
                <div style={{ minHeight: '5px' }}></div>
                <div className={Mstyles.Ceditimgbox}>
                    <img
                        src={MainLogo}
                        alt="image"
                        layout="responsive"
                        placeholder='blur'
                        blurDataURL={blurredImageData}
                        objectFit='center'
                        width={'100%'}

                    />
                </div>
                <div className={Mstyles.CeditboxTexTwo}>
                powered by mysmartlibrary.in

                </div>
            </div>
        </div>
    )
}

export default MadeByCredit
