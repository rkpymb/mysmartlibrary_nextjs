import axios from 'axios';


export default function handler(req, res) {
    if (req.method === 'POST') {
      
        
        axios.post(`${process.env.API_URL}Openendpoint/SubsPlanList`, { token: process.env.MYKEY, page :req.body.page,
            limit : req.body.limit}).then((response) => {
       
            res.status(200).json({ ReqD:response.data })

        }).catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
