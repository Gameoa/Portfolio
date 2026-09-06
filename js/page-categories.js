document.addEventListener("DOMContentLoaded", () => {
  initChrome();

  loadProjects().then(projects => {
    const jumpEl = document.getElementById("catJump");
    const wrap = document.getElementById("categoriesWrap");
    wrap.innerHTML = "";

    if (projects.length === 0){
      wrap.innerHTML = `<div class="wrap"><div class="empty-state">No projects yet — add one in /projects/ and list it in js/manifest.js.</div></div>`;
      return;
    }

    const categories = [...new Set(projects.map(p => p.category))].sort();

    categories.forEach(cat => {
      const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const link = document.createElement("a");
      link.className = "btn";
      link.href = "#" + slug;
      link.textContent = cat;
      jumpEl.appendChild(link);

      const inCat = projects.filter(p => p.category === cat);

      const section = document.createElement("section");
      section.className = "cat-section";
      section.id = slug;
      section.innerHTML = `
        <div class="wrap">
          <div class="cat-section-head">
            <h2>${cat}</h2>
            <span class="cat-count field-label">${inCat.length} project${inCat.length === 1 ? "" : "s"}</span>
          </div>
          <div class="grid"></div>
        </div>
      `;
      const grid = section.querySelector(".grid");
      inCat.forEach((p, i) => grid.appendChild(cardEl(p, i)));
      wrap.appendChild(section);
    });

    openFromQuery(projects);
  });
});
