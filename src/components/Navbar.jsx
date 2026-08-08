import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-5 px-6">
        <a href="#" className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:scale-105 transition-transform duration-300">
          Rohin.dev
        </a>

        <div className="flex space-x-8 text-sm font-medium tracking-wide text-gray-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
            About
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
            Skills
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
            Projects
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;