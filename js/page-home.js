document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  loadProjects().then(projects => {
    const grid = document.getElementById("featuredGrid");
    grid.innerHTML = "";

    let featured = projects.filter(p => p.featured);
    if (featured.length === 0) featured = projects.slice(0, 3);

    if (featured.length === 0){
      grid.innerHTML = `<div class="empty-state">No projects yet — add one in /projects/ and list it in js/manifest.js.</div>`;
      return;
    }
    featured.forEach((p, i) => grid.appendChild(cardEl(p, i)));
    openFromQuery(projects);
  });
});
