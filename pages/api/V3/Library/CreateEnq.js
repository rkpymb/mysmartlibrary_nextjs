import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Openendpoint/CreateEnq`, {
            token: process.env.MYKEY,
            webid: req.body.webid,
            Branchcode: req.body.Branchcode,
            FullName: req.body.FullName,
            MobileNumber: req.body.MobileNumber,
            Email: req.body.Email,
            Message: req.body.Message,

        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ error: 'invalid entry' });
    }
}