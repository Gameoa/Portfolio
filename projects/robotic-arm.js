PROJECTS.push({
  id: "robotic-arm",
  title: "6-DOF Robotic Arm",
  category: "Robotics",
  year: 2025,
  role: "Lead Mechanical Design",
  desc: "A desktop-scale robotic arm built for pick-and-place tasks and motion research.",
  tags: ["SolidWorks", "ROS2", "BLDC"],
  image: null,
  model: null,
  featured: true,

  problem: "Describe the constraint that made this project hard — payload, reach, precision, or budget.",
  approach: "Describe your design process: iterations, key trade-offs, and why you chose this architecture.",
  result: "Describe the outcome: what worked, what you measured, and what you'd do differently.",

  subprojects: [
    { title: "Custom End-Effector Mount", desc: "Quick-swap interface shared with the Modular Gripper System.", url: "" },
    { title: "Joint Encoder Calibration Rig", desc: "Fixture used to zero and validate each joint's absolute encoder.", url: "" }
  ],

  links: [
    { label: "Repository", url: "https://github.com/yourusername/robotic-arm" },
    { label: "Demo video", url: "#" }
  ]
});
