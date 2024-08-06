import React, { useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import playIcon from '../../public/play.png';
import pauseIcon from '../../public/pause.png';
import soundIcon from '../../public/speaker.png';
import mutedIcon from '../../public/speaker-muted.png';
import Image from 'next/image';
import Sleeper from "./Sleeper";

const AudioControls = ({ url, showError }) => {
    const audioRef = useRef();

    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    const [muted, setMuted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [sleepTime, setSleepTime] = useState(0);

    if (!!sleepTime) {
        if (timer === sleepTime) {
            audioRef.current?.pause();
            setSleepTime(0);
        }
    }    

    const toggleAudio = () => {
        isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    };

    const handleMuteChange = () => {
        if (muted) {
            audioRef.current.volume = (volume || 50) / 100;
            !volume && setVolume(50);
            setMuted(false);
        } else {
            audioRef.current.volume = 0;
            setMuted(true);
        }
    };

    useEffect(() => {
        if (!volume) {
            setMuted(true);
        } else {
            setMuted(false)
        }
        audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        isReady && audioRef.current?.play();
    }, [isReady]);

    useEffect(() => {
        setIsReady(false);
        setIsPlaying(false);
        setTimer(0);
    }, [url]);

    useEffect(() => {
        let counter;
        if (isPlaying) {
            counter = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000);
        } 
        return () =>  {
            clearInterval(counter);
        }
    }, [isPlaying]);

    const formatTimer = (time) => {
        if (time < 60) {
            return time < 10 ? '00:0' + String(time) : '00:' + String(time);
        } else if (time < 3600) {
            return (time / 60 < 10 ? '0' : '') + String(Math.floor(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
        } else {
            const hours = Math.floor(time / 3600);
            const minutes = (time / 60) < 60 ? Math.floor(time / 60) : Math.floor((time / 60) % 60) ;
            const seconds = timer % 60;
            return String(hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' +  (seconds < 10 ? '0' : '') + seconds)
        }
    }


    return (
        <div className="bg-gradient-to-b min-w-[60%] sm:max-w-[70%] from-primary to-primary-darker px-2 rounded-full border-2 border-dark h-16 w-full p-1 flex justify-around  items-center">
            <audio
                ref={audioRef}
                onErrorCapture={showError}
                src={url}
                onCanPlay={() => setIsReady(true)}
                onPlaying={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => console.log(e)}
            ></audio>
            {isReady ? (
                <>
                    <button className="w-10 h-10 relative min-w-10" onClick={toggleAudio}>
                        <Image
                            className="object-cover"
                            width={40}
                            height={40}
                            src={isPlaying ? pauseIcon : playIcon}
                            alt={isPlaying ? 'pause' : 'play'}
                        />
                    </button>
                    <div className="flex  flex-wrap gap-y-0 justify-center items-center gap-1 md:gap-4 font-semibold">
                        <span className="text-lg w-12">{formatTimer(timer)}</span>
                        <Sleeper timer={timer} sleepTime={sleepTime} setSleepTime={setSleepTime}/>
                    </div>
                    <div className="flex gap-2 items-center w-[40%]">
                        <input
                            className="accent-black cursor-pointer w-2/3"
                            type="range"
                            min={0}
                            max={100}
                            step={10}
                            value={muted ? 0 : volume}
                            onChange={(e) =>
                                setVolume(e.currentTarget.valueAsNumber)
                            }
                        />
                        <button
                            className="w-6 h-6 relative"
                            onClick={() => handleMuteChange()}
                        >
                            <Image
                                className="object-cover"
                                width={24}
                                height={24}
                                src={muted ? mutedIcon : soundIcon}
                                alt={muted ? 'muted' : 'sound'}
                            />
                        </button>
                    </div>
                </>
            ) : (
                <Spinner size='small'/>
            )}
        </div>
    );
};

export default AudioControls;
