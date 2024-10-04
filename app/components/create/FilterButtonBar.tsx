import React from 'react';
import './FilterButtonBar.css';


interface SortFilterButtonsProps {
    showFilter: boolean;
    isFilterVisible: boolean;
    setIsFilterVisible: (visible: boolean) => void;
}

const FilterButtonBar: React.FC<SortFilterButtonsProps> = ({
                                                                 showFilter,
                                                                 isFilterVisible,
                                                                 setIsFilterVisible,

                                                             }) => (
    <div className="options">
        {showFilter ? (
            isFilterVisible ?
                <div className="ml-1 mt-1">
                    <button
                        className="options-text underline visible-button"
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                        <img src="/icons/x.svg" alt="Filter" className="filter-icon" width="26px"/>
                    </button>
                </div>
                :
                <div className="ml-4 mt-1">
                    <button
                        className="options-text underline hidden-button"
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                        TRAITS
                    </button>
                </div>
        ) : (

            <div className="mr-4" style={{visibility: 'hidden'}}>
                <button className="options-text underline">
                    Placeholder
                </button>
            </div>
        )}
        <div className={`sorting-options ${isFilterVisible ? 'hide-on-mobile' : ''}`}>
            <div>
            </div>
        </div>
    </div>
);

export default FilterButtonBar;