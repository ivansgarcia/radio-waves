import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import sleepIcon from '../../public/sleep.png';
import sleepActiveIcon from '../../public/sleep_active.png';

const Sleeper = ({ timer, sleepTime, setSleepTime }) => {
    const controls = useAnimationControls();
    const [value, setValue] = useState(0);
    const formatTime = {
        1: '15m',
        2: '30m',
        3: '45m',
        4: '1h',
        5: '2h',
    };
    
    const increaseSleepTime = () => {
        value === 5 ? setValue(0) : setValue(prev => prev + 1);
        controls.start({ opacity: [0, 1, 1, 0], transition: { duration: 2, times: [0, 0.2, 0.8, 1] }})
    }
    
    useEffect(() => {
        const sleeperValues = [0, 900, 1800, 2700, 3600, 7200];
        setSleepTime(sleeperValues[value] + timer);

    }, [value]);

    return (
        <div className="relative flex items-center gap-2">
            <motion.span animate={controls} className="absolute w-12 bottom-9 bg-black text-white -left-2 rounded-full">{!!sleepTime && formatTime[value]}</motion.span>
            <button
                onClick={() => increaseSleepTime()}
            >
                <Image
                    className=""
                    src={sleepTime ? sleepActiveIcon : sleepIcon}
                    width={30}
                    height={30}
                    alt="sleep time"
                />
            </button>
        </div>
    );
};

export default Sleeper;
