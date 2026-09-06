document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  document.querySelectorAll(".spec-value[data-count]").forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 24));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

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
