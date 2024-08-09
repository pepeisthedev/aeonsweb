import React, {useEffect, useRef, useState} from 'react';
import "./FestivalMain.css";
import Slide from "@/app/components/festival/Slide";



const FestivalMain: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {

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
                        <a className="link-content" onClick={onButtonClick} >Join the
                            Festival</a>
                    </div>
                </Slide>
            </section>


        </div>
    );
};

export default FestivalMain;

