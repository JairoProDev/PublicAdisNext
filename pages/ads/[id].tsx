import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Ad {
    _id: string;
    title: string;
    description: string;
}

const AdDetails: React.FC = () => {
    const [ad, setAd] = useState<Ad | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAd = async () => {
            const res = await axios.get<Ad>(`/api/ads/${id}`);
            setAd(res.data);
        };

        if (id) {
            fetchAd();
        }
    }, [id]);

    if (!ad) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{ad.title}</h1>
            <p>{ad.description}</p>
        </div>
    );
}

export default AdDetails;