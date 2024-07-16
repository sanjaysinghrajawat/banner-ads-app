"use client"
import React, { useState, useEffect } from 'react';

const Tooltip = ({ page }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [notes, setNotes] = useState("");
    

    useEffect(() => {
        if (page === "upload") {
            setNotes("This Banner will show to RentPer Home Page. Banner Width: 1600x and Height: 900x")
        }
       
        if (page === "date") {
           setNotes("From Start Date to End Date your Banner will showing on RentPer Website.")
        }
       
        if (page === "weight") {
          setNotes("Select the Priority of your Banner. If it is high then your Banner get more views and clicks")
        }
       
    }, [page]);

    const showTooltip = () => {
        setTooltipVisible(true);
    }

    const hideTooltip = () => {
        setTooltipVisible(false);
    }

    return (
        <div>

            <dh-component>

                <div
                    tabIndex="0"
                    role="link"
                    aria-label="tooltip 1"
                    className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
                    onMouseOver={showTooltip}
                    onFocus={showTooltip}
                    onMouseOut={hideTooltip}
                    onBlur={hideTooltip}
                >
                    <div className=" cursor-pointer">
                        <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                            <polyline points="11 12 12 12 12 16 13 16" />
                        </svg>
                    </div>
                    {tooltipVisible && (
                        <div role="tooltip" className="z-20 -mt-16 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-white p-4 rounded">
                            <svg className="absolute left-0 -ml-2 bottom-0 top-0 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#FFFFFF">
                                        <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                            <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            {/* <p className="text-sm font-bold text-gray-800 pb-1">{notes}</p> */}
                            <p className="text-xs leading-4 text-gray-600 ">{notes}</p>

                        </div>
                    )}
                </div>

            </dh-component>

        </div>
    )
}

export default Tooltip;
