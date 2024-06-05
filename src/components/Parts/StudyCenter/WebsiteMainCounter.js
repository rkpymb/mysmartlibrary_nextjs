import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/library.module.css'
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, SocialHandles, Contactinfo, DomainURL } from '/Data/config'
const HeroBox = () => {
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    const [Branches, setBranches] = useState(0);
    const [Shifts, setShifts] = useState(0);
    const [Users, setUsers] = useState(0);
    const [Seats, setSeats] = useState(0);
    const [Loading, setLoading] = useState(true);

    const GetBList = async () => {

        const sendUM = {

            webid: Contextdata.WebData.WebData.webid
        }
        const data = await fetch("/api/V3/Library/WebCounter", {
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
                    setBranches(parsed.ReqD.Branches)
                    setShifts(parsed.ReqD.Shifts)
                    setSeats(parsed.ReqD.Seats)
                    setUsers(parsed.ReqD.Users)
                    setLoading(false)

                }

            })
    }

    useEffect(() => {
        GetBList()


    }, [router.query]);
    return (
        <div>
            {!Loading &&
                <div>
                    <div className={Mstyles.WMCounterGrid}>
                        <div className={Mstyles.WMCounterItem}>
                            <div className={Mstyles.WMCounterItemA}>
                                <span>{Branches}+</span>
                                <small>Branches</small>
                            </div>
                            <div className={Mstyles.WMCounterItemB}>
                                <Image
                                    src={`/img/dlogo.png`}
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
                        <div className={Mstyles.WMCounterItem}>
                            <div className={Mstyles.WMCounterItemA}>
                                <span>{Shifts}+</span>
                                <small>Active Shift</small>
                            </div>
                            <div className={Mstyles.WMCounterItemB}>
                                <Image
                                    src={`/img/shift.png`}
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
                        <div className={Mstyles.WMCounterItem}>
                            <div className={Mstyles.WMCounterItemA}>
                                <span> {Seats}+</span>
                                <small>Seating Capacity</small>
                            </div>
                            <div className={Mstyles.WMCounterItemB}>
                                <Image
                                    src={`/img/study.png`}
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
                        <div className={Mstyles.WMCounterItem}>
                            <div className={Mstyles.WMCounterItemA}>
                                <span>{Users}K+</span>
                                <small>Happy Users</small>
                            </div>
                            <div className={Mstyles.WMCounterItemB}>
                                <Image
                                    src={`/img/networking.png`}
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
                    </div>
                </div>


            }

        </div>

    )
}

export default HeroBox