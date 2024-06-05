import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';

import * as animationData from '/Data/Lottie/doneanimation.json'

import Dialog from '@mui/material/Dialog';

import Sheet from 'react-modal-sheet';
import Slide from '@mui/material/Slide';
import PaywithCredit from '/src/components/Parts/StudyCenter/PaymentGatway/PaywithCredit'

import AminityGrid from '/src/components/Parts/StudyCenter/AminityGrid'
import WhyChooseus from '/src/components/Parts/StudyCenter/WhyChooseus'
import Lbreviews from '/src/components/Parts/StudyCenter/Lbreviews'
import LbContactboxHome from '/src/components/Parts/StudyCenter/LbContactboxHome'
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';


import Badge from '@mui/material/Badge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { BiCheckCircle } from "react-icons/bi";
import { FiChevronRight, FiClock, FiPlus } from "react-icons/fi";

import Lottie from 'react-lottie'

import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '/Styles/library.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'



import NavBarTop from '/src/components/Parts/Navbar/NavBarTop'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import WebsiteData from '/src/components/Parts/StudyCenter/WebsiteData'


import Footer from '/src/components/Parts/Footer'

import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, LbsubWebhook } from '/Data/config'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export async function getServerSideProps(context) {
    const passid = context.query.pageno[0];
    const webid = context.query.pageno[2];
    const Branchcode = context.query.pageno[1];

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passid: passid, Branchcode: Branchcode, webid: webid, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}Openendpoint/LBPassData`, requestOptions);
    const PassD = await response.json();
    return {
        props: { PassD },
    }

}

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
   
`
);

function Overview({ PassD }) {
    const Contextdata = useContext(CheckloginContext)
    const [ShowPg, setShowPg] = useState(false);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
    const [Loading, setLoading] = useState(true);
    const [LoadingSeats, setLoadingSeats] = useState(false);
    const [ShiftsList, setShiftsList] = useState([]);
    const [Seats, setSeats] = useState([]);
    const [ShwoSeatsModal, setShwoSeatsModal] = useState(false);
    const [DataMian, setDataMian] = useState({});
    const [ShowPaybtn, setShowPaybtn] = useState(false);
    const [Addons, setAddons] = useState([]);
    const [PM, SetPM] = useState([]);
    const [CurrentShift, setCurrentShift] = useState({});
    const [CurrentSeat, setCurrentSeat] = useState({});
    const [Totalamt, setTotalamt] = useState();
    const [SelectedSeatCode, setSelectedSeatCode] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [PMData, setPMData] = useState(null);
    const [PaymentData, setPaymentData] = useState({});
    const [AddonLoading, setAddonLoading] = useState(true);
    const [CreateOrderLoader, setCreateOrderLoader] = useState(false);




    const handleClose = () => {
        setShwoSeatsModal(false);

    };


    const handleClickOpen = () => {
        setShwoSeatsModal(true);
    };


    useEffect(() => {

        if (PassD.PassData && Contextdata.WebData) {

            setDataMian(PassD.PassData[0])
            setLoading(false);
            LibraryShift()


        } 


    }, [Contextdata.WebData]);

    const LibraryShift = async () => {
        const webid = Contextdata.UserBranchData.WebData.webid
        const BranchCode = Contextdata.UserBranchData.BranchCode
        const sendUM = { Branchcode: BranchCode, webid: webid }
        const data = await fetch("/api/V3/Library/LibraryShift", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedFinal) => {
                if (parsedFinal.ReqD.Shift) {
                    setShiftsList(parsedFinal.ReqD.Shift)

                    setLoading(false)
                }

            })
    }


    const Showseats = async (e) => {
        setCurrentShift(e)
        setLoadingSeats(true)
        const webid = Contextdata.UserBranchData.WebData.webid
        const BranchCode = Contextdata.UserBranchData.BranchCode
        const sendUser = {

            Shiftid: e.Shiftid,
            Branchcode: BranchCode,
            webid: webid
        }
        const data = fetch("/api/V3/Library/GetLBSeatsbyBranchCode", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        }).then((a) => {
            return a.json();
        })
            .then((ParseSeats) => {
                // console.log(ParseSeats.ReqData)
                if (ParseSeats.ReqData.SeatsList) {
                    setSeats(ParseSeats.ReqData.SeatsList)


                    setTimeout(function () {
                        setShwoSeatsModal(true)
                        setLoadingSeats(false)

                    }, 2000);

                }
            })
    }




    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const getAddons = async () => {

        const webid = Contextdata.UserBranchData.WebData.webid
        const BranchCode = Contextdata.UserBranchData.BranchCode
        const sendUM = {

            Branchcode: BranchCode,
            webid: webid
        }
        const data = await fetch("/api/V3/Library/Lbaddonslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();


        })
            .then((parsedFinal) => {
                setShowPaybtn(true)
                if (parsedFinal.ReqData.Addons) {
                    setAddons(parsedFinal.ReqData.Addons)
                    // console.log(parsedFinal.ReqData.Addons)
                    setAddonLoading(false)
                }

            })
    }


    const SeatSeleted = async (e) => {
        console.log(e)
        setCurrentSeat(e)
        setSelectedSeatCode(e.SeatCode)
        setSelectedItems([])
        setTotalamt(CurrentShift.sprice * DataMian.Validity)
        getAddons()
    }

    const handleToggleSelection = (product) => {
        const isSelected = selectedItems.some((item) => item._id === product._id);
        if (isSelected) {
            setTotalamt(parseInt(Totalamt) - parseInt(product.sprice));
            setSelectedItems(selectedItems.filter((item) => item._id !== product._id));
        } else {
            setTotalamt(parseInt(Totalamt) + parseInt(product.sprice));
            setSelectedItems([...selectedItems, product]);
        }
    };



    const CreateOrder = async () => {
        setCreateOrderLoader(true)
        const Pmd = {
            PaymentMode: 'Wallet'
        }
        const datasend = {
            passid: PassD.PassData[0].passid,
            Addons: selectedItems,
            Shiftid: CurrentShift.Shiftid,
            SeatCode: CurrentSeat.SeatCode,
            PMData: Pmd

        }
        const data = fetch("/api/V3/Library/LibraryCreateOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datasend)
        }).then((a) => {
            return a.json();
        })
            .then((OrderParse) => {
                if (OrderParse.ReqData.done) {
                    const OData = OrderParse.ReqData.done
                    setPaymentData(OData)
                    setTimeout(function () {
                        handleClose()
                        setShowPg(true)

                    }, 2000);
                } else {
                    console.log(OrderParse)
                    setCreateOrderLoader(false)
                    alert('Something Went Wrong')

                }


            })

    }



    function scrollToBookNow() {
        const bookNowDiv = document.getElementById('booknow');
        bookNowDiv.scrollIntoView({ behavior: 'smooth' });
    }




    return (
        <OverviewWrapper>
            <WebsiteData />
            <NavBarTop />
            <div className={Mstyles.MNavDevider} ></div>
            <NavbarTitle Title={'Subscription Passes'} />

            {!Loading &&
                <div>
                    <div className={Mstyles.Minh100vh}>

                        <div className={Mstyles.Mbox}>
                            <div className={Mstyles.MSecDevider} ></div>
                            <div className={Mstyles.PassItemDet}>
                                <div className={Mstyles.PassItemDetTop}>
                                    <div className={Mstyles.PassItemDetTopB}>
                                        <div className={Mstyles.Passimg}>
                                            <Image
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${PassD.PassData[0].img}`}
                                                alt="image"
                                                layout="responsive"
                                                placeholder='blur'
                                                width={30}
                                                height={30}
                                                quality={100}
                                                blurDataURL={blurredImageData}

                                            />
                                        </div>
                                    </div>

                                    <div className={Mstyles.PassItemDetTopA}>
                                        <span>{PassD.PassData[0] && PassD.PassData[0].title}</span>
                                        <div>
                                            <small>Validity : {PassD.PassData[0].Validity} DAYS</small>
                                        </div>
                                    </div>
                                </div>
                                <div className={Mstyles.Passbtns}>

                                    <LoadingButton
                                        onClick={scrollToBookNow}
                                        fullWidth


                                        endIcon={<LuArrowRight />}
                                        loading={false}
                                        loadingPosition="end"
                                        variant="outlined"

                                    >
                                        <span>Book Now</span>
                                    </LoadingButton>
                                </div>
                            </div>
                            <div className={Mstyles.OnlyDesktop}>
                                <div style={{ height: '20px' }}></div>
                            </div>

                            <div className={Mstyles.PassDbox}>
                                <span>{PassD.PassData[0].details} {PassD.PassData[0].details}{PassD.PassData[0].details}{PassD.PassData[0].details}</span>
                            </div>

                            <div className={Mstyles.MSecDevider} id="booknow"></div>

                            <AminityGrid />

                            <div className={Mstyles.MSecDevider} ></div>

                            <div className={Mstyles.Shiftbox} >

                                <div className={Mstyles.ShiftboxOver}>
                                    <div className={Mstyles.WebsteTitlebox} >
                                        <h2>Available Shifts</h2>
                                        <span>Choose Your Shift to book your Seat now !</span>
                                    </div>
                                    <div style={{ height: '20px' }}></div>
                                    <div className={Mstyles.Shiftgrid}>
                                        {ShiftsList.map((item) => {
                                            return <div className={Mstyles.Shiftitem} key={item._id} onClick={() => Showseats(item)} >
                                                <div className={Mstyles.ShiftitemA}>
                                                    <div>  <span style={{ fontWeight: 600 }}>{item.title}</span></div>
                                                    <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>{item.uptime} - {item.downtime}</span></div>
                                                    <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>Price  <del>{item.mprice * DataMian.Validity}</del> <span style={{ fontWeight: 700 }}>₹{item.sprice * DataMian.Validity}</span> (for {DataMian.Validity} days)</span></div>
                                                </div>
                                                <div className={Mstyles.ShiftitemB}>
                                                    <LoadingButton
                                                        fullWidth
                                                        size='small'
                                                        endIcon={<FiChevronRight />}
                                                        loading={LoadingSeats}
                                                        loadingPosition="end"
                                                        variant="outlined"

                                                    >
                                                        <span>Book Now</span>
                                                    </LoadingButton>
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </div>

                                </div>
                            </div>

                            <div className={Mstyles.MSecDevider} ></div>
                            <div className={Mstyles.OnlyMobile}>
                                <div style={{ height: '20px' }}></div>
                            </div>
                            <WhyChooseus />
                            <div className={Mstyles.OnlyMobile}>
                                <div style={{ height: '20px' }}></div>
                            </div>
                            <div className={Mstyles.MSecDevider} ></div>

                            <div className={Mstyles.P7}>
                                <Lbreviews />
                            </div>
                            <div className={Mstyles.MSecDevider} ></div>
                            <LbContactboxHome />
                            <div className={Mstyles.MSecDevider} ></div>


                        </div>

                    </div>

                    <Footer />

                </div>

            }


            {!Loading &&
                <div>
                    <Dialog
                        fullScreen
                        open={ShwoSeatsModal}
                        onClose={handleClose}
                        TransitionComponent={Transition}>
                        <div className={Mstyles.LBModalheader}>
                            <div className={Mstyles.LBModalheaderBox}>
                                <div>
                                    <IconButton aria-label="cart" onClick={() => handleClose()}>
                                        <StyledBadge color="secondary" >
                                            <LuArrowLeft />
                                        </StyledBadge>
                                    </IconButton>
                                </div>
                                <div className={Mstyles.LBModalheaderBoxB}>
                                    <span className={Mstyles.LBTitle}>Choose Your Seat</span>
                                    <div className={Mstyles.LBDescText}>
                                        <small>{CurrentShift.title}</small>
                                        <small style={{ color: '#99A3A4' }}>︱</small>
                                        <small>{CurrentShift.uptime} - {CurrentShift.downtime}</small>
                                        <small style={{ color: '#99A3A4' }}>︱</small>
                                        <small>₹{CurrentShift.sprice * DataMian.Validity} </small>
                                        <small style={{ color: '#99A3A4' }}>︱</small>

                                        <small>Validity : {DataMian.Validity} days </small>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={Mstyles.Diloagbox}>
                            <div className={Mstyles.SeatsBox}>
                                <div style={{ height: '20px' }}> </div>
                                <div className={Mstyles.SeatsTitle}>
                                    <span>Total Seats ({Seats.length})</span>
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div className={Mstyles.SeatGrid}>
                                    {Seats.map((item) => {
                                        return <div>

                                            {item.Occupied === true &&
                                                <div>
                                                    <div className={Mstyles.SeatGridItemOccupied}
                                                        key={item.SeatCode}

                                                    >
                                                        <span style={{ fontWeight: 500, fontSize: 10 }}>{item.SeatCode}</span>

                                                    </div>
                                                </div>
                                            }
                                            {item.Occupied === false &&
                                                <div>
                                                    <div className={SelectedSeatCode == item.SeatCode && item.Occupied === false ? Mstyles.SeatGridItemChoosed : Mstyles.SeatGridItem}
                                                        key={item.SeatCode}
                                                        onClick={() => item.Occupied === false ? SeatSeleted(item) : null}
                                                    >
                                                        <span style={{ fontWeight: 500, fontSize: 10 }}>{item.SeatCode}</span>

                                                    </div>
                                                </div>
                                            }


                                        </div>
                                    }

                                    )}
                                </div>
                                <div style={{ height: '20px' }}> </div>

                            </div>

                            <div className={Mstyles.SeatsBox}>
                                <div style={{ height: '20px' }}> </div>
                                <div className={Mstyles.SeatsTitle}>
                                    <span>Avaliable Addons ({Addons.length})</span>
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div>

                                    <div className={Mstyles.Shiftgrid}>
                                        {Addons.map((item) => {
                                            return <div className={Mstyles.Shiftitem} key={item._id}
                                                onClick={() => handleToggleSelection(item)}

                                            >
                                                <div className={Mstyles.ShiftitemA}>
                                                    <div>  <span style={{ fontWeight: 600 }}>{item.title}</span></div>

                                                    <div>  <span style={{ fontWeight: 500, fontSize: 12 }}>Price  <del>{item.mprice}</del> <span style={{ fontWeight: 700 }}>₹{item.sprice}</span> </span></div>
                                                </div>
                                                <div className={Mstyles.ShiftitemB} style={{ margin: 5 }}>
                                                    <LoadingButton
                                                        fullWidth
                                                        size='small'
                                                        color={selectedItems.some((p) => p._id === item._id) ? 'error' : 'primary'}
                                                        endIcon={selectedItems.some((p) => p._id === item._id) ? <LuArrowRight /> : <FiPlus />}
                                                        loading={false}
                                                        loadingPosition="end"
                                                        variant="outlined"

                                                    >


                                                        {selectedItems.some((p) => p._id === item._id) ? 'Remove' : 'Add'}
                                                    </LoadingButton>
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </div>
                                </div>
                                <div style={{ height: '100px' }}> </div>
                            </div>

                        </div>


                        {ShowPaybtn &&
                            <div className={Mstyles.LbFooterStikey}>
                                <LoadingButton
                                    fullWidth
                                    endIcon={<FiChevronRight />}
                                    loading={CreateOrderLoader}
                                    desabled={CreateOrderLoader}
                                    loadingPosition="end"
                                    variant="contained"
                                    onClick={CreateOrder}

                                >
                                    <span>Confirm Booking</span>
                                </LoadingButton>
                            </div>
                        }


                    </Dialog>

                </div>

            }


            {ShowPg &&

                <div>
                    <PaywithCredit PaymentData={PaymentData} />
                </div>
            }

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};


