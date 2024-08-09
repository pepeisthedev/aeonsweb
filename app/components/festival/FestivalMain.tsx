import React, {useEffect, useRef, useState} from 'react';
import "./FestivalMain.css";
import Slide from "@/app/components/festival/Slide";
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


const FestivalMain: React.FC = () => {

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
        <div className="competition-scroll-container">

            <section className="section-content" id="section1">
                <Slide>
                    <div className="shadow-container">
                        <h1 className="text-5xl lg:text-8xl">
                            <span className="aeons-white">Ar</span>
                            <span className="aeons-yellow">t </span>
                            <span className="aeons-white">& creativi</span>
                            <span className="aeons-yellow">ty </span>
                            <span className="aeons-white">festiv</span>
                            <span className="aeons-yellow">al</span>
                            <br></br>
                        </h1>
                        <h3 className="text-2xl lg:text-3xl mt-4 content-info-text">
                            <span className="aeons-white">Join us in an exciting 4-stage celebration! Explore Aeons, participate in festivities, and connect with our community.</span>
                            <br></br>
                            <span className="aeons-white">With amazing prizes and engaging challenges at every stage, there&apos;s something for everyone.</span>
                            <br></br>
                            <span className="aeons-white">Let&apos;s explore, create, and celebrate art!</span>
                        </h3>
                        <a className="link-content" href="#section2">Join the
                            Festival</a>
                    </div>
                </Slide>
            </section>

            <section className="section-content" id="section2">
                <Slide>
                    <div className="container">
                        <Swiper
                            ref={swiperRef}
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            } as React.CSSProperties}
                            loop={true}
                            spaceBetween={10}
                            keyboard={true}
                            thumbs={{swiper: thumbsSwiper}}
                            modules={[ Keyboard, Pagination]} // Add Pagination module
                            pagination={{ clickable: true }} // Enable pagination
                            className="mySwiper2"
                        >
                            <SwiperSlide key="1">
                                <div style={{position: 'relative'}} className="shadow-container clickable"
                                     onClick={() => handleClick('1')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 1</span>
                                    </h1>
                                    <Image src="/gallery/0.webp" alt={`Image ${1 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div style={{position: 'relative'}} className="shadow-container greyed-out"
                                     onClick={() => handleClick('2')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 2</span>
                                    </h1>
                                    <Image src="/gallery/2.webp" alt={`Image ${2 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                    <div className="to-be-revealed">To be revealed</div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="3">
                                <div style={{position: 'relative'}} className="shadow-container greyed-out"
                                     onClick={() => handleClick('3')}>
                                    <h1 className="text-4xl lg:text-6xl mb-4">
                                        <span className="aeons-white">Stage 3</span>
                                    </h1>
                                    <Image src="/gallery/3.webp" alt={`Image ${3 + 1}`} height={swiperSize.height}
                                           width={swiperSize.height}/>
                                    <div className="to-be-revealed">To be revealed</div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="4">
                                <div style={{position: 'relative'}} className="shadow-container greyed-out"
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
                </Slide>
            </section>
        </div>
    );
};

export default FestivalMain;

