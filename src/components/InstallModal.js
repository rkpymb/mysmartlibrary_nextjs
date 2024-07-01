import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Backdrop } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuDownload } from "react-icons/lu";
import CheckloginContext from '/context/auth/CheckloginContext';
import { MediaFilesUrl, MediaFilesFolder, DomainURL, API_URL } from '/Data/config';
import Mstyles from '/Styles/library.module.css';

const InstallModal = () => {
    const Contextdata = useContext(CheckloginContext);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [PwaSettings, setPwaSettings] = useState([]);
    const [selectedPwaIndex, setSelectedPwaIndex] = useState(0);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        if (Contextdata.WebData && Contextdata.WebData.length > 0) {
            const settings = Contextdata.WebData.map((webData) => ({
                url: `${DomainURL}${webData.webid}`,
                manifestURL: `${API_URL}Openendpoint/manifest.json?webid=${webData.webid}`,
                icon: `${MediaFilesUrl}${MediaFilesFolder}/${webData.icon}`,
                appName: webData.appName,
            }));
            setPwaSettings(settings);
        }
    }, [Contextdata.WebData]);

    useEffect(() => {
        const checkAppInstalled = () => {
            const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
            return isInstalled;
        };

        const listenForInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setShowModal(true);
        };

        window.addEventListener('beforeinstallprompt', listenForInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', listenForInstallPrompt);
        };
    }, []);

    const installApp = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setBtnLoading(true);
                }
                setTimeout(() => {
                    setBtnLoading(false);
                    setShowModal(false);
                }, 1000);
            });
        }
    };

    const handlePwaChange = (index) => {
        setSelectedPwaIndex(index);
    };

    const selectedPwa = PwaSettings[selectedPwaIndex];

    if (!selectedPwa) {
        return null; // Or some loading state if PwaSettings is still being fetched
    }

    return (
        <div>
            <Head>
                <link rel="manifest" href={selectedPwa.manifestURL} />
                <meta name="theme-color" content="#ffffff" />
                <link rel="apple-touch-icon" href={selectedPwa.icon} />
            </Head>

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showModal && !checkAppInstalled()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={Mstyles.PGDilogBox}>
                        <div>
                            <div className={Mstyles.OrderDoneb}>
                                <div className={Mstyles.OrderDoneboxFooter}>
                                    <div className={Mstyles.PwaaBox}>
                                        <div className={Mstyles.PwaImg}>
                                            <Image
                                                src={selectedPwa.icon}
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
                                        <span>Try {selectedPwa.appName} Progressive Web App for Better Experience 🚀</span>
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
            </Backdrop>
        </div>
    );
};

export default InstallModal;
