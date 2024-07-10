import React, {useEffect, useRef, useState} from 'react';
import './Countdown.css';
import {AvailableTraits} from "@/app/components/gallery/AvailableTraits";
import Image from 'next/image';

interface ImageFromTraitsProps {
    traits: number[];
    orderOfTraits: number[];
    unique: number;
    height: number;
    availableTraits: AvailableTraits;
}

const ImageFromTraits: React.FC<ImageFromTraitsProps> = ({ traits, orderOfTraits, unique, height, availableTraits}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    useEffect(() => {
        if (availableTraits.attributes.length > 0) {
            createImage();
        }
    }, [traits, orderOfTraits, unique, height, availableTraits]);


    const createImage = async () => {
        const traitFiles = traits.map((traitNumber, i) => traitNumber > -1 ? "/traits/" + (i+1).toString() + "/" +  availableTraits.attributes[i].traits[traitNumber]+ ".png" : "/traits/defaultWhite.webp")

        const images = await Promise.all(
            traitFiles.map(url => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new window.Image();
                    img.crossOrigin = "anonymous";
                    img.src = url;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            })
        );
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            canvas.width = height;
            canvas.height = height;

            orderOfTraits.forEach((i, index) => {
                if (ctx) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(images[i], 0, 0, height, height);
                }
            });

            setCombinedImageUrl(canvas.toDataURL('image/png'));
        }

    };

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {combinedImageUrl && (
                    <Image
                        src={combinedImageUrl}
                        alt="Combined Image"
                        width={height}
                        height={height}
                    />
            )}
        </>
    );
};

export default ImageFromTraits;