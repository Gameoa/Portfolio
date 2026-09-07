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
  id: "663A_TowerTakeover",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "663A Tower Takeover Robot",
  category: "VRC Robotics",             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2019,                       // used for sorting on the timeline page
  role: "Lead Designer, Builder, Strategist, and Programmer",
  desc: "A Robot built for the 2019-20 Vex Robotics Tower Takeover competition",
  tags: ["Mechanical", "Software", "High School"],
  image: null,                      // or "images/my-project.jpg" once you have a real photo
  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "Make a robot that can quickly manipulate and stack colored blocks into tall towers. Place blocks into tall pedestals for extra points.",
  approach: "Designed a compact robot with focusing on speed, mechanical strength and rigidity to effectively score while directly engaging opponent robots.",
  result: "Placed highly in TN State competition.",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    { label: "Robot Explanation", url: "https://youtu.be/ESet7QWwRd8?si=btnCw11zenHrveOS" },
    { label: "Competition Video", url: "https://youtu.be/c_WKpKeEz8k?si=UbSfWFpIZUwpryck" }
  ]
});
