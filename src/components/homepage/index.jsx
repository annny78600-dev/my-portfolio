import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar';
import ContactForm from '../contact';

const Banner = ({theme}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    return (
        <div id="home" className="relative min-h-[70vh] lg:min-h-screen overflow-x-hidden">
            {/* Navbar */}
            <Navbar />
             
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{
                    background:
                        'color-mix(in oklab, rgb(221 122 255 / 19%) 60%, transparent)',
                }}
            ></div>

            {/* Banner Content */}
            
            <div className="lg:mt-[15%]  mt-[55%]  relative z-20 flex flex-col items-center justify-start h-full px-6 text-center">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    Crafting Seamless Web Experiences.
                </motion.h1>
                <motion.p
                    className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                >
                    I build high-performance, responsive apps with React, Next.js, Tailwind, and more — turning ideas into elegant interfaces.
                </motion.p>
            </div>

         
        </div>
    );
};

export default Banner;
