import React, {useState, useEffect, useCallback} from 'react';
import {FixedSizeGrid as Grid} from 'react-window';
import './ImageGallery.css';
import {MetaData, TraitsData} from './metadataTypes';
import DetailsModal from './DetailsModal';
import Filter from './Filter';
import SortFilterButtons from './SortFilterButtons';
import ImageDetails from './ImageDetails';
import Image from 'next/image';

const useWindowSize = () => {
    const [size, setSize] = useState({width: 0, height: 0});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSize({width: window.innerWidth, height: window.innerHeight});
                setIsLoaded(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { size, isLoaded };
};

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const { size: { width, height }, isLoaded } = useWindowSize();
    const [metadata, setMetadata] = useState<Record<string, MetaData>>({});
    const [selectedMeta, setSelectedMeta] = useState<MetaData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [traits, setTraits] = useState<TraitsData>({});
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    type SortCriterion = 'rarity' | 'number';
    type SortOrder = 'asc' | 'desc';
    const [sort, setSort] = useState<{ criterion: SortCriterion; order: SortOrder }>({ criterion: 'number', order: 'asc' });

    const MOBILE_THRESH_HOLD = 768;

    useEffect(() => {
        const fetchImages = async () => {
            const imagesResponse = await fetch('/api/images');
            if (!imagesResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const images: string[] = await imagesResponse.json();
            setImages(images);
        };

        const fetchAllTraits = async () => {
            try {
                const response = await fetch('/api/traits');
                if (!response.ok) {
                    console.error('Error fetching metadata: Status:', response.status, response.statusText);
                }
                const data = await response.json();
                setTraits(data);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        const fetchMetadata = async () => {
            try {
                const response = await fetch('/api/metadata');
                if (!response.ok) {
                    console.error('Error fetching metadata: Status:', response.status, response.statusText);
                }
                const data = await response.json();
                setMetadata(data);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        const fetchData = async () => {
            try {
                await fetchImages();
                await fetchMetadata();
                await fetchAllTraits();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().catch(error => console.error('Error in fetchData:', error));
    }, []);

    const handleFilterChange = (traitType: string, value: string) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[traitType] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prevFilters,
                    [traitType]: currentValues.filter(v => v !== value),
                };
            } else {
                return {
                    ...prevFilters,
                    [traitType]: [...currentValues, value],
                };
            }
        });
    };


    const getFilteredImages = () => {
        let filtered = images
            .filter(image => {
                const imageName = image.split('/').pop()?.split('.')[0];
                const meta = metadata[imageName || ''];
                if (!meta) return false;

                return Object.entries(filters).every(([traitType, values]) => {
                    if (values.length === 0) return true;
                    const attribute = meta.attributes.find(attr => attr.trait_type === traitType);
                    return attribute && values.includes(attribute.value);
                });
            });

        filtered = filtered.sort((a, b) => {
            const nameA = a.split('/').pop()?.split('.')[0] || '';
            const nameB = b.split('/').pop()?.split('.')[0] || '';
            const metaA = metadata[nameA];
            const metaB = metadata[nameB];

            if (sort.criterion === 'rarity') {
                return sort.order === 'asc' ? (metaA?.rarity || 0) - (metaB?.rarity || 0) : (metaB?.rarity || 0) - (metaA?.rarity || 0);
            } else {
                const numberA = parseInt(nameA, 10);
                const numberB = parseInt(nameB, 10);
                return sort.order === 'asc' ? numberA - numberB : numberB - numberA;
            }
        });

        return filtered;
    };

    const increaseColumnCount = () => {
        setColumnCount(prevCount => prevCount < 10 ? prevCount + 1 : prevCount);
    };

    const decreaseColumnCount = () => {
        setColumnCount(prevCount => {
            if (window.innerWidth <= MOBILE_THRESH_HOLD) {
                return prevCount > 2 ? prevCount - 1 : 2;
            } else if (window.innerWidth <= 1024) {
                return prevCount > 4 ? prevCount - 1 : 4;
            } else {
                return prevCount > 6 ? prevCount - 1 : 6;
            }
        });
    };

    const filteredImages = getFilteredImages();

    const getColumnCount = useCallback(() => {
        if (width >= 1024) return 6;
        if (width >= MOBILE_THRESH_HOLD) return 4;
        return 3;
    }, [width]);

    const [columnCount, setColumnCount] = useState(3); // Set initial state to 3

    useEffect(() => {
        setColumnCount(getColumnCount()); // Update columnCount when width changes
    },
        [width, getColumnCount]);

    const columnWidth = (isFilterVisible || width < MOBILE_THRESH_HOLD) ? (Math.floor(width / columnCount) - 4) : (Math.floor(0.75 * width / columnCount));

    const handleImageClick = (imageIndex: number, filteredImages: string[]) => {
        setSelectedImageIndex(imageIndex);
        const imageName = filteredImages[imageIndex].split('/').pop()?.split('.')[0];
        const meta = metadata[imageName || ''];
        setSelectedMeta(meta || null);
        setSelectedImage(filteredImages[imageIndex]);
    };
    const handlePrevious = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            handleImageClick(selectedImageIndex - 1, filteredImages);
        }
    };
    const handleNext = () => {
        if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
            handleImageClick(selectedImageIndex + 1, filteredImages);
        }
    };

    const Cell: React.FC<{ columnIndex: number; rowIndex: number; style: React.CSSProperties }> = ({
                                                                                                       columnIndex,
                                                                                                       rowIndex,
                                                                                                       style
                                                                                                   }) => {
        const imageIndex = rowIndex * columnCount + columnIndex;
        if (imageIndex >= filteredImages.length) return null;

        const image = filteredImages[imageIndex];
        return (
            <div style={style} className="p-1">
                <div className="relative w-full h-full border-3 md:border-4 border-white bg-transparent rounded-sm">
                    <Image
                        className="object-cover w-full h-full pixelated"
                        src={image}
                        alt={`Image ${imageIndex + 1}`}
                        onClick={() => handleImageClick(imageIndex, filteredImages)}
                        style={{cursor: 'pointer'}}
                        width={columnWidth}
                        height={columnWidth}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="attributes-container">

            <SortFilterButtons showFilter={width <= MOBILE_THRESH_HOLD} isFilterVisible={isFilterVisible} setIsFilterVisible={setIsFilterVisible} setSort={setSort} decreaseColumnCount={decreaseColumnCount} increaseColumnCount={increaseColumnCount}  />

            <div className="mt-1 md:mt-2 flex justify-between">
                {isFilterVisible || width >= MOBILE_THRESH_HOLD ? (
                    <div className={`${width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-1/4'} pl-0`}>
                        <Filter
                            traits={traits}
                            activeFilters={filters}
                            onFilterChange={handleFilterChange}
                            setFilters={setFilters}
                        />
                    </div>
                ) : null}
                <div
                    className={`${isFilterVisible && width < MOBILE_THRESH_HOLD ? 'hidden' : (width < MOBILE_THRESH_HOLD ? 'w-full' : 'w-3/4')} flex justify-center grid-container-shadow`}>
                    {isLoaded && width > 0 && height > 0 && (
                        <Grid
                            columnCount={columnCount}
                            columnWidth={(isFilterVisible || width < MOBILE_THRESH_HOLD) ? columnWidth : columnWidth - 3}
                            height={height - 40}
                            rowCount={Math.ceil(filteredImages.length / columnCount)}
                            rowHeight={columnWidth}
                            width={(isFilterVisible || width < MOBILE_THRESH_HOLD) ? (width) : (0.75 * width)}
                            className="grid"
                        >
                            {Cell}
                        </Grid>
                    )}
                    {selectedMeta && (
                        <DetailsModal onClose={() => setSelectedMeta(null)} onNext={handleNext}
                                      onPrevious={handlePrevious}>
                            <ImageDetails selectedMeta={selectedMeta} selectedImage={selectedImage} />
                        </DetailsModal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
