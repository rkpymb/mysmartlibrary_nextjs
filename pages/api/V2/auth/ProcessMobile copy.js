import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}student/login`, { token: process.env.MYKEY, mobile: req.body.usermobile })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}