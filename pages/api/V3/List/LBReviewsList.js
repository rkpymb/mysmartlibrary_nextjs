import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Openendpoint/LBReviewsList`, { token: process.env.MYKEY,Branchcode:req.body.Branchcode,Limit:req.body.Limit, webid: req.body.webid }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}