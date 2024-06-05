import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/library.module.css';
import Image from 'next/image';

import { IoIosCall } from "react-icons/io";
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';

import { LuUserCircle2 } from "react-icons/lu";


import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { ShortAbout, MediaFilesUrl, MediaFilesFolder, Contactinfo, DomainURL } from '/Data/config';

import { LuArrowLeft } from "react-icons/lu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const UserBoxHome = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (Contextdata.WebData) {
            setLoading(false);
        }
    }, [Contextdata.WebData]);



    return (
        <div>
            <div className={Mstyles.UserBoxHome}>
                <div className={Mstyles.Hprofile}>
                    <div className={Mstyles.HprofileA}>
                        {/* <div className={Mstyles.HnameTitle}>
                            <small>Welcome</small>
                            <span>{Contextdata.Data.name}</span>
                        </div> */}
                        <div className={Mstyles.SelectOPGrid}>
                            <div className={Mstyles.SelectOPItem} 
                            onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/pass`)}>
                                <div className={Mstyles.SelectOPItemA}>
                                    <div className={Mstyles.SelectOPItemAImg}>
                                        <Image
                                            src={`/img/ticket.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.SelectOPItemB}>
                                    My Pass
                                </div>

                            </div>
                            <div className={Mstyles.SelectOPItem} 
                              onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/attendance`)}
                            >
                                <div className={Mstyles.SelectOPItemA}>
                                    <div className={Mstyles.SelectOPItemAImg}>
                                        <Image
                                            src={`/img/calendar.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.SelectOPItemB}>
                                   Attendance
                                </div>

                            </div>
                            <div className={Mstyles.SelectOPItem}
                             onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/wallet`)}
                            >
                                <div className={Mstyles.SelectOPItemA}>
                                    <div className={Mstyles.SelectOPItemAImg}>
                                        <Image
                                            src={`/img/wallet.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.SelectOPItemB}>
                                    My Wallet
                                </div>

                            </div>
                            <div className={Mstyles.SelectOPItem}
                             onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/user/addons`)}
                            >
                                <div className={Mstyles.SelectOPItemA}>
                                    <div className={Mstyles.SelectOPItemAImg}>
                                        <Image
                                            src={`/img/add.png`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={50}
                                            height={50}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.SelectOPItemB}>
                                    My Addons
                                </div>

                            </div>
                          

                        </div>
                    </div>
                    <div className={Mstyles.HprofileB}>

                       

                    </div>

                </div>

            </div>
        </div>
    );
};

export default UserBoxHome;
