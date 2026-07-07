import SectionHeader from "./SectionHeader";

const ResumeProjects = ({ projects = [] }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-md
        p-7
        "
    >
      <SectionHeader
        title="Projects"
        subtitle="Projects identified from your resume"
        count={projects.length}
      />

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project._id}
            className="
                        border
                        rounded-2xl
                        p-5
                        hover:shadow-lg
                        transition
                        "
          >
            <h3
              className="
                            text-lg
                            font-bold
                            "
            >
              {project.title}
            </h3>

            <p
              className="
                            text-slate-500
                            mt-2
                            "
            >
              {project.description}
            </p>

            <div
              className="
                            flex
                            flex-wrap
                            gap-2
                            mt-4
                            "
            >
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="
                                    bg-indigo-100
                                    text-indigo-700
                                    rounded-full
                                    px-3
                                    py-1
                                    text-sm
                                    "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeProjects;
