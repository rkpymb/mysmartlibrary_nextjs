import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Openendpoint/get_page`, {
            token: process.env.MYKEY,
            webid:req.body.webid,
            PageSlug:req.body.PageSlug


        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}