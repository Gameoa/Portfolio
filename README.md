# Portfolio site

Plain HTML/CSS/JS, no build step, no framework, no server required to preview.

## Structure

```
index.html          Homepage — hero, featured work, about, contact
showcase.html        Full filterable grid of every project
timeline.html         Projects grouped by year, newest first
categories.html       Projects grouped into sections by discipline
subprojects.html      Flattened list of every sub-project, linking back to its parent

css/styles.css        One shared stylesheet for every page

js/site.js              Your name, role, contacts, links, bio, skills, hero stats — edit this
js/manifest.js         List of project files to load — edit this when adding/removing a project
js/loader.js            Loads each project file and hands back the combined array
js/render.js            Shared card + modal + gallery + 3D viewer logic used by every page
js/page-*.js            One small script per page, just wiring data to that page's layout

projects/*.js           One file per project — this is what you'll actually edit day to day
projects/_template.js    Copy this to start a new project (not loaded by any page)

images/                Put project photos here
models/                Put .glb files here
```

## Editing your name, contact info, bio, and hero stats

All of it lives in one place: `js/site.js`. Change your name, role, location,
resume link, email, social links, bio paragraphs, skills, and the hero's stat
readout there, and every page picks it up automatically — the title bar name,
each page's browser-tab title, the homepage hero/about/contact sections, and the
footer credit all read from this one file. Nothing else needs to be touched.

The hero stat row (`stats` in site.js) accepts any number of entries, each either
a `count` (animates in as a number on load) or a `text` label (shown as-is).

## Adding a project

1. Copy `projects/_template.js`, rename it (e.g. `projects/my-new-thing.js`), and fill in the fields.
2. Add that filename to the `PROJECT_FILES` array in `js/manifest.js`.

That's it. Every page — home's featured strip, the showcase grid, the timeline, the
category sections, and (if it has sub-projects) the sub-projects page — updates
automatically. Nothing else to touch.

To **remove** a project, delete its line from `manifest.js` (you can leave the file
in `/projects/` or delete it too).

## Sub-projects

Add a `subprojects` array to any project file:

```js
subprojects: [
  { title: "Custom PCB mount", desc: "One line.", url: "https://..." } // url is optional
]
```

These show up in that project's own detail view, and are automatically flattened
onto `subprojects.html` too.

## Photo galleries

Add an `images` array to any project file:

```js
images: ["images/my-project-1.jpg", "images/my-project-2.jpg", "images/my-project-3.jpg"]
```

The first image becomes that project's card thumbnail, and a "N PHOTOS" badge
appears on the card when there's more than one. In the detail view, all of them
show in a gallery with prev/next arrows, a thumbnail strip to jump to any photo,
and left/right arrow-key support.

The older singular `image` field still works as a thumbnail-only fallback if you
haven't moved a project over to `images` yet.

## 3D models

Set a project's `model` field to a path or URL for a `.glb` file:

```js
model: "models/my-project.glb"
```

An interactive, orbit-able viewer appears in that project's detail view. If the
`.glb` has animation clips baked in, playback buttons are generated automatically —
nothing else to configure.

**Combining photos and a 3D model on the same project:** if a project has both
`images` and `model`, the detail view shows a small "Photos" / "3D Model" tab
switcher instead of stacking both — a full gallery plus a 3D canvas at once makes
for a very tall modal, so this keeps it to one focused view at a time. With only
one of the two set, that one just shows directly with no tabs.

Most CAD tools export STEP or STL, not glTF. To get a `.glb`: export STL/STEP from
your CAD software, then convert with Blender (free, File → Export → glTF 2.0) or an
online converter. Keep files under ~15MB so they load quickly in a browser.

## Why project files are `.js`, not `.json`

Browsers block `fetch()` of local files when a page is opened directly
(`file://...`) rather than served over `http`. Plain `<script src="...">` tags
don't have that restriction. That means:

- **Previewing locally**: just double-click `index.html`. No local server needed.
- **Hosting**: upload the whole folder as-is to GitHub Pages, Netlify, Vercel, or
  any static host — no build step.

If you'd rather author projects as pure JSON (e.g. to feed some other tool later),
that's a small change to `loader.js` (swap the `<script>` injection for `fetch()`),
but then you'd need to run a local server (`python3 -m http.server`, for instance)
even just to preview the site on your own machine.

## Editing things that live only on the homepage

The hero pitch/headline, about bio, skills, and contact blurb are all driven by
`js/site.js` too (see above) — but the *layout* of the About section (the portrait
placeholder box) and section headings themselves still live directly in
`index.html`, since those aren't per-field data. Every other page reads its
`Home`/`About`/`Contact` nav links back to `index.html`.
