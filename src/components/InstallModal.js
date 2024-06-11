import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { Backdrop, IconButton, styled } from '@mui/material';
import Badge from '@mui/material/Badge';
import { FaWhatsapp } from "react-icons/fa";
import LoadingButton from '@mui/lab/LoadingButton';
import { LuX, LuDownload } from "react-icons/lu";
import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import Mstyles from '/Styles/library.module.css';

const InstallModal = () => {
    const Contextdata = useContext(CheckloginContext)
    const [BtnLoading, setBtnLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isAppInstalled, setIsAppInstalled] = useState(false);



    const [PwaSetting, setPwaSetting] = useState(null);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    useEffect(() => {

        console.log(Contextdata.WebSettings.PwaSetting)
        setPwaSetting(Contextdata.WebSettings.PwaSetting)

    }, [Contextdata.WebData])

    useEffect(() => {
        // Check if PWA is installed
        const checkAppInstalled = () => {
            setIsAppInstalled(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone);
        };

        // Listen for beforeinstallprompt event
        const listenForInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setShowModal(true);
        };

        // Add event listener
        window.addEventListener('beforeinstallprompt', listenForInstallPrompt);

        // Check if PWA is installed when component mounts
        checkAppInstalled();

        return () => {
            // Clean up event listener
            window.removeEventListener('beforeinstallprompt', listenForInstallPrompt);
        };
    }, []);

    const installApp = () => {

        if (deferredPrompt) {

            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setBtnLoading(true)
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }


                setTimeout(function () {
                    setBtnLoading(false)
                }, 1000)

                setShowModal(false);

            });
        }
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <div>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showModal && !isAppInstalled}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={Mstyles.PGDilogBox}>
                        <div>

                            <div>
                                <div className={Mstyles.OrderDoneb}>
                                    <div className={Mstyles.OrderDoneboxFooter}>
                                        <div className={Mstyles.PwaaBox}>

                                            <div className={Mstyles.PwaImg}>
                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${PwaSetting && PwaSetting.Icon512}`}
                                                    alt="image"
                                                    layout="responsive"
                                                    placeholder='blur'
                                                    width={50}
                                                    height={50}
                                                    quality={80}
                                                    blurDataURL={blurredImageData}
                                                    objectFit='cover'

                                                />
                                            </div>
                                          
                                            <span>Try {PwaSetting && PwaSetting.AppName} Progressive web App for Better Experience 🚀</span>
                                        </div>

                                        <div style={{ height: '10px' }}></div>
                                        <LoadingButton
                                            onClick={installApp}
                                            startIcon={<LuDownload />}
                                            loadingPosition="end"
                                            variant="contained"
                                            loading={BtnLoading}
                                            fullWidth
                                        >
                                            <span>Install App</span>
                                        </LoadingButton>
                                        <div style={{ height: '10px' }}></div>
                                        <LoadingButton
                                            fullWidth
                                            onClick={() => setShowModal(false)}
                                            loadingPosition="end"
                                            variant="text"

                                        >
                                            <span>Continue in Browser</span>
                                        </LoadingButton>
                                        <div style={{ height: '20px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Backdrop>
        </div>
    );
};

export default InstallModal;
