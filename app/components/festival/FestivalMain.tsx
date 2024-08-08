import React, {useState} from 'react';
import "./FestivalMain.css";
import Slide from "@/app/components/festival/Slide";
import Image from "next/image";

const FestivalMain: React.FC = () => {
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

            <section className="section-content" id="section2">
                <Slide>
                    <div className="centered-container">
                        <h1 className="text-6xl mb-4">
                            <span className="aeons-white">Stage 1: </span>
                            <span className="aeons-white">Aeons Exploratory </span><span
                            className="aeons-yellow">𖡎 </span>
                        </h1>
                        <Image
                            className='image-responsive'
                            src='/festival.jpg'
                            alt='Festival'
                            width={600}
                            height={600}
                        />
                    </div>
                </Slide>
            </section>
        </div>
    );
};

export default FestivalMain;
