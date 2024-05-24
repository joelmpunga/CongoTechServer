// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 h-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[80%] h-[80%] ">
                <div className='flex flex-row-reverse'>
                    <button
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-b "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 2048 2048"><path fill="white" d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z" /></svg>

                    </button>
                </div>
                <div className="h-full">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;
