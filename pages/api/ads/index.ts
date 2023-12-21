import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        const ads = await Ad.find({});

        res.status(200).json({ ads });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}