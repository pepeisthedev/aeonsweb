import React, {useState} from "react";

export const FilterDropdown = ({ onValueChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Filter");

    const handleSelection = (value) => {
        setSelectedValue(value);
        onValueChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full sm:w-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-[180px] bg-white bg-opacity-20 text-white border border-transparent focus:ring-2 focus:ring-[rgb(230,164,14)] rounded-lg flex items-center justify-between px-4 py-2"
            >
                {selectedValue}
                <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 bg-white bg-opacity-80 rounded-lg shadow-lg mt-1 w-full">
                    {['All', 'Recent', 'Popular', 'Trending'].map((filter) => (
                        <div
                            key={filter}
                            onClick={() => handleSelection(filter.toLowerCase())}
                            className="cursor-pointer hover:bg-[rgb(230,164,14)] hover:text-white p-2"
                        >
                            {filter}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}