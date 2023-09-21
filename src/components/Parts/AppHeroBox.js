import * as React from 'react';
import styles from '../../../Styles/home.module.css'
import Link from 'next/link';
import Image from 'next/image'

import Icon1 from '../../../public/img/icon/explore-pass-trophy.svg'
import Icon2 from '../../../public/img/icon/explore-pass-test.svg'
import Icon3 from '../../../public/img/icon/explore-pass-poll.svg'
import Icon4 from '../../../public/img/icon/explore-pass-lang.svg'
import { BASE_URL, AppName } from '../../../Data/config';
export default function PassHeroBox() {

    return (
        <div className={styles.PassHeroBox}>

            <div className={styles.PassHeroBoxA}>
                <div className={styles.PassHeroBoxAImg}>
                    <img src='https://server.supermarks.in/Storage/img/downapp2.png' />
                </div>
            </div>
            <div className={styles.PassHeroBoxB}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Learn with <span style={{ color: '#ff693d' }}>{AppName} App</span></span>
                {/* <div>
                    <Image src={Logo} height={50} width={150} />
                </div> */}
                <div>
                    Start your learning journey now!
                </div>
                <div style={{ height: '20px' }}> </div>
                <div>
                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}> DOWNLOAD THE APP NOW</span>
                </div>
                <div style={{ height: '20px' }}> </div>
                <div className={styles.PassHeroItemBox}>
                    <div className={styles.PassHeroItem}>
                        <div className={styles.IconPassheroimg} style={{ backgroundColor: '#fbf7e5' }}>
                            <Image src={Icon1} height={30} width={30} />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            <span style={{ fontWeight: '500' }}>Best Educators</span>
                        </div>
                    </div>
                    <div className={styles.PassHeroItem}>
                        <div className={styles.IconPassheroimg} style={{ backgroundColor: '#fff2eb' }}>
                            <Image src={Icon3} height={30} width={30} />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            <span style={{ fontWeight: '500' }}>In-depth
                                Performance Analysis</span>
                        </div>
                    </div>

                </div>
                <div className={styles.PassHeroItemBox}>
                    <div className={styles.PassHeroItem}>
                        <div className={styles.IconPassheroimg} style={{ backgroundColor: '#f3f0ff' }}>
                            <Image src={Icon2} height={30} width={30} />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            <span style={{ fontWeight: '500' }}>Latest
                                Patterns</span>
                        </div>
                    </div>
                    <div className={styles.PassHeroItem}>
                        <div className={styles.IconPassheroimg} style={{ backgroundColor: '#e4feef' }}>
                            <Image src={Icon4} height={30} width={30} />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            <span style={{ fontWeight: '500' }}>Multi-lingual</span>
                        </div>
                    </div>

                </div>
                <div style={{ height: '20px' }}> </div>
                <Link href='https://play.google.com/store/apps/details?id=com.supermarksapp' style={{ textDecoration: 'none' }}>
                    <div className={styles.GetStartedBTN}>
                        <span>DOWNLOAD APP</span>
                    </div>
                </Link>
                <div style={{ height: '20px' }}> </div>
            </div>

        </div>
    );
}
