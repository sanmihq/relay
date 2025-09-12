import { Plus } from "lucide-react";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div className="grid h-screen place-items-center text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-black">Relay</h1>
        <p className="text-md mt-4 w-xl text-black/70 dark:text-white/70">
          Seamlessly share your clipboard across devices. Instant, private, and
          ridiculously simple.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button>
            <Plus />
            Create Room
          </button>
          <button>Join Room</button>
        </div>
      </div>
      <FeaturesSection />
    </div>
  );
}
