import React from 'react';
import "./FestivalMain.css";
import "./FestivalCommon.css";
import Slide from "@/app/components/festival/Slide";

const FestivalMain: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {

    return (
        <div className="competition-scroll-container-main">

            <section className="section-content-main" id="section1">
                <Slide>
                    <div className="shadow-container-main lg:mt-4">
                        <h3 className="text-xl lg:text-2xl mt-4 content-info-text font-inter ">
                            <span className="aeons-white">Join us in an exciting 4-stage celebration! Explore Aeons, participate in festivities, and connect with our community.</span>
                            <br className="mobile-line-break"/>
                            <br></br>
                            <span className="aeons-white">With amazing prizes and engaging challenges at every stage, there&apos;s something for everyone.</span>
                            <br className="mobile-line-break"/>
                            <br></br>
                            <span className="aeons-white">Let&apos;s explore, create, and celebrate art!</span>
                        </h3>
                        <button onClick={onButtonClick} className="button-style-main font-inter">
                            Join the Festival
                        </button>
                    </div>
                </Slide>
            </section>


        </div>
    );
};

export default FestivalMain;

