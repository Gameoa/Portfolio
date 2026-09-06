document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  loadProjects().then(projects => {
    const filtersEl = document.getElementById("filters");
    const gridEl = document.getElementById("grid");
    gridEl.innerHTML = "";

    if (projects.length === 0){
      gridEl.innerHTML = `<div class="empty-state">No projects yet — add one in /projects/ and list it in js/manifest.js.</div>`;
      return;
    }

    const categories = ["All", ...new Set(projects.map(p => p.category))];
    categories.forEach((cat, i) => {
      const chip = document.createElement("button");
      chip.className = "filter-chip" + (i === 0 ? " active" : "");
      chip.textContent = cat;
      chip.dataset.cat = cat;
      chip.addEventListener("click", () => setFilter(cat));
      filtersEl.appendChild(chip);
    });

    projects.forEach((p, i) => gridEl.appendChild(cardEl(p, i)));

    function setFilter(cat){
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c.dataset.cat === cat));
      document.querySelectorAll(".card").forEach(card => {
        card.classList.toggle("hidden", !(cat === "All" || card.dataset.category === cat));
      });
    }

    openFromQuery(projects);
  });
});
