import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Users/verifyOtp`, { token: process.env.MYKEY, 
            webid:req.body.webid,
            mobile: req.body.mobile,
            otp: req.body.otp,
        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqD: 'invalid entry' });
    }
}