import React, { useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import playIcon from '../../public/play.png';
import pauseIcon from '../../public/pause.png';
import soundIcon from '../../public/speaker.png';
import mutedIcon from '../../public/speaker-muted.png';
import Image from 'next/image';

const AudioControls = ({ url, setCurrentRadio }) => {
    const audioRef = useRef();

    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    const [muted, setMuted] = useState(false);

    const toggleAudio = () => {
        isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    };

    const showError = () => {
        alert('Error can`t load radio station');
        setCurrentRadio();
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
    }, [url]);

    return (
        <div className="bg-gradient-to-b from-primary to-primary-dark px-2 rounded-full border-2 border-dark h-16 md:w-4/5 md:max-w-[50vw] p-1 flex justify-around gap-4 items-center">
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
                            className="object-content"
                            fill
                            src={isPlaying ? pauseIcon : playIcon}
                            alt={isPlaying ? 'pause' : 'play'}
                        />
                    </button>
                    <div className="flex gap-2 items-center">
                        <input
                            className="accent-black w-full"
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
                                className="object-contain"
                                fill
                                src={muted ? mutedIcon : soundIcon}
                                alt={muted ? 'muted' : 'sound'}
                            />
                        </button>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default AudioControls;
