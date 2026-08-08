import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaBrain, FaTools } from "react-icons/fa";

const skillCategories = [
  {
    title: "Languages",
    icon: <FaCode className="text-cyan-400 text-2xl" />,
    skills: ["C++", "Java", "Python", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: <FaLaptopCode className="text-teal-400 text-2xl" />,
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: <FaServer className="text-purple-400 text-2xl" />,
    skills: ["Node.js", "Express.js"],
  },
  {
    title: "Database",
    icon: <FaDatabase className="text-pink-400 text-2xl" />,
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    icon: <FaBrain className="text-red-400 text-2xl" />,
    skills: [
      "Scikit-Learn",
      "TensorFlow",
      "OpenCV",
      "YOLOv8",
    ],
  },
  {
    title: "Tools",
    icon: <FaTools className="text-amber-400 text-2xl" />,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
    ],
  },
];

function Skills() {
  return (
    <section
      id="skills"
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
            My <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
                borderColor: "rgba(6, 182, 212, 0.4)",
                boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.15)",
              }}
              className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-200">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-gray-350 hover:text-white px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;