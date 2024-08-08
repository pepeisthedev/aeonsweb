import React, {useState} from 'react';
import "./Festival.css";
import Slide from "@/app/components/festival/Slide";
import Image from "next/image";

const Festival: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const aeonsHolders = formData.get('entry.1556176449') as string;
        const nonHolders = formData.get('entry.1220626453') as string;

        if (!aeonsHolders && !nonHolders) {
            alert('Please fill out one ordinal address .');
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // This mode allows the request to succeed without getting blocked by CORS policy
            });

            if (response.ok || response.status === 0) { // status 0 for no-cors
                setIsSubmitted(true);
                form.reset();
            } else {
                alert('An error occurred while submitting the form. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    return (
        <div className="competition-scroll-container">
                <section className="section-content" id="section1">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-8xl">
                                <span className="aeons-white">WELCO</span>
                                <span className="aeons-yellow">ME </span>
                                <span className="aeons-white">TO T</span>
                                <span className="aeons-yellow">HE</span>
                                <br></br>
                                <span className="aeons-white">AEO</span><span className="aeons-yellow">NS </span>
                                <span className="aeons-white">FESTIV</span><span className="aeons-yellow">AL</span>
                            </h1>
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section2">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">Stage 1: </span>
                                <span className="aeons-white">Aeons Exploratory </span><span
                                className="aeons-yellow">𖡎 </span>
                            </h1>
                            <Image
                                className=''
                                src='/festival.jpg'
                                alt='Festival'
                                width={600}
                                height={600}
                            />
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="form">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-8xl">
                                <span className="aeons-white">FOR</span>
                                <span className="aeons-yellow">MS</span>
                            </h1>

                            <form
                                action="https://docs.google.com/forms/d/e/1FAIpQLSeIzE-UsB29hLlrJjOFXh-D7vneKf7VENRu-bvYCqCU6JbUzQ/formResponse"
                                method="POST"
                                className="forms-grid-view"
                                id="festivalForm"
                                onSubmit={handleSubmit}>

                                <label className="forms-text" htmlFor="entry.170271835">X handle:</label>
                                <input className="forms-input" type="text" id="entry.170271835" name="entry.170271835"
                                       required/>

                                <label className="forms-text" htmlFor="entry.1300174087">Link to Twitter thread:</label>
                                <input className="forms-input" type="text" id="entry.1300174087" name="entry.1300174087"
                                       required/>

                                <label className="forms-text" htmlFor="entry.1556176449">Ordinals Address (AEONS
                                    HOLDERS):</label>
                                <input className="forms-input" id="entry.1556176449"
                                       name="entry.1556176449"></input>

                                <label className="forms-text" htmlFor="entry.1220626453">Ordinals Address (NON
                                    HOLDERS):</label>
                                <input className="forms-input" id="entry.1220626453"
                                       name="entry.1220626453"></input>

                                <input className="forms-button-style" type="submit" value="Submit"/>
                            </form>

                            {isSubmitted && (
                                <div className="confirmation-message forms-text" id="confirmationMessage">
                                    Thank you! Your response has been submitted.
                                </div>
                            )}
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section3">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">Special Pri</span>
                                <span className="aeons-yellow">ze</span>
                                <span className="aeons-white">:</span>
                            </h1>
                            <h3 className="text-3xl mb-4">
                                <span className="aeons-white">The &quot;Colossus of Chaos&quot; in collaboration with GAMMA</span>
                            </h3>
                            <div className="">
                                <p className="text-3xl">
                                    To kick off the festival, holders have a chance to claim a unique art piece that was
                                    showcased at the Parthenon and featured on our Twitter.
                                </p><br/>
                                <p className="text-3xl">
                                    This rare Aeons artwork is available to holders who participate in this stage.
                                </p>
                                <button className="mt-4 button-style">Mint on Gamma</button>
                            </div>
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section4">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">H</span>
                                <span className="aeons-yellow">ow</span>
                                <span className="aeons-white"> to enter?</span>
                            </h1>

                            <div className="">
                                <h3 className="text-3xl mb-4">
                                    <span className="aeons-white">Write a thread covering one of these topics:</span>
                                </h3>
                                <ul className="text-2xl default-list">
                                    <li>Share your experience exploring the Aeons gallery.</li>
                                    <li>Focus on the Colossus of Chaos, discussing its uniqueness and why it stands out
                                        to you.
                                    </li>
                                    <li>Reflect on how the Aeons collection inspires you.</li>
                                </ul>

                            </div>
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section5">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">Post on Twitt</span>
                                <span className="aeons-yellow">er</span>
                            </h1>

                            <div className="">
                                <h3 className="text-3xl mb-4">
                                    <span className="aeons-white">Once your thread is complete, post it on Twitter and submit your entry through the provided form.</span>
                                </h3>
                                <button className="mt-4 button-style">Link to form</button>

                            </div>
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section6">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">Wh</span>
                                <span className="aeons-yellow">o </span>
                                <span className="aeons-white">Ca</span>
                                <span className="aeons-yellow">n </span>
                                <span className="aeons-white">Joi</span>
                                <span className="aeons-yellow">n</span>
                                <span className="aeons-white">?</span>
                            </h1>
                            <div className="">
                                <h3 className="text-3xl mb-4">
                                    <span className="aeons-white">Everyone, including non-holders.</span>
                                </h3>
                            </div>
                            <h1 className="text-6xl mb-4">
                                <span className="aeons-white">Oth</span>
                                <span className="aeons-yellow">er </span>
                                <span className="aeons-white">Priz</span>
                                <span className="aeons-yellow">es</span>
                                <span className="aeons-white">?</span>
                            </h1>
                            <div className="">
                                <h3 className="text-3xl mb-4">
                                    <span className="aeons-white">In addition to the special prize, participants have a chance to win an Aeon, INK, or a PMB.</span>
                                </h3>
                            </div>
                        </div>
                    </Slide>
                </section>
                <section className="section-content" id="section7">
                    <Slide>
                        <div className="shadow-container">
                            <h1 className="text-4xl mb-4">
                                <span
                                    className="aeons-white">Join us in exploring and celebrating the Aeons collection.</span>
                            </h1>
                            <h3 className="text-3xl mb-4">
                                <span className="aeons-white"> This is your chance to connect with the community and share your passion for art.</span>
                            </h3>
                        </div>
                    </Slide>
                </section>
        </div>
    );
};

export default Festival;
