import { useEffect, useRef, useState } from "react";
import AudioControls from "./AudioControls";

function AudioPlayer({ tracks }) {
  // States
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-8 py-16 overflow-hidden shadow-2xl backdrop-blur-3xl max-w-300 sm:px-16 rounded-3xl">
      <div className="w-64 h-64 overflow-hidden border-8 rounded-full">
        <img className="object-cover w-full h-full" src={imageSrc} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 px-5 texts">
        <h1
          dir="rtl"
          className="w-[250px] text-center  p-0 m-0 text-4xl font-bold truncate font-poppins text-slate-200"
        >
          {title}
        </h1>
        <span class="bg-purple-100/75 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-purple-900">
          {artist}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <AudioControls
          isPlaying={isPlaying}
          onPrev={handleToPrevTrack}
          onNext={handleToNextTrack}
          onPlayPause={setIsPlaying}
        />
        <div className="w-full">
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
