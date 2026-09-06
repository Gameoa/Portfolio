/* ================================================================
   PROJECT FILE TEMPLATE — not loaded by any page.
   ----------------------------------------------------------------
   To add a new project:
     1. Copy this file into /projects/ and rename it, e.g. "my-project.js".
     2. Fill in the fields below.
     3. Add its filename to PROJECT_FILES in /js/manifest.js.
   Every page (home, showcase, timeline, categories, subprojects)
   will pick it up automatically — nothing else to edit.
================================================================ */

PROJECTS.push({
  id: "663A_TippingPoint",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "663A Tipping Point Robot",
  category: ["High School", "Robotics"],             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2022,                       // used for sorting on the timeline page
  role: "Lead Designer, Builder, Strategist, and Programmer",
  desc: "A robot built for the 2021-22 Vex Robotics Tipping Point competition",
  tags: ["Tool", "Tool", "Tool"],
  image: null,                      // or "images/my-project.jpg" once you have a real photo
  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "Make a robot to score points using rings placed on mobile goals and loading mobile goals into designated scoring zones while battling opponent robots",
  approach: "Designed, built, and programmed a versatile mobile goal focused robot that utilized a transmission to allocate power to vital subsystems under different scenarios",
  result: "Finalists and Design Award winners at State competition and qualified for the World Championship, 8th overall seed and create award winners for 100+ team division at Worlds",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    // { label: "Repository", url: "https://github.com/yourusername/my-project" }
  ]
});