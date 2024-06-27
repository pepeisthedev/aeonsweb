import React, { useEffect, useState } from 'react';
import Countdown from "@/app/components/CountDown";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaXTwitter } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Reveal2.css';

// import required modules
import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper/modules';

const Reveal2 = () => {
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
        <div className="mt-28 center-content">
            <Countdown key={timeUntilNextReveal} initialSeconds={timeUntilNextReveal} setIsTimeUp={setIsTimeUp} />

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                keyboard={{ onlyInViewport: false }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <SwiperSlide>

                            <img src={image} alt={`Image ${index + 1}`}/>
                            <a href="https://twitter.com/intent/tweet?text=Aeons%20explore%20art%0A%0A%40AeonsBTC%0A%0A&url=https%3A%2F%2Faeonsbtc.com%2F"
                               target="_blank"
                               rel="noopener noreferrer"
                               style={{position: 'absolute', top: '10px', right: '10px', color: 'white'}}>
                                <FaXTwitter size={24}/>
                            </a>

                        </SwiperSlide>
                    </div>

                ))}

            </Swiper>
        </div>
    );
};

export default Reveal2;