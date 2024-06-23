import React, { useState, useEffect, useContext, useCallback } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import { useRouter, useParams } from 'next/router';
import Dialog from '@mui/material/Dialog';
import { FiMapPin } from "react-icons/fi";
import { LuXCircle, LuMapPin, LuChevronRight, LuCheck } from "react-icons/lu";


import LoadingButton from '@mui/lab/LoadingButton';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Mstyles from '/Styles/library.module.css';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';

import Skeleton from '@mui/material/Skeleton';
import Slide from '@mui/material/Slide';
import { Web } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const LocationboxMain = ({ ShowType }) => {
    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext);
    const [OpenEdit, setOpenEdit] = useState(false);
    const [SelectedBranchName, setSelectedBranchName] = useState('Select Branch');

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Locateuser = async () => {
        handleClickOpen();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    // MakeData(latitude, longitude)
                    // console.log(latitude + 'latitude ')
                    // console.log(latitude + 'longitude ')
                    const SeLocData = {
                        lat: latitude,
                        lng: longitude,
                    }
                    Contextdata.ChangeLocationData(SeLocData);
                    const LocationData = JSON.stringify(SeLocData, null, 2);
                    localStorage.setItem('LocationData', LocationData);



                    if (Contextdata.WebData && Contextdata.MapRadius) {

                        GetBList(SeLocData)
                    }

                },
                error => {
                    RetryLocate()
                    console.log('Error getting user location:', error);
                    // setOpenEdit(true);
                }
            );
        } else {
            // setOpenEdit(true);
            console.log('Geolocation is not supported by this browser.');
        }
    }

    const GetBList = async (SeLocData) => {

        const sendUM = {
            MaxDistance: Contextdata.MapRadius,
            Longitude: SeLocData.lng,
            Latitude: SeLocData.lat,
            webid: Contextdata.WebData.WebData.webid
        }
        const data = await fetch("/api/V3/List/AllLibraryBranchlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD) {

                    if (parsed.ReqD.ListData.length > 0) {
                        setRetdata(parsed.ReqD.ListData)
                        Contextdata.ChangeMainLoader(false)
                        setIsLoading(false)

                    }

                }

            })
    }
    useEffect(() => {
        let BranchWebid = null
        const BData = localStorage.getItem('UBranchData');
        const parsedBData = JSON.parse(BData);
        if (BData) {
            if (Contextdata.WebData) {
                BranchWebid = parsedBData.WebData.webid
                if (Contextdata.WebData.webid == BranchWebid && Contextdata.UserBranchData !== null) {
                    setSelectedBranchName(Contextdata.UserBranchData.name);
                    Contextdata.ChangeMainLoader(false);
                } else {
                    Contextdata.ResetLogin()
                }
                Contextdata.ChangeMainLoader(false);
            }

        } else {
          
            Locateuser();
           
           
        }

    }, [Contextdata.UserBranchData, Contextdata.WebData]);

    const handleClickOpen = () => {
        setOpenEdit(true);
        Locateuser();
    };
    const RetryLocate = () => {
        Locateuser()
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const convertMetersToKilometers = (meters) => {
        return meters / 1000;
    };
    const BranchHandle = (e) => {
        Contextdata.ChnageUserBranchData(e)
        const UBranchData = JSON.stringify(e, null, 2);
        localStorage.setItem('UBranchData', UBranchData);
        alert('Branch Updated Successfully')
        handleCloseEdit();
    };

    return (
        <div className={Mstyles.slectbbox}>
            {ShowType == 1 &&
                <div className={Mstyles.Selectbranchtopbtn} onClick={handleClickOpen}>
                    <div className={Mstyles.SelectbranchtopbtnA}>
                        <LuMapPin />
                    </div>

                    <div className={Mstyles.SelectbranchtopbtnB}>
                        {SelectedBranchName && SelectedBranchName.slice(0, 17)} {SelectedBranchName.length > 15 && <span>...</span>}
                    </div>
                </div>
            }


            <Dialog
                fullScreen
                open={OpenEdit}
                onClose={handleCloseEdit}
                TransitionComponent={Transition}
            >
                <div className={Mstyles.LocBoxm}>
                    <div className={Mstyles.LocationBoxHeader}>
                        <div className={Mstyles.LocationBoxHeaderA}>
                            <span>Nearby Branch</span>
                        </div>
                        <div className={Mstyles.LocationBoxHeaderB}>
                            <IconButton
                                onClick={handleCloseEdit}
                                style={{ width: 40, height: 40 }}
                            >
                                <LuXCircle />
                            </IconButton>
                        </div>
                    </div>
                    <div>

                        {isLoading ? <div style={{ padding: '10px' }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation="wave" />
                            <div style={{ height: '5px' }}></div>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'50%'} animation="wave" />

                        </div> :
                            <div className={Mstyles.Brnachlistgrid}>
                                {Retdata.map((item, index) => {
                                    return <div key={index} className={Mstyles.BrItem}>
                                        <div className={Mstyles.BrItemA}>
                                            <div className={Mstyles.BRimg}>
                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.BList.logo}`}
                                                    alt="image"
                                                    objectFit='contain'
                                                    layout='fill'

                                                />

                                            </div>
                                        </div>
                                        <div className={Mstyles.BrItemB}>
                                            <div className={Mstyles.BrItemBBox}>
                                                <span className={Mstyles.Titlebr}>{item.BList.name} ({item.BList.BranchCode})</span>
                                                <div><small className={Mstyles.Addresstext}>{item.BList.Address} </small></div>
                                                <div className={Mstyles.Brbtnbox}>

                                                    <LoadingButton

                                                        size='small'
                                                        startIcon={<LuMapPin />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="text"

                                                    >
                                                        <small>{item.Distance.toFixed(2)} Km</small>
                                                    </LoadingButton>
                                                    <div style={{ width: '15px' }}></div>
                                                    <LoadingButton

                                                        size='small'

                                                        onClick={() => BranchHandle(item.BList)}
                                                        startIcon={<LuChevronRight />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="contained"

                                                    >
                                                        <small>Select</small>
                                                    </LoadingButton>
                                                </div>


                                            </div>

                                        </div>

                                    </div>
                                }

                                )}
                            </div>


                        }



                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default LocationboxMain;
