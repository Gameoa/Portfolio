/* ================================================================
   SHARED RENDER LAYER
   ----------------------------------------------------------------
   Used by every page. Builds project cards, the category icons,
   and the detail modal (including the 3D viewer, the flexible
   write-up sections, and auto-detected animation buttons) so none
   of that logic is duplicated per page.
================================================================ */

const ICONS = {
  Robotics: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="32" cy="16" r="7"/><line x1="32" y1="23" x2="32" y2="36"/><line x1="32" y1="36" x2="16" y2="50"/><line x1="32" y1="36" x2="48" y2="50"/><circle cx="16" cy="50" r="4"/><circle cx="48" cy="50" r="4"/></svg>`,
  Mechanical: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="32" cy="32" r="10"/><circle cx="32" cy="32" r="3"/><path d="M32 12v6M32 46v6M12 32h6M46 32h6M18 18l4 4M42 42l4 4M46 18l-4 4M22 42l-4 4"/></svg>`,
  Controls: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="18" y="18" width="28" height="28"/><line x1="26" y1="6" x2="26" y2="18"/><line x1="38" y1="6" x2="38" y2="18"/><line x1="26" y1="46" x2="26" y2="58"/><line x1="38" y1="46" x2="38" y2="58"/><line x1="6" y1="26" x2="18" y2="26"/><line x1="6" y1="38" x2="18" y2="38"/><line x1="46" y1="26" x2="58" y2="26"/><line x1="46" y1="38" x2="58" y2="38"/></svg>`,
  CAD: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M32 8 56 20v24L32 56 8 44V20z"/><path d="M8 20 32 32l24-12M32 32v24"/></svg>`,
  Software: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M22 20 8 32l14 12M42 20l14 12-14 12M36 16 28 48"/></svg>`
};
const DEFAULT_ICON = ICONS.Mechanical;

function iconFor(category){ return ICONS[category] || DEFAULT_ICON; }

function byId(projects, id){ return projects.find(p => p.id === id); }

/* Normalizes one entry of a project's "images" array. Accepts either
   a plain path string, or an { src, caption } object — so existing
   project files with plain strings keep working untouched. */
function normImg(img){
  return (typeof img === "string") ? { src: img, caption: null } : { src: img.src, caption: img.caption || null };
}

/* A project's thumbnail image: prefer the first entry in `images`,
   fall back to the older singular `image` field for compatibility. */
function thumbSrc(p){
  if (p.images && p.images.length) return normImg(p.images[0]).src;
  return p.image || null;
}

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
  const src = thumbSrc(p);
  const thumb = src ? `<img src="${src}" alt="${p.title}">` : iconFor(p.category);

  // Top-right corner stack: the automatic "3D" badge (if there's a model)
  // plus any custom badges defined on the project (awards, "featured", etc).
  const cornerItems = [];
  if (p.model) cornerItems.push(`<span class="badge-corner-item badge-3d">3D</span>`);
  (p.badges || []).forEach(b => {
    const tone = b.tone === "muted" ? "badge-muted" : "badge-accent";
    cornerItems.push(`<span class="badge-corner-item badge-custom ${tone}">${b.text}</span>`);
  });
  const badgeCorner = cornerItems.length ? `<div class="badge-corner">${cornerItems.join("")}</div>` : "";
  const badgeGallery = (p.images && p.images.length > 1) ? `<span class="badge-gallery">${p.images.length} PHOTOS</span>` : "";

  card.innerHTML = `
    <div class="card-top">
      <span class="card-index field-label">No. ${idx} — ${p.year}</span>
      <span class="card-index field-label">${p.category}</span>
    </div>
    <div class="card-thumb">${thumb}${badgeCorner}${badgeGallery}</div>
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
   project. Includes the interactive 3D viewer, the flexible
   write-up sections, and a "Sub-projects" block when a project
   defines either.
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
      <div class="media-wrap" id="mediaWrap" style="display:none;">
        <div class="media-tabs" id="mediaTabs" style="display:none;"></div>
        <div class="media-pane" id="mediaPaneImages"></div>
        <div class="media-pane" id="mediaPaneModel"></div>
      </div>
      <div class="modal-sections" id="modalSections"></div>
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
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape"){ closeModal(); return; }
    if (e.key === "ArrowLeft") _galleryStep(-1);
    if (e.key === "ArrowRight") _galleryStep(1);
  });
}

/* ---------------------------------------------------------------
   Write-up sections. Preferred shape is a "sections" array on the
   project (any headings, any count). Falls back to the legacy
   problem/approach/result fields when "sections" isn't set, so
   older project files keep working with no changes.
--------------------------------------------------------------- */
function normalizeSections(p){
  if (p.sections && p.sections.length){
    return p.sections.map(sec => {
      let blocks;
      if (sec.blocks) blocks = sec.blocks;
      else if (Array.isArray(sec.body)) blocks = sec.body.map(t => ({ text: t }));
      else if (sec.body) blocks = [{ text: sec.body }];
      else blocks = [];
      return { heading: sec.heading, blocks };
    });
  }
  const legacy = [];
  if (p.problem) legacy.push({ heading: "Problem", blocks: [{ text: p.problem }] });
  if (p.approach) legacy.push({ heading: "Approach", blocks: [{ text: p.approach }] });
  if (p.result) legacy.push({ heading: "Result", blocks: [{ text: p.result }] });
  return legacy;
}

function renderBlocks(container, blocks, altBase){
  blocks.forEach(b => {
    if (b.text !== undefined){
      const p = document.createElement("p");
      p.textContent = b.text;
      container.appendChild(p);
    } else if (b.image){
      const fig = document.createElement("figure");
      fig.className = "inline-figure";
      const img = document.createElement("img");
      img.src = b.image;
      img.alt = b.caption || altBase;
      fig.appendChild(img);
      if (b.caption){
        const cap = document.createElement("figcaption");
        cap.textContent = b.caption;
        fig.appendChild(cap);
      }
      container.appendChild(fig);
    }
  });
}

function buildSections(container, p){
  container.innerHTML = "";
  normalizeSections(p).forEach(sec => {
    const block = document.createElement("div");
    block.className = "modal-block";
    const h = document.createElement("h4");
    h.textContent = sec.heading;
    block.appendChild(h);
    renderBlocks(block, sec.blocks, p.title);
    container.appendChild(block);
  });
}

function openModal(p){
  ensureModal();
  _lastFocused = document.activeElement;

  document.getElementById("modalMeta").innerHTML =
    `<span class="tag">${p.category}</span><span class="tag">${p.year}</span><span class="tag">${p.role || ""}</span>`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;

  buildSections(document.getElementById("modalSections"), p);

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

  setupMedia(p);

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
  document.getElementById("mediaPaneImages").innerHTML = "";
  document.getElementById("mediaPaneModel").innerHTML = "";
  document.getElementById("mediaTabs").innerHTML = "";
  _activeGallery = null;
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

/* ---------------------------------------------------------------
   Media: photo gallery + 3D model, shown in the modal.
   - Only images -> gallery shown directly, no tabs.
   - Only a model -> viewer shown directly, no tabs.
   - Both -> a small tab switcher toggles between them (kept
     separate rather than stacked, since a full gallery and a
     340px 3D canvas together makes for a very tall modal).
--------------------------------------------------------------- */
let _activeGallery = null; // { images, index, updateFn } for the currently open gallery, or null

function _galleryStep(dir){
  if (!_activeGallery) return;
  const g = _activeGallery;
  g.index = (g.index + dir + g.images.length) % g.images.length;
  g.updateFn();
}

function buildGallery(container, rawImages, altBase){
  container.innerHTML = "";
  const images = rawImages.map(normImg);
  const wrap = document.createElement("div");
  wrap.className = "gallery";

  const frame = document.createElement("div");
  frame.className = "gallery-frame";
  const img = document.createElement("img");
  img.className = "gallery-img";
  frame.appendChild(img);

  let prevBtn, nextBtn, countEl, thumbsEl;
  if (images.length > 1){
    prevBtn = document.createElement("button");
    prevBtn.className = "gallery-nav gallery-prev";
    prevBtn.setAttribute("aria-label", "Previous image");
    prevBtn.textContent = "‹";
    nextBtn = document.createElement("button");
    nextBtn.className = "gallery-nav gallery-next";
    nextBtn.setAttribute("aria-label", "Next image");
    nextBtn.textContent = "›";
    frame.appendChild(prevBtn);
    frame.appendChild(nextBtn);
  }
  wrap.appendChild(frame);

  const captionEl = document.createElement("div");
  captionEl.className = "gallery-caption";
  wrap.appendChild(captionEl);

  if (images.length > 1){
    const meta = document.createElement("div");
    meta.className = "gallery-meta";
    countEl = document.createElement("span");
    countEl.className = "gallery-count mono";
    meta.appendChild(countEl);
    wrap.appendChild(meta);

    thumbsEl = document.createElement("div");
    thumbsEl.className = "gallery-thumbs";
    images.forEach((im, i) => {
      const t = document.createElement("img");
      t.className = "gallery-thumb";
      t.src = im.src;
      t.alt = im.caption || (altBase + " — thumbnail " + (i + 1));
      t.addEventListener("click", () => { state.index = i; update(); });
      thumbsEl.appendChild(t);
    });
    wrap.appendChild(thumbsEl);
  }

  container.appendChild(wrap);

  const state = { images, index: 0 };
  function update(){
    const current = state.images[state.index];
    img.src = current.src;
    img.alt = current.caption || (altBase + " — photo " + (state.index + 1) + " of " + state.images.length);
    captionEl.textContent = current.caption || "";
    captionEl.style.display = current.caption ? "block" : "none";
    if (countEl) countEl.textContent = String(state.index + 1).padStart(2, "0") + " / " + String(state.images.length).padStart(2, "0");
    if (thumbsEl){
      thumbsEl.querySelectorAll(".gallery-thumb").forEach((t, i) => t.classList.toggle("active", i === state.index));
    }
  }
  if (prevBtn) prevBtn.addEventListener("click", () => { state.index = (state.index - 1 + images.length) % images.length; update(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { state.index = (state.index + 1) % images.length; update(); });
  update();

  _activeGallery = { images, get index(){ return state.index; }, set index(v){ state.index = v; }, updateFn: update };
}

function buildModelViewer(container, p){
  container.innerHTML = "";
  const mv = document.createElement("model-viewer");
  mv.setAttribute("src", p.model);
  mv.setAttribute("alt", p.title + " — 3D model");
  mv.setAttribute("camera-controls", "");
  mv.setAttribute("auto-rotate", "");
  mv.setAttribute("shadow-intensity", "1");
  mv.setAttribute("exposure", "0.6");
  mv.setAttribute("touch-action", "pan-y");
  container.appendChild(mv);

  const hint = document.createElement("div");
  hint.className = "model-hint";
  hint.textContent = "Drag to rotate · scroll to zoom";
  container.appendChild(hint);

  const animRow = document.createElement("div");
  animRow.className = "anim-controls";
  animRow.style.display = "none";
  container.appendChild(animRow);

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
    container.innerHTML = `<div class="model-fallback">Couldn't load the 3D model.<br>Check the file path in this project's "model" field.</div>`;
  });
}

function setupMedia(p){
  const wrap = document.getElementById("mediaWrap");
  const tabs = document.getElementById("mediaTabs");
  const imagesPane = document.getElementById("mediaPaneImages");
  const modelPane = document.getElementById("mediaPaneModel");
  tabs.innerHTML = "";
  imagesPane.innerHTML = "";
  modelPane.innerHTML = "";
  _activeGallery = null;

  const hasImages = p.images && p.images.length > 0;
  const hasModel = !!p.model;

  if (!hasImages && !hasModel){
    wrap.style.display = "none";
    return;
  }
  wrap.style.display = "block";

  function showPane(which){
    imagesPane.style.display = which === "images" ? "block" : "none";
    modelPane.style.display = which === "model" ? "block" : "none";
    if (which !== "images") _activeGallery = null;
    tabs.querySelectorAll(".media-tab").forEach(b => b.classList.toggle("active", b.dataset.pane === which));
  }

  if (hasImages && hasModel){
    tabs.style.display = "flex";
    const photosBtn = document.createElement("button");
    photosBtn.className = "media-tab active";
    photosBtn.dataset.pane = "images";
    photosBtn.textContent = "Photos";
    const modelBtn = document.createElement("button");
    modelBtn.className = "media-tab";
    modelBtn.dataset.pane = "model";
    modelBtn.textContent = "3D Model";
    photosBtn.addEventListener("click", () => { buildGallery(imagesPane, p.images, p.title); showPane("images"); });
    modelBtn.addEventListener("click", () => { if (!modelPane.querySelector("model-viewer")) buildModelViewer(modelPane, p); showPane("model"); });
    tabs.appendChild(photosBtn);
    tabs.appendChild(modelBtn);

    buildGallery(imagesPane, p.images, p.title);
    showPane("images");
  } else if (hasImages){
    tabs.style.display = "none";
    buildGallery(imagesPane, p.images, p.title);
    showPane("images");
  } else {
    tabs.style.display = "none";
    buildModelViewer(modelPane, p);
    showPane("model");
  }
}

/* ---------------------------------------------------------------
   Site info. Reads window.SITE (js/site.js) and fills in every
   element marked with a matching data-site attribute, wherever
   that element exists on the current page. Elements that don't
   exist on a given page are simply skipped.
--------------------------------------------------------------- */
function animateCounts(root){
  (root || document).querySelectorAll(".spec-value[data-count]").forEach(el => {
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
}

function applySiteInfo(){
  const s = window.SITE;
  if (!s) return;

  document.querySelectorAll('[data-site="name"]').forEach(el => { el.textContent = s.name; });

  const titleEl = document.querySelector("title");
  if (titleEl){
    const prefix = titleEl.dataset.pagePrefix;
    titleEl.textContent = prefix ? `${prefix} — ${s.name}` : `${s.name} — ${s.titleTagline || s.role || ""}`;
  }

  const kicker = document.querySelector('[data-site="kicker"]');
  if (kicker) kicker.textContent = s.role + (s.location ? " — Based in " + s.location : "");

  const headline = document.querySelector('[data-site="headline"]');
  if (headline && s.headline) headline.textContent = s.headline;

  const pitch = document.querySelector('[data-site="pitch"]');
  if (pitch && s.pitch) pitch.textContent = s.pitch;

  document.querySelectorAll('[data-site="resume-link"]').forEach(el => { if (s.resumeUrl) el.href = s.resumeUrl; });

  const statsWrap = document.querySelector('[data-site="stats"]');
  if (statsWrap && s.stats){
    statsWrap.innerHTML = "";
    s.stats.forEach(stat => {
      const div = document.createElement("div");
      div.className = "spec";
      if (stat.count !== undefined){
        div.innerHTML = `<div class="spec-value" data-count="${stat.count}">0</div><div class="spec-label field-label">${stat.label}</div>`;
      } else {
        div.innerHTML = `<div class="spec-value mono" style="font-size:20px; padding-top:4px;">${stat.text}</div><div class="spec-label field-label">${stat.label}</div>`;
      }
      statsWrap.appendChild(div);
    });
    animateCounts(statsWrap);
  }

  const bioWrap = document.querySelector('[data-site="bio"]');
  if (bioWrap && s.bio){
    bioWrap.querySelectorAll("p").forEach(p => p.remove());
    const skillsEl = bioWrap.querySelector(".skills");
    s.bio.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      bioWrap.insertBefore(p, skillsEl || null);
    });
  }

  const skillsWrap = document.querySelector('[data-site="skills"]');
  if (skillsWrap && s.skills){
    skillsWrap.innerHTML = s.skills.map(sk => `<span class="skill">${sk}</span>`).join("");
  }

  const blurb = document.querySelector('[data-site="contact-blurb"]');
  if (blurb && s.contactBlurb) blurb.textContent = s.contactBlurb;

  const contactLinks = document.querySelector('[data-site="contact-links"]');
  if (contactLinks){
    let html = "";
    if (s.email) html += `<a href="mailto:${s.email}">${s.email}</a>`;
    (s.links || []).forEach(l => { html += `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`; });
    if (s.resumeUrl) html += `<a href="${s.resumeUrl}" download>Résumé (PDF)</a>`;
    contactLinks.innerHTML = html;
  }
}

/* ---------------------------------------------------------------
   Theme toggle. The initial light/dark choice is applied by an
   inline script in each page's <head> (before first paint, so
   there's no flash of the wrong theme) — this just wires up the
   button and keeps localStorage in sync with any click.
--------------------------------------------------------------- */
function currentTheme(){
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function initTheme(){
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const render = () => {
    btn.textContent = currentTheme() === "dark" ? "LIGHT MODE" : "DARK MODE";
  };
  render();

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    render();
  });
}

/* ---------------------------------------------------------------
   Shared page chrome: mobile nav toggle, theme toggle, footer year.
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
  initTheme();
  applySiteInfo();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}