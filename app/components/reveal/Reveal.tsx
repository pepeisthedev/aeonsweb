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
import Countdown from "@/app/components/reveal/CountDown";
import ImageFromTraits from "@/app/components/reveal/ImageFromTraits";
import {AvailableTraits} from "@/app/components/gallery/AvailableTraits";

export default function App() {
    const swiperRef = useRef(null);
    const swiperRefThumbs = useRef(null);
    const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
    const [swiperThumbSize, setSwiperThumbSize] = useState({ width: 0, height: 0 });
    const [hasRun, setHasRun] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [availableTraits, setAvailableTraits] = useState<AvailableTraits>({ attributes: [] });
    const [imageTraits, setImageTraits] = useState<ImageTraitData[]>([]);
    const [timeUntilNextReveal, setTimeUntilNextReveal] = useState(1000);
    const [isTimeUp, setIsTimeUp] = useState(false);

    interface ImageTraitData {
        t: number[];
        o: number[];
        u: number;
    }

    const handleResize = () => {
        if (swiperRef.current) {
            const { offsetWidth: width, offsetHeight: height } = swiperRef.current;
            // Assuming 768px as the breakpoint for mobile vs desktop
            const multiplier = window.innerWidth >= 768 ? 0.8 : 0.7;
            setSwiperSize({ width: width * multiplier, height: height * multiplier });
        }
        if (swiperRefThumbs.current) {
            const { offsetWidth: width, offsetHeight: height } = swiperRefThumbs.current;
            // Use the same multiplier logic for thumbs
            const multiplier = 0.6// window.innerWidth >= 768 ? 0.8 : 0.7;
            setSwiperThumbSize({ width: width * multiplier, height: height * multiplier });
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchTraits = async () => {
        try {
            const response = await fetch('/api/reveal');
            const data = await response.json();
            // Assuming the data returned has a structure like { timeUntilNextReveal: number, traits: Array<{fileName: string, t: number[], o: number[], u: number}> }
            setImageTraits(data.traits); // Update this line according to how you plan to use the traits data in your component
            setTimeUntilNextReveal(data.timeUntilNextReveal);
            setIsTimeUp(false); // Reset the timer
        } catch (error) {
            console.error('Error fetching traits:', error);
            // Handle the error accordingly
        }
    };

    useEffect(() => {
        const fetchAvailableTraits = async () => {
            try {
                const response = await fetch('/availableTraits.json');
                const data = await response.json();
                setAvailableTraits({ attributes: data.attributes });
            } catch (error) {
                console.error("Error fetching attributes data:", error);
            }
        };

        fetchAvailableTraits();
    }, []);

    useEffect(() => {
        if (!hasRun) {
            fetchTraits();
            setHasRun(true);
        }
    }, [hasRun]);

    useEffect(() => {
        if (isTimeUp) {
            fetchTraits();
        }
    }, [isTimeUp]);

    return (
        <>
            <div className="container">
            <Countdown key={timeUntilNextReveal} initialSeconds={timeUntilNextReveal} setIsTimeUp={setIsTimeUp} swiperSize={swiperSize}/>
            <Swiper
                ref={swiperRef}
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
                {imageTraits.slice().reverse().map((imageData, index) => (
                        <SwiperSlide key={imageData.t.join()}>
                            <div style={{position: 'relative'}}>
                                <ImageFromTraits
                                    traits={imageData.t}
                                    orderOfTraits={imageData.o}
                                    unique={imageData.u}
                                    height={swiperSize.height}
                                    availableTraits={availableTraits}
                                />
                                <a href="https://twitter.com/intent/tweet?text=%E2%98%B0xplore%20Art&url="
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{position: 'absolute', top: '10px', left: '10px', color: 'white'}}>
                                    <FaXTwitter size={24}/>
                                </a>
                                <a href={`https://drive.google.com/uc?export=download&id=`} // URL of the downloadable image
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
                    style={{
                        width: `${swiperSize.height}px`,
                    }}
                    ref={swiperRefThumbs}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="myThumbnails"
                >
                    {imageTraits.slice().reverse().map((imageData, index) => (
                            <SwiperSlide key={`thumb-${index}`}>
                                <ImageFromTraits
                                    traits={imageData.t}
                                    orderOfTraits={imageData.o}
                                    unique={imageData.u}
                                    height={swiperThumbSize.height}
                                    availableTraits={availableTraits}
                                />
                            </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </>
    );
}
