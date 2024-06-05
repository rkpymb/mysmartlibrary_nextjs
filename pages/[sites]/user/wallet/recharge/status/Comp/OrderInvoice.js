import React, { useState, useEffect, useContext } from 'react';

import Mstyles from '/Styles/library.module.css'

import { useRouter, useParams } from 'next/router'


const OrderInvoice = ({ OrderData }) => {
    const router = useRouter()
    const [Order, SetOrder] = useState(null)
    useEffect(() => {
        SetOrder(OrderData)
        // if (PassD.PassData) {

        //     setDataMian(PassD.PassData[0])



        // } else {
        //     alert('Something went wrong')
        // }


    }, []);


    return (
        <div>
            {Order ?

                <div className={Mstyles.OrderDatabox}>
                    <div className={Mstyles.InvBoxHeader}>
                        <div className={Mstyles.InvBoxHeaderA}>
                            <div className={Mstyles.OrderID}>
                                <span>{Order.Orderid}</span>
                            </div>
                            <div className={Mstyles.OrderTitle}>
                                <span>{Order.OrderTitle}</span>
                            </div>

                        </div>
                        <div className={Mstyles.InvBoxHeaderB}>
                            <div className={Mstyles.Statustag}>
                                <span>{Order.OrderStatusText}</span>
                            </div>
                            <div className={Mstyles.OrderDate}>
                                <span>Date : {Order.date}, {Order.time}</span>
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
                                ₹ {Order.rechargeAmount}

                            </div>

                        </div>
                        <div className={Mstyles.InvBoxItem}>
                            <div className={Mstyles.InvBoxItemA}>
                                <span>GST (18.00%)</span>
                            </div>
                            <div className={Mstyles.InvBoxItemB}>
                                ₹ {Order.TaxData.TaxAmt}

                            </div>

                        </div>
                        <div className={Mstyles.InvBoxItem}>
                            <div className={Mstyles.InvBoxItemA}>
                                <span>Total</span>
                            </div>
                            <div className={Mstyles.InvBoxItemB} style={{ fontWeight: 700 }} >
                                ₹ {Order.amt}  {Order.PayStatus === true ?
                                    <span style={{ fontSize: '13px' }}>Paid </span> :
                                    <span style={{ fontSize: '13px' }}  >Dues</span>

                                }


                            </div>

                        </div>


                    </div>
                    <div className={Mstyles.InvBoxMsg}>
                        {Order.PayStatus === true ?
                            <span>₹ {Order.CreditValue} Credited Succesfully 🎉</span> :
                            <span >Order Current Status : <span style={{ color: 'red' }}>{Order.OrderStatusText}</span></span>

                        }


                    </div>

                </div> : null

            }

        </div>
    )
}

export default OrderInvoice
