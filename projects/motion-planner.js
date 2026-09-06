PROJECTS.push({
  id: "motion-planner",
  title: "Real-Time Motion Planner",
  category: "Software",
  year: 2025,
  role: "Firmware / Software",
  desc: "A C++ trajectory planner running on-board the robotic arm, generating jerk-limited motion profiles in real time.",
  tags: ["C++17", "CMake", "Eigen", "Real-time"],
  image: null,
  model: null,
  featured: true,

  problem: "What latency or smoothness requirement made an off-the-shelf planner unsuitable?",
  approach: "Describe the algorithm (e.g. trapezoidal or S-curve profiling) and how you kept it deterministic.",
  result: "What loop rate did you hit, and how did it change the arm's behavior?",

  subprojects: [],

  links: [
    { label: "Repository", url: "https://github.com/yourusername/motion-planner" }
  ]
});
