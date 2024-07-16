"use client"
import { useState, useEffect, useContext } from "react";
import { data } from "@/data/dummyData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { BannerContext } from "@/context/context";
import Stepper from "../_components/Stepper";
import Tooltip from "../_components/tooltip";

const DateSelection = () => {

    const router = useRouter();
    const { startDate, setStartDate, endDate, setEndDate } = useContext(BannerContext);

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    // const [availablePositions, setAvailablePositions] = useState([]);

    // useEffect(() => {
    //     const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1);
    //     setAvailablePositions(availablePositions);
    // }, []);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };


    const handleNext = () => {
        if (!startDate || !endDate) {
            toast.error("Please select Start date and End date.", { position: 'top-center' });
            return;
        }
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (startDateObj > endDateObj) {
            toast.error("Start Date not Greater than End Date", { position: "top-center" })
            return;
        }

        // Check if any date falls within existing date ranges for the selected carousel position
        // const isDateBooked = data.some(item => {
        //     const itemStartDate = new Date(item.startDate);
        //     const itemEndDate = new Date(item.endDate);
        //     const selectedStartDate = new Date(startDate);
        //     const selectedEndDate = new Date(endDate);
        //     return (
        //         item.id === carouselPosition &&
        //         ((selectedStartDate >= itemStartDate && selectedStartDate <= itemEndDate) ||
        //             (selectedEndDate >= itemStartDate && selectedEndDate <= itemEndDate))
        //     );
        // });

        // if (isDateBooked) {
        //     toast.error(`Selected date range overlaps with existing bookings in the ${carouselPosition} carousel slot.`, { position: 'top-center' });
        //     return;
        // }

        router.push('/weight-selection')
    };

    const handlePrevious = () => {
        router.push("/upload-banner")
    }

    return (
        <div>

            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">Banner Verification</h2>
                        <p className="text-gray-500 mb-6">_____________________________________</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 py-16">
                                <div className="text-gray-600">
                                    {/* <p className="font-medium text-lg">Personal Details</p> */}
                                    <Stepper page="date" />
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5 mb-3">
                                            <div className="flex justify-start items-center gap-1">
                                                <label htmlFor="startDatePicker">Start Date</label>
                                                <Tooltip page="date"/>
                                            </div>
                                            <input type="date" id="startDatePicker" onChange={handleStartDateChange} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-orange-500" />
                                        </div>
                                        <div className="md:col-span-5 mb-3">
                                            <label htmlFor="endDatePicker">End Date</label>
                                            <input type="date" id="endDatePicker" onChange={handleEndDateChange} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-orange-500" />
                                        </div>

                                        <div className="flex text-right md:col-span-5 justify-between">
                                            <div className="inline-flex">
                                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handlePrevious}>Previous</button>
                                            </div>
                                            <div className="inline-flex">
                                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handleNext}>Next</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DateSelection;