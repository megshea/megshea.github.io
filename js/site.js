// Shared footer on every page. Edit this file to update all footers.
document.body.insertAdjacentHTML("beforeend", `
  <footer class="site-footer" id="footer">
    <div class="footer-top">
      <a class="footer-name" href="index.html">MEGAN<br>ARMBRUST<span class="footer-period">.</span></a>
      <div class="footer-links">
        <a href="https://www.linkedin.com/in/meganarmbrust/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
        <a href="mailto:meganarmbrust@gmail.com">EMAIL ↗</a>
        <a href="#top" class="back-top">BACK TO TOP ↑</a>
      </div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} MEGAN ARMBRUST</span><span>DESIGN · MOTION · FILM · PHOTOGRAPHY</span></div>
  </footer>
`);
document.querySelector(".back-top")?.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Reveal below-the-fold content once, without hiding content if JS is unavailable.
window.addEventListener("DOMContentLoaded", () => {
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("reveal-visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
  const seen = new WeakSet();
  const scan = () => {
    document.querySelectorAll(".card, .project-section > h2, .project-section > p, .project-section > div, .project-gallery img, .about-content > div, .site-footer").forEach(el => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.getBoundingClientRect().top < innerHeight - 24) return;
      if (el.parentElement.closest(".reveal-pending")) return;
      el.style.setProperty("--reveal-delay", Math.min(Array.from(el.parentElement.children).indexOf(el) % 3, 2) * 65 + "ms");
      el.classList.add("reveal-pending"); observer.observe(el);
    });
  };
  scan(); new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
});
