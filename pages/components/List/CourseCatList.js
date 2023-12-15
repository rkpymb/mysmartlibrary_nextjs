import React, { useState, useEffect, useContext } from 'react';


import { useRouter } from 'next/router'
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

import Mstyles from '../../../Styles/home.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'

import {

    useTheme,
} from '@mui/material';

function RecentOrders() {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/CatList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.categories.length > 0) {
                        setRetdata(parsed.ReqD.categories)
                        setTimeout(function () {
                            setIsLoading(false)
                        }, 1000);
                    }

                })
        }
        handleSubmit()


    }, [router.query])


    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    const theme = useTheme();

    return (<>

        {isLoading &&
            <div>
                <div className={Mstyles.CatGrid}>
                    {Dummydta.map((item, index) => {
                        return <div className={Mstyles.CatGridItem} key={index}>
                            <div className={Mstyles.CatGridItemA}>
                                <Skeleton variant="circular" width={40} height={40} animation="wave"/>
                            </div>
                            <div className={Mstyles.CatGridItemB}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave"/>
                            </div>



                        </div>
                    }

                    )}
                </div>
            </div>

        }
        {!isLoading &&
            <div className={Mstyles.CatGrid}>
                {Retdata.map((item) => {
                    return <Link href={`/Courses/${item.slug}`} key={item.id} style={{ textDecoration: 'none' }}>
                        <div className={Mstyles.CatGridItem}>
                            <div className={Mstyles.CatGridItemA}>
                                <Image
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={50}
                                    height={50}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                            <div className={Mstyles.CatGridItemB}>
                                <span>{item.name}</span>
                            </div>



                        </div>
                    </Link>
                }

                )}
            </div>

        }

    </>
    );
}

export default RecentOrders;
