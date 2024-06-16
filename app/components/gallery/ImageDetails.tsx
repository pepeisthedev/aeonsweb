import React from 'react';
import { MetaData } from './metadataTypes';
import Image from 'next/image';
import './ImageDetails.css';

interface ImageDetailsProps {
    selectedMeta: MetaData;
    selectedImage: string | undefined;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ selectedMeta, selectedImage }) => {
    const imageUrl = selectedImage || '';

    return (

            <div className="image-metadata-container">
                <div className="metadata-grid-column">
                    <div>
                        <Image
                            src={imageUrl}
                            alt={selectedMeta.name}
                            width={400}
                            height={400}

                            className="border-8 border-black rounded "
                        />
                        <div className="details-modal-header">
                            <h2 className="pl-1">PIECE {selectedMeta.name}/3333</h2>
                            <h2 className="pr-1">RARITY {selectedMeta.rarity}</h2>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="metadata-grid-column">
                        <h2 className="attributes-header">ATTRIBUTES</h2>
                        <div className="metadata-content">
                            <div className="trait-column">
                                {selectedMeta.attributes.slice(0, 4).map(attr => (
                                    <li key={attr.trait_type} className="trait-item">
                                        <div className="trait-icon-name">
                                            <img src="/1_triangle_aeons.png" alt="icon" className="trait-icon"/>
                                            <div className="trait-name">
                                                <strong>{attr.trait_type}</strong>
                                            </div>
                                        </div>
                                        <div className="trait-value ml-10">
                                            {attr.value}
                                        </div>
                                    </li>
                                ))}
                            </div>
                            <div className="trait-column">
                                {selectedMeta.attributes.slice(4).map(attr => (
                                    <li key={attr.trait_type} className="trait-item">
                                        <div className="trait-icon-name">
                                            <img src="/1_triangle_aeons.png" alt="icon" className="trait-icon"/>
                                            <div className="trait-name">
                                                <strong>{attr.trait_type}</strong>
                                            </div>
                                        </div>
                                        <div className="trait-value ml-10">
                                            {attr.value}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </div>
                        <div className="image-details-button-container pt-4 sm:pt-0">
                            <a href={`https://www.ord.io/${selectedMeta.inscriptionid}`} target="_blank"
                               rel="noopener noreferrer">
                                <button className="mt-2 detail-buttons">Open on Ord.io</button>
                            </a>
                            <a href={selectedMeta.external_url} download>
                                <button className="mt-4 detail-buttons">Download High Resolution Image
                                    Image
                                </button>
                            </a>
                        </div>
                    </div>


                </div>
            </div>


    );
};

export default ImageDetails;