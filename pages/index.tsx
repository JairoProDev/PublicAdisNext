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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await axios.get<Ad[]>('/api/ads');
                setAds(res.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An error occurred while fetching ads');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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