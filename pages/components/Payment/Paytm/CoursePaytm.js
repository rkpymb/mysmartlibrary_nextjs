import React from 'react'
import Head from 'next/head';
import Script from 'next/script';
import https from 'https';
import { useState, useEffect, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";
const PaytmChecksum = require('paytmchecksum');
const CoursePaytm = () => {
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [paymentData, setPaymentData] = useState([]);
   

    const PayNowBtn = async () => {
        initialize();

    }

    const initialize = () => {
        let orderId = "Order_" + new Date().getTime();

        // Sandbox Credentials
        let mid = "iykuMk16010130075351"; // Merchant ID
        let mkey = "pKcebGUXWjZbkdpG"; // Merchant Key
        var paytmParams = {};

        paytmParams.body = {
            requestType: "Payment",
            mid: mid,
            websiteName: "WEBSTAGING",
            orderId: orderId,
            callbackUrl: "https://merchant.com/callback",
            txnAmount: {
                value: 100,
                currency: "INR",
            },
            userInfo: {
                custId: "1001",
            },
        };

        PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            mkey
        ).then(function (checksum) {
            console.log(checksum);
            paytmParams.head = {
                signature: checksum,
            };

            var post_data = JSON.stringify(paytmParams);

            var options = {
                /* for Staging */
                // hostname: "securegw-stage.paytm.in" /* for Production */,

                hostname: "securegw.paytm.in",

                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": post_data.length,
                },
            };

            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on("data", function (chunk) {
                    response += chunk;
                });
                post_res.on("end", function () {
                    console.log("Response: ", response);
                    
                    // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
                    setPaymentData({
                        ...paymentData,
                        token: JSON.parse(response).body.txnToken,
                        order: orderId,
                        mid: mid,
                        amount: amount,
                    });
                  const token =JSON.parse(response).body.txnToken
                  const order =orderId
                  const mid =mid
                  const amount =amount
                    makePayment(order,token,amount,mid)
                });
            });

            post_req.write(post_data);
            post_req.end();
        });
    };


    const makePayment = (order,token,amount,mid) => {
        console.log('mp')
        console.log(order)
        var config = {
            "root": "",
            "style": {
                "bodyBackgroundColor": "#fafafb",
                "bodyColor": "",
                "themeBackgroundColor": "#0FB8C9",
                "themeColor": "#ffffff",
                "headerBackgroundColor": "#284055",
                "headerColor": "#ffffff",
                "errorColor": "",
                "successColor": "",
                "card": {
                    "padding": "",
                    "backgroundColor": ""
                }
            },
            "data": {
                "orderId": order,
                "token": token,
                "tokenType": "TXN_TOKEN",
                "amount": amount /* update amount */
            },
            "payMode": {
                "labels": {},
                "filter": {
                    "exclude": []
                },
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI",
                    "BALANCE"
                ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
                "mid": mid,
                "redirect": false
            },
            "handler": {
                "transactionStatus":
                    function transactionStatus(paymentStatus) {
                        console.log(paymentStatus);
                    },
                "notifyMerchant":
                    function notifyMerchant(eventName, data) {
                        console.log("Closed");
                    }
            }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.init(config).
                then(function onSuccess() {
                    window.Paytm.CheckoutJS.invoke();
                }).catch(function onError(error) {
                    console.log("Error => ", error);
                });
        }
    }

    return (
        <div>

            <Head>
                <title>Paytm Checkout </title>

              

            </Head>

            <LoadingButton
                fullWidth
                onClick={PayNowBtn}
                endIcon={<FiChevronRight />}
                loading={LoadingBtn}
                loadingPosition="end"
                variant="contained"
            >
                <span>Pay Now</span>
            </LoadingButton>

        </div>
    )
}

export default CoursePaytm
