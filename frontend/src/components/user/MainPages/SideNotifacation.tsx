import React, { useState } from 'react';

const NotificationModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const notificationHandler = (isOpen:boolean) => {
        setIsOpen(isOpen);
    };

    return (
        <div className="py-8">
            <button
                onClick={() => notificationHandler(true)}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
                Open Modal
            </button>

            {isOpen && (
                <div className="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                    <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                        <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                            <div className="flex items-center justify-between">
                                <p className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                                <button
                                    role="button"
                                    aria-label="close modal"
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
                                    onClick={() => notificationHandler(false)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="w-full p-3 mt-8 bg-white rounded flex">
                                <div aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                                    </svg>
                                </div>
                                <div className="pl-3">
                                    <p className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">James Doe</span> favourited an <span className="text-indigo-700">item</span></p>
                                    <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="w-full p-3 mt-4 bg-white rounded shadow flex flex-shrink-0">
                                <div aria-label="group icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z" fill="#047857" />
                                    </svg>
                                </div>
                                <div className="pl-3 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <p className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">Sash</span> added you to the group: <span className="text-indigo-700">UX Designers</span></p>
                                        <div aria-label="close icon" role="button" className="focus:outline-none cursor-pointer">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 3.5L3.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 3.5L10.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="w-full p-3 mt-4 bg-white rounded flex">
                                <div aria-label="post icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.31232 1.47377 1.97319 1.72382 1.72314C1.97387 1.47309 2.31299 1.33356 2.66659 1.33356H13.3333C13.6876 1.33356 14.0268 1.47309 14.2768 1.72314C14.5269 1.97319 14.6664 2.31232 14.6664 2.66667V10.6667C14.6664 11.021 14.5269 11.3601 14.2768 11.6102C14.0268 11.8602 13.6876 12.0007 13.3333 12.0007H4.30325ZM4.55992 10.6667H13.3333V2.66667H2.66659V11.5467L4.55992 10.6667ZM5.33325 7.33333H10.6666V8.66667H5.33325V7.33333ZM5.33325 4.66667H10.6666V6H5.33325V4.66667Z" fill="#3B82F6" />
                                    </svg>
                                </div>
                                <div className="pl-3 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <p className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">James Doe</span> just published a post</p>
                                        <div aria-label="close icon" role="button" className="focus:outline-none cursor-pointer">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 3.5L3.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 3.5L10.5 10.5" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationModal;
