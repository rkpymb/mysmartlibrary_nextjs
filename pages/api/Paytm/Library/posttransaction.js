import axios from 'axios';
const https = require('https');
import CryptoJS from "crypto-js";

const PaytmChecksum = require('paytmchecksum');
export default async function handler(req, res) {
    if (req.method === 'POST') {
        
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
       
        axios.post(`${process.env.API_URL}student/UpdateLibraryOrder`, { token: process.env.MYKEY, DataRec: req.body.DataRec }, { headers }).then((response) => {

            res.status(200).json({ ReqData: response.data });

        });


    } else {
        res.status(200).json({ message: 'Invalid Request' });
    }


}