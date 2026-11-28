// Project cards: consistent 4:3 thumbnail frames, with no title arrows.
function card(project) {
  const fallback = project.fallbackImage || project.image;
  const categories = { "decoverai": "Motion Design", "photography": "Photography Works", "min-shaw": "Graphic Design", "recipe-roulette": "Product Design", "sunstainable-surfboards": "Film", "kiraku": "Web Design" };
  const categoryLabel = categories[project.slug] || project.category;
  const enabled = ["decoverai", "sunstainable-surfboards", "min-shaw", "kiraku"].includes(project.slug);
  const tag = enabled ? "a" : "div";
  return `
    <${tag} class="card" ${enabled ? 'href="project.html?project=' + project.slug + '" style="cursor:pointer"' : 'role="group"'} aria-label="${project.title}">
      <div class="card-media"><img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"><span class="card-category" aria-hidden="true">${categoryLabel}</span></div>
      <h2>${project.title}</h2>
    </${tag}>`;
}

const featuredGrid = document.getElementById("grid");
if (featuredGrid) featuredGrid.innerHTML = projects.filter(p => p.published && p.featured).slice(0,6).map(card).join("");

const allProjects = document.getElementById("all");
if (allProjects) allProjects.innerHTML = projects.filter(p => p.published).map(card).join("");

// Subtle pointer-follow motion for the floating homepage pieces.
const reel = document.getElementById("reel");
if (reel) reel.addEventListener("pointermove", event => {
  const bounds = reel.getBoundingClientRect();
  const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
  const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
  reel.querySelectorAll(".piece").forEach((piece, index) => {
    piece.style.transform = `translate(${x*(12+index*3)}px,${y*(8+index*2)}px) rotate(var(--r))`;
  });
});

// Homepage videos: show the poster if a loop hasn't been uploaded yet.
document.querySelectorAll(".piece video").forEach(video => {
  video.addEventListener("error", () => video.classList.add("video-unavailable"));
  video.querySelector("source")?.addEventListener("error", () => video.classList.add("video-unavailable"));
});

// =========================
// EDITABLE PROJECT PAGE CONTENT
// Change these summaries, and add gallery image paths to projects.js.
// =========================
const projectDetails = {
  "recipe-roulette": { discipline: "Product Design", intro: "An interactive recipe discovery concept.", role: "Design" },
  "controls-nyc": { discipline: "Product Design", intro: "A digital product design project.", role: "Design" },
  "kiraku": { discipline: "UI/UX Design", intro: "An independent website redesign concept for an authentic Japanese izakaya in Berkeley, California.", role: "UI/UX Designer" },
  "min-shaw": { discipline: "Graphic Design / Branding", intro: "Visual identity for a San Francisco house music DJ.", role: "Logo Design" },
  "sunstainable-surfboards": { discipline: "Film", intro: "A short film featuring Ryan Lenney and his approach to sustainable surfboard shaping, exploring how creativity, craftsmanship, and environmental responsibility can give old surfboards a second life.", role: "Filmmaking" },
  "alligator": { discipline: "Film", intro: "A film project.", role: "Filmmaking" },
  "la-la-lost-you": { discipline: "Film", intro: "A film project.", role: "Filmmaking" },
  "decoverai": { discipline: "Motion Design", intro: "Product animations communicating complex legal AI workflows.", role: "Animation / Motion Design" },
  "photography": { discipline: "Photography", intro: "Portraits, performances, and selected photography.", role: "Photography" },
  "photo-archive": { discipline: "Photography", intro: "A collection of photography.", role: "Photography" },
  "motion-archive": { discipline: "Motion Design", intro: "Motion studies, experiments, and visual storytelling.", role: "Motion Design" },
  "graphic-design-archive": { discipline: "Graphic Design", intro: "Posters, graphics, and visual experiments.", role: "Graphic Design" }
};
function block(title, inner) {
  return `<section class="project-section"><h2>${title.replace(/^(\d{2} \/) /, '<span class="case-number">$1</span> ')}</h2>${inner}</section>`;
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
  if (project.slug === "kiraku") return `
    ${block("01 / Project Overview", "<p>An independent website redesign concept for Kiraku, a Japanese izakaya in Berkeley, California. The project explores how intuitive navigation, visual storytelling, and thoughtful interface design can translate the restaurant's authentic dining experience into a digital environment.</p><p style=\"font-size:13px;line-height:1.5;opacity:.75\"><em>This is an independent design exploration and was not commissioned by or affiliated with Kiraku.</em></p>")}
    <section class="project-section" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px;align-items:center"><div style="background:#f0eee9;padding:24px;min-width:0"><h2 style="margin-top:0"><span class="case-number">02 /</span> The Problem</h2><p>While Kiraku offers a rich and authentic dining experience, I identified opportunities to better communicate its food, history, and culture through its existing website. I wanted to explore how a more intuitive digital experience could help customers discover the restaurant, browse its menu, and access reservation information.</p></div><div><img src="images/kiraku-original.png" alt="Original website" style="display:block;width:100%;height:auto" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="project-placeholder" style="display:none;min-height:220px;align-items:center;justify-content:center">Original website — kiraku-original.png</div></div></section>
<section class="project-section" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px;align-items:center"><div style="background:#f0eee9;padding:24px;min-width:0"><h2 style="margin-top:0"><span class="case-number">03 /</span> The Solution</h2><p>I developed a website redesign concept that prioritizes intuitive navigation, cultural storytelling, and visual consistency. The proposed design creates clearer pathways to the menu and reservations while incorporating imagery and design elements that reflect Kiraku's atmosphere and Japanese culinary heritage.</p></div><div><img src="images/kiraku-redesign-preview.png" alt="Redesigned website" style="display:block;width:100%;height:auto" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="project-placeholder" style="display:none;min-height:220px;align-items:center;justify-content:center">Redesigned website — kiraku-redesign-preview.png</div></div></section>
    ${block("04 / Target Audience", "<div class=\"case-grid\"><div class=\"case-card\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3v7a3 3 0 0 0 6 0V3M7 3v18M18 3c-3 3-4 6-4 10h4m0-10v18\"/></svg><strong>Food enthusiasts</strong><p>Diners seeking authentic Japanese cuisine and cultural experiences.</p></div><div class=\"case-card\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 3h10l1 6a6 6 0 0 1-12 0zM12 15v6m-4 0h8\"/></svg><strong>Upscale dining enthusiasts</strong><p>Diners who appreciate high-quality cuisine, thoughtfully curated menus, and an authentic dining atmosphere.</p></div><div class=\"case-card\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg><strong>Local dining explorers</strong><p>People interested in discovering quality local restaurants and their stories.</p></div></div>")}
    ${block("05 / Project Goals", "<div class=\"case-grid\"><div class=\"case-card\"><strong class=\"goal-number\">01</strong><strong>Simplify navigation</strong><p>Make key information easy to find.</p></div><div class=\"case-card\"><strong class=\"goal-number\">02</strong><strong>Celebrate cultural heritage</strong><p>Reflect Kiraku’s authentic dining experience.</p></div><div class=\"case-card\"><strong class=\"goal-number\">03</strong><strong>Reduce friction</strong><p>Make exploring menus and reservations intuitive.</p></div></div>")}
    ${block("06 / Wireframes & Exploration", "<p>I began by creating lo-fi designs of each page, blocking out spacing and layout in grayscale.</p><div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:32px\"><div><img src=\"images/kiraku-lofi-01.png\" alt=\"Wireframe 1\" loading=\"lazy\" style=\"display:block;width:100%;height:auto\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Wireframe 1 — kiraku-lofi-01.png</div></div><div><img src=\"images/kiraku-lofi-02.png\" alt=\"Wireframe 2\" loading=\"lazy\" style=\"display:block;width:100%;height:auto\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Wireframe 2 — kiraku-lofi-02.png</div></div><div><img src=\"images/kiraku-lofi-03.png\" alt=\"Wireframe 3\" loading=\"lazy\" style=\"display:block;width:100%;height:auto\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Wireframe 3 — kiraku-lofi-03.png</div></div></div>")}
    ${block("07 / High-Fidelity Designs", "<p>Scroll within each preview to explore the full page design.</p><div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:24px;margin-top:24px\"><div><div style=\"border:1px solid #aaa\"><div style=\"padding:10px;border-bottom:1px solid #aaa;font-size:14px\">● ● ● &nbsp; Design 1</div><div tabindex=\"0\" aria-label=\"Scrollable design 1\" style=\"height:520px;overflow:auto\"><div><img src=\"images/kiraku-final-01.png\" alt=\"Final website design 1\" style=\"display:block;width:100%;height:auto\" loading=\"lazy\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Final website design 1 — kiraku-final-01.png</div></div></div></div><p><a href=\"images/kiraku-final-01.png\" target=\"_blank\" rel=\"noopener\">View full design ↗</a></p></div><div><div style=\"border:1px solid #aaa\"><div style=\"padding:10px;border-bottom:1px solid #aaa;font-size:14px\">● ● ● &nbsp; Design 2</div><div tabindex=\"0\" aria-label=\"Scrollable design 2\" style=\"height:520px;overflow:auto\"><div><img src=\"images/kiraku-final-02.png\" alt=\"Final website design 2\" style=\"display:block;width:100%;height:auto\" loading=\"lazy\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Final website design 2 — kiraku-final-02.png</div></div></div></div><p><a href=\"images/kiraku-final-02.png\" target=\"_blank\" rel=\"noopener\">View full design ↗</a></p></div><div><div style=\"border:1px solid #aaa\"><div style=\"padding:10px;border-bottom:1px solid #aaa;font-size:14px\">● ● ● &nbsp; Design 3</div><div tabindex=\"0\" aria-label=\"Scrollable design 3\" style=\"height:520px;overflow:auto\"><div><img src=\"images/kiraku-final-03.png\" alt=\"Final website design 3\" style=\"display:block;width:100%;height:auto\" loading=\"lazy\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:220px;align-items:center;justify-content:center\">Final website design 3 — kiraku-final-03.png</div></div></div></div><p><a href=\"images/kiraku-final-03.png\" target=\"_blank\" rel=\"noopener\">View full design ↗</a></p></div></div>")}
    ${block("08 / Explore the Prototype", "<div style=\"max-width:1440px;margin:0 auto\"><iframe title=\"Interactive Kiraku Figma prototype\" style=\"border:1px solid rgba(0,0,0,.1);width:100%;aspect-ratio:16/9;height:auto;min-height:320px\" src=\"https://embed.figma.com/proto/1pkHK78n8JwGqWwrSA7Gnu/KIRAKU?page-id=0%3A1&node-id=3-386&scaling=contain&content-scaling=fixed&starting-point-node-id=3%3A386&embed-host=share\" loading=\"lazy\" allowfullscreen></iframe><p><a href=\"https://www.figma.com/proto/1pkHK78n8JwGqWwrSA7Gnu/KIRAKU?page-id=0%3A1&node-id=3-386&scaling=contain\" target=\"_blank\" rel=\"noopener noreferrer\">Open prototype in Figma ↗</a></p></div>")}`;
  if (project.slug === "min-shaw") return `
    ${block("Final Logo", "<div style=\"max-width:900px;margin:0 auto\"><img src=\"images/min-shaw-final-logo.png\" alt=\"Final logo design\" style=\"display:block;width:100%;height:auto\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:300px;align-items:center;justify-content:center\">Final logo design — images/min-shaw-final-logo.png</div></div>")}
    ${block("Project Background", "<p>My friend Amin, a house music DJ based in San Francisco, approached me to create a logo that captured the energy of his music and reflected his personal style. The goal was to develop a distinctive design that could translate seamlessly across event promotions, social media, and merch.</p><p>Drawing inspiration from futuristic typography and electronic music culture, I designed a bold, sci-fi-inspired logo enclosed within a sleek oval. The monochromatic palette creates a strong visual presence while maintaining simplicity and versatility.</p><p>The resulting logo balances minimalism with the energy of house music, giving Amin a recognizable visual foundation as he grows his presence in the San Francisco music scene.</p>")}
    ${block("Initial Sketches", "<p>I began the design process by exploring different typography, shapes, and compositions in Procreate. These initial sketches helped me experiment with the visual direction and refine my ideas before developing the final logo.</p><div style=\"max-width:900px;margin:0 auto\"><img src=\"images/min-shaw-initial-sketches.png\" alt=\"Nine initial sketches\" style=\"display:block;width:100%;height:auto\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\"><div class=\"project-placeholder\" style=\"display:none;min-height:300px;align-items:center;justify-content:center\">Nine initial sketches — images/min-shaw-initial-sketches.png</div></div>")}`;
  if (project.slug === "decoverai") return `
    ${block("01 / Discovery at Scale", `<p>Animating the ingestion and analysis of large volumes of discovery documents.</p><div class="project-video"><iframe title="Discovery at Scale — DecoverAI" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7521460660598194177?compact=1" loading="lazy" width="504" height="399" style="display:block;width:100%;max-width:640px;height:auto;aspect-ratio:504/399;border:0" allowfullscreen></iframe><p><a href="https://www.linkedin.com/posts/decoverai_1m-files-were-reviewed-in-a-single-35m-activity-7521556809602646016-AWws" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">View original LinkedIn post ↗</a></p></div>`)}
    ${block("02 / Word Contract Review", `<p>A product animation showcasing contract review workflows.</p><div class="project-video"><iframe title="Word Contract Review — DecoverAI" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7523671105140756481?compact=1" loading="lazy" width="504" height="399" style="display:block;width:100%;max-width:640px;height:auto;aspect-ratio:504/399;border:0" allowfullscreen></iframe><p><a href="https://www.linkedin.com/posts/decoverai_friday-4pm-your-client-wants-comments-on-activity-7523746125229506560-YlUa" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">View original LinkedIn post ↗</a></p></div>`)}
    ${block("03 / Tabular Review", `<p>A product animation introducing Tabular Review.</p><div class="project-video"><iframe title="Tabular Review — DecoverAI" src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7528718258762371073?compact=1" loading="lazy" width="504" height="399" style="display:block;width:100%;max-width:640px;height:auto;aspect-ratio:504/399;border:0" allowfullscreen></iframe><p><a href="https://www.linkedin.com/posts/decoverai_tabular-review-is-now-live-on-decoverai-activity-7528850722877034496-Fp3J" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">View original LinkedIn post ↗</a></p></div>`)}`;
  if (project.slug === "sunstainable-surfboards") return `
    ${`<section class="project-section"><div class="project-video" style="max-width:900px"><iframe class="project-youtube" src="https://www.youtube.com/embed/PswHhMVzDE4?si=BK2Ezhtm0atBSdKy" title="Sunstainable Surfboards film" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p><a href="https://www.youtube.com/watch?v=PswHhMVzDE4" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">Watch on YouTube ↗</a></p></div></section>`} `;
  if (type.includes("film")) return `
    ${block("The film", `<p>Add a synopsis, credits, and your role.</p>${placeholder("Film or trailer", "Embed a video player or hosted film here.")}`)}
    ${block("Selected frames", gallery(project))}
    ${block("Behind the scenes", "<p>Add production stills and notes about your creative process.</p>")}`;
  // Collage-only archive: no explanations.
  if (project.slug === "graphic-design-archive") {
    const items = graphicDesignImages.length ? graphicDesignImages.map((src, i) =>
      `<img loading="lazy" class="collage-item" src="${src}" alt="Graphic design work ${i+1}">`
    ).join("") : Array.from({length: 8}, (_,i) =>
      `<div class="collage-empty">GRAPHIC DESIGN IMAGE ${i+1}<small>add path in js/projects.js</small></div>`
    ).join("");
    return `<div class="editorial-collage">${items}</div>`;
  }
  // Photography sessions: replace each session's images in js/projects.js.
  if (["photography","photo-archive"].includes(project.slug)) {
    return photographySessions.map(session => {
      const items = Array.from({ length: session.count }, (_, i) => {
        const number = String(i + 1).padStart(2, "0");
        const filename = `${session.prefix}-${number}.jpg`;
        return `<div class="photo-slot">
          <img loading="lazy" src="images/${filename}" alt="${session.title} photo ${i + 1}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="photo-empty" style="display:none">PHOTO ${i + 1}<small>images/${filename}</small></div>
        </div>`;
      }).join("");
      return `<section class="photo-session"><h2>${session.title}</h2><div class="photo-collage">${items}</div></section>`;
    }).join("");
  }
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
  const project = projects.find(item => item.slug === slug && item.published);
  if (!project) {
    projectDetail.innerHTML = '<h1>PROJECT NOT FOUND</h1><p><a href="work.html">Back to work</a></p>';
  } else {
    const details = projectDetails[slug] || { discipline: project.category === "design" ? "Graphic Design" : project.category, intro: "A selected creative project.", role: "Design" };
    document.title = project.title + " — Megan Armbrust";
    const publishedProjects = projects.filter(item => item.published);
    const next = publishedProjects[(publishedProjects.indexOf(project) + 1 + publishedProjects.length) % publishedProjects.length] || publishedProjects[0];
    const hero = ["decoverai", "sunstainable-surfboards", "min-shaw", "photography", "photo-archive", "graphic-design-archive"].includes(slug) ? "" : `<div class="project-hero-frame"><img class="project-hero" src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='${project.fallbackImage || project.image}'"></div>`;
    projectDetail.innerHTML = `
      <section class="project-intro">
        <div class="project-kicker">${details.discipline} / Selected Work</div>
        <h1>${project.title}</h1>
        ${["graphic-design-archive","photography","photo-archive"].includes(slug) ? "" : `<p class="project-lede">${details.intro}</p>`}
        ${["graphic-design-archive","photography","photo-archive"].includes(slug) ? "" : `<div class="project-meta"><span><strong style="font-weight:700">Discipline:</strong> ${details.discipline}</span><span><strong style="font-weight:700">Role:</strong> ${details.role}</span>${slug === "kiraku" ? '<span><strong style="font-weight:700">Project Type:</strong> Independent Concept</span>' : ""}</div>`}
      </section>
      ${hero}
      ${sectionsFor(project)}
      ${["decoverai", "sunstainable-surfboards", "min-shaw", "kiraku"].includes(slug) ? '<a class="project-back" href="index.html#selected">← BACK TO SELECTED WORK</a>' : `<div class="project-next"><div class="project-kicker">Next project</div><p><a href="project.html?project=${next.slug}">${next.title} ↗</a></p></div><a class="project-back" href="work.html">← BACK TO WORK</a>`}
    `;
  }
}
