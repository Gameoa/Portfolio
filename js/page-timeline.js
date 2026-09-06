document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  loadProjects().then(projects => {
    const wrap = document.getElementById("timelineWrap");
    wrap.innerHTML = "";

    if (projects.length === 0){
      wrap.innerHTML = `<div class="empty-state">No projects yet — add one in /projects/ and list it in js/manifest.js.</div>`;
      return;
    }

    // Group by year. Non-numeric years (e.g. "—" for demo/example entries)
    // are bucketed under "Undated" and sorted to the end.
    const groups = {};
    projects.forEach(p => {
      const key = /^\d+$/.test(String(p.year)) ? String(p.year) : "Undated";
      (groups[key] = groups[key] || []).push(p);
    });
    const years = Object.keys(groups).sort((a, b) => {
      if (a === "Undated") return 1;
      if (b === "Undated") return -1;
      return Number(b) - Number(a);
    });

    const timeline = document.createElement("div");
    timeline.className = "timeline";

    years.forEach(year => {
      const yearBlock = document.createElement("div");
      yearBlock.className = "timeline-year";
      yearBlock.innerHTML = `<div class="timeline-year-label mono">${year}</div>`;

      const itemsWrap = document.createElement("div");
      itemsWrap.className = "timeline-items";

      groups[year].forEach(p => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", "View project: " + p.title);
        item.innerHTML = `
          <div class="timeline-item-main">
            <div class="timeline-item-title">${p.title}</div>
            <div class="timeline-item-desc">${p.desc}</div>
          </div>
          <div class="timeline-item-meta">
            <span class="tag">${p.category}</span>
            ${p.model ? '<span class="tag">3D</span>' : ""}
          </div>
        `;
        item.addEventListener("click", () => openModal(p));
        item.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(p); }
        });
        itemsWrap.appendChild(item);
      });

      yearBlock.appendChild(itemsWrap);
      timeline.appendChild(yearBlock);
    });

    wrap.appendChild(timeline);
    openFromQuery(projects);
  });
});
