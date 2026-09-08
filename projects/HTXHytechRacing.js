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
  id: "HTXHytech",
  title: "HTX Hytech Racing - Powertrain Team",
  category: "FSAE",
  year: 2025,
  role: "Powertrain Subteam",
  desc: "Designing AWD Independent electric powertrain and cooling for GA Tech's FSAE Electric Competition team. 2025-26 Season",
  tags: ["FSAE", "Automotive", "Racing"],

  image: null,                      // deprecated single-image fallback; use "images" below instead

  // Each entry can be a plain path, or an object with a caption shown
  // beneath the photo in the modal's gallery viewer:
  //   images: ["images/a.jpg", { src: "images/b.jpg", caption: "Final assembly" }]
  // First entry is the card thumbnail. 2+ entries show a "N PHOTOS" badge
  // and prev/next + thumbnail-strip navigation.
  images: [{ src: "images/HTX/HTX_Comp1.png", caption: "HTX During endurance race at final competition" }, 
    { src: "images/HTX/HTX_Comp2.png", caption: "HTX racing at final competition" },
    { src: "images/HTX/HTX_Testing.png", caption: "HTX during midseason testing" }],

  model: null,                      // or "models/my-project.glb" for an interactive 3D viewer

  // Optional small tags on the card thumbnail's top-right corner, stacked
  // above/below the automatic "3D" tag. tone is "accent" (bold) or "muted"
  // (outlined) — omit tone for accent.
  //   badges: [{ text: "AWARD", tone: "accent" }, { text: "FEATURED", tone: "muted" }]
  badges: [],

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
      heading: "Season Goals",
      blocks: [
        { text: "Improve thermal modelling for more effective cooling performance on motors and accumulator." },
        { text: "Optimize cooling jacket for more performant and effective motors due to better temperature management." },
        { text: "Optimize hub mass to reduce car weight and wheel inertia while maintaing stiff sealed independent gearboxes." },
        { text: "Design tools and test equipment for quicker development and prototyping for future seasons." }
        //{ image: "images/rev1.jpg", caption: "First revision, before the gearbox redesign" },
        //{ text: "That underperformed under load, so..." }
      ]
    },
    {
      heading: "Competition Results",
      blocks: [
        { text: "Had been experiencing issues leading up to comp due to high testing volume. Was unable to find root cause during competition and voluntarily withdrew from dynamic events for safety." },
        { text: "Passed tech inspections and placed first out of static-only teams"}
        //{ image: "images/rev1.jpg", caption: "First revision, before the gearbox redesign" },
        //{ text: "That underperformed under load, so..." }
      ]
    },
    {
      heading: "Disclosure",
      blocks: [
        { text: "Limited info available due to ongoing season and proprietary team documentation." }
        //{ image: "images/rev1.jpg", caption: "First revision, before the gearbox redesign" },
        //{ text: "That underperformed under load, so..." }
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