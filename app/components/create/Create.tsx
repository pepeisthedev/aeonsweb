import React, { useState, useEffect } from 'react';
import './Create.css';
import { TraitsData } from "@/app/components/gallery/metadataTypes";
import Traits from "@/app/components/create/Traits";
import LayeredImage from "@/app/components/create/LayeredImage";

const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setIsLoaded(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { size, isLoaded };
};

const Create: React.FC = () => {
    const { size: { width, height }, isLoaded } = useWindowSize();
    const [traits, setTraits] = useState<TraitsData>({});
    const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const MOBILE_THRESH_HOLD = 768;

    useEffect(() => {
        const fetchAllTraits = async () => {
            try {
                const response = await fetch('/Aeons_AvailableTraits.json');
                const data: TraitsData = await response.json();
                const filteredData: TraitsData = Object.fromEntries(
                    Object.entries(data).filter(([key]) => key !== 'Unique')
                ) as TraitsData;
                setTraits(filteredData);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        const fetchData = async () => {
            try {
                await fetchAllTraits();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().catch(error => console.error('Error in fetchData:', error));
    }, []);

    useEffect(() => {
        const navElement = document.getElementById('nav');
        if (navElement) {
            setNavHeight(navElement.offsetHeight);
        }
    }, []);

    const handleSetTraits = (traitType: string, value: string) => {
        setSelectedTraits(prevFilters => {
            const currentValues = prevFilters[traitType] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prevFilters,
                    [traitType]: [],
                };
            } else {
                return {
                    ...prevFilters,
                    [traitType]: [value],
                };
            }
        });
    };

    return (
        <div className="fill-all-space" style={{ marginTop: navHeight }}>
            <div className="flex flex-row reduce-some-space shadow-container">
                {isFilterVisible || width >= MOBILE_THRESH_HOLD ? (
                    <div className={`${width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-1/4'}`}>
                        <Traits
                            traits={traits}
                            selectedTraits={selectedTraits}
                            onFilterChange={handleSetTraits}
                            setSelectedTraits={setSelectedTraits}
                        />
                    </div>
                ) : null}
                <div className={`${isFilterVisible && width < MOBILE_THRESH_HOLD ? 'hidden' : (width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-3/4')} flex justify-center items-center`}>
                    <LayeredImage selectedTraits={selectedTraits} />
                </div>
            </div>
        </div>
    );
};

export default Create;
