//* Imports
import AudioPlayer from "./components/AudioPlayer";
import sounds from "./db/sounds.json";

//* App JSX
function App() {
  return (
    <div className="px-4 pt-10 pb-16 app bg-[#1a1a1a] min-w-screen min-h-screen flex justify-center items-center">
      <AudioPlayer tracks={sounds} />
    </div>
  );
}

export default App;
