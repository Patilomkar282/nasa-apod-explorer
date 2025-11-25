import React from 'react';
import { Link } from 'react-router-dom';

const ApodCard = ({ apod }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <Link to={`/date/${apod.date}`}>
                <div className="aspect-w-16 aspect-h-9 w-full h-48 overflow-hidden">
                    {apod.media_type === 'image' ? (
                        <img
                            src={apod.url}
                            alt={apod.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                            <span className="text-gray-400">Video Content</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">{apod.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{apod.date}</p>
                </div>
            </Link>
        </div>
    );
};

export default ApodCard;
