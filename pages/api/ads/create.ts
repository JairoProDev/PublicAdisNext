import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { title, description, imageUrl, userId, price, category, location, contactInfo } = req.body;

        // Check if all fields are filled
        if (!title || !description || !imageUrl || !userId || !price || !category || !location || !contactInfo) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create new ad
        const newAd = new Ad({ title, description, imageUrl, userId, price, category, location, contactInfo });
        await newAd.save();

        res.status(200).json({ message: 'Ad created successfully.' });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}