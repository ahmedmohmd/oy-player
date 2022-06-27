//* Imorts
import { useEffect, useRef, useState } from "react";
import AudioControls from "./AudioControls";

//* AudioPlayer JSX
function AudioPlayer({ tracks }) {
  // States
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Destructure for conciseness
  const { title, artist, imageSrc, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-8 py-16 overflow-hidden border-8 shadow-2xl border-slate-200/60 bg-violet-500/25 backdrop-blur-3xl max-w-300 sm:px-16 rounded-3xl">
      <div className="w-64 h-64 overflow-hidden border-8 rounded-full">
        <img className="object-cover w-full h-full" src={imageSrc} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 px-5 texts">
        <h1
          dir="rtl"
          className="animate-pulse w-[250px] text-center  m-0 text-4xl font-bold truncate p-1 text-slate-200"
        >
          {title}
        </h1>
        <span class="bg-purple-100/75 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-purple-900">
          {artist}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <AudioControls
          isPlaying={isPlaying}
          onPrev={handleToPrevTrack}
          onNext={handleToNextTrack}
          onPlayPause={setIsPlaying}
        />
        <div className="inline-flex items-center justify-center w-full gap-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              viewBox="0 0 20 20"
              fill="#fff"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className={"w-full color-red-500 accent-slate-200 "}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
        </div>
        <div className="inline-flex items-center justify-center w-full gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <input
            type="range"
            step="0.1"
            min="0"
            max="1"
            value={volume}
            className={"w-full color-red-500 accent-slate-200 "}
            onChange={(event) => {
              setVolume(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );

  function handleToNextTrack() {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    console.log(trackIndex);
  }

  function handleToPrevTrack() {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    console.log(trackIndex);
  }

  function startTimer() {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleToNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }

  function onScrub(value) {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }

  function onScrubEnd() {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }
}

export default AudioPlayer;
