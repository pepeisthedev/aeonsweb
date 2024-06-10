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
        <div>
            <div className="details-modal-header">
                <h2 className="text-red-700 text-2xl">Aeons #{selectedMeta.name}</h2>
                <h2 className="text-red-700 text-2xl pr-1">Rarity {selectedMeta.rarity}</h2>
            </div>
            <div className="object-contain">
            <Image
                src={imageUrl}
                alt={selectedMeta.name}
                width={400}
                height={400}
            />
            </div>
            <ul className="metadata-content text-xl text-red-700">
                {selectedMeta.attributes.map(attr => (
                    <li key={attr.trait_type}>
                        <strong>{attr.trait_type}:</strong> {attr.value}
                    </li>
                ))}
            </ul>
            <div className="mt-2">
                <a href={selectedMeta.external_url} download>
                    <button className="mr-2 p-2 bg-black text-lg text-red-700 rounded">Download</button>
                </a>
                <a href={`https://www.ord.io/${selectedMeta.inscriptionid}`} target="_blank" rel="noopener noreferrer">
                    <button className="p-2 bg-black text-lg text-red-700 rounded">Open on ord.io</button>
                </a>
            </div>
        </div>
    );
};

export default ImageDetails;