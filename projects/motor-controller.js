PROJECTS.push({
  id: "motor-controller",
  title: "Motor Controller Board + Firmware",
  category: "Controls",
  year: 2023,
  role: "Electrical / Firmware",
  desc: "A custom BLDC motor controller with closed-loop velocity control, built for the rover platform.",
  tags: ["KiCad", "Embedded C", "FOC"],
  image: null,
  model: null,
  featured: false,

  problem: "Why didn't an off-the-shelf motor controller meet your requirements?",
  approach: "Summarize the hardware and firmware architecture, and any tricky debugging.",
  result: "What performance did the final board hit, and how many were built?",

  subprojects: [
    { title: "Current Sense Calibration Tool", desc: "Small utility for zeroing ADC offsets across boards.", url: "" }
  ],

  links: [
    { label: "Repository", url: "https://github.com/yourusername/motor-controller" }
  ]
});
