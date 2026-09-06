/* ================================================================
   LOADER
   ----------------------------------------------------------------
   Loads every file listed in PROJECT_FILES (manifest.js) as a plain
   <script> tag, then resolves a Promise with the combined array.

   Why <script> tags instead of fetch()+JSON:
   fetch() of local files is blocked by browsers when a page is
   opened directly (file://) rather than served over http. Plain
   <script src="..."> has no such restriction, so this works
   whether you're previewing the site by double-clicking index.html
   or after it's hosted on GitHub Pages, Netlify, etc.

   Each file in /projects/ simply does:
     PROJECTS.push({ ...one project object... });
================================================================ */

window.PROJECTS = [];

function loadProjects(){
  return new Promise((resolve) => {
    if (!window.PROJECT_FILES || window.PROJECT_FILES.length === 0){
      resolve(window.PROJECTS);
      return;
    }
    let remaining = window.PROJECT_FILES.length;
    window.PROJECT_FILES.forEach(src => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => { remaining--; if (remaining === 0) resolve(window.PROJECTS); };
      s.onerror = () => {
        console.error("Couldn't load project file:", src);
        remaining--; if (remaining === 0) resolve(window.PROJECTS);
      };
      document.head.appendChild(s);
    });
  });
}
