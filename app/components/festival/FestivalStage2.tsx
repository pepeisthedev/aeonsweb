import React, {useEffect, useRef, useState} from 'react';
import "./FestivalStage1.css";
import "./FestivalCommon.css";
import Slide from "@/app/components/festival/Slide";
import Image from "next/image";

const FestivalStage2: React.FC = () => {
    const [showHint, setShowHint] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToSection = () => {
        const section = document.getElementById('section2');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setShowHint(false); // Hide hint after click
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const scrollPosition = scrollContainerRef.current.scrollTop;

                const section1 = document.getElementById('section1');
                if (section1) {
                    const section1Bottom = section1.offsetHeight + section1.offsetTop;
                    if (scrollPosition > section1Bottom / 4) {
                        setShowHint(false);
                    }
                }
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="competition-scroll-container" ref={scrollContainerRef}>
            {showHint && (
                <div className="scroll-down-indicator" onClick={scrollToSection}>
                    <div className="scroll-text">Scroll Down</div>
                    <div className="arrow-container">
                        <div className="arrow"></div>
                    </div>
                </div>
            )}

            <section className="section-content mt-20" id="section1">
                <Slide>
                    <div className="shadow-container-stage1">
                        <Image
                            className='exploratory-text-image'
                            src='/festival/AeonsExplorartoryText.webp'
                            alt='explore'
                            width={600}
                            height={600}
                        />
                        <Image
                            className='stage1-image'
                            src='/festival/stage2.webp'
                            alt='FestivalStage2'
                            width={600}
                            height={600}
                        />
                    </div>

                </Slide>
            </section>
            <section className="section-content section-spacing" id="section2">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Tea</span>
                            <span className="aeons-yellow">m </span>
                            <span className="aeons-white">Up wit</span>
                            <span className="aeons-yellow">h </span>
                            <span className="aeons-white">a Web</span>
                            <span className="aeons-yellow">3 </span>
                            <span className="aeons-white">Arti</span>
                            <span className="aeons-yellow">st</span>
                        </h1>
                        <div className="">
                            <p className="aeons-white section-paragraph-text">
                                In this stage, we invite you to collaborate.
                                <br/>
                                Whether you&apos;re a seasoned creator or
                                someone who simply loves art, this is your opportunity to bring a shared vision to life.
                                <br/>
                                Each team must include at least one Aeons holder.
                            </p>
                            <br/>
                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section3">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Ho</span>
                            <span className="aeons-yellow">w</span>
                            <span className="aeons-white"> to ente</span>
                            <span className="aeons-yellow">r</span>
                            <span className="aeons-white">?</span>
                        </h1>
                        <br className="mobile-line-break"/>
                        <p className="aeons-white section-paragraph-text">
                            The theme is to blend a real-world experience with the Aeons identity. This could be a photo
                            of a historic landmark, a street scene, or any imagery or video you envision, with a
                            neo-expressionist twist inspired by our content. Examples are available on our website and
                            X. Be creative, work together, and Explore Art.
                        </p>
                        <br/>
                        <div className="">
                            <ul className="aeons-white section-paragraph-text default-list mb-6">
                                <li>Connect with an Aeons holder.</li>
                                <li>Partner with an artist.</li>
                                <li>Collaborate and create.</li>
                            </ul>
                        </div>
                        <Image
                            className='stage2-image'
                            src='/festival/stage2/collage.jpg'
                            alt='explore'
                            width={600}
                            height={600}
                        />
                    </div>
                </Slide>
            </section>
            <section className="section-content mt-20" id="section1">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-6">
                            <span className="aeons-white">Exampl</span>
                            <span className="aeons-yellow">es</span>
                        </h1>
                        <Image
                            className='stage2-image'
                            src='/festival/stage2/collage.jpg'
                            alt='explore'
                            width={600}
                            height={600}
                        />
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section4">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Submissi</span>
                            <span className="aeons-yellow">on</span>
                        </h1>
                        <div className="">
                            <p className="aeons-white section-paragraph-text">
                                Post your creation on Twitter and share the link in the forum channel on Discord.
                            </p>
                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section5">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Wh</span>
                            <span className="aeons-yellow">o</span>
                            <span className="aeons-white"> can joi</span>
                            <span className="aeons-yellow">n</span>
                            <span className="aeons-white">?</span>
                        </h1>
                        <div className="">
                            <p className="aeons-white section-paragraph-text">
                                Teams must include an Aeons holder. Everyone is welcome to participate, comment, and
                                support the collaborations.
                            </p>

                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section6">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Prize</span>
                            <span className="aeons-yellow">s</span>
                            <span className="aeons-white">!</span>
                        </h1>
                        <div className="">
                            <h3 className="section-paragraph-text mb-4">
                                <span className="aeons-white">Winning teams will receive various prizes, including Aeons, INK, PMB, CTRL, and other art pieces.</span>
                            </h3>
                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section7">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Liv</span>
                            <span className="aeons-yellow">e </span>
                            <span className="aeons-white">Even</span>
                            <span className="aeons-yellow">t</span>
                            <span className="aeons-white">!</span>
                        </h1>
                        <div className="">

                            <p className="aeons-white section-paragraph-text">
                                Submissions will be unveiled during a live event where artists can discuss their work
                                and creative process.
                            </p>
                        </div>
                    </div>
                </Slide>
            </section>


        </div>
    );
};

export default FestivalStage2;
