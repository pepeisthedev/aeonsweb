import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import {FaXTwitter} from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Reveal.css';

// import required modules
import { FreeMode, Keyboard, Thumbs } from 'swiper/modules';
import Countdown from "@/app/components/CountDown";

export default function App() {
    const [hasRun, setHasRun] = useState(false);

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const [images, setImages] = useState<ImageData[]>([]);
    const [timeUntilNextReveal, setTimeUntilNextReveal] = useState(1000);
    const [isTimeUp, setIsTimeUp] = useState(false);

    interface ImageData {
        url: string;
        id: string;
        base64Image: string;
    }

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/reveal');
            const data = await response.json();
            const imageUrls = await Promise.all(data.images.map(async (imageData: ImageData) => {
                const response = await fetch(`data:image/jpeg;base64,${imageData.base64Image}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                return { url, id: imageData.id };
            }));

            setImages(imageUrls);
            setTimeUntilNextReveal(data.timeUntilNextReveal);
            setIsTimeUp(false); // Reset the timer
        } catch (error) {
            console.error('Error fetching images:', error);
            // Handle the error accordingly
        }
    };

    useEffect(() => {
        if (!hasRun) {
            fetchImages();
            setHasRun(true);
        }
    }, [hasRun]);

    useEffect(() => {
        if (isTimeUp) {

            fetchImages();
        }
    }, [isTimeUp]);

    return (
        <>
            <div className="container">
            <Countdown key={timeUntilNextReveal} initialSeconds={timeUntilNextReveal} setIsTimeUp={setIsTimeUp} />
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                loop={true}
                spaceBetween={10}
                keyboard={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Keyboard, Thumbs]}
                className="mySwiper2"
            >
                {images.slice().reverse().map((imageData, index) => (
                        <SwiperSlide key={imageData.id}>
                            <div style={{position: 'relative'}}>
                                <img src={imageData.url} alt={`Image ${index + 1}`}/>
                                <a href="https://twitter.com/intent/tweet?text=%E2%98%B0xplore%20Art&url="
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{position: 'absolute', top: '10px', left: '10px', color: 'white'}}>
                                    <FaXTwitter size={24}/>
                                </a>
                                <a href={`https://drive.google.com/uc?export=download&id=${imageData.id}`} // URL of the downloadable image
                                   download// instructs the browser to download the image
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{position: 'absolute', top: '10px', right: '10px', color: 'white'}}>
                                    <FaDownload size={24}/>
                                </a>
                            </div>
                        </SwiperSlide>
                ))}
            </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="myThumbnails"
                >
                    {images.slice().reverse().map((image, index) => (
                            <SwiperSlide key={`thumb-${index}`}>
                                <img src={image.url} alt={`Image ${index + 1}`}/>
                            </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
