import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card */}
          <div className="md:col-span-7 bg-zinc-900/40 backdrop-blur-md border border-zinc-850 p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Who I Am
              </h3>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                I am a Computer Science undergraduate student at Thapar Institute of Engineering and Technology (TIET). My passion lies at the intersection of robust backend architectures, dynamic user interfaces, and artificial intelligence.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I enjoy building intelligent, data-driven software applications that solve real-world problems. Whether it's optimization, machine learning models, or modern web interfaces, I strive for clean code and performant solutions.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-800/80 mt-6 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">Location</span>
                <span className="text-gray-300 font-medium">Abohar, Punjab, India</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">Education</span>
                <span className="text-gray-300 font-medium">B.E. Computer Science</span>
              </div>
            </div>
          </div>

          {/* Core Values / Traits Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-cyan-950/20 to-purple-950/20 backdrop-blur-md border border-cyan-500/20 p-8 rounded-2xl flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
              My Philosophy
            </h3>
            <div className="space-y-6 flex-grow">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-200">Continuous Growth</h4>
                  <p className="text-sm text-gray-400">Always learning, experimenting, and adapting to modern software stacks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-200">Intelligent Solutions</h4>
                  <p className="text-sm text-gray-400">Leveraging AI and Machine Learning to make applications smarter and more automated.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-200">Detail-Oriented</h4>
                  <p className="text-sm text-gray-400">Optimizing code, interfaces, and algorithms for speed and user experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;