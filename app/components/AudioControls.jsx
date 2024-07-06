import React, { useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import playIcon from '../../public/play.png';
import pauseIcon from '../../public/pause.png';
import soundIcon from '../../public/speaker.png';
import mutedIcon from '../../public/speaker-muted.png';
import Image from 'next/image';

const AudioControls = ({ url }) => {
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
    };

    useEffect(() => {
        console.log(muted);
        muted
            ? (audioRef.current.volume = 0)
            : (audioRef.current.volume = volume / 100);
    }, [volume, muted]);

    useEffect(() => {
        isReady && audioRef.current?.play();
    }, [isReady, volume]);

    return (
        <div className="bg-red-500 h-16 w-4/5 max-w-[50vw] p-1 flex gap-8 justify-center items-center">
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
                    <button className="w-8 h-8 relative" onClick={toggleAudio}>
                        <Image
                            fill
                            src={isPlaying ? pauseIcon : playIcon}
                            alt={isPlaying ? 'pause' : 'play'}
                        />
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={10}
                        value={muted ? 0 : volume}
                        onChange={(e) =>
                            setVolume(e.currentTarget.valueAsNumber)
                        }
                    />
                    <button className="w-5 h-5 relative" onClick={() => setMuted(!muted)}>
                        <Image
                            fill
                            src={muted ? mutedIcon : soundIcon}
                            alt={muted ? 'muted' : 'sound'}
                        />
                    </button>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default AudioControls;
