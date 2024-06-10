// components/Filter.tsx
import React, {useState} from 'react';
import './Filter.css';

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
            <h2 className="filter-header">Attributes</h2>
            {Object.entries(traits).map(([traitType, options]) => (
                <div key={traitType} className="filter-dropdown">
                    <label className="filter-label "
                           onClick={() => toggleCategory(traitType)}>{traitType}</label>
                    {expandedCategories[traitType] && (
                        <div className="ml-3 mt-2">
                            {options.map(option => (
                                <button
                                    key={option}
                                    className={`button-text-pop filter-option bg-btcOrange ${activeFilters[traitType]?.includes(option) ? 'active' : ''}`}
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
                className="button-text-pop mt-4"
                onClick={() => setFilters({})}
            >
                Clear Filters ({totalActiveFilters})
            </button>
        </div>
    );
};

export default Filter;
