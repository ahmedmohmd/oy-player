function AudioControls({ isPlaying, onNext, onPrev, onPlayPause }) {
  return (
    <div className="inline-flex items-center w-full gap-2 p-5 justify-evenly">
      <button
        onClick={onPrev}
        className="p-3 duration-500 rounded-full hover:bg-slate-100/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          viewBox="0 0 20 20"
          fill="#e2e8f0"
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isPlaying ? (
        <button
          className="p-2 duration-500 rounded-full hover:cursor-pointer hover:bg-slate-100/20"
          onClick={() => onPlayPause(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            viewBox="0 0 20 20"
            fill="#e2e8f0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button
          className="p-2 duration-500 rounded-full hover:cursor-pointer hover:bg-slate-100/20"
          onClick={() => onPlayPause(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            viewBox="0 0 20 20"
            fill="#e2e8f0"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        onClick={onNext}
        className="p-3 duration-500 rounded-full hover:bg-slate-100/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          viewBox="0 0 20 20"
          fill="#e2e8f0"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default AudioControls;
