"use client"
import { useState, useEffect, useContext } from "react";
import { data } from "@/data/dummyData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { useRouter } from "next/navigation";
import { BannerContext } from "@/context/context";
import Stepper from "../_components/Stepper";
import Tooltip from "../_components/tooltip";
import axios from "axios";

const WeightSelection = () => {

    const router = useRouter();
    const { weight, setWeight, url, setUrl, bannerAmount, setBannerAmount, submit, setSubmit, startDate, endDate, formatDate } = useContext(BannerContext);

    // const [weight, setWeight] = useState(0);
    // const [url, setUrl] = useState('');
    // const [bannerAmount, setBannerAmount] = useState(0);
    // const [submit, setSubmit] = useState(false);

    const handleSubmit = async () => {

        if (!url) {
            toast.error("Enter URL", { position: 'top-center' });
            return;
        }

        router.push('/banner-post');
        // try {
        //     const res = await axios.post(
        //         "http://localhost:3000/api/bannerapi",
        //         {
        //             startDate
        //         },
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         },
        //     );
        //     console.log(res)
        // } catch (e) { }

    };
    const handleCarouselWeight = (value) => {
        const selectWeight = (parseInt(value));

        const pricePerDay = 20;
        const price = (selectWeight * (pricePerDay))

        // Calculate the number of days between the start and end dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        // Calculate the total amount
        const roughAmount = differenceInDays * price;

        setBannerAmount(roughAmount);
        setWeight(value);
    };

    const handlePrevious = () => {
        router.push("/date-selection")
    }
    const handleNext = () => {
        setSubmit(true);
    }

    const startDate_ = formatDate(startDate);
    const endDate_ = formatDate(endDate);

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
                                    <Stepper page="weight" />
                                </div>

                                <div className="lg:col-span-2">
                                    <p className="text-lg mb-6 text-gray-500">{startDate_} - {endDate_}</p>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5 mb-3">
                                            <div className="flex justify-start items-center gap-1">
                                                <label>Select Banner Weight</label>
                                                <Tooltip page="weight" />
                                            </div>
                                            <Slider
                                                min={1}
                                                max={10}
                                                defaultValue={1}
                                                onChange={handleCarouselWeight}
                                                className="mt-2"
                                            />
                                            <p>{`Weight ${weight}`}</p>
                                            <p className="text-center mt-6 font-medium text-lg">{`₹ ${bannerAmount}`}</p>
                                        </div>
                                        {submit &&
                                            <div className="md:col-span-5 mb-3">
                                                <label>Enter Your Redirect URL</label>
                                                <br />
                                                <span className="text-xs"> <span className="font-semibold">Note:</span> This URL will redirect to your Site.</span>
                                                <input type="url" placeholder="Enter URL" className="border rounded-md px-3 py-2 mt-4 w-full focus:outline-none focus:border-orange-500" onChange={(e) => setUrl(e.target.value)} />
                                            </div>}

                                        <div className="flex text-right md:col-span-5 justify-between">
                                            <div className="inline-flex">
                                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handlePrevious}>Previous</button>
                                            </div>
                                            {submit ?
                                                <div className="inline-flex">
                                                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={handleSubmit}>Submit</button>
                                                </div>
                                                :
                                                <div className="inline-flex">
                                                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={handleNext}>Next</button>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* 
            <input type="url" placeholder="Enter URL" className="border rounded-md px-3 py-2 mt-4 w-full focus:outline-none focus:border-orange-500" onChange={(e) => setUrl(e.target.value)} />
            <br />
            <button onClick={proceed} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none">Proceed</button> */}
            <ToastContainer />
        </div>
    )
}

export default WeightSelection;