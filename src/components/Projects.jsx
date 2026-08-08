import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Real-Time Crowd Behavior Analysis",
    description:
      "Built a smart surveillance system using YOLOv8 and OpenCV to detect crowd density, overcrowding situations, and unusual movement patterns in real time.",
    tech: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "Computer Vision",
    ],
    image: "/crowd.png",
    github: "https://github.com",
    demo: "https://github.com",
  },

  {
    title: "Amazon Delivery Risk Prediction",
    description:
      "Developed a machine learning model to predict delayed deliveries using feature engineering, data preprocessing, and CatBoost classification.",
    tech: [
      "Python",
      "CatBoost",
      "Pandas",
      "Scikit-Learn",
    ],
    image: "/amazon.png",
    github: "https://github.com",
    demo: "https://github.com",
  },

  {
    title: "Remaining Useful Life Prediction",
    description:
      "Built a predictive maintenance solution to estimate equipment failure timelines and optimize maintenance scheduling using machine learning models.",
    tech: [
      "Machine Learning",
      "Python",
      "Regression",
      "Scikit-Learn"
    ],
    image: "/rul.png",
    github: "https://github.com",
    demo: "https://github.com",
  },
];

function Projects() {
  return (
    <section
      id="projects"
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
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                borderColor: "rgba(6, 182, 212, 0.4)",
              }}
              className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 group shadow-xl"
            >
              <div className="relative overflow-hidden h-48 w-full bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-xl font-bold text-gray-150 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-cyan-500/5 border border-cyan-500/10 text-cyan-400/90 px-2.5 py-1 rounded-lg text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/60 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <FaGithub className="text-lg" /> Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-cyan-450 hover:text-cyan-400 transition-colors duration-200 ml-auto"
                  >
                    Demo <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;