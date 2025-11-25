import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePicker = () => {
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const maxDate = new Date().toISOString().split('T')[0];
    const minDate = '1995-06-16'; 

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date) {
            navigate(`/date/${date}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg">
            <label htmlFor="apod-date" className="text-gray-300 font-medium whitespace-nowrap">
                Jump to Date:
            </label>
            <input
                type="date"
                id="apod-date"
                min={minDate}
                max={maxDate}
                value={date}
                onChange={handleDateChange}
                className="bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            />
            <button
                type="submit"
                disabled={!date}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                Go
            </button>
        </form>
    );
};

export default DatePicker;
