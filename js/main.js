/* =========================================================================
   Interactions: header, mobile nav, reveal, counters, parallax, form, map
   ========================================================================= */
(function () {
  const S = window.SITE;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Hero background video ---------- */
  const heroVideo = $("[data-hero-video]");
  if (heroVideo) {
    const saveData = navigator.connection && navigator.connection.saveData;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    if (reduce || saveData || isMobile) { heroVideo.removeAttribute("autoplay"); heroVideo.pause(); }
    else {
      heroVideo.play().catch(() => {});
      // pause when hero is off-screen to save battery/CPU
      new IntersectionObserver((en) => { en[0].isIntersecting ? heroVideo.play().catch(() => {}) : heroVideo.pause(); }).observe(heroVideo);
    }
  }

  /* ---------- Sticky header compact state ---------- */
  const header = $("[data-header]");
  const onScroll = () => {
    header.classList.toggle("is-compact", window.scrollY > 24);
    if (window.scrollY < 300) document.querySelectorAll(".nav-link.is-active").forEach((l) => l.classList.remove("is-active"));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);
    document.documentElement.style.setProperty("--menu-top", header.getBoundingClientRect().bottom + "px");
    if (open) {
      menu.hidden = false; backdrop.hidden = false;
      requestAnimationFrame(() => { menu.classList.add("is-open"); backdrop.classList.add("is-open"); });
    } else {
      menu.classList.remove("is-open"); backdrop.classList.remove("is-open");
      setTimeout(() => { if (!menu.classList.contains("is-open")) { menu.hidden = true; backdrop.hidden = true; } }, 300);
    }
  };
  const backdrop = $("[data-menu-backdrop]");
  backdrop.addEventListener("click", () => setMenu(false));
  // keep the page behind from scrolling on touch devices
  backdrop.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); } });
  window.addEventListener("resize", () => { if (window.innerWidth > 1024 && toggle.getAttribute("aria-expanded") === "true") setMenu(false); });

  /* ---------- Smooth anchor scroll with header offset ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id === "#") return;
    let target = id === "#top" ? document.body : $(id);
    // Sections hidden on mobile → fall back to their compact equivalent
    const fallbacks = { "#contact": "#site-footer" };
    if (target && target !== document.body && !target.offsetParent && fallbacks[id]) target = $(fallbacks[id]);
    if (!target) return;
    e.preventDefault();
    const y = id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight - 4);
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", id);
  });

  /* ---------- Active nav link ---------- */
  const sections = S.nav.map((n) => (n.href === "#top" ? null : $(n.href))).filter(Boolean);
  const links = $$(".primary-nav .nav-link");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll (staggered per parent) ---------- */
  const revealEls = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) revealEls.forEach((el) => el.classList.add("is-visible"));
  else {
    revealEls.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 8) * 70 + "ms");
    });
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); ro.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => ro.observe(el));
  }

  /* ---------- Animated counters (run once) ---------- */
  const fmt = (n) => n.toLocaleString("en-IN");
  const counters = $$(".counter");
  const runCounter = (el) => {
    const target = +el.dataset.target;
    if (reduce) { el.textContent = fmt(target); return; }
    const dur = 1800, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const co = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
  }, { threshold: 0.6 });
  counters.forEach((c) => co.observe(c));

  /* ---------- Subtle parallax on images (desktop only) ---------- */
  const parallax = $$("[data-parallax] img");
  if (!reduce && window.matchMedia("(min-width: 900px)").matches && parallax.length) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallax.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        img.style.transform = `translate3d(0, ${(p * -24).toFixed(1)}px, 0) scale(1.08)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---------- Enquiry form ---------- */
  const form = $("[data-form]");
  const success = $("[data-success]");
  const phoneEl = $("#f-phone");

  phoneEl.addEventListener("input", () => { phoneEl.value = phoneEl.value.replace(/[^\d\s]/g, ""); });

  const rules = {
    student: (v) => (v.trim().length >= 2 ? "" : "Please enter the student's name."),
    parent: (v) => (v.trim().length >= 2 ? "" : "Please enter the parent's name."),
    class: (v) => (v ? "" : "Please select the student's class."),
    board: (v) => (v ? "" : "Please select the curriculum board."),
    phone: (v) => (/^[6-9]\d{9}$/.test(v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "")) ? "" : "Please enter a valid 10-digit mobile number."),
    consent: (_, el) => (el.checked ? "" : "Please tick the box so we can contact you."),
  };
  const validateField = (el) => {
    const rule = rules[el.name];
    if (!rule) return true;
    const msg = rule(el.value, el);
    const field = el.closest(".field");
    field.classList.toggle("has-error", !!msg);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    const err = field.querySelector(".field-error");
    if (err) err.textContent = msg;
    return !msg;
  };
  $$("input, select", form).forEach((el) => {
    el.addEventListener("blur", () => { if (el.value || el.type === "checkbox") validateField(el); });
    el.addEventListener("change", () => { if (el.closest(".field").classList.contains("has-error")) validateField(el); });
    el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) validateField(el); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const els = $$("input[name], select[name]", form);
    const results = els.map(validateField);
    if (results.includes(false)) {
      const first = $(".has-error input, .has-error select", form);
      first && first.focus();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const phone = d.phone.replace(/\D/g, "").slice(-10);
    const msg = [
      "*New Admission Enquiry – Vidyaraj Academy (IN-TUiTiON-S)*",
      `Student: ${d.student}`,
      `Parent: ${d.parent}`,
      `Class: ${d.class}`,
      `Board: ${d.board}`,
      d.school ? `School: ${d.school}` : "",
      d.package ? `Package: ${d.package}` : "",
      window.getPackagePrice && window.getPackagePrice(d.board, d.package) ? `Fee: ${window.getPackagePrice(d.board, d.package)}` : "",
      `Contact (WhatsApp): +91 ${phone}`,
    ].filter(Boolean).join("\n");
    const waUrl = `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

    if (S.form.endpoint) {
      try {
        await fetch(S.form.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...d, phone: "+91" + phone }) });
      } catch (_) { /* fall through to WhatsApp */ }
    }
    $("[data-success-wa]").href = waUrl;
    window.open(waUrl, "_blank", "noopener");
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  $("[data-reset]").addEventListener("click", () => {
    form.reset();
    $$(".has-error", form).forEach((f) => f.classList.remove("has-error"));
    success.hidden = true;
    form.hidden = false;
    $("#f-student").focus();
  });

  /* ---------- Map: load when near viewport ---------- */
  const mapBox = $("[data-map]");
  const loadMap = () => {
    if (!mapBox || mapBox.dataset.loaded) return;
    mapBox.dataset.loaded = "1";
    const f = document.createElement("iframe");
    f.src = mapBox.dataset.src;
    f.title = "Map of Melangot, Kanhangad, Kerala";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    f.setAttribute("allowfullscreen", "");
    mapBox.appendChild(f);
    f.addEventListener("load", () => mapBox.classList.add("is-loaded"));
  };
  $("[data-map-load]")?.addEventListener("click", loadMap);
  if (mapBox) {
    const mo = new IntersectionObserver((en) => { if (en[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: "300px" });
    mo.observe(mapBox);
  }

  /* ---------- Mobile bar: hide when enquiry form is visible ---------- */
  const bar = $("[data-mobile-bar]");
  const enq = $("#enquire");
  new IntersectionObserver((en) => bar.classList.toggle("is-hidden", en[0].isIntersecting), { threshold: 0.15 }).observe(enq);

  /* Social placeholders: don't jump to top */
  $$('[data-placeholder="true"]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
})();
