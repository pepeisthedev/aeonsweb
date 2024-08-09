import React, {useEffect, useRef, useState} from 'react';
import "./FestivalStagePicker.css";
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Keyboard, Pagination, Thumbs} from "swiper/modules";
import Image from "next/image";
import {useRouter} from "next/navigation";


const FestivalStagePicker: React.FC = () => {

    const swiperRef = useRef(null);
    const swiperRefThumbs = useRef(null);
    const [swiperSize, setSwiperSize] = useState({ width: 0, height: 0 });
    const [swiperThumbSize, setSwiperThumbSize] = useState({ width: 0, height: 0 });
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const router = useRouter();

    const handleResize = () => {
        if (swiperRef.current) {
            const { offsetWidth: width, offsetHeight: height } = swiperRef.current;
            // Assuming 768px as the breakpoint for mobile vs desktop
            const multiplier = window.innerWidth >= 768 ? 0.5 : 0.5;
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

    const handleClick = (id: string) => {
        if (id === '1') {
            router.push(`/festivalstage${id}`);
        }
    };

    return (

                    <div className="container">


                        <Swiper
                            ref={swiperRef}
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            } as React.CSSProperties}
                            loop={false}
                            spaceBetween={1}
                            keyboard={true}
                            thumbs={{swiper: thumbsSwiper}}
                            modules={[ Keyboard, Pagination, FreeMode, Thumbs]} // Add Pagination module
                            pagination={{ clickable: true }} // Enable pagination
                            className="mySwiper2"
                            slidesPerView={2}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                900: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            <SwiperSlide key="1">
                                <div style={{position: 'relative'}} className="clickable swipe-container"
                                     onClick={() => handleClick('1')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 1</span>
                                    </h1>
                                    <Image src="/gallery/0.webp" alt={`Image ${1 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div style={{position: 'relative'}} className="greyed-out  swipe-container"
                                     onClick={() => handleClick('2')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 2</span>
                                    </h1>
                                    <Image src="/gallery/2.webp" alt={`Image ${2 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                    <div className="to-be-revealed">Coming soon</div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="3">
                                <div style={{position: 'relative'}} className="greyed-out  swipe-container"
                                     onClick={() => handleClick('3')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 3</span>
                                    </h1>
                                    <Image src="/gallery/3.webp" alt={`Image ${3 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                    <div className="to-be-revealed">Coming soon</div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="4">
                                <div style={{position: 'relative'}} className="greyed-out  swipe-container"
                                     onClick={() => handleClick('4')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 4</span>
                                    </h1>
                                    <Image src="/gallery/4.webp" alt={`Image ${4 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                    <div className="to-be-revealed">Coming soon</div>
                                </div>
                            </SwiperSlide>

                        </Swiper>


                    </div>

    );
};

export default FestivalStagePicker;

