import axios from 'axios';
const https = require('https');

const PaytmChecksum = require('paytmchecksum');
export default async function  handler(req, res) {
    if (req.method === 'POST') {
        let ODRERID =req.body.ODRERID
        var paytmParams = {};
       

        paytmParams.body = {
            requestType: "Payment",
            mid: process.env.NEXT_PUBLIC_PAYTM_MID,
            websiteName: "WEBSTAGING",
            orderId: ODRERID,
            callbackUrl: process.env.PAYTM_WEBHOOK,
            txnAmount: {
                value: req.body.amount,
                currency: "INR",
            },
            userInfo: {
                custId: req.body.custId,
            },
        };



        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),process.env.PAYTM_KEY)

        paytmParams.head = {
            "channelId": "WAP",
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = async () => {
            return new Promise((resolve, reject) =>{
                var options = {

                    hostname: process.env.NEXT_PUBLIC_PAYTM_HOST,
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${ODRERID}`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": post_data.length,
                    },
                };
    
                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
    
                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        resolve(JSON.parse(response).body);
                    });
                });
    
                post_req.write(post_data);
                post_req.end();
            })
    
        }

        let myr = await requestAsync()
        res.status(200).json(myr)

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }

}