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
  image: null,
  images: ["./images/ME2110Robot/ME2110Robot_MainImage.png", 
    "./images/ME2110Robot/ME2110Robot_ExtensionImage.png", 
    "./images/ME2110Robot/ME2110Robot_LiftImage.png", 
    "./images/ME2110Robot/ME2110Robot_KoopaImage.png"], // or "images/my-project.jpg" once you have a real photo
  model: "models/ME2110_FinalRobot.glb",                      // or "models/my-project.glb" for an interactive 3D viewer —
                                     // see README.md for export tips. Animation buttons appear
                                     // automatically if the file has animation clips.
  badges: [{ text: "FEATURED", tone: "muted" }],
  
  featured: true,                  // true = shown on the homepage's featured strip

  sections: [
    { heading: "Competition",
      blocks: [
        //{ image: "./images/ME2110Robot/ME2110Robot_Competition.png", caption: "Competition Round 1" },
        { text: "The competition had 4 tasks to complete, the goal being to score the most points reliably to progress through the final competition. The 4 tasks consisted of:"},
        { text: "(1) Lifting an object into one of the tower zones"},
        { text: "(2) Placing individual objects into each receptacle on spinning platform"},
        { text: "(3) Collecting, sorting, and placing 2 different objects into zones on either side of the center tower"},
        { text: "(4) Moving from the starting zone"}
      ]
    },
    { heading: "Analysis",
      blocks: [
        { text: "When first analyzing the competition for the Fall 2026 semester and comparing against games from past semester, we realized this competition had a very simple set of competition tasks compared to other years." },
        { text: "Given the resources available to students have only gotten better, and many teams from past seasons could reliably perform all tasks for the given year, we realized that a large portion of teams for our season would be able to perform every task reliably."},
        { text: "This meant that going into the final rounds, the only this determining if a team won would be who collected the most objects from the center spinning tower."},
        { text: "We also observed that given the recent push for robots to fully leave the starting zone, almost all teams in the previous semester drove the whole robot out of the starting zone when the match began."}
      ]
    },
    { heading: "Design",
      blocks: [
        { image: "./images/ME2110Robot/ME2110Robot_ExtensionImage.png", caption: "Overall Design with extension mechanism activated" },
        { text: "Given our analysis, we decided we couldn't rely on simple robot movement to reach the center quickly and collect most of the centerobjects." },
        { text: "This drove us to a robot design where a lightweight extension system would be fired out of the robot at match start and be positioned to block objects on the center spinning platform. This allowed time for the robot to reach the center while keeping possession of the center game objects."},
        { image: "./images/ME2110Robot/ME2110Robot_KoopaImage.png", caption: "Robot state after reaching center platform, raising center lift and extending side scoring arms"},
        { text: "As the robot moved foward the extension system is allowed to freely retract into the robot. Once fully retracted a gate on the extension mechanism is pushed open alloweing hoarded game objects to funnel into the robot and be sorted into appropriate containers for side scoring."}
      ]
    }
  ],

  //problem: "Make a robot constrained by provided mechatronics components, size, and time limits that can reliably complete several tasks to compete against other teams",
  //approach: "Built a robot focused on reaching the center quickest and hold the most shared objects, only then performing other solo tasks to maximize potential points.",
  //result: "Placed highly in Competition rounds, ultimately losing to simpler, more reliable robots that didn't rely on complex expansion mechanisms to quickly reach the center.",

  // Optional. Smaller pieces of work that belong under this project.
  // Shown in this project's detail view AND flattened onto subprojects.html.
  subprojects: [
    // { title: "Sub-component name", desc: "One line.", url: "https://..." }
  ],

  // Optional. Delete any you don't need.
  links: [
    { label: "Repository", url: "https://github.com/Gameoa/ME2110Winners" },
    { label: "Competition Video", url: "https://youtu.be/Z0BACqOM2iA?si=RHMOzV0rOkGVlZsv" }
  ]
});
