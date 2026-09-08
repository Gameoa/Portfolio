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
    { count: 10, label: "Projects" },
    { count: 4, label: "Ongoing" },
    { count: 8, label: "Years building" },
    { text: "CAD / C++", label: "Core stack" },
    { text: "OPEN TO NEW OPPORTUNITIES", label: "Status" }
  ],

  // About section (homepage only)
  bio: [
    "Senior Mechanical Engineering student with extensive background in mechanics and robotics. Always looking to broaden my skillset in order to become a more effective engineer. Especially focused towards integrating my mechanical knowledge with more advanced programming and especially electrical work.",
    "Always pursuing new opportunities and projects."
  ],
  skills: ["SolidWorks", "Fusion 360", "Autodesk Inventor", "Creo Parametric", "Catia", "C++", "Matlab", "Python", "GD&T", "3D Printing", "Design for Machining", "Design for Manufacturing"],

  // Contact section (homepage only)
  contactBlurb: "Always open to new opportunities. Preferred contact through email for any general questions, or career opportunities.",
  email: "lincolntatestanfield@gmail.com",
  links: [
    { label: "YouTube", url: "https://www.youtube.com/@gameoa1163" },
    { label: "GitHub", url: "https://github.com/gameoa" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/lincoln-stanfield-770791348/" }
  ]
};
