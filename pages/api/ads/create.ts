import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { title, description, imageUrl, userId, price, category, location, contactInfo } = req.body;

        // Check if title and description are filled
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        // Create new ad
        const newAd = new Ad({ title, description, imageUrl, userId, price, category, location, contactInfo });
        await newAd.save();

        res.status(201).json(newAd);
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}