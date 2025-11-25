import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodayApod } from '../services/api';
import { Link } from 'react-router-dom';
import DatePicker from '../components/DatePicker';

const Home = () => {
    const { data: apod, isLoading, error } = useQuery({
        queryKey: ['todayApod'],
        queryFn: getTodayApod
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen text-white">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center mt-10">Error loading APOD</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Astronomy Picture of the Day
                    </h1>
                    <p className="text-xl text-gray-400">
                        Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured.
                    </p>
                </div>
                <div className="w-full md:w-auto">
                    <DatePicker />
                </div>
            </div>

            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        {apod?.media_type === 'image' ? (
                            <img
                                src={apod.hdurl || apod.url}
                                alt={apod.title}
                                className="w-full h-full object-cover min-h-[400px]"
                            />
                        ) : (
                            <div className="w-full h-full min-h-[400px]">
                                <iframe
                                    src={apod.url}
                                    title={apod.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                        <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold mb-2">
                            {apod.date}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {apod.title}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {apod.explanation}
                        </p>
                        {apod.copyright && (
                            <p className="text-sm text-gray-500">
                                &copy; {apod.copyright}
                            </p>
                        )}
                        <div className="mt-6">
                            <Link
                                to={`/date/${apod.date}`}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
