import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import sleepIcon from '../../public/sleep.png';
import sleepActiveIcon from '../../public/sleep_active.png';

const Sleeper = ({ timer, sleepTime, setSleepTime }) => {
    const controls = useAnimationControls();
    const [value, setValue] = useState(0);
    const formatTime = {
        1: '15 m',
        2: '30 m',
        3: '45 m',
        4: '1 h',
        5: '2 h',
    };

    const increaseSleepTime = () => {
        value === 5 ? handleSleeperChange(0) : handleSleeperChange(value + 1);
        controls.start({
            opacity: [0, 1, 1, 0],
            transition: { duration: 2, times: [0, 0.2, 0.8, 1] },
        });
    };

    const handleSleeperChange = (newValue) => {
        setValue(newValue);
        const sleeperValues = [0, 900, 1800, 2700, 3600, 7200];
        newValue
            ? setSleepTime(sleeperValues[newValue] + timer)
            : setSleepTime(0);
    };

    return (
        <div className="relative flex items-center gap-2">
            <motion.span
                animate={controls}
                className="absolute -left-2 bottom-9 w-12 rounded-full bg-black text-white"
            >
                {!!sleepTime && formatTime[value]}
            </motion.span>
            <button
                className="relative h-8 w-8"
                onClick={() => increaseSleepTime()}
            >
                <Image
                    className="object-cover"
                    src={sleepTime ? sleepActiveIcon : sleepIcon}
                    width={32}
                    height={32}
                    alt="sleep time"
                />
            </button>
        </div>
    );
};

export default Sleeper;
