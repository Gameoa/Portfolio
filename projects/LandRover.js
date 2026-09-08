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
  id: "LandRover",
  title: "Land Rover Restoration",
  category: "Automotive",
  year: 2025,
  role: "The guy doing all the work",
  desc: "Repairing, restoring, and upgrading a 2004 Land Rover Discovery HSE7 to make a comfortable and utilitarian daily driver that can go anywhere",
  tags: ["Ongoing", "Automotive", "Restoration"],

  image: null,                      // deprecated single-image fallback; use "images" below instead

  // Each entry can be a plain path, or an object with a caption shown
  // beneath the photo in the modal's gallery viewer:
  //   images: ["images/a.jpg", { src: "images/b.jpg", caption: "Final assembly" }]
  // First entry is the card thumbnail. 2+ entries show a "N PHOTOS" badge
  // and prev/next + thumbnail-strip navigation.
  images: [{ src: "images/LandRover/LandRover_Front.png", caption: "Front View, engine work being done" }, 
    { src: "images/LandRover/LandRover_Behind.png", caption: "Rear View" },
    { src: "images/LandRover/LandRover_Inside.png", caption: "Inside, headliner removed for sunroof repairs" }],

  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer

  // Optional small tags on the card thumbnail's top-right corner, stacked
  // above/below the automatic "3D" tag. tone is "accent" (bold) or "muted"
  // (outlined) — omit tone for accent.
  //   badges: [{ text: "AWARD", tone: "accent" }, { text: "FEATURED", tone: "muted" }]
  badges: [{ text: "Ongoing", tone: "accent" }],

  featured: false,                  // true = shown on the homepage's featured strip

  // ----------------------------------------------------------------
  // WRITE-UP — use "sections" for anything beyond a simple
  // Problem/Approach/Result. Any number of sections, any headings.
  // ----------------------------------------------------------------
  // A section's "body" can be a single string, or an array of strings
  // for multiple paragraphs. For a longer write-up with photos placed
  // inline between paragraphs, use "blocks" instead of "body":
  sections:[
    {
      heading: "Design Process",
      blocks: [
        { text: "First iteration used a single belt drive..." },
        { image: "images/rev1.jpg", caption: "First revision, before the gearbox redesign" },
        { text: "That underperformed under load, so..." }
      ]
    }
  ],
  //sections: [
  //  { heading: "Problem", body: "What made this project hard?" },
  //  { heading: "Approach", body: "What did you do about it?" },
  //  { heading: "Result", body: "What was the outcome?" }
  //],

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