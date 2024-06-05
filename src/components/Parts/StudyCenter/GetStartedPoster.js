import React from 'react'
import Mstyles from '/Styles/library.module.css'
import Image from 'next/image';

const GetStartedPoster = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>
            <div className={Mstyles.OnlyDesktop}>
                <div className={Mstyles.GetStartedPoster}>
                    <Image
                        alt="img"
                        src={`/img/glca-desktop.png`}
                        layout="fill"
                        placeholder='blur'
                        width={null}
                        height={null}
                        quality={100}
                        blurDataURL={blurredImageData}
                        objectFit='center'

                    />
                </div>
            </div>
            <div className={Mstyles.OnlyMobile}>
                <div className={Mstyles.GetStartedPoster}>
                    <Image
                        alt="img"
                        src={`/img/glca-desktop.png`}
                        layout="fill"
                        placeholder='blur'
                        width={null}
                        height={null}
                        quality={100}
                        blurDataURL={blurredImageData}
                        objectFit='center'

                    />
                </div>
            </div>
        </div>

    )
}

export default GetStartedPoster
