import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecentApods } from '../services/api';
import ApodCard from '../components/ApodCard';

const Gallery = () => {
    const [count, setCount] = useState(12);
    const { data: apods, isLoading, error } = useQuery({
        queryKey: ['recentApods', count],
        queryFn: () => getRecentApods(count)
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center mt-10">Error loading gallery</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Recent Images</h1>
                <select
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="12">Last 12 Days</option>
                    <option value="24">Last 24 Days</option>
                    <option value="30">Last 30 Days</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {apods.map((apod) => (
                    <ApodCard key={apod.date} apod={apod} />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
