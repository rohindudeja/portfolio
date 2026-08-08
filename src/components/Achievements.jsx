import { motion } from "framer-motion";
import { FaCode, FaTrophy, FaLaptop, FaGraduationCap } from "react-icons/fa";

const achievements = [
  {
    metric: "500+",
    title: "DSA Problems Solved",
    description: "Solved algorithmic problems across platforms like LeetCode and GeeksforGeeks, showcasing solid problem-solving skills.",
    icon: <FaCode className="text-cyan-400 text-3xl" />,
  },
  {
    metric: "Round 2",
    title: "Flipkart GRiD",
    description: "Qualified for Flipkart GRiD Hackathon Round 2, competing with engineering teams across India.",
    icon: <FaTrophy className="text-amber-400 text-3xl" />,
  },
  {
    metric: "Active",
    title: "COMSOC Hackathon",
    description: "Successfully participated in COMSOC Hackathon, designing and pitching software projects within time constraints.",
    icon: <FaLaptop className="text-teal-400 text-3xl" />,
  },
  {
    metric: "9.09",
    title: "Current CGPA",
    description: "Maintaining outstanding academic performance in Bachelor of Engineering, Computer Science at TIET.",
    icon: <FaGraduationCap className="text-purple-400 text-3xl" />,
  },
];

function Achievements() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Key <span className="text-cyan-400">Achievements</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
                borderColor: "rgba(6, 182, 212, 0.3)",
              }}
              className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl flex gap-6 items-start transition-all duration-300 shadow-lg"
            >
              <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 shrink-0">
                {ach.icon}
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black tracking-tight text-white">
                    {ach.metric}
                  </span>
                  <span className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">
                    Rating / Tier
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-250">
                  {ach.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Achievements;