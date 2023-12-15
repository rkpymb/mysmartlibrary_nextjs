import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Image from 'next/image';

import MYS from '../../../Styles/mystyle.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Button from '@mui/material/Button';
import Nodatafound from '../Extra/Nodatafound'
import Skeleton from '@mui/material/Skeleton';

import { FiChevronRight } from "react-icons/fi";

import {

    useTheme,

} from '@mui/material';

function RecentOrders() {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()


    useEffect(() => {
        setTimeout(function () {
            GetData()
        }, 1000);


    }, [router.query]);
    const theme = useTheme();


    const GetData = async () => {
        const sendUser = { JwtToken: Contextdata.JwtToken }
        const data = fetch("/api/V3/Students/MyOrderslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        }).then((a) => {
            return a.json();
        })
            .then((parsedUser) => {
                setRetdata(parsedUser.ReqData)
                setIsLoading(false)



            })
    }


    const Demodata = [
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
        }
        ,
        {
            id: 6
        }
    ]


    return (
        <div>
            {isLoading &&
                <div>
                    {Demodata.map((item) => {
                        return <div className={MYS.ItemList} key={item.id}>
                            <div className={MYS.ItemListBox}>
                                <div className={MYS.ItemListBoxA}>
                                    <Skeleton variant="rounded" width={130} height={130} animation="wave" />
                                </div>
                                <div className={MYS.ItemListBoxB}>
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={'100%'} animation="wave" />

                                    <div>
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={200} animation="wave" />
                                    </div>
                                    <div>
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={200} animation="wave" />
                                    </div>
                                    <div style={{ height: '10px' }}></div>
                                    <div className={MYS.BtnFlexBox}>
                                        <Skeleton variant="rectangular" width={100} height={30} animation="wave" />

                                        <div style={{ minWidth: '10px' }}></div>
                                        <Skeleton variant="rectangular" width={100} height={30} animation="wave" />



                                    </div>






                                </div>

                            </div>


                        </div>
                    }

                    )}


                </div>

            }


            {!isLoading &&

                <div>

                    {Retdata.length == 0 &&
                        <Nodatafound
                            Title={'No Test Series Results or Attempts Found'}
                            Desc={'You do not have Attempt any Eam or test Series yet'}

                        />
                    }
                    {Retdata.length > 0 &&
                        <div>
                            {Retdata.map((item) => {
                                return <div className={MYS.ItemList} key={item._id}>
                                    <div className={MYS.ItemListBox}>

                                        <div className={MYS.ItemListBoxB}>
                                            <h3>{item.ProductType} Order : {item.OrderTitle}</h3>
                                            <small>ORDER ID : <b>{item.Orderid}</b></small>

                                            <div>
                                                <small>Created on: {item.date},{item.time}</small>
                                            </div>
                                            <div>
                                                <small>Price : <b>₹ {item.mprice}</b></small>
                                            </div>
                                            <div>
                                                <small>Dicount : <b> - ₹ {item.TotalDiscount}</b></small>
                                            </div>
                                            <div>
                                                <small>Total Amount : <b>₹ {item.amt}</b></small>
                                            </div>
                                            <div>
                                                <small>Payment Status: {item.PayStatusText}</small>
                                            </div>
                                            <div>
                                                <small>Order Status: {item.OrderStatusText}</small>
                                            </div>

                                            <div style={{ height: '10px' }}></div>

                                        </div>

                                    </div>

                                </div>
                            }

                            )}
                        </div>
                    }


                </div>
            }

        </div>
    );
}

export default RecentOrders;
