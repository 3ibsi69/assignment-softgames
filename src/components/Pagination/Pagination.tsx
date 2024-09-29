import React from 'react';
import { PaginationProps } from '../../../types/props-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing icons

const Pagination = ({ current, pageSize, total, onChange }: PaginationProps) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePrevClick = () => {
        if (current > 1) {
            onChange(current - 1);
        }
    };

    const handleNextClick = () => {
        if (current < totalPages) {
            onChange(current + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== current) {
            onChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-3 py-1 rounded transition-all duration-300 
                        ${current === i
                            ? 'bg-gradient-to-r from-customOrange to-customOrangeLight text-white shadow-lg'
                            : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white hover:shadow-lg'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center my-4">
            <button
                onClick={handlePrevClick}
                disabled={current === 1}
                className={`flex items-center mx-1 px-3 py-1 rounded transition-all duration-300 
                    ${current === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:text-white hover:shadow-lg'
                    }`}
            >
                <FaChevronLeft className="mr-1" />
                Prev
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNextClick}
                disabled={current === totalPages}
                className={`flex items-center mx-1 px-3 py-1 rounded transition-all duration-300 
                    ${current === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:text-white hover:shadow-lg'
                    }`}
            >
                Next
                <FaChevronRight className="ml-1" />
            </button>
        </div>
    );
};

export default Pagination;
