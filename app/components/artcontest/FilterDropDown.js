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
                <div className="absolute z-10 bg-gray-600 bg-opacity-80 rounded-lg shadow-lg mt-1 w-full">
                    {['Newest', 'Oldest', 'Most votes', 'Least votes'].map((filter) => (
                        <div
                            key={filter}
                            onClick={() => handleSelection(filter)}
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