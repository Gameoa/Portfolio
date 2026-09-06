document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  loadProjects().then(projects => {
    const grid = document.getElementById("subGrid");
    grid.innerHTML = "";

    const flattened = [];
    projects.forEach(p => {
      (p.subprojects || []).forEach(sp => flattened.push({ ...sp, parent: p }));
    });

    if (flattened.length === 0){
      grid.innerHTML = `<div class="empty-state">No sub-projects yet — add a "subprojects" array to any project file in /projects/.</div>`;
      return;
    }

    flattened.forEach(sp => {
      const card = document.createElement("div");
      card.className = "sub-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View parent project: " + sp.parent.title);
      card.innerHTML = `
        <div class="sub-parent-link">Part of — ${sp.parent.title}</div>
        <div class="sub-title">${sp.title}</div>
        <div class="sub-desc">${sp.desc || ""}</div>
        ${sp.url ? `<a class="btn" style="align-self:flex-start;" href="${sp.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">External link</a>` : ""}
      `;
      const goToParent = () => { window.location.href = "showcase.html?open=" + encodeURIComponent(sp.parent.id); };
      card.addEventListener("click", goToParent);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " "){ e.preventDefault(); goToParent(); }
      });
      grid.appendChild(card);
    });
  });
});
