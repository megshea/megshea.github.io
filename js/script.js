// =========================
// PROJECT CARD TEMPLATE
// =========================
function card(project) {
  return `
    <a class="card" href="project.html?project=${project.slug}">
      <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src=\'${project.fallbackImage || project.image}\'">
      <h2>${project.title} ↗</h2>
    </a>
  `;
}


// =========================
// HOMEPAGE FEATURED PROJECTS
// =========================
const featuredGrid = document.getElementById("grid");

if (featuredGrid) {
  featuredGrid.innerHTML = projects
    .filter(project => project.featured)
    .map(card)
    .join("");
}


// =========================
// WORK PAGE — ALL PROJECTS
// =========================
const allProjects = document.getElementById("all");

if (allProjects) {
  allProjects.innerHTML = projects
    .map(card)
    .join("");
}


// =========================
// HOMEPAGE CURSOR MOVEMENT
// =========================
const reel = document.getElementById("reel");

if (reel) {
  reel.addEventListener("pointermove", event => {
    const bounds = reel.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left - bounds.width / 2) /
      bounds.width;

    const y =
      (event.clientY - bounds.top - bounds.height / 2) /
      bounds.height;

    document.querySelectorAll(".piece").forEach((piece, index) => {
      const moveX = x * (12 + index * 3);
      const moveY = y * (8 + index * 2);

      piece.style.transform = `
        translate(${moveX}px, ${moveY}px)
        rotate(var(--r))
      `;
    });
  });
}


// =========================
// EDITABLE PROJECT PAGE CONTENT
// Change these summaries, and add gallery image paths to projects.js.
// =========================
const projectDetails = {
  "recipe-roulette": { discipline: "Product Design", intro: "An interactive recipe discovery concept.", role: "Design" },
  "controls-nyc": { discipline: "Product Design", intro: "A digital product design project.", role: "Design" },
  "kiraku": { discipline: "Brand Design", intro: "Brand identity and digital design.", role: "Design" },
  "min-shaw": { discipline: "Graphic Design", intro: "An identity and visual design project.", role: "Design" },
  "sunstainable-surfboards": { discipline: "Film", intro: "A film exploring surfing and the coast.", role: "Filmmaking" },
  "alligator": { discipline: "Film", intro: "A film project.", role: "Filmmaking" },
  "la-la-lost-you": { discipline: "Film", intro: "A film project.", role: "Filmmaking" },
  "decoverai": { discipline: "Motion Design", intro: "Product animations communicating complex legal AI workflows.", role: "Animation / Motion Design" },
  "photography": { discipline: "Photography", intro: "Portraits, performances, and selected photography.", role: "Photography" },
  "photo-archive": { discipline: "Photography", intro: "A collection of photography.", role: "Photography" },
  "motion-archive": { discipline: "Motion Design", intro: "Motion studies, experiments, and visual storytelling.", role: "Motion Design" },
  "graphic-design-archive": { discipline: "Graphic Design", intro: "Posters, graphics, and visual experiments.", role: "Graphic Design" }
};
function block(title, inner) {
  return `<section class="project-section"><h2>${title}</h2>${inner}</section>`;
}
function placeholder(title, help) {
  return `<div class="project-placeholder"><strong>${title}</strong>${help}</div>`;
}
function gallery(project) {
  if (!project.gallery?.length) return placeholder("Add project images", 'In js/projects.js, add gallery: ["images/example1.jpg", "images/example2.jpg"] to this project.');
  return `<div class="project-gallery">${project.gallery.map(src => `<img src="${encodeURI(src)}" loading="lazy" alt="Project gallery image">`).join("")}</div>`;
}
function sectionsFor(project) {
  const type = (projectDetails[project.slug]?.discipline || project.category).toLowerCase();
  if (project.slug === "decoverai") return `
    ${block("01 / Discovery at Scale", `<p>Animating the ingestion and analysis of large volumes of discovery documents.</p><div class="project-video"><video controls playsinline preload="metadata" poster="images/decoverai-thumbnail.jpg"><source src="videos/discovery-at-scale.mp4" type="video/mp4"></video></div>`)}
    ${block("02 / Word Contract Review", `<p>A product animation showcasing contract review workflows.</p><div class="project-video"><video controls playsinline preload="metadata"><source src="videos/word-contract-review.mp4" type="video/mp4"></video></div>`)}
    ${block("Creative process", `<p>Add storyboards, Figma frames, and After Effects process images.</p>${gallery(project)}`)}`;
  if (type.includes("film")) return `
    ${block("The film", `<p>Add a synopsis, credits, and your role.</p>${placeholder("Film or trailer", "Embed a video player or hosted film here.")}`)}
    ${block("Selected frames", gallery(project))}
    ${block("Behind the scenes", "<p>Add production stills and notes about your creative process.</p>")}`;
  if (type.includes("photo")) return `
    ${block("Selected photographs", gallery(project))}
    ${block("About the series", "<p>Add locations, subjects, and context for this collection.</p>")}`;
  if (type.includes("motion")) return `
    ${block("Motion work", placeholder("Add your videos", "Embed short MP4s or hosted reels here."))}
    ${block("Frames and process", gallery(project))}`;
  if (type.includes("brand") || type.includes("graphic")) return `
    ${block("Concept & direction", "<p>Describe the brief, inspiration, and visual approach.</p>")}
    ${block("Identity & applications", gallery(project))}
    ${block("Design details", placeholder("Add supporting work", "Add typography, logo variations, and mockups."))}`;
  return `
    ${block("The challenge", "<p>Describe the problem, audience, and goals.</p>")}
    ${block("Process & exploration", placeholder("Research and sketches", "Add wireframes, research, and iterations."))}
    ${block("Final design", gallery(project))}
    ${block("Outcome", "<p>Share the final result, impact, and what you learned.</p>")}`;
}
const projectDetail = document.getElementById("project-detail");
if (projectDetail) {
  const slug = new URLSearchParams(location.search).get("project");
  const project = projects.find(item => item.slug === slug);
  if (!project) {
    projectDetail.innerHTML = '<h1>PROJECT NOT FOUND</h1><p><a href="work.html">Back to work</a></p>';
  } else {
    const details = projectDetails[slug] || { discipline: project.category === "design" ? "Graphic Design" : project.category, intro: "A selected creative project.", role: "Design" };
    document.title = project.title + " — Megan Armbrust";
    const next = projects[(projects.indexOf(project) + 1) % projects.length];
    const hero = slug === "decoverai" ? "" : `<img class="project-hero" src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='${project.fallbackImage || project.image}'">`;
    projectDetail.innerHTML = `
      <section class="project-intro">
        <div class="project-kicker">${details.discipline} / Selected Work</div>
        <h1>${project.title}</h1>
        <p class="project-lede">${details.intro}</p>
        <div class="project-meta"><span>Discipline: ${details.discipline}</span><span>Role: ${details.role}</span></div>
      </section>
      ${hero}
      ${sectionsFor(project)}
      <div class="project-next"><div class="project-kicker">Next project</div><p><a href="project.html?project=${next.slug}">${next.title} ↗</a></p></div>
      <a class="project-back" href="work.html">← BACK TO WORK</a>
    `;
  }
}
