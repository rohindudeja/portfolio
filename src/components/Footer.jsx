import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-zinc-900/60 bg-black/40 backdrop-blur-md py-8 mt-12 text-center text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Rohin Dudeja</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          Built with <FaHeart className="text-red-500/80 animate-pulse" /> & Three.js in India
        </div>
      </div>
    </footer>
  );
}

export default Footer;