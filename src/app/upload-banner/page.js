"use client"
import { BannerContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stepper from "../_components/Stepper";
import Tooltip from "../_components/tooltip";

const UploadBanner = () => {
    const router = useRouter();
    const { image, setImage, imageUrl, setImageUrl } = useContext(BannerContext);

    // const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            toast.error("No file selected.", { position: 'top-center' });
            return;
        }

        const fileSize = file.size / 5120; // in KB
        if (fileSize > 1024) { // 5MB
            toast.error("File size exceeds the limit of 1MB.", { position: 'top-center' });
            return;
        }

        const img = new Image();
        img.onload = function () {
            if (this.width > 16000 || this.height > 9000) {
                toast.error("Image dimensions should be less than 1600x900.", { position: 'top-center' });
            } else {
                setImage(URL.createObjectURL(file));
            }
        };
        img.src = URL.createObjectURL(file);
        setImageUrl(img.src = URL.createObjectURL(file));
    };

    const handleNext = () => {

        if (!image) {
            toast.error("No file selected.", { position: 'top-center' });
            return;
        }
        router.push("/date-selection")
    };

    return (

        <div>

            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">{imageUrl}Banner Verification</h2>
                        <p className="text-gray-500 mb-6">_____________________________________</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 py-16">
                                <div className="text-gray-600">
                                    {/* <p className="font-medium text-lg">Stepper here</p> */}
                                    <Stepper page="upload" />

                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <div className="flex justify-start items-center gap-1">
                                                <label for="full_name">Upload Banner</label>
                                                <Tooltip page="upload" />
                                            </div>
                                            {!image &&
                                                <div className="mb-8">
                                                    <label for="file"
                                                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                                        <div>
                                                            {/* <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                            Drop files here
                                                        </span>
                                                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                            Or
                                                        </span> */}
                                                            <span
                                                                className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                                Browse
                                                            </span>
                                                        </div>
                                                    </label>
                                                    <input type="file" name="file" id="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
                                                </div>
                                            }
                                            {image &&
                                                <div className="mb-2">
                                                    <img src={image} alt="upload" width={"50%"} className="rounded-sm" />
                                                </div>
                                            }
                                        </div>

                                        <div className="flex text-right md:col-span-5 justify-end">

                                            <div className="inline-flex">
                                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 
                                                rounded"
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

export default UploadBanner;