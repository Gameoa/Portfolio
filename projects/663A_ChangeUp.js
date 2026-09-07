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
  id: "663A_ChangeUp",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "663A Change Up Robot",
  category: "VRC Robotics",             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2020,                       // used for sorting on the timeline page
  role: "Lead Designer, Builder, Strategist, and Programmer",
  desc: "A robot built for the 2020-21 Vex Robotics Change Up competition",
  tags: ["Roller", "Mechanical", "Software"],
  image: null,                      // or "images/my-project.jpg" once you have a real photo
  images: ["images/663AChangeUp/663ACU_Thumbnail.png",
    "images/663AChangeUp/663ACU_Unit5_Render2.png", 
    "images/663AChangeUp/663ACU_Unit5_Render1.png"], // or "images/my-project.jpg" once you have a real photo
  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "Make a robot that can pick up and shoot balls into specified goals while also being able to counter opponent robots physically and strategically",
  approach: "Designed, built, and programmed an lightweight and agile robot that could efficiently pick up and score balls while also being able to push larger opponents and quickly navigate around them",
  result: "Placed high in TN State competition and qualified for the World Championship",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    { label: "Reveal Video", url: "https://youtu.be/_u9m0OijIUM?si=xU2moIZiAvvTJePT" },
    { label: "Autonomous Testing", url: "https://youtu.be/ExdDNTMkVt4?si=LNuTV3nPXD1d5_EV" }
  ]
});