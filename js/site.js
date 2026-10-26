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
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} MEGAN ARMBRUST</span><span>MADE WITH CARE IN NYC</span></div>
  </footer>
`);
document.querySelector(".back-top")?.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
