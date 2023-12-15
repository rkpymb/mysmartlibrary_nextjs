import axios from 'axios';
const https = require('https');
import CryptoJS from "crypto-js";

const PaytmChecksum = require('paytmchecksum');
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { encryptedData } = req.body;

        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, process.env.CryptoJSKEY);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${decryptedData.JwtToken}`,
        };
       
        axios.post(`${process.env.API_URL}student/UpdateSOTS`, { token: process.env.MYKEY, DataRec: decryptedData.DataRec }, { headers }).then((response) => {
            console.log(response.data)
            res.status(200).json({ ReqData: response.data });

        });


    } else {
        res.status(200).json({ message: 'Invalid Request' });
    }


}