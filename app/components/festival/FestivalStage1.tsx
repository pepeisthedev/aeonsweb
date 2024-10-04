import React, {useEffect, useRef, useState} from 'react';
import "./FestivalStage1.css";
import "./FestivalCommon.css";
import Slide from "@/app/components/festival/Slide";
import Image from "next/image";

const FestivalStage1: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const twitterProfile = formData.get('entry.170271835') as string;
        const twitterUrl = formData.get('entry.1300174087') as string;
        const aeonsHolders = formData.get('entry.1556176449') as string;
        const nonHolders = formData.get('entry.1220626453') as string;



        const validateTwitterProfile = (profile: string) => {
            if (!profile.startsWith('@')) {
                return 'Must provide twitter profile name starting with @';
            }
            return null;
        };

        const validateTwitterUrl = (url: string) => {
            const validHosts = [
                'https://x.com/',
                'https://www.x.com/',
                'https://twitter.com/',
                'https://www.twitter.com/'
            ];
            if (!validHosts.some(host => url.startsWith(host))) {
                return 'Must provide a link to your twitter post, starting with https://x or https://twitter';
            }
            return null;
        };

        const validateAddress = (address: string) => {

            if (!aeonsHolders && !nonHolders) {
                return 'Please fill out one ordinal address .';
            }

            if (!address) {
                return null; // Allow empty address
            }
            if (!address.startsWith('bc1') && !address.startsWith('3') && !address.startsWith('1')) {
                return 'Wallet address must start with "bc1", "1" or "3"';
            }
            return null;
        };

        const profileError = validateTwitterProfile(twitterProfile);
        const urlError = validateTwitterUrl(twitterUrl);
        const aeonsHoldersError = validateAddress(aeonsHolders);
        const nonHoldersError = validateAddress(nonHolders);

        if (profileError || urlError || aeonsHoldersError || nonHoldersError) {
            setError(profileError || urlError || aeonsHoldersError || nonHoldersError);
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            if (response.ok || response.status === 0) {
                setIsSubmitted(true);
                setError(null);
                form.reset();
            } else {
                setError('An error occurred while submitting the form. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while submitting the form. Please try again.');
        }
    };
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
                            src='/festival/festival.jpg'
                            alt='FestivalStage1'
                            width={600}
                            height={600}
                        />
                    </div>

                </Slide>
            </section>
            <section className="section-content section-spacing" id="section2">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h3 className="section-paragraph-header mb-4">
                            <span
                                className="aeons-white">The Colossus of Chaos</span>
                        </h3>
                        <div className="">
                            <p className="aeons-white section-paragraph-text">
                                To kick off the festival, holders have a chance to claim a unique art piece that was
                                showcased at the Parthenon and featured on our Twitter.
                            </p>
                            <br className="mobile-line-break"/>
                            <div className="gamma-claim">
                                <p className="aeons-white section-paragraph-text">
                                    This rare Aeons artwork is available to holders who participate in this stage.
                                </p>
                                <a href="https://gamma.io/ordinals/collections/colossus-of-chaos" target="_blank" rel="noopener noreferrer"
                                   className="external-link section-paragraph-text">
                                    Claim on Gamma
                                </a>
                            </div>
                            <br className="mobile-line-break"/>
                            <p className="aeons-white section-paragraph-text">
                                There are numerous prizes available throughout the festival for all who join in. Take
                                part
                                in the festivities for a chance to win.
                            </p>
                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section3">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">H</span>
                            <span className="aeons-yellow">ow</span>
                            <span className="aeons-white"> to ent</span>
                            <span className="aeons-yellow">er</span>
                            <span className="aeons-white">?</span>
                        </h1>
                        <div className="">
                            <h3 className="section-paragraph-header mb-4">
                                <span className="aeons-white">Write a thread covering one of these topics:</span>
                            </h3>
                            <ul className="aeons-white section-paragraph-text default-list">
                                <li>Share your experience exploring the Aeons gallery.</li>
                                <li>Highlight the Colossus of Chaos, discussing its uniqueness and why it stands out
                                    to you.
                                </li>
                                <li>Reflect on how the Aeons collection inspires you.</li>
                            </ul>
                            <h3 className="section-paragraph-header mt-4">
                                <span className="aeons-white">Post on Twitter & Submit Form:</span>
                            </h3>
                            <ul className="aeons-white section-paragraph-text default-list">
                                <li>Once your thread is complete, post it on Twitter and submit your entry to the form
                                    below
                                </li>
                            </ul>

                        </div>
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="form">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">TWITT</span>
                            <span className="aeons-yellow">ER </span>
                            <span className="aeons-white">FOR</span>
                            <span className="aeons-yellow">M</span>
                        </h1>

                        <form
                            action="https://docs.google.com/forms/d/e/1FAIpQLSeIzE-UsB29hLlrJjOFXh-D7vneKf7VENRu-bvYCqCU6JbUzQ/formResponse"
                            method="POST"
                            className="forms-grid-view"
                            id="festivalForm"
                            onSubmit={handleSubmit}>

                            <label className="section-form-text" htmlFor="entry.170271835">X handle:</label>
                            <input className="forms-input" type="text" id="entry.170271835" name="entry.170271835"
                                   required/>

                            <label className="section-form-text" htmlFor="entry.1300174087">Link to Twitter
                                thread:</label>
                            <input className="forms-input" type="text" id="entry.1300174087" name="entry.1300174087"
                                   required/>

                            <label className="section-form-text" htmlFor="entry.1556176449">Ordinals Address (AEONS
                                HOLDERS):</label>
                            <input className="forms-input" id="entry.1556176449"
                                   name="entry.1556176449"></input>

                            <label className="section-form-text" htmlFor="entry.1220626453">Ordinals Address (NON
                                HOLDERS):</label>
                            <input className="forms-input" id="entry.1220626453"
                                   name="entry.1220626453"></input>

                            <input className="forms-button-style" type="submit" value="Submit"/>
                        </form>

                        {error && (
                            <div className="confirmation-message section-form-text error-color">
                                {error}
                            </div>
                        )}
                        {isSubmitted && !error && (
                            <div className="confirmation-message section-form-text success-color">
                                Thank you! Your response has been submitted.
                            </div>
                        )}
                    </div>
                </Slide>
            </section>
            <section className="section-content section-spacing" id="section4">
                <Slide>
                    <div className="shadow-container-stage1">
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Speci</span>
                            <span className="aeons-white">al </span>
                            <span className="aeons-white">Prize</span>
                            <span className="aeons-white">s</span>
                            <span className="aeons-white">!</span>
                        </h1>
                        <div className="">
                            <h3 className="section-paragraph-text mb-4">
                                <span className="aeons-white">The &quot;Colossus of Chaos&quot; and Aeons.</span>
                            </h3>
                        </div>
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Wh</span>
                            <span className="aeons-white">o </span>
                            <span className="aeons-white">Ca</span>
                            <span className="aeons-white">n </span>
                            <span className="aeons-white">Joi</span>
                            <span className="aeons-white">n</span>
                            <span className="aeons-white">?</span>
                        </h1>
                        <div className="">
                            <h3 className="section-paragraph-text mb-4">
                                <span className="aeons-white">Everyone, including non-holders.</span>
                            </h3>
                        </div>
                        <h1 className="section-paragraph-header mb-4">
                            <span className="aeons-white">Whe</span>
                            <span className="aeons-white">n </span>
                            <span className="aeons-white">Clai</span>
                            <span className="aeons-white">m</span>
                            <span className="aeons-white">?</span>
                        </h1>
                        <div className="">
                            <h3 className="section-paragraph-text mb-4">
                                <span
                                    className="aeons-white">After completion of the Aeons Exploratory stage the &quot;Colossus of Chaos&quot; edition will go live to claim for a period of 72 hrs on GAMMA</span>
                            </h3>
                        </div>
                    </div>
                </Slide>
            </section>
        </div>
    );
};

export default FestivalStage1;
