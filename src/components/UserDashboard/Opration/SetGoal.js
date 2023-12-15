import React, { useState, useEffect, useContext } from 'react';

import Dialog from '@mui/material/Dialog';
import MYS from 'Styles/mystyle.module.css'
import Mstyles from 'Styles/home.module.css';
import { MediaFilesUrl, MediaFilesFolder } from 'Data/config'
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router'
import Slide from '@mui/material/Slide';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import { FiXCircle, FiChevronRight, FiClock } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {


    styled
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function AlertDialogSlide() {
    const Contextdata = useContext(CheckloginContext)
    const [open, setOpen] = React.useState(false);

    const [Retdata, setRetdata] = useState([]);
    const [IsLoadingMainCat, setIsLoadingMainCat] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const notify = (T) => toast(T, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const GetMainCat = async () => {
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
                        setIsLoadingMainCat(false)
                        const mainCatValue = localStorage.getItem('MainCat');
                        if (!mainCatValue || mainCatValue.trim() === '') {
                            handleClickOpen()

                        }

                    }, 1000);
                }

            })
    }

    useEffect(() => {
        GetMainCat()


    }, [router.query])

    const ChangeGoal = async (name, slug) => {

        const MCatData = [{
            name: name,
            slug: slug,
        }]
        localStorage.setItem('MainCat', JSON.stringify(MCatData))
        notify(`${name} set to your goal 👍`)
        setTimeout(function () {
            router.reload()
        }, 1000);
        handleClose()
    }


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
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />
            {Contextdata.IsLogin
                ?
                <LoadingButton
                    fullWidth
                    onClick={handleClickOpen}
                    endIcon={<FiChevronRight />}
                    loading={false}
                    loadingPosition="end"
                    variant="outlined"
                    size='small'
                >
                    {Contextdata.GoalStatus ?
                        <span>Change Goal</span> :
                        <span>Set Goal</span>

                    }

                </LoadingButton>
                :
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={100} animation="wave" />


            }


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={MYS.DiloagTopWithclosebtn}>
                    <div className={MYS.DiloagTopWithclosebtnA}>
                        <span>Set Your Goal</span>
                    </div>
                    <div className={MYS.DiloagTopWithclosebtnB}>
                        <IconButton aria-label="cart" onClick={handleClose}>
                            <StyledBadge color="secondary" >
                                <FiXCircle />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
                <DialogContent>
                    {IsLoadingMainCat &&
                        <div>
                            <div className={Mstyles.CatGrid}>
                                {Dummydta.map((item, index) => {
                                    return <div className={Mstyles.CatGridItem} key={index}>
                                        <div className={Mstyles.CatGridItemA}>
                                            <Skeleton variant="circular" width={40} height={40} animation="wave" />
                                        </div>
                                        <div className={Mstyles.CatGridItemB}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                        </div>



                                    </div>
                                }

                                )}
                            </div>
                        </div>

                    }
                    {!IsLoadingMainCat &&
                        <div className={Mstyles.CatGrid}>
                            {Retdata.map((item) => {
                                return <div className={Mstyles.CatGridItem} key={item.id} onClick={() => ChangeGoal(item.name, item.slug)}   >
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
                            }

                            )}
                        </div>

                    }
                </DialogContent>

            </Dialog>
        </div>
    );
}
