import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    styled
} from '@mui/material';
import Mstyles from '/Styles/library.module.css'

import { useRouter, useParams } from 'next/router'


const OrderInvoice = ({ OrderData }) => {
    const router = useRouter()

    useEffect(() => {
        console.log(OrderData.TotalDiscount)
        // if (PassD.PassData) {

        //     setDataMian(PassD.PassData[0])



        // } else {
        //     alert('Something went wrong')
        // }


    }, []);


    return (
        <div>
            <div className={Mstyles.OrderDatabox}>
                <div className={Mstyles.InvBoxHeader}>
                    <div className={Mstyles.InvBoxHeaderA}>
                        <div className={Mstyles.OrderID}>
                            <span>{OrderData.Orderid}</span>
                        </div>
                        <div className={Mstyles.OrderTitle}>
                            <span>{OrderData.OrderTitle}</span>
                        </div>

                    </div>
                    <div className={Mstyles.InvBoxHeaderB}>
                        <div className={Mstyles.Statustag}>
                            <span>{OrderData.OrderStatusText}</span>
                        </div>
                        <div className={Mstyles.OrderDate}>
                            <span>Date : {OrderData.date}, {OrderData.time}</span>
                        </div>



                    </div>
                </div>
                <div style={{ height: '20px' }}></div>
                <div className={Mstyles.InvBox}>



                    <div className={Mstyles.InvBoxItem}>
                        <div className={Mstyles.InvBoxItemA}>
                            <span>Order Amount</span>
                        </div>
                        <div className={Mstyles.InvBoxItemB}>
                            ₹ {OrderData.mprice}

                        </div>

                    </div>
                    <div className={Mstyles.InvBoxItem}>
                        <div className={Mstyles.InvBoxItemA}>
                            <span>Discount</span>
                        </div>
                        <div className={Mstyles.InvBoxItemB}>
                            - ₹ {OrderData.TotalDiscount}

                        </div>

                    </div>
                    <div className={Mstyles.InvBoxItem}>
                        <div className={Mstyles.InvBoxItemA}>
                            <span>Total</span>
                        </div>
                        <div className={Mstyles.InvBoxItemB} style={{ fontWeight:700 }} >
                            ₹ {OrderData.amt}  {OrderData.PayStatus === true ?
                                <span style={{ fontSize: '13px'}}>Paid </span> :
                                <span style={{ fontSize: '13px' }}  >Dues</span>

                            }


                        </div>

                    </div>


                </div>
                <div className={Mstyles.InvBoxMsg}>
                    {OrderData.PayStatus === true ?
                        <span>Subscription Added Succesfully 🎉</span> :
                        <span >Order Current Status : <span style={{ color: 'red' }}>{OrderData.OrderStatusText}</span></span>

                    }


                </div>

            </div>
        </div>
    )
}

export default OrderInvoice
