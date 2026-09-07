/*
 * ClearWave Water Solutions — Online Estimator Widget
 * ---------------------------------------------------
 * Drop-in, no dependencies. Embed with:
 *
 *   <div id="clearwave-estimator"></div>
 *   <script src="https://YOUR-HOST/estimator/estimator.js"><\/script>
 *
 * Optional data-attributes on the script tag:
 *   data-target="#some-element"   where to render (default #clearwave-estimator)
 *   data-endpoint="https://..."   lead webhook (overrides catalog.leadEndpoint)
 *   data-booking="https://..."    booking link (overrides catalog.bookingUrl)
 *   data-source="city|well"       skip the water-source question
 *   data-campaign="fb-well-va"    tag every lead from this page
 *   data-catalog="https://..."    load a different catalog.js
 *
 * All products, prices, and words live in catalog.js.
 */
(function () {
  "use strict";

  var SCRIPT = document.currentScript;
  var ATTR = function (k, d) { return (SCRIPT && SCRIPT.getAttribute("data-" + k)) || d; };

  // ------------------------------------------------------------------
  // Boot: make sure the catalog is loaded, then start.
  // ------------------------------------------------------------------
  function boot() {
    if (window.CLEARWAVE_CATALOG) { return start(window.CLEARWAVE_CATALOG); }
    var src = ATTR("catalog", null);
    if (!src && SCRIPT && SCRIPT.src) { src = SCRIPT.src.replace(/[^\/]*$/, "catalog.js"); }
    if (!src) { src = "catalog.js"; }
    var s = document.createElement("script");
    s.src = src;
    s.onload = function () { start(window.CLEARWAVE_CATALOG); };
    s.onerror = function () { fail("The estimator catalog could not be loaded."); };
    document.head.appendChild(s);
  }

  function fail(msg) {
    var el = target();
    if (el) { el.innerHTML = '<p style="font-family:Georgia,serif;color:#B03A2E">' + msg + "</p>"; }
  }

  function target() {
    var sel = ATTR("target", "#clearwave-estimator");
    return document.querySelector(sel);
  }

  // ------------------------------------------------------------------
  // Styles (scoped under .cwe). Brand kit: navy text, brand blue, brand
  // green, square corners, Helvetica headings, Georgia body.
  // ------------------------------------------------------------------
  var CSS = "\
.cwe{--navy:#0B2A44;--blue-deep:#0B73BA;--blue:#1980C1;--bright:#1087B7;--green:#25E2A9;--green-lt:#65DFDA;--amber:#C8871B;--red:#B03A2E;--paper:#fff;--tint:#F1F7FB;--rule:#D2DCE4;--muted:#5A6B78;\
 font-family:Georgia,'Iowan Old Style','Times New Roman',serif;color:var(--navy);background:var(--paper);line-height:1.5;font-size:16px;max-width:760px;margin:0 auto;border:1px solid var(--rule);box-sizing:border-box}\
.cwe *{box-sizing:border-box}\
.cwe h1,.cwe h2,.cwe h3,.cwe h4,.cwe .cwe-sans,.cwe button,.cwe input,.cwe select,.cwe textarea,.cwe table{font-family:'Helvetica Neue','Arial Narrow',Arial,sans-serif}\
.cwe-head{display:flex;align-items:center;gap:14px;padding:16px 22px;border-top:4px solid var(--blue-deep);border-bottom:1px solid var(--rule)}\
.cwe-head svg{width:44px;height:44px;flex:none}\
.cwe-wm{line-height:1.05;color:var(--navy);text-transform:uppercase}\
.cwe-wm .l1{font-weight:500;letter-spacing:.14em;font-size:9px}\
.cwe-wm .l2{font-weight:800;letter-spacing:.02em;font-size:19px}\
.cwe-wm .l3{font-weight:700;letter-spacing:.16em;font-size:8px;color:var(--blue)}\
.cwe-head .cwe-phone{margin-left:auto;text-align:right;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:var(--muted)}\
.cwe-head .cwe-phone a{color:var(--blue-deep);text-decoration:none;font-weight:700;font-size:15px;display:block}\
.cwe-prog{height:4px;background:var(--tint)}\
.cwe-prog>span{display:block;height:100%;background:var(--green);transition:width .3s}\
.cwe-body{padding:22px}\
.cwe-eyebrow{font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:0 0 6px}\
.cwe h2{font-size:24px;line-height:1.15;margin:0 0 6px;font-weight:800;letter-spacing:-.01em}\
.cwe h3{font-size:15px;text-transform:uppercase;letter-spacing:.08em;margin:24px 0 8px;padding-left:10px;border-left:4px solid var(--blue-deep)}\
.cwe p{margin:0 0 12px}\
.cwe .cwe-lead{color:var(--muted);margin-bottom:18px}\
.cwe-opts{display:grid;gap:8px;margin:0 0 8px}\
.cwe-opt{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border:1px solid var(--rule);border-left:4px solid var(--rule);background:#fff;cursor:pointer;font-family:'Helvetica Neue',Arial,sans-serif}\
.cwe-opt:hover{background:var(--tint)}\
.cwe-opt.on{border-left-color:var(--green);background:var(--tint)}\
.cwe-opt input{margin-top:4px;flex:none;accent-color:var(--blue-deep)}\
.cwe-opt b{display:block;font-size:15px;font-weight:700}\
.cwe-opt small{display:block;color:var(--muted);font-size:13px;font-family:Georgia,serif}\
.cwe-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}\
@media(max-width:520px){.cwe-row{grid-template-columns:1fr}.cwe-body{padding:16px}.cwe-head{padding:12px 16px}.cwe-head .cwe-phone{display:none}}\
.cwe label.cwe-f{display:block;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:10px 0 4px}\
.cwe input[type=text],.cwe input[type=email],.cwe input[type=tel],.cwe input[type=number],.cwe select,.cwe textarea{width:100%;padding:10px 12px;border:1px solid var(--rule);border-radius:2px;font-size:16px;color:var(--navy);background:#fff}\
.cwe input:focus,.cwe select:focus,.cwe textarea:focus{outline:2px solid var(--bright);outline-offset:0}\
.cwe-note{background:var(--tint);border-left:4px solid var(--blue-deep);padding:10px 14px;margin:14px 0;font-size:14px}\
.cwe-note.warn{border-left-color:var(--amber)}\
.cwe-note.good{border-left-color:var(--green);background:#E3FBF3}\
.cwe-err{color:var(--red);font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;margin:8px 0 0;min-height:1em}\
.cwe-nav{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:22px;padding-top:16px;border-top:1px solid var(--rule)}\
.cwe-btn{appearance:none;border:1px solid var(--blue-deep);background:var(--blue-deep);color:#fff;padding:12px 22px;font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;border-radius:2px;text-decoration:none;display:inline-block;text-align:center}\
.cwe-btn:hover{background:var(--blue)}\
.cwe-btn.ghost{background:#fff;color:var(--blue-deep)}\
.cwe-btn.green{background:var(--green);border-color:var(--green);color:#0B2A44}\
.cwe-btn.sm{padding:8px 14px;font-size:13px}\
.cwe-btn[disabled]{opacity:.5;cursor:default}\
.cwe-step{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}\
.cwe table{width:100%;border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums;margin:8px 0 12px}\
.cwe th,.cwe td{border:1px solid var(--rule);padding:8px 10px;text-align:left;vertical-align:top}\
.cwe th{background:var(--navy);color:#fff;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase}\
.cwe tbody tr:nth-child(even) td{background:var(--tint)}\
.cwe td.num,.cwe th.num{text-align:right;white-space:nowrap}\
.cwe tr.pick td{background:#E3FBF3 !important;font-weight:700}\
.cwe th.pick{background:var(--blue-deep)}\
.cwe-tag{display:inline-block;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:2px 7px;background:var(--green);color:var(--navy);font-weight:700;margin-left:6px;vertical-align:middle}\
.cwe-card{border:1px solid var(--rule);border-top:4px solid var(--blue-deep);padding:16px 18px;margin:12px 0}\
.cwe-card.alt{border-top-color:var(--rule)}\
.cwe-card .nm{font-family:'Helvetica Neue',Arial,sans-serif;font-size:19px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin:0}\
.cwe-card .hl{margin:4px 0 8px}\
.cwe-card ul{margin:0 0 8px;padding-left:18px;font-size:14px}\
.cwe-card .pr{font-family:'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:800;color:var(--blue-deep);font-variant-numeric:tabular-nums}\
.cwe-card .pr small{font-size:12px;color:var(--muted);font-weight:400;letter-spacing:.06em;text-transform:uppercase;display:block}\
.cwe-total{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;background:linear-gradient(90deg,#0B2A44,#0B73BA);color:#fff;padding:16px 18px;margin:16px 0}\
.cwe-total .lbl{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase}\
.cwe-total .amt{font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:800;font-variant-numeric:tabular-nums}\
.cwe-total .fin{font-size:13px;color:var(--green-lt);width:100%}\
.cwe-cta{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}\
.cwe-meta{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:var(--muted);display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px}\
.cwe-foot{border-top:1px solid var(--rule);padding:12px 22px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:var(--muted);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}\
.cwe-small{font-size:13px;color:var(--muted)}\
.cwe ul.cwe-diag{padding-left:18px;margin:0 0 12px}\
.cwe ul.cwe-diag li{margin-bottom:4px}\
.cwe-hidden{display:none !important}\
.cwe-adj{border:1px solid var(--rule);border-left:4px solid var(--green);background:var(--tint);padding:12px 14px;margin:8px 0 16px}\
.cwe-adj-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}\
.cwe-adj-head b{display:block;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px}\
.cwe-adj-head .cwe-small{display:block}\
.cwe-adj .cwe-opts{margin-top:8px}\
.cwe-adj .cwe-opt{padding:9px 12px}\
.cwe-adj .cwe-opt b{font-size:14px}\
.cwe-print .cwe-adj{display:none}\
.cwe-spin{display:inline-block;width:14px;height:14px;border:2px solid #fff;border-right-color:transparent;border-radius:50%;animation:cwe-spin .7s linear infinite;vertical-align:-2px;margin-right:6px}\
@keyframes cwe-spin{to{transform:rotate(360deg)}}\
@media print{@page{size:letter;margin:0.45in 0.5in 0.6in}body>*{display:none !important}body>.cwe-print-root{display:block !important}\
.cwe-print{font-family:Georgia,'Iowan Old Style','Times New Roman',serif;color:#262626;font-size:10.5pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}\
.cwe-print *{box-sizing:border-box}\
.cwe-print h1,.cwe-print h2,.cwe-print h3,.cwe-print table,.cwe-print .cwe-sans,.cwe-print .cwe-eyebrow,.cwe-print .cwe-meta,.cwe-print .cwe-small,.cwe-print .pr,.cwe-print .nm,.cwe-print .cwe-tag,.cwe-print .cwe-total{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}\
.cwe-pv-head{display:flex;align-items:center;gap:16pt;background:linear-gradient(90deg,#0B73BA 0%,#1980C1 60%,#1087B7 100%);color:#fff;padding:16pt 20pt;border-bottom:5pt solid #25E2A9;border-radius:0}\
.cwe-pv-head svg{width:54pt;height:54pt;flex:none}\
.cwe-pv-head .cwe-wm{color:#fff;line-height:1.05;text-transform:uppercase}\
.cwe-pv-head .cwe-wm .l1{font-size:8pt;font-weight:500;letter-spacing:.14em}\
.cwe-pv-head .cwe-wm .l2{font-size:19pt;font-weight:800;letter-spacing:.02em}\
.cwe-pv-head .cwe-wm .l3{font-size:7pt;font-weight:700;letter-spacing:.16em;color:#65DFDA}\
.cwe-pv-meta{margin-left:auto;text-align:right;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:8pt;letter-spacing:.12em;text-transform:uppercase;line-height:1.7}\
.cwe-pv-meta b{display:block;font-size:11pt;letter-spacing:.06em}\
.cwe-print .cwe-body{padding:14pt 0 0}\
.cwe-print .cwe-eyebrow{font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase;color:#5A6B78;margin:0 0 3pt}\
.cwe-print h2{font-size:20pt;font-weight:800;color:#0B73BA;margin:0 0 4pt;letter-spacing:-.01em}\
.cwe-print h3{font-size:10.5pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#0B73BA;border-left:4pt solid #0B73BA;padding-left:8pt;margin:16pt 0 6pt;page-break-after:avoid}\
.cwe-print p{margin:0 0 6pt}\
.cwe-print .cwe-meta{display:flex;gap:14pt;font-size:8.5pt;color:#5A6B78;margin-bottom:8pt}\
.cwe-print ul.cwe-diag{margin:0 0 6pt;padding-left:14pt}\
.cwe-print ul.cwe-diag li{margin-bottom:2pt}\
.cwe-print .cwe-note{background:#EAF6FF;border-left:4pt solid #0B73BA;padding:6pt 10pt;margin:8pt 0;font-size:9.5pt}\
.cwe-print .cwe-card{border:1pt solid #D2DCE4;border-top:4pt solid #0B73BA;padding:10pt 12pt;margin:8pt 0;page-break-inside:avoid;background:#fff}\
.cwe-print .cwe-card.alt{border-top-color:#25E2A9}\
.cwe-print .cwe-card .nm{font-size:14pt;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin:0;color:#262626}\
.cwe-print .cwe-card .hl{margin:3pt 0 5pt}\
.cwe-print .cwe-card ul{margin:0 0 5pt;padding-left:14pt;font-size:9.5pt;columns:2;column-gap:14pt}\
.cwe-print .cwe-card .pr{font-size:16pt;font-weight:800;color:#0B73BA;margin:4pt 0 0;font-variant-numeric:tabular-nums}\
.cwe-print .cwe-card .pr small{display:block;font-size:7.5pt;color:#5A6B78;font-weight:400;letter-spacing:.08em;text-transform:uppercase}\
.cwe-print .cwe-tag{display:inline-block;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;padding:2pt 6pt;background:#25E2A9;color:#0B2A44;font-weight:800;margin-left:6pt;vertical-align:middle}\
.cwe-print .cwe-total{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8pt;background:linear-gradient(90deg,#0B2A44,#0B73BA);color:#fff;padding:12pt 14pt;margin:12pt 0;page-break-inside:avoid}\
.cwe-print .cwe-total .lbl{font-size:8.5pt;letter-spacing:.16em;text-transform:uppercase}\
.cwe-print .cwe-total .amt{font-size:24pt;font-weight:800;font-variant-numeric:tabular-nums}\
.cwe-print .cwe-total .fin{width:100%;font-size:9pt;color:#65DFDA;font-family:Georgia,serif}\
.cwe-print table{width:100%;border-collapse:collapse;font-size:9pt;font-variant-numeric:tabular-nums;margin:4pt 0 8pt;page-break-inside:avoid}\
.cwe-print th,.cwe-print td{border:1pt solid #D2DCE4;padding:5pt 7pt;text-align:left;vertical-align:top}\
.cwe-print th{background:#0B73BA;color:#fff;font-size:8pt;letter-spacing:.06em;text-transform:uppercase}\
.cwe-print th.pick{background:#0B2A44}\
.cwe-print tbody tr:nth-child(even) td{background:#F3F7FA}\
.cwe-print td.num,.cwe-print th.num{text-align:right;white-space:nowrap}\
.cwe-print tr.pick td{background:#E3FBF3 !important;font-weight:700}\
.cwe-print .cwe-small{font-size:8.5pt;color:#5A6B78}\
.cwe-print .cwe-nav,.cwe-print .cwe-cta,.cwe-print .no-print,.cwe-print .cwe-prog{display:none !important}\
.cwe-pv-next{display:flex;gap:14pt;align-items:center;background:#F3F7FA;border-left:4pt solid #25E2A9;padding:10pt 12pt;margin:10pt 0;page-break-inside:avoid}\
.cwe-pv-next b{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15pt;color:#0B73BA;white-space:nowrap}\
.cwe-pv-foot{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-between;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:7.5pt;color:#5A6B78;border-top:1pt solid #D2DCE4;padding-top:4pt;background:#fff}\
.cwe-pv-foot span:last-child{color:#0B73BA;font-weight:700;letter-spacing:.06em}}";

  var LOGO = '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ClearWave Water Solutions"><defs><clipPath id="cweClip"><circle cx="200" cy="200" r="196"/></clipPath><linearGradient id="cweBase" x1="0" y1="0" x2="1" y2="0.55"><stop offset="0" stop-color="#1F93CE"/><stop offset="1" stop-color="#1B5AA2"/></linearGradient><linearGradient id="cweLite" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#2AA1DE"/><stop offset="1" stop-color="#1E7CC0"/></linearGradient><linearGradient id="cweDark" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#1E6FB4"/><stop offset="1" stop-color="#164E92"/></linearGradient><linearGradient id="cweGrn" x1="0" y1="0.1" x2="1" y2="1"><stop offset="0" stop-color="#1FC470"/><stop offset="1" stop-color="#3ADA8E"/></linearGradient><linearGradient id="cweGrnLite" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CE09F"/><stop offset="1" stop-color="#86EDBC"/></linearGradient></defs><g clip-path="url(#cweClip)"><circle cx="200" cy="200" r="196" fill="url(#cweBase)"/><path d="M-10,120 C50,72 120,80 190,122 C250,158 325,166 410,148 L410,410 L-10,410 Z" fill="url(#cweLite)"/><path d="M-10,176 C50,126 120,134 190,176 C250,212 325,220 410,202 L410,410 L-10,410 Z" fill="url(#cweDark)"/><path d="M-10,205 C45,150 110,168 175,225 C235,277 320,300 410,285 L410,410 L-10,410 Z" fill="url(#cweGrn)"/><path d="M-10,292 C55,247 120,264 185,307 C245,346 330,354 410,337 L410,410 L-10,410 Z" fill="url(#cweGrnLite)"/></g></svg>';

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function range(a, b) { return a === b ? money(a) : money(a) + " to " + money(b); }
  function uniq(arr) { var o = {}, r = []; arr.forEach(function (x) { if (!o[x]) { o[x] = 1; r.push(x); } }); return r; }
  function estimateId() {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    var r = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "CW-" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + r;
  }
  function today() { return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
  function emit(name, detail) {
    try { window.dispatchEvent(new CustomEvent("cw:" + name, { detail: detail })); } catch (e) {}
    try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: "cw_estimator_" + name }, detail || {})); } catch (e) {}
  }
  function monthly(principal, apr, months) {
    var r = apr / 1200; if (!r) { return principal / months; }
    return principal * r / (1 - Math.pow(1 + r, -months));
  }

  // ------------------------------------------------------------------
  // Recommendation engine
  // ------------------------------------------------------------------
  function sizeIndex(cat, id) { for (var i = 0; i < cat.sizes.length; i++) { if (cat.sizes[i].id === id) { return i; } } return 0; }
  function pickSize(cat, st) {
    var size = cat.sizes[0].id, bumped = null;
    var lab = (st.well && st.well.lab) || {};
    var rules = cat.capacitySizing || [];
    for (var j = 0; j < rules.length; j++) {
      var v = Number(lab[rules[j].field]);
      var hit = v && (rules[j].below != null ? v < rules[j].below : v > rules[j].above);
      if (hit && sizeIndex(cat, rules[j].size) > sizeIndex(cat, size)) { size = rules[j].size; bumped = rules[j].field; }
    }
    return { id: size, bumped: bumped };
  }
  function singleTankPrice(cat, code, sizeId) { var t = cat.wellPricing.singleTank; return (t[code] || t.default)[sizeId]; }
  function tankSystemPrice(cat, codes, sizeId) {
    if (!codes || !codes.length) { return 0; }
    var base = 0; codes.forEach(function (c) { base = Math.max(base, singleTankPrice(cat, c, sizeId)); });
    return base + (codes.length - 1) * cat.wellPricing.additionalTank;
  }
  function region(cat, zip) {
    var pre = String(zip || "").slice(0, 3);
    for (var i = 0; i < cat.regions.length; i++) { if (cat.regions[i].prefixes.indexOf(pre) >= 0) { return cat.regions[i]; } }
    return null;
  }
  function byTier(cat, tier) { var k = null; Object.keys(cat.products).forEach(function (c) { var p = cat.products[c]; if (p.family === "city" && p.tier === tier) { k = c; } }); return k; }

  function recommend(cat, st) {
    var picked = pickSize(cat, st), sizeId = picked.id;
    var core = [], addons = [], alt = null, diagnosis = [], causes = [], notes = [], optional = [];
    if (st.source === "well" && picked.bumped) { notes.push("Your " + (picked.bumped === "ph" ? "pH" : picked.bumped) + " level " + (picked.bumped === "ph" ? "is low" : "is high") + ", so we sized you into a " + sizeLabel(cat, sizeId).label + ". A bigger tank holds more media and removes more between cleanings."); }
    var reg = region(cat, st.zip);
    var waterNote = (reg && reg.water) || cat.defaultWaterNote;
    var largeHome = st.home.baths >= cat.largeHome.minBaths || st.home.people >= cat.largeHome.minPeople;
    var large = largeHome && !(st.adjust && st.adjust.ignoreLarge);

    if (st.source === "city") {
      var goal = null; cat.cityGoals.forEach(function (g) { if (g.id === st.city.goal) { goal = g; } });
      var baseCode = goal ? (large && goal.largeCore ? goal.largeCore : goal.core) : null;
      var tier = baseCode ? cat.products[baseCode].tier : 0;
      var add = goal ? goal.addons.slice() : [];
      st.city.concerns.forEach(function (id) {
        cat.cityConcerns.forEach(function (c) {
          if (c.id !== id) { return; }
          if (c.addon) { add.push(c.addon); }
          if (c.minTier && tier > 0 && c.minTier > tier) { tier = c.minTier; }
          if (c.minTier && tier === 0) { notes.push("\"" + c.label + "\" is a whole-home concern. Reverse osmosis handles it at the sink. A whole-home system handles every tap and shower."); }
        });
      });
      if (tier > 0) { core.push(byTier(cat, tier)); }
      if (tier > 0 && tier < 5 && large && !goal.largeCore) { alt = tier < 3 ? "SOVEREIGN" : "PINNACLE"; }
      diagnosis.push(waterNote);
      if (cat.cityCommonFinding) { diagnosis.push(cat.cityCommonFinding); }
      if (goal) { diagnosis.push("Your main goal: " + goal.label + ". " + goal.sub); }
      addons = uniq(add);
    } else {
      var cs = {};
      st.well.symptoms.forEach(function (id) { cat.wellSymptoms.forEach(function (s) { if (s.id === id) { cs[s.cause] = 1; } }); });
      var labHits = [];
      cat.labFields.forEach(function (f) {
        var v = st.well.lab[f.id];
        if (v == null || v === "") { return; }
        var hit = f.type === "yesno" ? v === "yes" : (f.limitLow != null ? Number(v) < f.limitLow : Number(v) > f.limit);
        if (hit) { cs[f.cause] = 1; labHits.push(f.label + ": " + v + " (" + f.note + ")"); }
      });
      causes = Object.keys(cs);
      var has = function (c) { return cs[c] === 1; };
      var iron = has("iron") || has("manganese"), ferric = has("ferric"), soft = has("nitrate") ? "PURA" : "FLOW";
      var highIron = Number(st.well.lab.iron) > 10;

      if (ferric && (iron || highIron)) { core.push("POSEIDON", "FERRO"); }
      else if (ferric) { core.push("POSEIDON"); notes.push("Rusty water with no staining is unusual. Most wells with rust also carry dissolved iron, so your free water test may add a Ferro."); }
      else if (iron) { core.push("FERRO"); }
      if (has("sulfur") && core.indexOf("POSEIDON") < 0) {
        core.push("AERO");
        if (iron) { optional.push("POSEIDON"); notes.push("You have sulfur along with iron. Wells like this can be finicky, so after your on-site water test we may add a Poseidon as an enhancement tank. That would add about " + money(cat.wellPricing.additionalTank) + ". It is not in your price below."); }
      }
      else if (has("taste") && !core.length) { core.push("AERO"); notes.push("Bad taste alone is usually sulfur, iron, or low pH. We show the most common fix. A free water test will confirm it."); }
      // Ferro softens on its own. Otherwise hardness or nitrates need their own tank.
      if ((has("hardness") || has("nitrate")) && core.indexOf("FERRO") < 0) { core.push(soft); }
      else if (has("nitrate") && core.indexOf("FERRO") >= 0) { core.push("PURA"); }
      if (has("acid")) { core.unshift("TERRA"); }
      if (has("bacteria")) { addons.push("UV"); }
      if (!core.length) {
        notes.push("You did not report a specific problem, so we show the most common well water system in our area. A free water test tells us exactly what you need.");
        core.push("FERRO");
      }
      causes.forEach(function (c) { if (cat.causes[c]) { diagnosis.push(cat.causes[c].plain); } });
      if (labHits.length) { diagnosis.push("From your lab numbers: " + labHits.join("; ") + "."); }
    }

    core = uniq(core); addons = uniq(addons);
    if (!core.length && addons.length) { core = [addons.shift()]; }
    // Free with every whole-home system.
    var freebies = [];
    if (core.length) { (cat.includedWithSystem || []).forEach(function (k) { if (core.indexOf(k) < 0 && addons.indexOf(k) < 0) { freebies.push(k); } addons = addons.filter(function (a) { return a !== k; }); }); }
    var items = core.concat(addons).concat(freebies).map(function (k) {
      var p = cat.products[k];
      var tank = st.source === "well" && !!p.price.tank;
      var inc = freebies.indexOf(k) >= 0;
      return { code: k, product: p, role: inc ? "included" : (core.indexOf(k) >= 0 ? "core" : "addon"), tank: tank, included: inc, price: (tank || inc) ? null : (p.price.flat != null ? p.price.flat : null) };
    });
    var tankCodes = items.filter(function (it) { return it.tank; }).map(function (it) { return it.code; });
    var flats = 0; items.forEach(function (it) { if (it.price != null) { flats += it.price; } });
    var first = cat.sizes[0].id, last = cat.sizes[cat.sizes.length - 1].id;
    var totals = {
      at: flats + tankSystemPrice(cat, tankCodes, sizeId),
      min: flats + tankSystemPrice(cat, tankCodes, first),
      max: flats + tankSystemPrice(cat, tankCodes, last),
      flats: flats, tanks: tankCodes.length, tankCodes: tankCodes, system: tankSystemPrice(cat, tankCodes, sizeId)
    };
    return { sizeId: sizeId, region: reg, items: items, core: core, addons: addons, alt: alt, optional: optional, causes: causes, diagnosis: diagnosis, notes: notes, totals: totals, large: large, largeHome: largeHome };
  }

  // ------------------------------------------------------------------
  // Widget
  // ------------------------------------------------------------------
  function start(cat) {
    var root = target();
    if (!root) { return; }
    if (!document.getElementById("cwe-style")) { var st = document.createElement("style"); st.id = "cwe-style"; st.textContent = CSS; document.head.appendChild(st); }

    var cfg = {
      endpoint: ATTR("endpoint", cat.leadEndpoint),
      booking: ATTR("booking", cat.bookingUrl),
      preset: ATTR("source", null),
      campaign: ATTR("campaign", ""),
      requireContact: cat.requireContact !== false
    };

    var state = {
      id: estimateId(),
      zip: "", cityName: "",
      source: cfg.preset === "city" || cfg.preset === "well" ? cfg.preset : "",
      bill: "",
      city: { goal: "", concerns: [] },
      well: { symptoms: [], tested: "", lab: {}, drinking: false, file: null },
      home: { baths: 2, people: 3, timeline: "", owner: "" },
      adjust: { ignoreLarge: false, open: false },
      contact: { name: "", email: "", phone: "", notes: "" },
      result: null, sent: false
    };

    function steps() {
      var s = ["location"];
      if (!cfg.preset) { s.push("source"); }
      if (state.source === "well") { s.push("symptoms", "testing"); } else { s.push("goal", "concerns"); }
      s.push("home", "contact", "results");
      return s;
    }
    var stepIdx = 0;
    function cur() { return steps()[stepIdx]; }

    root.innerHTML = '<div class="cwe" role="region" aria-label="ClearWave water system estimator">' +
      '<div class="cwe-head">' + LOGO.replace(/cwe(Clip|Base|Lite|Dark|Grn|GrnLite)/g, "cweL$1") +
      '<div class="cwe-wm"><div class="l1">ClearWave Water</div><div class="l2">Solutions</div><div class="l3">Pure Water, Pure Life</div></div>' +
      '<div class="cwe-phone">Questions? Call or text<a href="' + esc(cat.company.phoneHref) + '">' + esc(cat.company.phone) + '</a></div></div>' +
      '<div class="cwe-prog"><span style="width:0%"></span></div>' +
      '<div class="cwe-body"></div>' +
      '<div class="cwe-foot"><span>' + esc(cat.company.name) + ' &middot; ' + esc(cat.company.phone) + ' &middot; ' + esc(cat.company.email) + '</span><span>Estimate ' + esc(state.id) + '</span></div></div>';
    var body = root.querySelector(".cwe-body");
    var prog = root.querySelector(".cwe-prog > span");

    // ---------- views ----------
    var V = {};
    V.location = function () {
      return head("Step 1", "Where is your home?", "Your ZIP code tells us about your local water.") +
        '<div class="cwe-row"><div><label class="cwe-f" for="cwe-zip">ZIP code</label><input id="cwe-zip" type="text" inputmode="numeric" maxlength="5" placeholder="23451" value="' + esc(state.zip) + '"></div>' +
        '<div><label class="cwe-f" for="cwe-city">City or town (optional)</label><input id="cwe-city" type="text" placeholder="Virginia Beach" value="' + esc(state.cityName) + '"></div></div>' +
        '<div id="cwe-zipnote"></div>';
    };
    V.source = function () {
      return head("Step 2", "Where does your water come from?", "This is the biggest fork in the road. City water and well water need very different systems.") +
        radios("source", [
          { v: "city", b: "City water", s: "You get a water bill from the city or county." },
          { v: "well", b: "Well water", s: "You have a private well. No water bill." },
          { v: "unsure", b: "Not sure", s: "We will help you figure it out." }
        ], state.source === "city" || state.source === "well" ? state.source : (state.bill ? "unsure" : "")) +
        '<div id="cwe-bill" class="' + (state.bill ? "" : "cwe-hidden") + '"><div class="cwe-note">Easy check: do you get a water bill in the mail or online?</div>' +
        radios("bill", [{ v: "yes", b: "Yes, I get a water bill", s: "That means city water." }, { v: "no", b: "No water bill", s: "That means a private well." }], state.bill) + "</div>";
    };
    V.goal = function () {
      return head("Step 3", "What matters most to you?", "Pick the one that fits best. You can add more on the next step.") +
        radios("goal", cat.cityGoals.map(function (g) { return { v: g.id, b: g.label, s: g.sub }; }), state.city.goal);
    };
    V.concerns = function () {
      return head("Step 4", "Anything else on your list?", "Check all that apply. Skip it if none fit.") +
        checks("concern", cat.cityConcerns.map(function (c) { return { v: c.id, b: c.label }; }), state.city.concerns);
    };
    V.symptoms = function () {
      return head("Step 3", "What is your water doing?", "Check everything you have noticed. Each one points to a cause.") +
        checks("sym", cat.wellSymptoms.map(function (s) { return { v: s.id, b: s.label }; }), state.well.symptoms) +
        '<div class="cwe-note good">Every whole-home system includes our Elara reverse osmosis drinking water system at the kitchen sink, free.</div>';
    };
    V.testing = function () {
      var h = head("Step 4", "Has your water been tested?", "A lab report lets us size the system right the first time.") +
        radios("tested", [{ v: "yes", b: "Yes, I have results", s: "Type in what you know or attach the report." }, { v: "no", b: "No, never tested", s: "We include a free water test with every visit." }, { v: "unsure", b: "Not sure", s: "No problem. We will test it." }], state.well.tested);
      h += '<div id="cwe-lab" class="' + (state.well.tested === "yes" ? "" : "cwe-hidden") + '"><h3>Your lab numbers (fill in what you have)</h3><div class="cwe-row">';
      cat.labFields.forEach(function (f) {
        var v = state.well.lab[f.id] == null ? "" : state.well.lab[f.id];
        h += "<div><label class=\"cwe-f\" for=\"cwe-lab-" + f.id + "\">" + esc(f.label) + "</label>";
        if (f.type === "yesno") { h += '<select id="cwe-lab-' + f.id + '" data-lab="' + f.id + '"><option value="">Not tested</option><option value="no"' + (v === "no" ? " selected" : "") + ">Absent</option><option value=\"yes\"" + (v === "yes" ? " selected" : "") + ">Present</option></select>"; }
        else { h += '<input type="number" step="any" id="cwe-lab-' + f.id + '" data-lab="' + f.id + '" value="' + esc(v) + '" placeholder="' + esc(f.note) + '">'; }
        h += "</div>";
      });
      h += '</div><label class="cwe-f" for="cwe-file">Attach your lab report (PDF or photo, up to 4 MB)</label><input type="file" id="cwe-file" accept=".pdf,.jpg,.jpeg,.png,.heic"><p class="cwe-small" style="margin-top:6px">' + esc(cat.copy.labUploadNote) + (state.well.file ? " Attached: <b>" + esc(state.well.file.name) + "</b>" : "") + "</p></div>";
      return h;
    };
    V.home = function () {
      var n = state.source === "well" ? 5 : 5;
      return head("Step " + n, "Tell us about your home", state.source === "well" ? "This helps us plan your install and follow-up." : "Larger homes get the higher-flow system in each package.") +
        '<div class="cwe-row"><div><label class="cwe-f" for="cwe-baths">Bathrooms</label><select id="cwe-baths">' + opts([1, 2, 3, 4, 5, 6], state.home.baths, function (v) { return v === 6 ? "6 or more" : v; }) + "</select></div>" +
        '<div><label class="cwe-f" for="cwe-people">People living there</label><select id="cwe-people">' + opts([1, 2, 3, 4, 5, 6, 7, 8], state.home.people, function (v) { return v === 8 ? "8 or more" : v; }) + "</select></div>" +
        '<div><label class="cwe-f" for="cwe-timeline">When do you want it fixed?</label><select id="cwe-timeline"><option value="">Choose one</option>' + opts(["asap", "soon", "research"], state.home.timeline, function (v) { return { asap: "As soon as possible", soon: "In the next 1 to 3 months", research: "Just researching for now" }[v]; }) + "</select></div>" +
        '<div><label class="cwe-f" for="cwe-owner">Do you own the home?</label><select id="cwe-owner"><option value="">Choose one</option>' + opts(["yes", "no"], state.home.owner, function (v) { return v === "yes" ? "Yes" : "No, I rent"; }) + "</select></div></div>";
    };
    V.contact = function () {
      return head("Step 6", "Where should we send your estimate?", cfg.requireContact ? "Your estimate shows on the next screen. We will also email you a copy and the brochure for your system." : "Optional. Leave it blank to just see the numbers.") +
        '<div class="cwe-row"><div><label class="cwe-f" for="cwe-name">Name</label><input type="text" id="cwe-name" autocomplete="name" value="' + esc(state.contact.name) + '"></div>' +
        '<div><label class="cwe-f" for="cwe-email">Email</label><input type="email" id="cwe-email" autocomplete="email" value="' + esc(state.contact.email) + '"></div>' +
        '<div><label class="cwe-f" for="cwe-tel">Mobile phone</label><input type="tel" id="cwe-tel" autocomplete="tel" value="' + esc(state.contact.phone) + '"></div>' +
        '<div><label class="cwe-f" for="cwe-notes">Anything else? (optional)</label><input type="text" id="cwe-notes" value="' + esc(state.contact.notes) + '"></div></div>' +
        '<p class="cwe-small" style="margin-top:12px">We never sell your information. We only use it to send your estimate and follow up about your water.</p>';
    };
    V.results = function () { return resultsHtml(cat, state, cfg); };

    function head(step, title, lead) { return '<p class="cwe-eyebrow">' + esc(step) + "</p><h2>" + esc(title) + '</h2><p class="cwe-lead">' + esc(lead) + "</p>"; }
    function opts(vals, sel, lab) { return vals.map(function (v) { return '<option value="' + esc(v) + '"' + (String(v) === String(sel) ? " selected" : "") + ">" + esc(lab ? lab(v) : v) + "</option>"; }).join(""); }
    function radios(name, list, sel) {
      return '<div class="cwe-opts" role="radiogroup">' + list.map(function (o) {
        return '<label class="cwe-opt ' + (sel === o.v ? "on" : "") + '"><input type="radio" name="cwe-' + name + '" value="' + esc(o.v) + '"' + (sel === o.v ? " checked" : "") + "><span><b>" + esc(o.b) + "</b>" + (o.s ? "<small>" + esc(o.s) + "</small>" : "") + "</span></label>";
      }).join("") + "</div>";
    }
    function checks(name, list, sel) {
      return '<div class="cwe-opts">' + list.map(function (o) {
        var on = sel.indexOf(o.v) >= 0;
        return '<label class="cwe-opt ' + (on ? "on" : "") + '"><input type="checkbox" name="cwe-' + name + '" value="' + esc(o.v) + '"' + (on ? " checked" : "") + "><span><b>" + esc(o.b) + "</b>" + (o.s ? "<small>" + esc(o.s) + "</small>" : "") + "</span></label>";
      }).join("") + "</div>";
    }

    // ---------- render ----------
    function render() {
      var s = cur(), all = steps();
      prog.style.width = Math.round((stepIdx / (all.length - 1)) * 100) + "%";
      var html = V[s]();
      if (s !== "results") {
        html += '<p class="cwe-err" id="cwe-err" aria-live="polite"></p><div class="cwe-nav">' +
          (stepIdx > 0 ? '<button type="button" class="cwe-btn ghost" id="cwe-back">Back</button>' : "<span></span>") +
          '<span class="cwe-step">' + (stepIdx + 1) + " of " + (all.length - 1) + "</span>" +
          '<button type="button" class="cwe-btn" id="cwe-next">' + (s === "contact" ? "See my estimate" : "Next") + "</button></div>";
      }
      body.innerHTML = html;
      wire(s);
      emit("step", { step: s, index: stepIdx, estimateId: state.id });
      if (stepIdx > 0) { try { root.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {} }
    }

    function wire(s) {
      var nx = body.querySelector("#cwe-next"), bk = body.querySelector("#cwe-back");
      if (nx) { nx.onclick = next; }
      if (bk) { bk.onclick = function () { stepIdx = Math.max(0, stepIdx - 1); render(); }; }
      body.querySelectorAll(".cwe-opt input").forEach(function (inp) {
        inp.addEventListener("change", function () {
          if (inp.type === "radio") { body.querySelectorAll('input[name="' + inp.name + '"]').forEach(function (r) { r.closest(".cwe-opt").classList.toggle("on", r.checked); }); }
          else { inp.closest(".cwe-opt").classList.toggle("on", inp.checked); }
        });
      });
      if (s === "location") {
        var z = body.querySelector("#cwe-zip");
        var upd = function () { state.zip = z.value.replace(/\D/g, "").slice(0, 5); z.value = state.zip; zipNote(); };
        z.addEventListener("input", upd); zipNote();
        z.addEventListener("keydown", function (e) { if (e.key === "Enter") { next(); } });
      }
      if (s === "source") {
        body.querySelectorAll('input[name="cwe-source"]').forEach(function (r) { r.addEventListener("change", function () { body.querySelector("#cwe-bill").classList.toggle("cwe-hidden", r.value !== "unsure"); }); });
      }
      if (s === "testing") {
        body.querySelectorAll('input[name="cwe-tested"]').forEach(function (r) { r.addEventListener("change", function () { body.querySelector("#cwe-lab").classList.toggle("cwe-hidden", r.value !== "yes"); }); });
        var f = body.querySelector("#cwe-file");
        f.addEventListener("change", function () {
          var file = f.files && f.files[0]; if (!file) { state.well.file = null; return; }
          state.well.file = { name: file.name, type: file.type, size: file.size, data: null };
          if (file.size <= 4 * 1024 * 1024) { var rd = new FileReader(); rd.onload = function () { state.well.file.data = rd.result; }; rd.readAsDataURL(file); }
        });
      }
      if (s === "results") { wireResults(); }
    }

    function zipNote() {
      var n = body.querySelector("#cwe-zipnote"); if (!n) { return; }
      if (state.zip.length < 5) { n.innerHTML = ""; return; }
      var r = region(cat, state.zip);
      n.innerHTML = r && r.water ? '<div class="cwe-note"><b>' + esc(r.name) + "</b>. " + esc(r.water) + "</div>" : "";
    }

    function err(msg) { var e = body.querySelector("#cwe-err"); if (e) { e.textContent = msg; } }
    function val(sel) { var el = body.querySelector(sel); return el ? el.value.trim() : ""; }
    function checked(name) { return Array.prototype.map.call(body.querySelectorAll('input[name="cwe-' + name + '"]:checked'), function (i) { return i.value; }); }

    function next() {
      var s = cur();
      if (s === "location") {
        state.cityName = val("#cwe-city");
        if (!/^\d{5}$/.test(state.zip)) { return err("Please enter your 5-digit ZIP code."); }
      }
      if (s === "source") {
        var v = checked("source")[0];
        if (!v) { return err("Pick one so we know which systems fit."); }
        if (v === "unsure") { var b = checked("bill")[0]; if (!b) { return err("Do you get a water bill? Pick yes or no."); } state.bill = b; state.source = b === "yes" ? "city" : "well"; }
        else { state.bill = ""; state.source = v; }
      }
      if (s === "goal") { state.city.goal = checked("goal")[0] || ""; if (!state.city.goal) { return err("Pick the one that matters most."); } }
      if (s === "concerns") { state.city.concerns = checked("concern"); }
      if (s === "symptoms") { state.well.symptoms = checked("sym"); }
      if (s === "testing") {
        state.well.tested = checked("tested")[0] || "";
        if (!state.well.tested) { return err("Let us know if your water has been tested."); }
        state.well.lab = {};
        if (state.well.tested === "yes") { body.querySelectorAll("[data-lab]").forEach(function (i) { if (i.value !== "") { state.well.lab[i.getAttribute("data-lab")] = i.value; } }); }
      }
      if (s === "home") { state.home.baths = Number(val("#cwe-baths")); state.home.people = Number(val("#cwe-people")); state.home.timeline = val("#cwe-timeline"); state.home.owner = val("#cwe-owner"); }
      if (s === "contact") {
        state.contact = { name: val("#cwe-name"), email: val("#cwe-email"), phone: val("#cwe-tel"), notes: val("#cwe-notes") };
        if (cfg.requireContact) {
          if (!state.contact.name) { return err("Please tell us your name."); }
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.contact.email)) { return err("Please enter a valid email so we can send your estimate."); }
          if (state.contact.phone.replace(/\D/g, "").length < 10) { return err("Please enter a 10-digit mobile number."); }
        }
        state.result = recommend(cat, state);
        emit("result", summary(cat, state));
        sendLead(cat, state, cfg);
      }
      stepIdx++; render();
    }

    function wireResults() {
      var p = body.querySelector("#cwe-print"); if (p) { p.onclick = function () { printEstimate(); }; }
      var rs = body.querySelector("#cwe-restart"); if (rs) { rs.onclick = function () { stepIdx = 0; state.result = null; state.sent = false; state.adjust = { ignoreLarge: false, open: false }; state.city.concerns = []; state.well.symptoms = []; state.id = estimateId(); root.querySelector(".cwe-foot span:last-child").textContent = "Estimate " + state.id; render(); }; }
      var m = body.querySelector("#cwe-mail"); if (m) { m.href = mailto(cat, state); }
      var t = body.querySelector("#cwe-adj-toggle"); if (t) { t.onclick = function () { state.adjust.open = !state.adjust.open; readjust(); }; }
      body.querySelectorAll(".cwe-adj-box").forEach(function (box) {
        box.addEventListener("change", function () {
          var id = box.getAttribute("data-adj");
          if (id === "large") { state.adjust.ignoreLarge = !box.checked; }
          else if (id.indexOf("concern:") === 0) { var c = id.slice(8); state.city.concerns = state.city.concerns.filter(function (i) { return i !== c; }); if (box.checked) { state.city.concerns.push(c); } }
          else if (id.indexOf("symptom:") === 0) { var y = id.slice(8); state.well.symptoms = state.well.symptoms.filter(function (i) { return i !== y; }); if (box.checked) { state.well.symptoms.push(y); } }
          readjust();
        });
      });
    }
    function readjust() {
      state.result = recommend(cat, state);
      emit("adjust", summary(cat, state));
      var y = window.scrollY; render(); try { window.scrollTo(0, y); } catch (e) {}
    }

    function printEstimate() {
      var wrap = document.createElement("div"); wrap.className = "cwe-print-root";
      wrap.innerHTML = '<div class="cwe-print">' +
        '<div class="cwe-pv-head">' + LOGO.replace(/cwe(Clip|Base|Lite|Dark|Grn|GrnLite)/g, "cweP$1") +
        '<div class="cwe-wm"><div class="l1">ClearWave Water</div><div class="l2">Solutions</div><div class="l3">Pure Water, Pure Life</div></div>' +
        '<div class="cwe-pv-meta"><b>Estimate ' + esc(state.id) + "</b>" + esc(today()) + "<br>" + esc(cat.company.phone) + " &middot; " + esc(cat.company.website) + "</div></div>" +
        '<div class="cwe-body">' + body.innerHTML + "</div>" +
        '<div class="cwe-pv-next"><span>' + esc(cat.copy.nextStep) + " Call or text <b>" + esc(cat.company.phone) + "</b> or email " + esc(cat.company.email) + ". Mention estimate " + esc(state.id) + ".</span></div>" +
        '<div class="cwe-pv-foot"><span>' + esc(cat.company.name) + " &middot; " + esc(cat.company.phone) + " &middot; " + esc(cat.company.email) + " &middot; Veteran-owned. Made in the USA.</span><span>Estimate " + esc(state.id) + " &middot; " + esc(today()) + "</span></div></div>";
      document.body.appendChild(wrap);
      var done = function () { if (wrap.parentNode) { wrap.parentNode.removeChild(wrap); } window.removeEventListener("afterprint", done); };
      window.addEventListener("afterprint", done);
      window.print();
    }

    render();
  }

  // ------------------------------------------------------------------
  // Results page
  // ------------------------------------------------------------------
  function sizeLabel(cat, id) { for (var i = 0; i < cat.sizes.length; i++) { if (cat.sizes[i].id === id) { return cat.sizes[i]; } } return { label: id, fits: "" }; }
  function brochureUrl(cat, p) {
    if (!p.brochure) { return null; }
    if (/^https?:/i.test(p.brochure)) { return p.brochure; }
    if (cat.brochureBaseAbsolute) { return cat.brochureBaseAbsolute.replace(/\/?$/, "/") + p.brochure; }
    var base = (SCRIPT && SCRIPT.src) ? SCRIPT.src.replace(/[^\/]*$/, "") : "";
    return base + (cat.brochureBase || "") + p.brochure;
  }
  function priceBlock(label, sub) { return '<p class="pr">' + label + "<small>" + esc(sub) + "</small></p>"; }

  // A copy of the answers so we can ask "what if" without touching state.
  function whatIf(st, change) {
    var c = JSON.parse(JSON.stringify({ zip: st.zip, source: st.source, city: st.city, well: { symptoms: st.well.symptoms, tested: st.well.tested, lab: st.well.lab }, home: st.home, adjust: st.adjust }));
    change(c);
    return c;
  }
  function outcome(cat, r) {
    var names = r.core.map(function (k) { return cat.products[k].name.replace("ClearWave ", ""); }).join(" + ");
    var price = r.totals.min === r.totals.max ? money(r.totals.at) : range(r.totals.min, r.totals.max);
    return { key: r.core.join("|") + "|" + r.totals.min + "|" + r.totals.max, text: names + ", " + price };
  }
  function adjustPanel(cat, st) {
    var r = st.result, now = outcome(cat, r), open = !!(st.adjust && st.adjust.open);
    var h = '<div class="cwe-adj no-print"><div class="cwe-adj-head"><div><b>Do you want to make changes?</b><span class="cwe-small">Check or uncheck a concern to see a different system and price.</span></div><button type="button" class="cwe-btn ghost sm" id="cwe-adj-toggle">' + (open ? "Hide" : "Yes, show my options") + "</button></div>";
    if (!open) { return h + "</div>"; }
    function row(id, on, label, other) {
      var o = outcome(cat, other), diff = o.key !== now.key;
      var eff = diff ? (on ? "Uncheck to see: " : "Check to see: ") + o.text : (on ? "Unchecking this does not change your price" : "Adding this does not change your price");
      return '<label class="cwe-opt ' + (on ? "on" : "") + '"><input type="checkbox" class="cwe-adj-box" data-adj="' + esc(id) + '"' + (on ? " checked" : "") + "><span><b>" + esc(label) + "</b><small>" + esc(eff) + "</small></span></label>";
    }
    var rows = [];
    if (st.source === "city") {
      cat.cityConcerns.forEach(function (c) {
        var on = st.city.concerns.indexOf(c.id) >= 0;
        rows.push(row("concern:" + c.id, on, c.label, recommend(cat, whatIf(st, function (x) { x.city.concerns = on ? x.city.concerns.filter(function (i) { return i !== c.id; }) : x.city.concerns.concat([c.id]); }))));
      });
      if (r.largeHome) { var onL = !st.adjust.ignoreLarge; rows.push(row("large", onL, "Sized for a larger home (" + cat.largeHome.minBaths + "+ bathrooms or " + cat.largeHome.minPeople + "+ people)", recommend(cat, whatIf(st, function (x) { x.adjust.ignoreLarge = onL; })))); }
    } else {
      cat.wellSymptoms.forEach(function (sy) {
        var on = st.well.symptoms.indexOf(sy.id) >= 0;
        rows.push(row("symptom:" + sy.id, on, sy.label, recommend(cat, whatIf(st, function (x) { x.well.symptoms = on ? x.well.symptoms.filter(function (i) { return i !== sy.id; }) : x.well.symptoms.concat([sy.id]); }))));
      });
    }
    h += '<div class="cwe-opts">' + rows.join("") + "</div>";
    if (st.source !== "city" && Object.keys(st.well.lab || {}).length) { h += '<p class="cwe-small" style="margin-top:8px">Your lab numbers still count. They can keep a system in place even when a box is unchecked.</p>'; }
    return h + "</div>";
  }

  function resultsHtml(cat, st, cfg) {
    var r = st.result, sz = sizeLabel(cat, r.sizeId), well = st.source === "well";
    var h = '<p class="cwe-eyebrow">' + esc(cat.copy.resultsTitle) + "</p><h2>" + (st.contact.name ? esc(st.contact.name.split(" ")[0]) + ", here is your estimate." : "Here is your estimate.") + "</h2>" +
      '<div class="cwe-meta"><span>Estimate ' + esc(st.id) + "</span><span>" + esc(today()) + "</span><span>" + (well ? "Well water" : "City water") + (r.region ? " &middot; " + esc(r.region.name) : "") + " " + esc(st.zip) + "</span></div>";

    h += "<h3>What your water is telling us</h3><ul class=\"cwe-diag\">" + r.diagnosis.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>";
    r.notes.forEach(function (n) { h += '<div class="cwe-note">' + esc(n) + "</div>"; });

    h += "<h3>Recommended for your home</h3>";
    if (well && r.totals.tanks) {
      h += '<p class="cwe-small">Priced with a <b>' + esc(sz.label) + "</b>. " + esc(cat.sizeNote) + (r.totals.tanks > 1 ? " " + esc(cat.wellPricing.note) : "") + "</p>";
    } else {
      h += '<p class="cwe-small">Prices are installed and include everything listed under "Included with every system."</p>';
    }
    if (!r.items.length) { h += '<div class="cwe-note warn">We could not match a system from your answers. Call us and we will sort it out in five minutes.</div>'; }
    r.items.forEach(function (it) {
      var p = it.product, url = brochureUrl(cat, p);
      h += '<div class="cwe-card' + (it.role !== "core" ? " alt" : "") + '"><p class="nm">' + esc(p.name) + (it.role === "core" ? '<span class="cwe-tag">Recommended</span>' : (it.included ? '<span class="cwe-tag">Included free</span>' : '<span class="cwe-tag" style="background:#D2DCE4">Add-on</span>')) + "</p>" +
        (p.package ? '<p class="cwe-eyebrow" style="margin-top:4px">' + esc(p.package) + "</p>" : "") +
        (p.tagline ? '<p class="hl" style="font-style:italic;margin:2px 0 6px">' + esc(p.tagline) + "</p>" : "") +
        '<p class="hl">' + esc(p.headline) + "</p><ul>" + p.solves.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        (p.specs ? '<p class="cwe-small">' + esc(p.specs) + "</p>" : "") +
        (it.tank && p.sizing ? '<p class="cwe-small"><b>Tank size:</b> ' + cat.sizes.map(function (z) { return esc(z.label.replace(" tank", "")) + " for " + esc((p.sizing[z.id] || z.fits).toLowerCase()); }).join(". ") + ".</p>" : "") +
        (it.included ? priceBlock("Included", (p.price.flat != null ? money(p.price.flat) + " value. " : "") + "Free with your whole-home system") : it.tank ? (r.totals.tanks > 1 ? priceBlock("Tank " + (r.totals.tankCodes.indexOf(it.code) + 1) + " of " + r.totals.tanks, "Priced as part of your system below") : priceBlock(range(singleTankPrice(cat, it.code, cat.sizes[0].id), singleTankPrice(cat, it.code, cat.sizes[cat.sizes.length - 1].id)), "Installed, by tank size")) : priceBlock(money(it.price), "Installed price")) +
        (url ? '<a class="cwe-btn ghost sm no-print" href="' + esc(url) + '" target="_blank" rel="noopener">Download the ' + esc(p.name.replace("ClearWave ", "")) + " brochure</a>" : "") + "</div>";
    });
    if (r.alt) {
      var a = cat.products[r.alt], au = brochureUrl(cat, a);
      h += '<div class="cwe-card alt"><p class="cwe-eyebrow">Upgrade option for a home your size</p><p class="nm">' + esc(a.name) + '</p><p class="hl">' + esc(a.headline) + "</p>" + (a.specs ? '<p class="cwe-small">' + esc(a.specs) + "</p>" : "") + priceBlock(money(a.price.flat), "Installed price") + (au ? '<a class="cwe-btn ghost sm no-print" href="' + esc(au) + '" target="_blank" rel="noopener">Download the brochure</a>' : "") + "</div>";
    }

    (r.optional || []).forEach(function (k) {
      var o = cat.products[k], ou = brochureUrl(cat, o);
      h += '<div class="cwe-card alt"><p class="cwe-eyebrow">Possible enhancement tank, decided at your on-site test</p><p class="nm">' + esc(o.name) + '</p><p class="hl">' + esc(o.headline) + "</p>" + (o.specs ? '<p class="cwe-small">' + esc(o.specs) + "</p>" : "") + priceBlock("About +" + money(cat.wellPricing.additionalTank), "Only if your test calls for it. Not in your price below.") + (ou ? '<a class="cwe-btn ghost sm no-print" href="' + esc(ou) + '" target="_blank" rel="noopener">Download the brochure</a>' : "") + "</div>";
    });

    // Totals
    var fin = "";
    if (cat.financing && cat.financing.enabled && cat.financing.options) {
      fin = " " + cat.financing.options.map(function (o) { return "About " + money(monthly(r.totals.at, o.apr, o.months)) + " per month at " + esc(o.label) + "."; }).join(" ");
    }
    if (well && r.totals.tanks) {
      h += '<div class="cwe-total"><span class="lbl">Your estimated range</span><span class="amt">' + range(r.totals.min, r.totals.max) + "</span>" +
        '<span class="fin">About ' + money(r.totals.at) + " with a " + esc(sz.label) + (r.totals.tanks > 1 ? ": a " + r.totals.tanks + "-tank system at " + money(r.totals.system) : "") + (r.totals.flats ? " plus " + money(r.totals.flats) + " in add-ons" : "") + "." + fin + "</span></div>";
    } else {
      h += '<div class="cwe-total"><span class="lbl">Your estimated installed price</span><span class="amt">' + money(r.totals.at) + "</span>" + (fin ? '<span class="fin">' + fin.trim() + "</span>" : "") + "</div>";
    }

    if (fin && cat.financing.note) { h += '<p class="cwe-small">' + esc(cat.financing.note) + "</p>"; }
    h += adjustPanel(cat, st);

    // Well: price by tank size
    if (well && r.totals.tanks) {
      h += "<h3>How price changes with tank size</h3><p class=\"cwe-small\">A bigger tank removes more. Your row is highlighted. Add-ons stay the same at every size.</p><div style=\"overflow-x:auto\"><table><thead><tr><th>Tank</th><th>Built for</th><th class=\"num\">" + (r.totals.tanks > 1 ? r.totals.tanks + "-tank system" : "System") + "</th>" + (r.totals.flats ? '<th class="num">Add-ons</th>' : "") + '<th class="num">Total</th></tr></thead><tbody>';
      cat.sizes.forEach(function (s) {
        var sys = tankSystemPrice(cat, r.totals.tankCodes, s.id);
        var built = r.totals.tankCodes.map(function (c) { var p = cat.products[c]; var txt = p.sizing && p.sizing[s.id] ? p.sizing[s.id] : s.fits; return r.totals.tankCodes.length > 1 ? "<b>" + esc(p.name.replace("ClearWave ", "")) + ":</b> " + esc(txt) : esc(txt); }).join("<br>");
        h += '<tr class="' + (s.id === r.sizeId ? "pick" : "") + '"><td>' + esc(s.label) + "</td><td>" + built + '</td><td class="num">' + money(sys) + "</td>" + (r.totals.flats ? '<td class="num">' + money(r.totals.flats) + "</td>" : "") + '<td class="num">' + money(sys + r.totals.flats) + "</td></tr>";
      });
      h += "</tbody></table></div>";
    }

    // City: compare the tiers
    if (!well && r.core.length && cat.cityCompare) {
      var cols = cat.cityCompare.columns;
      h += "<h3>How the collection compares</h3><p class=\"cwe-small\">Your system is highlighted. Every whole-home tier includes softening.</p><div style=\"overflow-x:auto\"><table><thead><tr><th></th>" + cols.map(function (c) { return '<th class="num' + (c === r.core[0] ? " pick" : "") + '">' + esc(cat.products[c].name.replace("ClearWave ", "").replace("Meridian Diamond Edition", "Diamond")) + "</th>"; }).join("") + "</tr></thead><tbody>";
      cat.cityCompare.rows.forEach(function (row) {
        h += "<tr><td>" + esc(row.label) + "</td>" + cols.map(function (c, i) {
          var v = row.v === "price" ? money(cat.products[c].price.flat) : ({ y: '<span style="color:#0B73BA;font-weight:800">&#10003;</span>', p: '<span style="color:#C8871B" title="Less effective">partial</span>', n: '<span style="color:#B03A2E">&ndash;</span>' })[row.v.charAt(i)];
          return '<td class="num"' + (c === r.core[0] ? ' style="background:#E3FBF3;font-weight:700"' : "") + ">" + v + "</td>";
        }).join("") + "</tr>";
      });
      h += "</tbody></table></div>";
    }

    // Included with every system
    if (cat.included && cat.included.length) { h += "<h3>Included with every ClearWave system</h3><ul class=\"cwe-diag\">" + cat.included.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }

    h += '<div class="cwe-note good">' + esc(well ? cat.copy.priceNoteWell : cat.copy.priceNoteCity) + "</div>";

    h += "<h3>Next step</h3><p>" + esc(cat.copy.nextStep) + "</p><div class=\"cwe-cta no-print\">" +
      '<a class="cwe-btn green" href="' + esc(cat.company.phoneHref) + '">Call ' + esc(cat.company.phone) + "</a>" +
      '<a class="cwe-btn" href="' + esc(cat.company.smsHref) + "?&body=" + encodeURIComponent("Hi ClearWave, my estimate is " + st.id + ". I would like to talk about my water.") + '">Text us</a>' +
      (cfg.booking ? '<a class="cwe-btn" href="' + esc(cfg.booking) + '" target="_blank" rel="noopener">Book a free assessment</a>' : "") +
      '<button type="button" class="cwe-btn ghost" id="cwe-print">Save as PDF</button>' +
      '<a class="cwe-btn ghost" id="cwe-mail" href="#">Email this to ClearWave</a>' +
      '<button type="button" class="cwe-btn ghost sm" id="cwe-restart">Start over</button></div>';
    if (st.sent) { h += '<p class="cwe-small no-print">We have your estimate and will follow up shortly. Check your email for the brochure.</p>'; }
    return h;
  }

  function summary(cat, st) {
    var r = st.result, sz = sizeLabel(cat, r.sizeId);
    return {
      estimateId: st.id, source: st.source, zip: st.zip, region: r.region ? r.region.name : null,
      size: sz.label, tanks: r.totals.tanks, core: r.core, addons: r.addons, alt: r.alt, causes: r.causes,
      goal: st.city.goal, concerns: st.city.concerns, symptoms: st.well.symptoms, ignoreLarge: !!(st.adjust && st.adjust.ignoreLarge),
      totalAtSize: r.totals.at, totalMin: r.totals.min, totalMax: r.totals.max
    };
  }

  function mailto(cat, st) {
    var s = summary(cat, st), r = st.result;
    var lines = ["Estimate " + st.id + " (" + today() + ")", "", "Name: " + st.contact.name, "Email: " + st.contact.email, "Phone: " + st.contact.phone, "ZIP: " + st.zip + (s.region ? " (" + s.region + ")" : ""), "Water: " + (st.source === "well" ? "Well" : "City"), "Home: " + st.home.baths + " baths, " + st.home.people + " people, size " + s.size, "",
      "Recommended: " + r.items.map(function (it) { return it.product.name + (it.price != null ? " " + money(it.price) : ""); }).join(", "), (r.totals.tanks ? r.totals.tanks + "-tank system " + money(r.totals.system) + " at " + s.size + ". " : "") + "Total: " + range(r.totals.min, r.totals.max), "", "Notes: " + st.contact.notes];
    return "mailto:" + cat.company.email + "?subject=" + encodeURIComponent("Water estimate " + st.id) + "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function sendLead(cat, st, cfg) {
    var payload = {
      estimateId: st.id, createdAt: new Date().toISOString(), campaign: cfg.campaign, pageUrl: location.href, referrer: document.referrer,
      contact: st.contact, zip: st.zip, cityName: st.cityName, source: st.source,
      home: st.home, city: st.city, well: { symptoms: st.well.symptoms, tested: st.well.tested, lab: st.well.lab, drinking: st.well.drinking },
      labReport: st.well.file ? { name: st.well.file.name, type: st.well.file.type, size: st.well.file.size, dataUrl: st.well.file.data } : null,
      recommendation: summary(cat, st),
      items: st.result.items.map(function (it) { return { code: it.code, name: it.product.name, role: it.role, tank: it.tank, price: it.price, brochure: brochureUrl(cat, it.product) }; }),
      systemPrice: st.result.totals.system, tanks: st.result.totals.tanks
    };
    emit("lead", { estimateId: st.id, source: st.source, totalAtSize: st.result.totals.at });
    try { if (typeof window.fbq === "function") { window.fbq("track", "Lead", { content_name: "water_estimate", value: st.result.totals.at, currency: "USD" }); } } catch (e) {}
    try { if (typeof window.gtag === "function") { window.gtag("event", "generate_lead", { value: st.result.totals.at, currency: "USD" }); } } catch (e) {}
    try { localStorage.setItem("cw_last_estimate", JSON.stringify(payload.recommendation)); } catch (e) {}
    if (!cfg.endpoint) { return; }
    var body = JSON.stringify(payload);
    // text/plain avoids a CORS preflight, which Zapier and most hook services accept.
    fetch(cfg.endpoint, { method: "POST", mode: "cors", headers: { "Content-Type": "text/plain" }, body: body })
      .then(function () { st.sent = true; })
      .catch(function () { return fetch(cfg.endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: body }).then(function () { st.sent = true; }); })
      .catch(function () {});
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); } else { boot(); }
})();
