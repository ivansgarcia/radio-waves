

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SlidingText = ({ text, collapsed }) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [textWidth, setTextWidth] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;
        const scrollW = textRef.current.scrollWidth;
        setShouldAnimate(scrollW > containerRef.current.offsetWidth);
        setTextWidth(scrollW);
    }, [text, collapsed]);

    return (
        <div
            ref={containerRef}
            className={`relative flex overflow-hidden ${collapsed ? ' text-xl sm:mx-4 mobile:text-xl max-w-sm' : ' text-2xl max-w-xl'} font-semibold sm:text-3xl`}
        >
            {shouldAnimate && textWidth ? (
                <motion.div
                    style={{ display: 'flex', width: textWidth * 2 }}
                    animate={{ x: [0, -textWidth] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: Math.max(18, textWidth / 20),
                            ease: 'linear',
                        },
                    }}
                >
                    <span ref={textRef} className="whitespace-nowrap pr-8">{text}</span>
                    <span className="whitespace-nowrap pr-8">{text}</span>
                </motion.div>
            ) : (
                <span ref={textRef} className="w-full whitespace-nowrap">{text}</span>
            )}
        </div>
    );
};

export default SlidingText;
