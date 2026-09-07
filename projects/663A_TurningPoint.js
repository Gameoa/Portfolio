PROJECTS.push({
  id: "663A_TurningPoint",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "663A Turning Point Robot",
  category: "VRC Robotics",             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2018,                       // used for sorting on the timeline page
  role: "Lead Designer, Builder, Strategist, and Programmer",
  desc: "A Robot built for the 2018-19 Vex Robotics Turning Point competition",
  tags: ["Lift", "Mechanical", "Software", "High School"],
  image: "images/663ATurningPoint/663ATP_Thumbnail.png",                      // or "images/my-project.jpg" once you have a real photo
  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "Make a robot that can effectively shoot and toggle high reaching flags while also being able to flip caps and score them on post in a fast, head-to-head, scoring descoring battle.",
  approach: "Build a robot that prioritized the underutilized cap based scoring to serve as an effective and complementary teammate to a more standard scoring robot.",
  result: "TN State Semi-Finalists and competed at the worlds competition",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    { label: "Reveal Video", url: "https://youtu.be/yYyONbt0ypY?si=sP8WFLDtm8XgttFA" },
    { label: "Autonomous Demonstration", url: "https://youtu.be/xOEhEK4dzy0?si=2L__xlMzU_4lU6hB" }
  ]
});
