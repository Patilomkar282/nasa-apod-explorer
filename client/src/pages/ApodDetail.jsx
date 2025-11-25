import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getApodByDate } from '../services/api';

const ApodDetail = () => {
    const { date } = useParams();
    const navigate = useNavigate();

    const { data: apod, isLoading, error } = useQuery({
        queryKey: ['apod', date],
        queryFn: () => getApodByDate(date),
        enabled: !!date
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center mt-10">
            <p className="text-red-500 mb-4">Error loading image details</p>
            <button
                onClick={() => navigate('/')}
                className="text-blue-400 hover:text-blue-300 underline"
            >
                Go Home
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </button>

            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="relative h-[50vh] md:h-[70vh]">
                    {apod.media_type === 'image' ? (
                        <img
                            src={apod.hdurl || apod.url}
                            alt={apod.title}
                            className="w-full h-full object-contain bg-black"
                        />
                    ) : (
                        <iframe
                            src={apod.url}
                            title={apod.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{apod.title}</h1>
                            <p className="text-blue-400 font-semibold">{apod.date}</p>
                        </div>
                        {apod.copyright && (
                            <div className="mt-4 md:mt-0 text-gray-500 text-sm">
                                &copy; {apod.copyright}
                            </div>
                        )}
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {apod.explanation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApodDetail;
