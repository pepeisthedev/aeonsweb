import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './LayeredImage.css'; // Adjust the path as necessary

interface SelectedTraits {
    [key: string]: string[];
}

interface LayeredImageProps {
    selectedTraits: SelectedTraits;
}

const LayeredImage: React.FC<LayeredImageProps> = ({ selectedTraits }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageDataUrl, setImageDataUrl] = useState<string>('');

    const traitOrder = [
        'Background',
        'Specialty',
        'Skin',
        'Mouth',
        'Top Layer',
        'Head',
        'Eyes',
        'Custom',
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new window.Image(); // Using window.Image for typing
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        const drawLayers = async () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const traitType of traitOrder) {
                const traits = selectedTraits[traitType];
                if (traits && traits.length > 0) {
                    for (const trait of traits) {
                      //  const trait = traits[0]; // Since we only allow one selection per category
                        const imagePath = `/layers/${traitType}/${trait}.webp`;
                        try {
                            const img = await loadImage(imagePath);
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        } catch (error) {
                            console.error(`Failed to load image at path: ${imagePath}`, error);
                        }
                    }
                }
            }
            setImageDataUrl(canvas.toDataURL('image/webp'));
        };

        drawLayers();
    }, [selectedTraits]);

    return (
        <div className="layeredImageContainer">
            <canvas ref={canvasRef} width={2000} height={2000} style={{ display: 'none' }}></canvas>
            {imageDataUrl && <Image className="layeredImage" src={imageDataUrl} alt="Combined Traits" width={2000} height={2000} />}
        </div>
    );
};

export default LayeredImage;
