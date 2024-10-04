import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Keyboard, Pagination} from 'swiper/modules';
import Image from "next/image";
import styles from './MobileWallpapers.module.css';
import './MobileWallpapers.css'

const imageMapping : Record<string, string> = {
    "IMG_6899.webp": "1RrzvIfBtCJZG5RLGdsYB8nCoKJmVXHcY",
    "IMG_6900.webp": "1LLR8NVF8KYmP1s_y_s3PcpkCup1BxuZN",
    "IMG_6873.webp": "1MDCj39judVvgUamRE6KYbACwAjgVJvKX",
    "IMG_6874.webp": "1HAxD6zj8JhRAegC4Qeo4Ra4ll3trv6Zl",
    "IMG_6875.webp": "1VtoPzKEwZOUowwVOmyPJQ2o8Pnbn0qtb",
    "IMG_6877.webp": "1dcWnkxZf56DLKdR6ZjlMkx8iILGLqfK3",
    "IMG_6878.webp": "1enSrvl2BWGM1B7gJ53ANVcSKqBZd97d_",
    "IMG_6879.webp": "1XS9J8GINBU2zWtbKYiBsUWVYZ-d64tdN",
    "IMG_6880.webp": "1I2B7TOYRRVcmExvDhk3E28IB7U5lElJq",
    "IMG_6881.webp": "1qbTcmDnvSCW3WjV03dl4ZfqoF9MWHb58",
    "IMG_6882.webp": "1rl2JZELX_rfOHS8LJKkKu0aZ8z5hm_yG",
    "IMG_6883.webp": "1l4XGeIzDrfG8KZuvCMGG127sjSUSJeti",
    "IMG_6884.webp": "1HkT-pqbL1n-qQJkmvYyuhGUxy8XcrySO",
    "IMG_6885.webp": "1f7UuhJrp4uL7tH5zK0mpePw72f6Dh4Np",
    "IMG_6887.webp": "1k5wCjugBuTPXrWYzUVslq6rQ3d0SLS1G",
    "IMG_6888.webp": "11Kz8dM3OoEKwSA3lzYDGigYxekNQBKgn",
    "IMG_6890.webp": "1AvhqElGT_6VYElFvr_pkUJJVXfD_E57T",
    "IMG_6892.webp": "1d1Dp3hjlB4CTQOYfhM96PCeSz3tUXUL6",
    "IMG_6893.webp": "1EeCc43pdZ3UKMedfdThP4bVEDAfUg6hJ"
};

export default function MobileWallpapers() {
    // Convert the imageMapping object to an array of {filename, fileId} for easier rendering
    const [images, setImages] = useState<{ filename: string, fileId: string }[]>([]);

    useEffect(() => {
        // Set the images state using the imageMapping
        const mappedImages = Object.keys(imageMapping).map(filename => ({
            filename,
            fileId: imageMapping[filename]
        }));
        setImages(mappedImages);
    }, []);

    // Generate the Google Drive direct download link
    const getDownloadLink = (fileId: string) => `https://drive.google.com/uc?export=download&id=${fileId}`;

    return (
        <>
            <p className='font-bold text-5xl md:text-7xl text-white uppercase mt-28 md:mt-24 mb-10'>Mobile Wallpapers</p>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                centeredSlides={true}
                initialSlide={2}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                keyboard={true}
                modules={[Pagination, Keyboard]}
                className={styles.wallpaperswiper}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1000: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1740: {
                        slidesPerView: 7,
                        spaceBetween: 10,
                    },
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.swiperslide}>
                        {/* Wrap the image in an anchor tag to allow downloading */}
                        <a href={getDownloadLink(image.fileId)} download>
                            <Image
                                src={`/wallpapers/${image.filename}`}
                                alt={image.filename}
                                width={150}
                                height={150}
                                className={styles.swiperimage}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-10"></div>
        </>
    );
}
