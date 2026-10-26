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
// INDIVIDUAL PROJECT PAGES
// =========================
const projectDetail = document.getElementById("project-detail");

if (projectDetail) {
  const slug = new URLSearchParams(window.location.search).get("project");
  const project = projects.find(item => item.slug === slug);

  if (!project) {
    projectDetail.innerHTML = '<h1>PROJECT NOT FOUND</h1><p><a href="work.html">Back to work</a></p>';
  } else if (slug === "decoverai") {
    document.title = "DecoverAI — Megan Armbrust";
    projectDetail.innerHTML = `
      <section class="project-intro">
        <div class="project-kicker">Motion Design / Client Work / 2026</div>
        <h1>DecoverAI<br>Product Animations</h1>
        <p>Two product-focused motion pieces created for DecoverAI, translating complex legal AI workflows into clear, engaging visual stories.</p>
      </section>
      <section class="project-video">
        <h2>01 / Discovery at Scale</h2>
        <p>Visualizing how legal teams can navigate and analyze large volumes of discovery material.</p>
        <video controls playsinline preload="metadata" poster="images/decoverai-thumbnail.jpg">
          <source src="videos/discovery-at-scale.mp4" type="video/mp4">
          Your browser does not support embedded video.
        </video>
      </section>
      <section class="project-video">
        <h2>02 / Word Contract Review</h2>
        <p>Introducing DecoverAI's contract review workflow through product-focused animation.</p>
        <video controls playsinline preload="metadata">
          <source src="videos/word-contract-review.mp4" type="video/mp4">
          Your browser does not support embedded video.
        </video>
      </section>
      <a class="project-back" href="work.html">← BACK TO WORK</a>
    `;
  } else {
    document.title = project.title + " — Megan Armbrust";
    projectDetail.innerHTML = `
      <section class="project-intro">
        <div class="project-kicker">${project.category}</div>
        <h1>${project.title}</h1>
      </section>
      <img class="project-cover" src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='${project.fallbackImage || project.image}'">
      <a class="project-back" href="work.html">← BACK TO WORK</a>
    `;
  }
}
