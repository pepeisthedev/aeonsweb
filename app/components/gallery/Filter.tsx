// components/Filter.tsx
import React, {useState} from 'react';
import './Filter.css';
import Image from "next/image";

interface FilterProps {
    traits: Record<string, string[]>;
    activeFilters: Record<string, string[]>;
    onFilterChange: (traitType: string, value: string) => void;
    setFilters: (filters: Record<string, string[]>) => void;
}

const Filter: React.FC<FilterProps> = ({ traits, activeFilters, onFilterChange, setFilters }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const totalActiveFilters = Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0);

    const handleChange = (traitType: string, value: string) => {
        onFilterChange(traitType, value);
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
                <span className="aeons-white">ATTRIBUT</span><span className="aeons-yellow">ES</span>
            </h2>
            {Object.entries(traits).map(([traitType, options]) => (
                <div key={traitType} className="label-area">
                    <div className="filter-label" onClick={() => toggleCategory(traitType)}>
                        <div className="label-content">
                            <div className={`rotate-icon ${expandedCategories[traitType] ? 'expanded' : ''}`}>
                                <Image src='/1_triangle_aeons.png'
                                       alt="expand-icon"
                                       width={13}
                                       height={13}
                                />
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
                className="ml-3 clear-filter mt-4 aeons-white"
                onClick={() => setFilters({})}
            >
                Clear Filters ({totalActiveFilters})
            </button>
        </div>
    );
};

export default Filter;
