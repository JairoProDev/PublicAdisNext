import { NextApiRequest, NextApiResponse } from 'next';
import Ad from '../../../models/Ad';
import dbConnect from '../../../dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        const ad = await Ad.findById(id);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found.' });
        }

        res.status(200).json({ ad });
    } else if (req.method === 'PUT') {
        const { title, description, imageUrl, price, category, location, contactInfo, isActive } = req.body;

        const ad = await Ad.findById(id);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found.' });
        }

        ad.title = title || ad.title;
        ad.description = description || ad.description;
        ad.imageUrl = imageUrl || ad.imageUrl;
        ad.price = price || ad.price;
        ad.category = category || ad.category;
        ad.location = location || ad.location;
        ad.contactInfo = contactInfo || ad.contactInfo;
        ad.isActive = isActive !== undefined ? isActive : ad.isActive;

        await ad.save();

        res.status(200).json({ message: 'Ad updated successfully.' });
    } else if (req.method === 'DELETE') {
        const ad = await Ad.findById(id);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found.' });
        }

        await ad.remove();

        res.status(200).json({ message: 'Ad deleted successfully.' });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}