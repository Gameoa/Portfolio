/* ================================================================
   SITE CONFIG
   ----------------------------------------------------------------
   The one place to edit your name, role, contact info, links, bio,
   and hero stats. Every page reads this file and fills itself in —
   nothing else needs to be touched when any of this changes.
================================================================ */

window.SITE = {
  name: "Lincoln Stanfield",

  // Used to build each page's browser-tab title, e.g. "Showcase — Lincoln Stanfield".
  // The homepage instead uses name + titleTagline (below) for a fuller title.
  titleTagline: "4th Year Mechanical Engineering Student",

  // Hero section (homepage only)
  role: "Mechanical Engineer",
  location: "Atlanta, GA",
  headline: "Mechanical Engineer", // TODO: put something better here
  pitch: "A collection of personal mechanical, electrical, and software projects that I've built over the years. Special focus on robotics and automation applications.",

  resumeUrl: "resume.pdf",

  // Hero spec-readout row. Use "count" for a number that animates in
  // on load, or "text" for a short static label. Any number of entries works.
  stats: [
    { count: 9, label: "Projects Finished" },
    { count: 5, label: "Under Development" },
    { count: 8, label: "Years building" },
    { text: "CAD / C++", label: "Core stack" },
    { text: "OPEN TO NEW OPPORTUNITIES", label: "Status" }
  ],

  // About section (homepage only)
  bio: [
    "Write two or three short paragraphs here about your background — what kind of engineer you are, what you like building, and what you're looking for next. Keep sentences plain and specific: what you've shipped, what tools you reach for, and what problem space you enjoy.",
    "Second paragraph: mention your education, past roles, or a project that best represents how you work. Employers skim this section, so lead with the most relevant sentence."
  ],
  skills: ["SolidWorks", "Fusion 360", "Autodesk Inventor", "Creo 9", "C++", "Python", "GD&T", "Design for Machining"],

  // Contact section (homepage only)
  contactBlurb: "Always open to new opportunities. Preferred contact through email for any general questions, or career opportunities.",
  email: "lincoln@example.com",
  links: [
    { label: "YouTube", url: "https://www.youtube.com/@gameoa1163" },
    { label: "GitHub", url: "https://github.com/gameoa" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/lincoln-stanfield-770791348/" }
  ]
};
