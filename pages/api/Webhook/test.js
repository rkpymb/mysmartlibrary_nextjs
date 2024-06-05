import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);

        res.status(200).json({ ReqD: req.body});

    } else {
        res.status(200).json({ msg: 'invalid Method' });
    }
}