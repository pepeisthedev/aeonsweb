import React from 'react';
import './SortFilterButtons.css';

type SortCriterion = 'rarity' | 'number';
type SortOrder = 'asc' | 'desc';

interface SortFilterButtonsProps {
    showFilter: boolean;
    isFilterVisible: boolean;
    increaseColumnCount: () => void;
    decreaseColumnCount: () => void;
    setIsFilterVisible: (visible: boolean) => void;
    setSort: (sort: { criterion: SortCriterion; order: SortOrder }) => void;
}

const SortFilterButtons: React.FC<SortFilterButtonsProps> = ({
                                                                 showFilter,
                                                                 isFilterVisible,
                                                                 setIsFilterVisible,
                                                                 setSort,
                                                                 increaseColumnCount,
                                                                 decreaseColumnCount
                                                             }) => (
    <div className="options">
        {showFilter ? (
            <div className="top-0 left-0 ml-2">
                <button
                    className="options-text underline"
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                    {isFilterVisible ? 'Hide' : 'Show'} Filter
                </button>
            </div>
        ) : (
            <div className="mr-4" style={{visibility: 'hidden'}}>
                <button className="options-text underline">
                    Placeholder
                </button>
            </div>
        )}
        <div className="flex">

            <div>
                <div className="flex mr-4 md:mr-7">
                    <span className="options-text">ID#</span>
                    <button className="options-text"
                            onClick={() => setSort({criterion: 'number', order: 'asc'})}
                    >
                        △
                    </button>
                    <button
                        className="options-text rotate-180 -translate-y-[2px]"
                        onClick={() => setSort({criterion: 'number', order: 'desc'})}
                    >
                        △
                    </button>
                </div>
            </div>
            <div>
                <div className="flex mr-4 md:mr-7">
                    <span className="options-text">RARITY</span>
                    <button className="options-text"
                            onClick={() => setSort({criterion: 'rarity', order: 'asc'})}
                    >
                        △
                    </button>
                    <button
                        className="options-text rotate-180 -translate-y-[2px]"
                        onClick={() => setSort({criterion: 'rarity', order: 'desc'})}
                    >
                        △
                    </button>
                </div>
            </div>
            <div className="flex md:mr-7">
                <span className="options-text">DISPLAY</span>
                <button className="options-text" onClick={increaseColumnCount}>△</button>
                <button className="options-text rotate-180 -translate-y-[2px]" onClick={decreaseColumnCount}>△</button>
            </div>
        </div>
    </div>
);

export default SortFilterButtons;