"use client"
import { BannerContext } from '@/context/context'
import React, { useState, useEffect } from 'react'

const BannerProvider = ({ children }) => {

    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [availablePositions, setAvailablePositions] = useState([]);
    const [weight, setWeight] = useState(0);
    const [url, setUrl] = useState('');
    const [bannerAmount, setBannerAmount] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1);
        setAvailablePositions(availablePositions);
    }, []);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);

        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

        return formattedDate;
    };

    return (
        <div>
            <BannerContext.Provider value={{
                image, setImage,
                startDate, endDate,
                setStartDate, setEndDate,
                submit, setSubmit,
                bannerAmount, setBannerAmount,
                url, setUrl,
                weight, setWeight,
                formatDate,
                imageUrl, setImageUrl,
            }}>
                {children}
            </BannerContext.Provider>
        </div>
    )
}

export default BannerProvider