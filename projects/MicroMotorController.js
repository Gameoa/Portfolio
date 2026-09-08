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
  id: "MicroMotorController",
  title: "Micro Motor Controller",
  category: "Robotics",
  year: 2026,
  role: "Personal Project",
  desc: "A miniature FOC motor controller designed for small robotics applications to enable better control of brushless motors while being easily packaged.",
  tags: ["Early Stages","Robotics", "Electronics"],

  image: null,                      // deprecated single-image fallback; use "images" below instead

  // Each entry can be a plain path, or an object with a caption shown
  // beneath the photo in the modal's gallery viewer:
  //   images: ["images/a.jpg", { src: "images/b.jpg", caption: "Final assembly" }]
  // First entry is the card thumbnail. 2+ entries show a "N PHOTOS" badge
  // and prev/next + thumbnail-strip navigation.
  images: [],

  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer

  // Optional small tags on the card thumbnail's top-right corner, stacked
  // above/below the automatic "3D" tag. tone is "accent" (bold) or "muted"
  // (outlined) — omit tone for accent.
  //   badges: [{ text: "AWARD", tone: "accent" }, { text: "FEATURED", tone: "muted" }]
  badges: [{ text: "Ongoing", tone: "accent" }, { text: "Early Stages", tone: "muted" }],

  featured: false,                  // true = shown on the homepage's featured strip

  // ----------------------------------------------------------------
  // WRITE-UP — use "sections" for anything beyond a simple
  // Problem/Approach/Result. Any number of sections, any headings.
  // ----------------------------------------------------------------
  // A section's "body" can be a single string, or an array of strings
  // for multiple paragraphs. For a longer write-up with photos placed
  // inline between paragraphs, use "blocks" instead of "body":
  //   {
  //     heading: "Design Process",
  //     blocks: [
  //       { text: "First iteration used a single belt drive..." },
  //       { image: "images/rev1.jpg", caption: "First revision, before the gearbox redesign" },
  //       { text: "That underperformed under load, so..." }
  //     ]
  //   }
  sections: [
    { heading: "Early Stages", body: "This project is in early stages of development. Most work consists of research, part and tool procurement, software selection, and final design strategy." },
    { heading: "Current Progress", body: "Procured small brushless motors as well as out of the box controller solutions for testing and gaining familiarity with industry standards. Researching and analyzing open source controllers to understand important aspects of motor controller designs. Selecting circuit components for high frequency operation and compact size."},
    { heading: "Design Goals", body: "Primary goal is to make a compact motor controller that can precisely control small brushless motors with either sensored or, (where applicable) sensorless FOC. The controller should be able to handle a variety of small motors and be easily tuned for each."}
  ],

  // Legacy fields — only used as a fallback if "sections" above is
  // removed/empty. Kept for compatibility with older project files.
  // problem: "...",
  // approach: "...",
  // result: "...",

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