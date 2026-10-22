/* =========================================================================
   Reusable UI components — render markup from window.SITE data
   ========================================================================= */
(function () {
  const S = window.SITE;

  /* ---------- Icon set (stroke icons, 24px grid) ---------- */
  const P = {
    tutor: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5"/><path d="M22 10v6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
    chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14h4"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.3 1 2.2h5.2c0-.9.4-1.7 1-2.2A6 6 0 0 0 12 3Z"/>',
    book: '<path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5Z"/><path d="M12 6v13.5"/>',
    pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    whatsapp: '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z"/><path d="M9 8.5c0 3.5 2.8 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.6 4.6 0 0 1-2.6-2.6l.9-1-1-2.2Z"/>',
    facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="m10 9 5 3-5 3Z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>',
  };
  const icon = (name, cls = "icon") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ""}</svg>`;

  const phoneLinks = (cls = "") =>
    S.contact.phones.map((p) => `<a class="${cls}" href="tel:${p.tel}">${p.display}</a>`).join("");

  /* ---------- Components ---------- */
  const C = {
    icon,

    Nav: () =>
      S.nav.map((n) => `<li><a href="${n.href}" class="nav-link">${n.label}</a></li>`).join(""),

    HeroTrust: () =>
      S.heroTrust.map((t) => `<li>${icon(t.icon)}<span>${t.label}</span></li>`).join(""),

    TrustCard: (t) => `
      <li class="trust-card reveal">
        <span class="trust-icon">${icon(t.icon)}</span>
        <div><h3>${t.title}</h3><p>${t.text}</p></div>
      </li>`,

    ProgramCard: (p) => `
      <article class="program-card${p.featured ? " is-featured" : ""}${p.premium ? " is-premium" : ""} reveal" id="${p.id}">
        <header class="program-head">
          <span class="program-stage">${p.stage}</span>
          ${p.badge ? `<span class="program-badge">${p.featured || p.premium ? icon("star", "icon icon-xs") : ""}${p.badge}</span>` : ""}
        </header>
        <h3 class="program-name">${p.name}</h3>
        <p class="program-desc">${p.description}</p>
        <div class="program-focus">
          <span class="focus-label">Key focus</span>
          <span>${p.focus}</span>
        </div>
        <footer class="program-foot">
          <ul class="board-chips" aria-label="Boards supported">
            ${p.boards.map((b) => `<li>${b === "State" ? "Kerala State" : b}</li>`).join("")}
          </ul>
          <a href="#enquire" class="program-cta" data-class="${p.name}" aria-label="Enquire about ${p.name}${p.premium ? " (Premium Two-Year Program)" : ""}">
            Enquire ${icon("arrow", "icon icon-sm")}
          </a>
        </footer>
      </article>`,

    BoardCard: (b) => `
      <article class="board-card board-${b.id} reveal">
        <div class="board-top">
          <span class="board-mono" aria-hidden="true">${b.id === "state" ? "KS" : "CB"}</span>
          <span class="board-tag">${b.tag}</span>
        </div>
        <h3>${b.name}</h3>
        <p>${b.text}</p>
        <ul class="check-list">
          ${b.points.map((pt) => `<li>${icon("check", "icon icon-sm")}${pt}</li>`).join("")}
        </ul>
        <p class="board-classes">Class 5 – Class 12</p>
      </article>`,

    Step: (s) => `
      <li class="step reveal">
        <div class="step-marker"><span class="step-num">${s.num}</span></div>
        <div class="step-body">
          <span class="step-icon">${icon(s.icon)}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>
      </li>`,

    PersonalItem: (p) => `
      <li class="p-item reveal">
        <span class="p-icon">${icon(p.icon)}</span>
        <div><h3>${p.title}</h3><p>${p.text}</p></div>
      </li>`,

    FeatureCard: (f, i) => `
      <article class="feature-card reveal">
        <div class="feature-top">
          <span class="feature-icon">${icon(f.icon)}</span>
          <span class="feature-index">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </article>`,

    Stat: (s) => `
      <div class="stat reveal">
        <p class="stat-value"><span class="counter" data-target="${s.value}">0</span><span class="stat-suffix">${s.suffix}</span></p>
        <p class="stat-label">${s.label}</p>
      </div>`,

    EnvItem: (e) => `<li>${icon("check", "icon icon-sm")}<span>${e}</span></li>`,

    Options: (arr, placeholder) =>
      `<option value="" disabled selected>${placeholder}</option>` +
      arr.map((o) => `<option value="${o}">${o}</option>`).join(""),

    ContactList: (variant = "") => `
      <ul class="contact-list ${variant}">
        <li>
          <span class="c-icon">${icon("phone")}</span>
          <div><span class="c-label">Phone</span><div class="c-phones">${phoneLinks()}</div></div>
        </li>
        <li>
          <span class="c-icon">${icon("mail")}</span>
          <div><span class="c-label">Email</span><a href="mailto:${S.contact.email}">${S.contact.email}</a></div>
        </li>
        <li>
          <span class="c-icon">${icon("pin")}</span>
          <div><span class="c-label">Location</span><span>${S.contact.location}</span></div>
        </li>
      </ul>`,

    Social: () =>
      S.social
        .map((s) => `<a href="${s.url}" class="social-link" aria-label="${S.brand.name} on ${s.name} (opens in a new tab)" ${s.url === "#" ? 'data-placeholder="true"' : 'target="_blank" rel="noopener noreferrer"'}>${icon(s.icon)}</a>`)
        .join(""),

    FooterLinks: () =>
      S.nav.filter((n) => n.href !== "#top" && n.href !== "#about")
        .map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join(""),

    phoneLinks,
  };

  window.UI = C;

  /* ---------- Mount ---------- */
  const mount = (sel, html) => document.querySelectorAll(sel).forEach((el) => (el.innerHTML = html));

  mount("[data-nav]", C.Nav());
  mount("[data-hero-trust]", C.HeroTrust());
  mount("[data-trust]", S.trust.map(C.TrustCard).join(""));
  mount("[data-steps]", S.steps.map(C.Step).join(""));
  mount("[data-personalised]", S.personalised.map(C.PersonalItem).join(""));
  mount("[data-features]", S.features.map(C.FeatureCard).join(""));
  mount("[data-stats]", S.stats.map(C.Stat).join(""));
  mount("[data-env]", S.environment.map(C.EnvItem).join(""));
  mount("[data-contact-list]", C.ContactList());
  mount("[data-contact-list-dark]", C.ContactList("is-dark"));
  mount("[data-social]", C.Social());
  mount("[data-footer-links]", C.FooterLinks());
  mount("[data-footer-programs]", S.boardOptions.map((b) => `<li><a href="#packages-${b.slug}">${b.name} Packages</a></li>`).join("") + `<li><a href="#programs">Choose Your Board</a></li>`);
  mount("[data-phones]", C.phoneLinks());
  mount("[data-email]", `<a href="mailto:${S.contact.email}">${S.contact.email}</a>`);
  mount("[data-location]", S.contact.location);
  mount("[data-year]", String(new Date().getFullYear()));
  mount("#f-class", C.Options(S.form.classOptions, "Select class"));
  mount("#f-board", C.Options(S.form.boardOptions, "Select board"));
  mount("#f-package", C.Options(S.form.packageOptions, "Select package"));
  mount("[data-consent]", S.form.consent);
  document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon, el.dataset.iconClass || "icon")));
  document.querySelectorAll("[data-tel]").forEach((el) => (el.href = "tel:" + S.contact.phones[+el.dataset.tel || 0].tel));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent("Hello Vidyaraj Academy, I would like to know more about tuition admission.")}`));
  const map = document.querySelector("[data-map]");
  if (map) map.dataset.src = S.contact.mapEmbed;
  document.querySelectorAll("[data-map-link]").forEach((el) => (el.href = S.contact.mapLink));
})();
