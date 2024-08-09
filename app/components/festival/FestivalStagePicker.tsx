import React, {useEffect, useRef, useState} from 'react';
import "./FestivalStagePicker.css";
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow, FreeMode, Keyboard, Thumbs} from "swiper/modules";
import Image from "next/image";
import {useRouter} from "next/navigation";


const FestivalStagePicker: React.FC = () => {

    const swiperRef = useRef(null);
    const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
    const router = useRouter();

    const handleResize = () => {
        if (swiperRef.current) {
            const { offsetWidth: width, offsetHeight: height } = swiperRef.current;
            // Assuming 768px as the breakpoint for mobile vs desktop
            const multiplier = window.innerWidth >= 768 ? 0.6 : 0.5;
            setSwiperSize({ width: width * multiplier, height: height * multiplier });
        }

    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (id: string) => {
        if (id === '1') {
            router.push(`/festivalstage${id}`);
        }
    };

    return (

                    <div className="container">


                        <Swiper
                            ref={swiperRef}
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            } as React.CSSProperties}
                            loop={false}
                            spaceBetween={1}
                            keyboard={true}

                            modules={[ Keyboard, FreeMode, Thumbs, EffectCoverflow]} // Add Pagination module
                            className="mySwiper2"
                            slidesPerView={2}

                        >
                            <SwiperSlide key="1">
                                <div style={{position: 'relative'}} className="clickable swipe-container"
                                     onClick={() => handleClick('1')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 1</span>
                                    </h1>
                                    <Image src="/festival.jpg" alt={`Image ${1 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div className="swipe-container"
                                     onClick={() => handleClick('2')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 2</span>
                                    </h1>
                                    <div className="image-container">
                                        <Image className="greyed-out" src="/festival.jpg" alt={`Image ${2 + 1}`} height={swiperSize.height}
                                               width={swiperSize.height}></Image>
                                        <div className="to-be-revealed">Coming soon</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="3">
                                <div style={{position: 'relative'}} className="swipe-container"
                                     onClick={() => handleClick('3')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 3</span>
                                    </h1>
                                    <div className="image-container">
                                        <Image className="greyed-out" src="/festival.jpg" alt={`Image ${3 + 1}`}
                                               height={swiperSize.height}
                                               width={swiperSize.height}/>
                                        <div className="to-be-revealed">Coming soon</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="4">
                                <div style={{position: 'relative'}} className="swipe-container"
                                     onClick={() => handleClick('4')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 4</span>
                                    </h1>
                                    <div className="image-container">
                                        <Image className="greyed-out" src="/festival.jpg" alt={`Image ${4 + 1}`}
                                               height={swiperSize.height}
                                               width={swiperSize.height}/>
                                        <div className="to-be-revealed">Coming soon</div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>


                    </div>

    );
};

export default FestivalStagePicker;

