// =========================
// PROJECT CARD TEMPLATE
// =========================
function card(project) {
  return `
    <a class="card" href="project.html?project=${project.slug}">
      <img src="${project.image}" alt="${project.title}">
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
