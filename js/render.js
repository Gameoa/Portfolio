/* ================================================================
   SHARED RENDER LAYER
   ----------------------------------------------------------------
   Used by every page. Builds project cards, the category icons,
   and the detail modal (including the 3D viewer and its
   auto-detected animation buttons) so none of that logic is
   duplicated per page.
================================================================ */

const ICONS = {
  Robotics: `<svg viewBox="0 0 64 64" fill="none" stroke="#17181A" stroke-width="1.4"><circle cx="32" cy="16" r="7"/><line x1="32" y1="23" x2="32" y2="36"/><line x1="32" y1="36" x2="16" y2="50"/><line x1="32" y1="36" x2="48" y2="50"/><circle cx="16" cy="50" r="4"/><circle cx="48" cy="50" r="4"/></svg>`,
  Mechanical: `<svg viewBox="0 0 64 64" fill="none" stroke="#17181A" stroke-width="1.4"><circle cx="32" cy="32" r="10"/><circle cx="32" cy="32" r="3"/><path d="M32 12v6M32 46v6M12 32h6M46 32h6M18 18l4 4M42 42l4 4M46 18l-4 4M22 42l-4 4"/></svg>`,
  Controls: `<svg viewBox="0 0 64 64" fill="none" stroke="#17181A" stroke-width="1.4"><rect x="18" y="18" width="28" height="28"/><line x1="26" y1="6" x2="26" y2="18"/><line x1="38" y1="6" x2="38" y2="18"/><line x1="26" y1="46" x2="26" y2="58"/><line x1="38" y1="46" x2="38" y2="58"/><line x1="6" y1="26" x2="18" y2="26"/><line x1="6" y1="38" x2="18" y2="38"/><line x1="46" y1="26" x2="58" y2="26"/><line x1="46" y1="38" x2="58" y2="38"/></svg>`,
  CAD: `<svg viewBox="0 0 64 64" fill="none" stroke="#17181A" stroke-width="1.4"><path d="M32 8 56 20v24L32 56 8 44V20z"/><path d="M8 20 32 32l24-12M32 32v24"/></svg>`,
  Software: `<svg viewBox="0 0 64 64" fill="none" stroke="#17181A" stroke-width="1.4"><path d="M22 20 8 32l14 12M42 20l14 12-14 12M36 16 28 48"/></svg>`
};
const DEFAULT_ICON = ICONS.Mechanical;

function iconFor(category){ return ICONS[category] || DEFAULT_ICON; }

function byId(projects, id){ return projects.find(p => p.id === id); }

/* ---------------------------------------------------------------
   Card builder — used by the showcase grid, category sections,
   and the homepage's featured strip.
--------------------------------------------------------------- */
function cardEl(p, index){
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = p.category;
  card.dataset.id = p.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", "View project: " + p.title);

  const idx = String(index + 1).padStart(2, "0");
  const thumb = p.image ? `<img src="${p.image}" alt="${p.title}">` : iconFor(p.category);
  const badge3d = p.model ? `<span class="badge-3d">3D</span>` : "";

  card.innerHTML = `
    <div class="card-top">
      <span class="card-index field-label">No. ${idx} — ${p.year}</span>
      <span class="card-index field-label">${p.category}</span>
    </div>
    <div class="card-thumb">${thumb}${badge3d}</div>
    <h3 class="card-title">${p.title}</h3>
    <p class="card-desc">${p.desc}</p>
    <div class="card-tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
  `;

  card.addEventListener("click", () => openModal(p));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(p); }
  });
  return card;
}

/* ---------------------------------------------------------------
   Modal — injected once per page (idempotent), reused for every
   project. Includes the interactive 3D viewer and a "Sub-projects"
   block when a project defines either.
--------------------------------------------------------------- */
let _lastFocused = null;

function ensureModal(){
  if (document.getElementById("modalOverlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modalOverlay";
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
      <div class="modal-meta" id="modalMeta"></div>
      <h3 id="modalTitle"></h3>
      <p class="modal-desc" id="modalDesc"></p>
      <div class="model-wrap" id="modelWrap" style="display:none;"></div>
      <div class="modal-block"><h4>Problem</h4><p id="modalProblem"></p></div>
      <div class="modal-block"><h4>Approach</h4><p id="modalApproach"></p></div>
      <div class="modal-block"><h4>Result</h4><p id="modalResult"></p></div>
      <div class="modal-block" id="modalSubWrap" style="display:none;">
        <h4>Sub-projects</h4>
        <div class="sub-list" id="modalSubList"></div>
      </div>
      <div class="modal-links" id="modalLinks"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("modalClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });
}

function openModal(p){
  ensureModal();
  _lastFocused = document.activeElement;

  document.getElementById("modalMeta").innerHTML =
    `<span class="tag">${p.category}</span><span class="tag">${p.year}</span><span class="tag">${p.role || ""}</span>`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalProblem").textContent = p.problem || "";
  document.getElementById("modalApproach").textContent = p.approach || "";
  document.getElementById("modalResult").textContent = p.result || "";

  const subWrap = document.getElementById("modalSubWrap");
  const subList = document.getElementById("modalSubList");
  subList.innerHTML = "";
  if (p.subprojects && p.subprojects.length){
    subWrap.style.display = "block";
    p.subprojects.forEach(sp => {
      const item = document.createElement("div");
      item.className = "sub-list-item";
      const titleHtml = sp.url
        ? `<a href="${sp.url}" target="_blank" rel="noopener">${sp.title}</a>`
        : sp.title;
      item.innerHTML = `<div class="sub-list-item-title">${titleHtml}</div><div class="sub-list-item-desc">${sp.desc || ""}</div>`;
      subList.appendChild(item);
    });
  } else {
    subWrap.style.display = "none";
  }

  const linksEl = document.getElementById("modalLinks");
  linksEl.innerHTML = "";
  (p.links || []).forEach(l => {
    const a = document.createElement("a");
    a.className = "btn";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.label;
    linksEl.appendChild(a);
  });

  setupModel(p);

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();

  // Keep the URL shareable/bookmarkable without a page reload.
  if (history.replaceState){
    const url = new URL(window.location.href);
    url.searchParams.set("open", p.id);
    history.replaceState(null, "", url);
  }
}

function closeModal(){
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("modelWrap").innerHTML = "";
  if (_lastFocused) _lastFocused.focus();

  if (history.replaceState){
    const url = new URL(window.location.href);
    url.searchParams.delete("open");
    history.replaceState(null, "", url);
  }
}

/* Opens a project's modal directly if the page URL has ?open=<id>,
   so links from other pages (timeline, subprojects, categories)
   can deep-link straight into a project's detail view. */
function openFromQuery(projects){
  const id = new URLSearchParams(window.location.search).get("open");
  if (!id) return;
  const p = byId(projects, id);
  if (p) openModal(p);
}

/* Builds (or clears) the interactive 3D viewer for the open project.
   Animation buttons are generated from whatever clips model-viewer
   finds inside the file itself — no manual animation list needed. */
function setupModel(p){
  const wrap = document.getElementById("modelWrap");
  wrap.innerHTML = "";

  if (!p.model){ wrap.style.display = "none"; return; }
  wrap.style.display = "block";

  const mv = document.createElement("model-viewer");
  mv.setAttribute("src", p.model);
  mv.setAttribute("alt", p.title + " — 3D model");
  mv.setAttribute("camera-controls", "");
  mv.setAttribute("auto-rotate", "");
  mv.setAttribute("shadow-intensity", "1");
  mv.setAttribute("exposure", "0.9");
  mv.setAttribute("touch-action", "pan-y");
  wrap.appendChild(mv);

  const hint = document.createElement("div");
  hint.className = "model-hint";
  hint.textContent = "Drag to rotate · scroll to zoom";
  wrap.appendChild(hint);

  const animRow = document.createElement("div");
  animRow.className = "anim-controls";
  animRow.style.display = "none";
  wrap.appendChild(animRow);

  mv.addEventListener("load", () => {
    const clips = mv.availableAnimations || [];
    if (clips.length === 0) return;
    animRow.style.display = "flex";
    clips.forEach((name, i) => {
      const btn = document.createElement("button");
      btn.className = "anim-btn" + (i === 0 ? " active" : "");
      btn.textContent = name;
      btn.addEventListener("click", () => {
        animRow.querySelectorAll(".anim-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        mv.animationName = name;
        mv.currentTime = 0;
        mv.play({ repetitions: Infinity });
      });
      animRow.appendChild(btn);
    });
    mv.animationName = clips[0];
    mv.play({ repetitions: Infinity });
  });

  mv.addEventListener("error", () => {
    wrap.innerHTML = `<div class="model-fallback">Couldn't load the 3D model.<br>Check the file path in this project's "model" field.</div>`;
  });
}

/* ---------------------------------------------------------------
   Shared page chrome: mobile nav toggle + footer year.
   Call this once on every page after the DOM is ready.
--------------------------------------------------------------- */
function initChrome(){
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav){
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
    });
  }
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
