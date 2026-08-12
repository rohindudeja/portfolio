import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import InteractiveHero3D from "./InteractiveHero3D";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-12 lg:px-24">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 -z-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl w-full grid md:grid-cols-12 gap-10 items-center">
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col justify-center text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400">
              Rohin Dudeja
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-12 text-2xl sm:text-3xl font-medium"
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1500,
                "AI Enthusiast",
                1500,
                "Problem Solver",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-cyan-400"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 max-w-lg text-base sm:text-lg leading-relaxed"
          >
            Computer Science student at TIET, building intelligent software solutions, machine learning models, and scalable web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="/resume.pdf"
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.03]"
            >
              Resume
            </a>

            <a
              href="https://github.com/rohindudeja"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 border border-zinc-700 hover:border-cyan-500 text-white font-medium rounded-xl hover:bg-cyan-500/5 transition-all duration-300 hover:scale-[1.03]"
            >
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Right 3D Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:col-span-5 h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 rounded-full filter blur-3xl -z-10" />
          <InteractiveHero3D />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;