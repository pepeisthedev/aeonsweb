import React, {useEffect, useRef, useState} from 'react';
import "./FestivalStagePicker.css";
import "./FestivalStagePickerContainer.css";
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
            const multiplier = window.innerWidth >= 768 ? 0.7 : 0.6;
            setSwiperSize({ width: width * multiplier, height: height * multiplier });
        }

    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (id: string) => {
        if (id === '1' || id === '2') {
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
                            initialSlide={1}
                        >
                            <SwiperSlide key="1">
                                <div style={{position: 'relative'}} className="swipe-container"
                                     onClick={() => handleClick('1')}>
                                    <Image
                                        src="/festival/Stage1Text.webp" alt="st1"
                                        className="stage-text-image"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="image-container">
                                        <Image
                                            src="/festival/stage1.webp"
                                            className="swiper-slide-img clickable"
                                            alt={`Image ${1 + 1}`}
                                            height={swiperSize.height}
                                            width={swiperSize.height}
                                        />
                                    </div>
                                    </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div className="swipe-container"
                                     onClick={() => handleClick('2')}>
                                    <Image
                                        src="/festival/Stage2Text.webp" alt="st2"
                                        className="stage-text-image"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="image-container">
                                        <Image
                                            className="swiper-slide-img clickable"
                                            src="/festival/stage2.webp"
                                            alt={`Image ${2 + 1}`}
                                            height={swiperSize.height}
                                            width={swiperSize.height}>
                                        </Image>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="3">
                                <div style={{position: 'relative'}} className="swipe-container"
                                     onClick={() => handleClick('3')}>
                                    <Image
                                        src="/festival/Stage3Text.webp" alt="st3"
                                        className="stage-text-image"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="image-container">
                                        <Image
                                            className="greyed-out swiper-slide-img clickable"
                                               src="/festival/stage_3.webp" alt={`Image ${3 + 1}`}
                                               height={swiperSize.height}
                                               width={swiperSize.height}/>
                                        <div className="to-be-revealed">Coming soon</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="4">
                                <div style={{position: 'relative'}} className="swipe-container"
                                     onClick={() => handleClick('4')}>
                                    <Image
                                        src="/festival/Stage4Text.webp" alt="st4"
                                        className="stage-text-image"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="image-container">
                                        <Image className="greyed-out swiper-slide-img clickable" src="/festival/stage_4.webp" alt={`Image ${4 + 1}`}
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

