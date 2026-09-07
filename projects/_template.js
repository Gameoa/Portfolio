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
  id: "my-project",                 // unique, url-safe (used for filters + shareable ?open= links)
  title: "Project Title",
  category: "Robotics",             // reuse an existing category or invent a new one —
                                     // filter chips and category pages update automatically
  year: 2026,                       // used for sorting on the timeline page
  role: "Your Role",
  desc: "One sentence shown on the card.",
  tags: ["Tool", "Tool", "Tool"],
  image: null,                      // deprecated in favor of "images" below, but still
                                     // supported as a thumbnail-only fallback
  images: [],                       // e.g. ["images/my-project-1.jpg", "images/my-project-2.jpg"]
                                     // First entry is used as the card thumbnail. Two or more
                                     // shows a "gallery" badge and an in-modal photo viewer with
                                     // prev/next + thumbnail strip. If a "model" is also set,
                                     // the modal shows a Photos/3D Model tab switcher.
  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  featured: false,                  // true = shown on the homepage's featured strip

  problem: "What made this project hard?",
  approach: "What did you do about it?",
  result: "What was the outcome?",

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
