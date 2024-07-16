"use client"
import { useState, useEffect } from "react";
import { data } from "@/data/dummyData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ValidateBannerPage = () => {
    const [image, setImage] = useState(null);
    // const [validationMessage, setValidationMessage] = useState('');
    // const [showProceedButton, setShowProceedButton] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bannerAmount, setBannerAmount] = useState(0);
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [availablePositions, setAvailablePositions] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() => {
        // Filter out booked carousel positions from data
        // const bookedPositions = data.map(item => item.id);
        // const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1).filter(id => !bookedPositions.includes(id));
        // const bookedPositions = data.map(item => item.id);
        const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1);
        setAvailablePositions(availablePositions);
    }, []);

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
                // setValidationMessage('');
                // setShowProceedButton(true);
                setImage(URL.createObjectURL(file));
            }
        };
        img.src = URL.createObjectURL(file);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleCarouselPositionChange = (event) => {
        setCarouselPosition(parseInt(event.target.value));
    };

    const proceed = () => {
        if (!startDate || !endDate || !carouselPosition) {
            toast.error("Please select image, start date, end date, and carousel position.", { position: 'top-center' });
            return;
        }
        if (!url) {
            toast.error("Enter URL", { position: 'top-center' });
            return;
        }
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (startDateObj > endDateObj) {
            toast.error("Start Date not Greater than End Date", { position: "top-center" })
        }

        // Check if any date falls within existing date ranges for the selected carousel position
        const isDateBooked = data.some(item => {
            const itemStartDate = new Date(item.startDate);
            const itemEndDate = new Date(item.endDate);
            const selectedStartDate = new Date(startDate);
            const selectedEndDate = new Date(endDate);
            return (
                item.id === carouselPosition &&
                ((selectedStartDate >= itemStartDate && selectedStartDate <= itemEndDate) ||
                    (selectedEndDate >= itemStartDate && selectedEndDate <= itemEndDate))
            );
        });

        if (isDateBooked) {
            toast.error(`Selected date range overlaps with existing bookings in the ${carouselPosition} carousel slot.`, { position: 'top-center' });
            return;
        }

        // Calculate the rough amount based on the carousel position
        const pricePerDay = 10; // Assuming $10 per day
        const maxPrice = 100; // Maximum price for the first carousel
        const price = Math.max(maxPrice - (carouselPosition - 1) * 10, pricePerDay); // Decrease price as carousel position increases

        // Calculate the number of days between the start and end dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        // Calculate the total amount
        const roughAmount = differenceInDays * price;

        // Implement logic for proceeding with the uploaded image and selected dates
        console.log("Image uploaded successfully with dates:", startDate, "to", endDate);
        console.log("Rough amount:", roughAmount);

        // Update the state with the calculated rough amount
        setBannerAmount(roughAmount);
    };

    return (

        <div className="container mx-auto max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl text-center p-1 mb-2 font-semibold text-orange-500">Banner Verification</h1>
            <div className="relative mb-4">
                <label htmlFor="fileInput" className="cursor-pointer inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                    <span className="mr-2">Upload Banner</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </label>
                <input id="fileInput" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} className="hidden" />
            </div>


            <div className={image ? "" : "hidden"}>
                {image && (
                    <>
                        <label htmlFor="startDatePicker" className="block text-gray-700 font-bold mt-4">Start Date:</label>
                        <input type="date" id="startDatePicker" onChange={handleStartDateChange} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-orange-500" />
                    </>
                )}
                <br />
                {startDate && (
                    <>
                        <label htmlFor="endDatePicker" className="block text-gray-700 font-bold">End Date:</label>
                        <input type="date" id="endDatePicker" onChange={handleEndDateChange} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-orange-500" />
                    </>
                )}
                <br />
                {endDate && (
                    <>
                        <label htmlFor="carouselPosition" className="block text-gray-700 font-bold">Banner Weight:</label>
                        <select id="carouselPosition" onChange={handleCarouselPositionChange} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-orange-500">
                            <option value="">Select Banner Weight</option>
                            {availablePositions.map(position => (
                                <option key={position} value={position}>{`Weight ${position}`}</option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {endDate && (
                <>
                    <input type="url" placeholder="Enter URL" className="border rounded-md px-3 py-2 mt-4 w-full focus:outline-none focus:border-orange-500" onChange={(e) => setUrl(e.target.value)} />
                    <br />
                    <button onClick={proceed} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none">Proceed</button>
                </>
            )}
            {image && <img src={image} alt="Uploaded" className="mt-4 rounded-lg" style={{ maxWidth: '100%' }} />}
            {bannerAmount > 0 && <p className="mt-4 text-lg font-bold text-green-500">Rough amount: ${bannerAmount}</p>}

            <ToastContainer />
        </div>
    )
}

export default ValidateBannerPage;
// "use client"
// import { useState, useEffect } from "react";
// import { data } from "@/data/dummyData";

// const ValidateBannerPage = () => {
//     const [image, setImage] = useState(null);
//     const [validationMessage, setValidationMessage] = useState('');
//     const [showProceedButton, setShowProceedButton] = useState(false);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [bannerAmount, setBannerAmount] = useState(0);
//     const [carouselPosition, setCarouselPosition] = useState(0);
//     const [availablePositions, setAvailablePositions] = useState([]);

//     useEffect(() => {
//         // Filter out booked carousel positions from data
//         const bookedPositions = data.map(item => item.id);
//         const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1).filter(id => !bookedPositions.includes(id));
//         setAvailablePositions(availablePositions);
//     }, []);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];

//         if (!file) {
//             setValidationMessage("No file selected.");
//             return;
//         }

//         const fileSize = file.size / 5120; // in KB
//         if (fileSize > 1024) { // 5MB
//             setValidationMessage("File size exceeds the limit of 1MB.");
//             return;
//         }

//         const img = new Image();
//         img.onload = function () {
//             if (this.width > 1600 || this.height > 900) {
//                 setValidationMessage("Image dimensions should be less than 1600x900.");
//             } else {
//                 setValidationMessage('');
//                 setShowProceedButton(true);
//                 setImage(URL.createObjectURL(file));
//             }
//         };
//         img.src = URL.createObjectURL(file);
//     };

//     const handleStartDateChange = (event) => {
//         setStartDate(event.target.value);
//     };

//     const handleEndDateChange = (event) => {
//         setEndDate(event.target.value);
//     };

//     const handleCarouselPositionChange = (event) => {
//         setCarouselPosition(parseInt(event.target.value));
//     };

//     const proceed = () => {
//         if (!startDate || !endDate || !carouselPosition) {
//             setValidationMessage("Please select image, start date, end date, and carousel position.");
//             return;
//         }

//         // Check if any date falls within existing date ranges for the selected carousel position
//         const isDateBooked = data.some(item => {
//             const itemStartDate = new Date(item.startDate);
//             const itemEndDate = new Date(item.endDate);
//             const selectedStartDate = new Date(startDate);
//             const selectedEndDate = new Date(endDate);
//             return (
//                 item.id === carouselPosition &&
//                 ((selectedStartDate >= itemStartDate && selectedStartDate <= itemEndDate) ||
//                     (selectedEndDate >= itemStartDate && selectedEndDate <= itemEndDate))
//             );
//         });

//         if (isDateBooked) {
//             setValidationMessage(`Selected date range overlaps with existing bookings in the ${carouselPosition} carousel slot.`);
//             return;
//         }

//         // Calculate the rough amount based on the carousel position
//         const pricePerDay = 10; // Assuming $10 per day
//         const maxPrice = 100; // Maximum price for the first carousel
//         const price = Math.max(maxPrice - (carouselPosition - 1) * 10, pricePerDay); // Decrease price as carousel position increases

//         // Calculate the number of days between the start and end dates
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

//         // Calculate the total amount
//         const roughAmount = differenceInDays * price;

//         // Implement logic for proceeding with the uploaded image and selected dates
//         console.log("Image uploaded successfully with dates:", startDate, "to", endDate);
//         console.log("Rough amount:", roughAmount);

//         // Update the state with the calculated rough amount
//         setBannerAmount(roughAmount);
//     };


//     return (

//         <div className="container">
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {validationMessage && <p className="error">{validationMessage}</p>}
//             {image && (
//                 <div>
//                     <label htmlFor="startDatePicker">Start Date: </label>
//                     <input type="date" id="startDatePicker" onChange={handleStartDateChange} />
//                     <br />
//                     <label htmlFor="endDatePicker">End Date: </label>
//                     <input type="date" id="endDatePicker" onChange={handleEndDateChange} />
//                     <br />
//                     <label htmlFor="carouselPosition">Carousel Position: </label>
//                     <select id="carouselPosition" onChange={handleCarouselPositionChange}>
//                         <option value="">Select Carousel Position</option>
//                         {availablePositions.map(position => (
//                             <option key={position} value={position}>{`Carousel ${position}`}</option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//             {showProceedButton && <button onClick={proceed}>Proceed</button>}
//             {image && <img src={image} alt="Uploaded" style={{ maxWidth: '20%', marginTop: '10px' }} />}
//             {bannerAmount > 0 && <p>Rough amount: ${bannerAmount}</p>}
//             <br />
//             <br />
//             <br />
//             <hr />
//             <br />

//         </div>
//     )
// }

// export default ValidateBannerPage;
