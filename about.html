/* ============================================================
   Diamond Tax — shared site interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;
    const openIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    toggle.innerHTML = openIcon;
    toggle.setAttribute("aria-label", "Open menu");
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      toggle.innerHTML = open ? closeIcon : openIcon;
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.innerHTML = openIcon;
      });
    });
  }

  /* ---- Active nav link by pathname ---- */
  function initActive() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href === path) a.classList.add("active");
    });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Footer year ---- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (e) {
      e.textContent = new Date().getFullYear();
    });
  }

  /* ---- Simple accordion (FAQ) ---- */
  function initAccordion() {
    document.querySelectorAll("[data-accordion] .acc-item").forEach(function (item) {
      const btn = item.querySelector(".acc-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav(); initActive(); initReveal(); initYear(); initAccordion();
  });
})();
