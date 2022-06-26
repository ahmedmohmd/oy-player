//* Imports
import AudioPlayer from "./components/AudioPlayer";
import sounds from "./db/sounds.json";

//* App JSX
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-10 pb-16 font-cairo app min-w-screen">
      <AudioPlayer tracks={sounds} />
    </div>
  );
}

export default App;
