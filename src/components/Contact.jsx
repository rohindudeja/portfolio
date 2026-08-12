import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Info Card Column */}
          <div className="md:col-span-5 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 p-8 rounded-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-200">
                Let's Collaborated
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I am currently open to exciting internship opportunities, freelance software development projects, or general collaborations. Drop me a line, and let's create something intelligent!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:rohindudeja40@gmail.com"
                className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="p-3 bg-zinc-800/50 rounded-xl group-hover:bg-cyan-500/10 border border-zinc-700/50 shrink-0">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase">Email</span>
                  <span className="text-sm font-medium">rohindudeja40@gmail.com</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rohin-dudeja-7212a0364/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="p-3 bg-zinc-800/50 rounded-xl group-hover:bg-cyan-500/10 border border-zinc-700/50 shrink-0">
                  <FaLinkedin className="text-lg" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase">LinkedIn</span>
                  <span className="text-sm font-medium">linkedin.com/in/rohin-dudeja-7212a0364/</span>
                </div>
              </a>

              <a
                href="https://github.com/rohindudeja"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="p-3 bg-zinc-800/50 rounded-xl group-hover:bg-cyan-500/10 border border-zinc-700/50 shrink-0">
                  <FaGithub className="text-lg" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase">GitHub</span>
                  <span className="text-sm font-medium">github.com/rohindudeja</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50 shrink-0">
                  <FaMapMarkerAlt className="text-lg text-red-400/80" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase">Location</span>
                  <span className="text-sm font-medium">Abohar, Punjab, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form Column */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 p-8 rounded-2xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-200 mb-2">
                Send a Message
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800/60">
              {status && (
                <span className={`text-xs font-semibold ${status.includes("successfully") ? "text-emerald-400" : status.includes("Sending") ? "text-cyan-400" : "text-red-400"}`}>
                  {status}
                </span>
              )}
              <button
                type="submit"
                className="ml-auto flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                Send Message <FaPaperPlane className="text-xs" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;