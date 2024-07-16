"use client"
import React, { useEffect, useState } from 'react'

const Stepper = ({ page }) => {
    console.log(page)
    const [upload, setUpload] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        if (page === "upload") {
            setUpload("p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-orange-700 dark:text-orange-600 font-bold");
        }
        else {
            setUpload("px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-900");
        }
        if (page === "date") {
            setDate("p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-orange-700 dark:text-orange-600 font-bold");
        }
        else {
            setDate("px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-900");
        }
        if (page === "weight") {
            setWeight("p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-orange-700 dark:text-orange-600 font-bold");
        }
        else {
            setWeight("px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-900");
        }
    }, [page]);
    return (
        <>
            <section className=" dark:text-gray-800">
                <div className="container mx-auto">
                    <div className="grid grid-cols-5 md:p-8">
                        <div className="flex justify-center px-4 col-span-full md:col-span-1 md:flex-col md:justify-start md:items-start">
                            <span className={upload}>Upload{'\u00A0'}Banner</span>
                            <span className={date}>Date{'\u00A0'}Selection</span>
                            <span className={weight}>Weight{'\u00A0'}Selection</span>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Stepper


{/* <p class="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p> */ }