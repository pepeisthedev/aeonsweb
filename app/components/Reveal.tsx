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
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const [images, setImages] = useState<string[]>([]);
    const [timeUntilNextReveal, setTimeUntilNextReveal] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/reveal');
            const data = await response.json();
            const imageUrls = await Promise.all(data.images.map(async (base64Image: string) => {
                const response = await fetch(`data:image/jpeg;base64,${base64Image}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                return url;
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
        fetchImages();
    }, []);

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
                {images.map((image, index) => (
                    <div key={index}>
                        <SwiperSlide>
                            <div style={{position: 'relative'}}>
                                <img src={image} alt={`Image ${index + 1}`}/>
                                <a href="https://twitter.com/intent/tweet?text=%E2%98%B0xplore%20Art&url="
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{position: 'absolute', top: '10px', left: '10px', color: 'white'}}>
                                    <FaXTwitter size={24}/>
                                </a>
                                <a href={image} // URL of the image
                                   download="aeons.jpg" // instructs the browser to download the image
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{position: 'absolute', top: '10px', right: '10px', color: 'white'}}>
                                    <FaDownload size={24}/>
                                </a>
                            </div>
                        </SwiperSlide>
                    </div>
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
                    {images.map((image, index) => (
                    <div key={index}>
                        <SwiperSlide>
                            <img src={image} alt={`Image ${index + 1}`}/>
                        </SwiperSlide>
                    </div>
                ))}
            </Swiper>
           </div>
        </>
    );
}
