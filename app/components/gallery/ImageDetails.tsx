import React from 'react';
import { MetaData } from './metadataTypes';
import Image from 'next/image';
import './ImageDetails.css';

interface ImageDetailsProps {
    selectedMeta: MetaData;
    selectedImage: string | undefined;
}

const getRankingImage = (rarity: number) => {
    if (rarity === 1) return "/ranking_5.png";
    if (rarity >= 2 && rarity <= 50) return "/ranking_4.5.png";
    if (rarity >= 51 && rarity <= 100) return "/ranking_4.png";
    if (rarity >= 101 && rarity <= 150) return "/ranking_3.png";
    if (rarity >= 151 && rarity <= 200) return "/ranking_2.png";
    if (rarity >= 201 && rarity <= 250) return "/ranking_1.png";
    else return "/ranking_0.png";
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
                            <div className="rarity">
                                <h2 className="pr-1">RARITY {selectedMeta.rarity}</h2>
                                <Image
                                    src={getRankingImage(selectedMeta.rarity)}
                                    alt="ranking"
                                    width={150}
                                    height={150}
                                    className="pr-1 rarity-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">


                    <div className="metadata-grid-column">
                        <div>
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
                                            <div className="trait-value ml-6">
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
                                            <div className="trait-value ml-6">
                                                {attr.value}
                                            </div>
                                        </li>
                                    ))}
                                </div>
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