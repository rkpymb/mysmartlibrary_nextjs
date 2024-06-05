import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Users/CheckMobile`, { token: process.env.MYKEY, mobile: req.body.mobile,webid:req.body.webid}).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqD: 'invalid entry' });
    }
}