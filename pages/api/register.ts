import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@models/User';
import dbConnect from '@/dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, email, password, role, phone } = req.body;

        // Check if all fields are filled
        if (!name || !email || !password || !role || !phone) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role, phone });
        await newUser.save();

        // Create JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT Secret is not defined.');
        }

        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '7d' });
       
        // Set cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
        }));

        res.status(200).json({ message: 'Registration successful.' });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}