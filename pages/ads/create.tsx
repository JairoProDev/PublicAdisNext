import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Ad {
    title: string;
    description: string;
    contactInfo: string;
    price: number;
    category: string;
    location: string;
}

const CreateAd: React.FC = () => {
    const [ad, setAd] = useState<Ad>({ title: '', description: '', contactInfo: '', price: 0, category: '', location: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAd({ ...ad, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/api/ads/create', ad);
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={ad.title} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={ad.description} onChange={handleChange} required />
            </label>
            <label>
                Contact Info:
                <input type="text" name="contactInfo" value={ad.contactInfo} onChange={handleChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={ad.price} onChange={handleChange} />
            </label>
            <label>
                Category:
                <input type="text" name="category" value={ad.category} onChange={handleChange} />
            </label>
            <label>
                Location:
                <input type="text" name="location" value={ad.location} onChange={handleChange}  />
            </label>
            <button type="submit">Create Ad</button>
        </form>
    );
}

export default CreateAd;