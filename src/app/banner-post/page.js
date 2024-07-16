"use client"
import React from 'react'
import { useState, useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css'
import { useRouter } from "next/navigation";
import { BannerContext } from "@/context/context";
import axios from "axios";

const BannerPOST = async () => {

    const { weight, url, bannerAmount, startDate, endDate, imageUrl } = useContext(BannerContext);
    const router = useRouter();

    try {
        const res = await axios.post(
            "http://localhost:3000/api/bannerapi",
            {
                startDate,
                endDate,
                weight,
                url,
                bannerAmount,
                imageUrl,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        console.log(res)
    } catch (e) { }

    // router.push('/upload-banner');

    return (
        <div>BannerPOST</div>
    )
}

export default BannerPOST