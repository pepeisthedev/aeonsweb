import React, { useEffect, useState } from 'react';
import './Filter.css';
import Image from "next/image";

interface FilterProps {
    traits: Record<string, string[]>;
    activeFilters: Record<string, string[]>;
    onFilterChange: (traitType: string, value: string) => void;
    setFilters: (filters: Record<string, string[]>) => void;
    setSearchValue: (searchTerm: string) => void;
    searchValue: string;
}

const Filter: React.FC<FilterProps> = ({ traits, activeFilters, onFilterChange, setFilters, setSearchValue, searchValue }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [totalActiveFilters, setTotalActiveFilters] = useState(0);

    useEffect(() => {
        const total = Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0) + (searchValue.length > 0 ? 1 : 0);
        setTotalActiveFilters(total);
    }, [activeFilters, searchValue]);

    const handleChange = (traitType: string, value: string) => {
        onFilterChange(traitType, value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    return (
        <div className="filter-container">
            <h2 className="filter-header">
                <span className="aeons-white">FILT</span><span className="aeons-yellow">ER</span>
            </h2>

            <div className="label-area" >
                <div className="filter-label non-clickable-label">
                    <div className="label-content">
                        <div className="rotate-icon expanded">
                            <Image src='/1_triangle_aeons.png' alt="expand-icon" width={13} height={13}/>
                        </div>
                        Search
                    </div>
                </div>

                <div className="ml-3 mt-2">
                    <input
                        className="search-input search-input-font"
                        placeholder="Aeon Number / Inscription ID"
                        onChange={handleInputChange}
                        value={searchValue}
                    />
                </div>
            </div>
            {/* Existing Traits Mapping */}
            {Object.entries(traits).map(([traitType, options]) => (
                <div key={traitType} className="label-area">
                    <div className="filter-label" onClick={() => toggleCategory(traitType)}>
                        <div className="label-content">
                            <div className={`rotate-icon ${expandedCategories[traitType] ? 'expanded' : ''}`}>
                                <Image src='/1_triangle_aeons.png' alt="expand-icon" width={13} height={13}/>
                            </div>
                            {traitType}
                        </div>
                    </div>
                    {expandedCategories[traitType] && (
                        <div className="expanded-area ml-3 mt-2">
                            {options.map(option => (
                                <button
                                    key={option}
                                    className={`filter-option ${activeFilters[traitType]?.includes(option) ? 'active' : ''}`}
                                    onClick={() => handleChange(traitType, option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <button
                className="ml-3 clear-filter mt-4 mb-2 aeons-white"
                onClick={() => {
                    setFilters({});
                    setSearchValue('');
                }}
            >
                Clear Filters ({totalActiveFilters})
            </button>
        </div>
    );
};

export default Filter;