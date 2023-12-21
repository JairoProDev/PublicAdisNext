import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@models/User';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Check if all fields are filled
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No user found with this email.' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Incorrect password.' });
        }

        // Create JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT Secret is not defined.');
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });


        // Set cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
        }));

        res.status(200).json({ message: 'Login successful.' });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}