import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Ad {
    _id: string;
    title: string;
    description: string;
}

const Home: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
            const res = await axios.get<Ad[]>('/api/ads');
            setAds(res.data);
        };

        fetchAds();
    }, []);

    return (
        <div>
            <h1>PublicAdis</h1>
            {ads.map(ad => (
                <div key={ad._id}>
                    <Link href={`/ads/${ad._id}`}>
                        <a>
                            <h2>{ad.title}</h2>
                            <p>{ad.description}</p>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Home;