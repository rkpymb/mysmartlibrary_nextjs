import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Users/CreateAccount`, { 
            token: process.env.MYKEY, 
            webid:req.body.webid,
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
        
        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqD: 'invalid entry' });
    }
}