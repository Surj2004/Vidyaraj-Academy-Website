/* =========================================================================
   Program journey: Choose Board → Board packages → Enquiry (prefilled)
   All prices come from SITE.pricing (js/content.js)
   ========================================================================= */
(function () {
  const S = window.SITE;
  const icon = window.UI.icon;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const journey = $("[data-journey]");
  if (!journey) return;
  const header = $("[data-header]");

  /* ---------- Helpers ---------- */
  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const boardBy = (k) => S.boardOptions.find((b) => b.key === k || b.slug === k || b.formValue === k);
  const period = (pkg) => (pkg.combo ? "2 years" : "year");
  const priceLabel = (boardKey, pkg) => `${inr(S.pricing[boardKey][pkg.key])} / ${period(pkg)}`;
  const minPrice = (boardKey) => Math.min(...Object.entries(S.pricing[boardKey]).filter(([k]) => k !== "combo").map(([, v]) => v));
  const packageValue = (pkg) => `${pkg.packageLabel || pkg.formClass} Package`;

  // Exposed for the enquiry form / WhatsApp message
  window.getPackagePrice = (boardFormValue, packageFormValue) => {
    const b = boardBy(boardFormValue);
    const p = S.packages.find((x) => packageValue(x) === packageFormValue);
    return b && p ? priceLabel(b.key, p) : "";
  };

  const scrollToEl = (el, offset = 12) => {
    const y = el.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + offset);
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  /* ---------- Stage 1: Board cards ---------- */
  const BoardCard = (b) => `
    <article class="board-option board-option--${b.slug}">
      <div class="bo-top">
        <span class="bo-badge" aria-hidden="true">
          <span class="bo-mono">${b.mono}</span>
          <span class="bo-badge-icon">${icon(b.slug === "state" ? "book" : "bulb")}</span>
        </span>
        <span class="bo-classes">${b.classes}</span>
      </div>
      <p class="bo-subtitle">${b.subtitle}</p>
      <h3 class="bo-name">${b.name}</h3>
      <p class="bo-desc">${b.description}</p>
      <ul class="bo-benefits">
        ${b.benefits.map((x) => `<li>${icon("check", "icon icon-sm")}<span>${x}</span></li>`).join("")}
      </ul>
      <div class="bo-foot">
        <p class="bo-from"><span>Packages from</span><strong>${inr(minPrice(b.key))}</strong><span>/ year</span></p>
        <button type="button" class="btn btn-primary bo-cta" data-choose-board="${b.key}">
          ${b.cta} ${icon("arrow", "icon icon-sm")}
        </button>
      </div>
    </article>`;

  $("[data-board-options]").innerHTML = S.boardOptions.map(BoardCard).join("");
  const inc = $("[data-pkg-includes]");
  if (inc) inc.innerHTML = `<span class="pi-label">Every package includes</span><ul>${S.packageBenefits.map((x) => `<li>${icon("check", "icon icon-xs")}${x}</li>`).join("")}</ul>`;

  /* ---------- Stage 2: Package cards ---------- */
  const PriceCard = (b, p, i) => {
    const price = S.pricing[b.key][p.key];
    const benefits = p.benefits || S.packageBenefits;
    const cls = ["price-card", p.combo ? `is-combo is-combo--${b.slug}` : "", p.highlight ? "is-key-year" : ""].join(" ");
    return `
    <article class="${cls}" style="--i:${i}" aria-label="${p.name} – ${b.name} – ${inr(price)} per ${period(p)}">
      <header class="pc-head">
        <span class="pc-level">${p.level}</span>
        ${p.combo ? `<span class="pc-badge">${icon("star", "icon icon-xs")}${p.badge}</span>` : p.highlight ? `<span class="pc-tag">Board Exam Year</span>` : ""}
      </header>
      <h3 class="pc-name">${p.name}</h3>
      <div class="pc-price">
        <span class="pc-amount">${inr(price)}</span>
        <span class="pc-period">/ ${period(p)}</span>
      </div>
      <p class="pc-board">${icon("layers", "icon icon-xs")}${b.name}</p>
      <p class="pc-desc">${p.description}</p>
      <ul class="pc-benefits">
        ${benefits.map((x) => `<li>${icon("check", "icon icon-sm")}<span>${x}</span></li>`).join("")}
      </ul>
      <button type="button" class="btn pc-cta" data-enquire-package="${p.key}" data-enquire-board="${b.key}">
        Enquire Now ${icon("arrow", "icon icon-sm")}
      </button>
    </article>`;
  };

  /* ---------- Stage control ---------- */
  const panels = { board: $('[data-panel="board"]'), packages: $('[data-panel="packages"]') };
  const setSteps = (n) => {
    $$(".j-step", journey).forEach((s) => {
      const k = +s.dataset.jstep;
      s.classList.toggle("is-active", k === n);
      s.classList.toggle("is-done", k < n);
      if (k === n) s.setAttribute("aria-current", "step"); else s.removeAttribute("aria-current");
    });
    $$(".j-line", journey).forEach((l, i) => l.classList.toggle("is-done", i + 1 < n));
  };

  const show = (name) => {
    Object.entries(panels).forEach(([k, el]) => {
      const on = k === name;
      el.hidden = !on;
      el.classList.remove("is-entering");
      if (on) { void el.offsetWidth; el.classList.add("is-entering"); }
    });
    journey.dataset.stage = name;
  };

  let current = null;

  const openBoard = (key, { scroll = true, focus = true } = {}) => {
    const b = boardBy(key);
    if (!b) return;
    current = b.key;
    $("[data-selected-board]").textContent = b.name;
    const title = $("[data-packages-title]");
    title.textContent = b.packagesTitle;
    journey.dataset.board = b.slug;
    $("[data-package-grid]").innerHTML = S.packages.map((p, i) => PriceCard(b, p, i)).join("");
    show("packages");
    setSteps(2);
    if (history.replaceState) history.replaceState(null, "", `#packages-${b.slug}`);
    if (scroll) scrollToEl(journey);
    if (focus) setTimeout(() => title.focus({ preventScroll: true }), reduce ? 0 : 450);
  };

  const openBoards = ({ scroll = true } = {}) => {
    current = null;
    delete journey.dataset.board;
    show("board");
    setSteps(1);
    if (scroll) scrollToEl(journey);
  };

  /* ---------- Events ---------- */
  journey.addEventListener("click", (e) => {
    const choose = e.target.closest("[data-choose-board]");
    if (choose) { openBoard(choose.dataset.chooseBoard); return; }
    if (e.target.closest("[data-change-board]")) {
      openBoards();
      if (history.replaceState) history.replaceState(null, "", "#programs");
      return;
    }
    const enq = e.target.closest("[data-enquire-package]");
    if (enq) prefillAndGo(enq.dataset.enquireBoard, enq.dataset.enquirePackage);
  });

  // Any link to #programs (hero "Explore Programs", nav, footer) → always start at board selection
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#programs"]');
    if (a) { openBoards({ scroll: false }); return; }
    const deep = e.target.closest('a[href^="#packages-"]');
    if (deep) { e.preventDefault(); openBoard(deep.getAttribute("href").replace("#packages-", "")); }
  }, true);

  /* ---------- Enquiry prefill ---------- */
  const form = $("[data-form]");
  const fBoard = $("#f-board"), fClass = $("#f-class"), fPkg = $("#f-package");
  const summary = $("[data-form-selection]");

  const updateSummary = () => {
    const b = boardBy(fBoard.value);
    const p = S.packages.find((x) => packageValue(x) === fPkg.value);
    if (b && p) {
      $("[data-fs-value]").textContent = `${b.name} · ${p.name}`;
      $("[data-fs-price]").textContent = priceLabel(b.key, p);
      summary.hidden = false;
    } else summary.hidden = true;
  };
  [fBoard, fClass, fPkg].forEach((el) => el.addEventListener("change", updateSummary));
  form.addEventListener("reset", () => setTimeout(updateSummary, 0));

  const clearError = (el) => {
    const f = el.closest(".field");
    f && f.classList.remove("has-error");
    el.setAttribute("aria-invalid", "false");
  };

  function prefillAndGo(boardKey, pkgKey) {
    const b = boardBy(boardKey);
    const p = S.packages.find((x) => x.key === pkgKey);
    if (!b || !p) return;
    // Ensure the form is visible (in case a previous enquiry was submitted)
    const success = $("[data-success]");
    if (success && !success.hidden) { success.hidden = true; form.hidden = false; }
    fBoard.value = b.formValue;
    fClass.value = p.formClass;
    fPkg.value = packageValue(p);
    [fBoard, fClass, fPkg].forEach((el) => { clearError(el); el.classList.add("is-prefilled"); });
    setTimeout(() => [fBoard, fClass, fPkg].forEach((el) => el.classList.remove("is-prefilled")), 2200);
    updateSummary();
    setSteps(3);
    const enquire = $("#enquire");
    scrollToEl($(".form-card", enquire), 20);
    setTimeout(() => $("#f-student").focus({ preventScroll: true }), reduce ? 0 : 750);
  }

  /* ---------- Initial state (supports deep links like #packages-cbse) ---------- */
  const initHash = location.hash.match(/^#packages-(state|cbse)$/);
  if (initHash) openBoard(initHash[1], { scroll: false, focus: false });
  else openBoards({ scroll: false });
  if (initHash) setTimeout(() => scrollToEl(journey), 50);
})();
