// Project order here determines Work page order.
// published: true shows a project in Work; featured: true also shows it on the homepage.
// Set published: false to hide a project without deleting its entry.
// Edit image paths after uploading images to /images.
const projects = [
  { slug: "decoverai", title: "DecoverAI", category: "motion", image: "images/decoverai-thumbnail.jpg", fallbackImage: "images/p13.svg", featured: true, published: true },
  { slug: "photography", title: "Photography", category: "photo", image: "images/DSC_0332.jpg", fallbackImage: "images/p4.svg", featured: true, published: true },
  { slug: "min-shaw", title: "Min Shaw", category: "design", image: "images/MIN SHAW logo v2.png", fallbackImage: "images/p2.svg", featured: true, published: true },
  { slug: "controls-nyc", title: "Controls NYC", category: "design", image: "images/p5.svg", featured: true, published: true },
  { slug: "sunstainable-surfboards", title: "Sunstainable Surfboards", category: "film", image: "images/sunstainable-surfboards.png", fallbackImage: "images/p11.svg", featured: true, published: true },
  { slug: "recipe-roulette", title: "Recipe Roulette", category: "design", image: "images/recipe roulette mockup.png", fallbackImage: "images/p1.svg", featured: false, published: false },
  { slug: "kiraku", title: "Kiraku", category: "design", image: "images/kiraku mockup.png", fallbackImage: "images/p6.svg", featured: true, published: true },
  { slug: "alligator", title: "Alligator", category: "film", image: "images/p3.svg", featured: false, published: false },
  { slug: "feds", title: "FEDS", category: "design", image: "images/p7.svg", featured: false, published: false },
  { slug: "frontier-bio", title: "Frontier Bio", category: "design", image: "images/p8.svg", featured: false, published: false },
  { slug: "hcg", title: "HCG", category: "design", image: "images/p9.svg", featured: false, published: false },
  { slug: "nova", title: "Nova", category: "design", image: "images/p10.svg", featured: false, published: false },
  { slug: "la-la-lost-you", title: "La La Lost You", category: "film", image: "images/p12.svg", featured: false, published: false },
  { slug: "motion-archive", title: "Motion Archive", category: "motion", image: "images/p13.svg", featured: false, published: false },
  { slug: "graphic-design-archive", title: "Graphic Design Archive", category: "design", image: "images/p14.svg", featured: false, published: false },
  { slug: "photo-archive", title: "Photo Archive", category: "photo", image: "images/p15.svg", featured: false, published: false }
];

// EDIT YOUR ARCHIVES HERE:
// Upload images into /images and replace each example with its actual filename.
// Each section becomes its own photography session on the project page.
const photographySessions = [
  { title: "Performance / RA-ON", images: [] },
  { title: "Portraits", images: [] },
  { title: "Graduation", images: [] },
  { title: "Other sessions", images: [] }
];

// Graphic Design Archive: add image paths here for a collage without descriptions.
const graphicDesignImages = [];
