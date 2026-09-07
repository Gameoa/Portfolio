PROJECTS.push({
  id: "ME2110Robot",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "ME2110 Robot",
  category: "Engineering",             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2026,                       // used for sorting on the timeline page
  role: "Lead Designer, Builder, and Programmer",
  desc: "A robot built for the GA Tech ME2110 course to demonstrate the principles of mechanical engineering and robotics through a hands on peer-to-peer competition",
  tags: ["Mechanical", "Software", "GA Tech"],
  //image: "images/ME2110Robot/ME2110Robot_MainImage.png", // or "images/my-project.jpg" once you have a real photo
  images: ["images/ME2110Robot/ME2110Robot_MainImage.png", "images/ME2110Robot/ME2110Robot_ExtensionImage.png"],
  model: "models/ME2110_FinalRobot.glb",                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "Make a robot constrained by provided mechatronics components, size, and time limitsthat can reliably complete several tasks to compete against other teams",
  approach: "Built a robot focused on reaching the center quickest and hold the most shared objects, only then performing other solo tasks to maximize potential points.",
  result: "Placed highly in Competition rounds, ultimately losing to more reliable robots that didn't rely on complex mechanisms to quickly reach the center.",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    { label: "Repository", url: "https://github.com/Gameoa/ME2110Winners" }
  ]
});
