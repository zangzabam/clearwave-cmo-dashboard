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
.cwe{--navy:#0F2E4C;--blue-deep:#1A5CA4;--blue:#1C74B8;--bright:#2597D8;--green:#22C776;--green-lt:#63E2A2;--amber:#C8871B;--red:#B03A2E;--paper:#fff;--tint:#F3F7FA;--rule:#D2DCE4;--muted:#5A6B78;\
 font-family:Georgia,'Iowan Old Style','Times New Roman',serif;color:var(--navy);background:var(--paper);line-height:1.5;font-size:16px;max-width:760px;margin:0 auto;border:1px solid var(--rule);box-sizing:border-box}\
.cwe *{box-sizing:border-box}\
.cwe h1,.cwe h2,.cwe h3,.cwe h4,.cwe .cwe-sans,.cwe button,.cwe input,.cwe select,.cwe textarea,.cwe table{font-family:'Helvetica Neue','Arial Narrow',Arial,sans-serif}\
.cwe-head{display:flex;align-items:center;gap:14px;padding:16px 22px;border-top:3px solid var(--blue-deep);border-bottom:1px solid var(--rule)}\
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
.cwe-note.good{border-left-color:var(--green)}\
.cwe-err{color:var(--red);font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;margin:8px 0 0;min-height:1em}\
.cwe-nav{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:22px;padding-top:16px;border-top:1px solid var(--rule)}\
.cwe-btn{appearance:none;border:1px solid var(--blue-deep);background:var(--blue-deep);color:#fff;padding:12px 22px;font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;border-radius:2px;text-decoration:none;display:inline-block;text-align:center}\
.cwe-btn:hover{background:var(--blue)}\
.cwe-btn.ghost{background:#fff;color:var(--blue-deep)}\
.cwe-btn.green{background:var(--green);border-color:var(--green);color:var(--navy)}\
.cwe-btn.sm{padding:8px 14px;font-size:13px}\
.cwe-btn[disabled]{opacity:.5;cursor:default}\
.cwe-step{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}\
.cwe table{width:100%;border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums;margin:8px 0 12px}\
.cwe th,.cwe td{border:1px solid var(--rule);padding:8px 10px;text-align:left;vertical-align:top}\
.cwe th{background:var(--navy);color:#fff;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase}\
.cwe tbody tr:nth-child(even) td{background:var(--tint)}\
.cwe td.num,.cwe th.num{text-align:right;white-space:nowrap}\
.cwe tr.pick td{background:#E4F7EE !important;font-weight:700}\
.cwe-tag{display:inline-block;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:2px 7px;background:var(--green);color:var(--navy);font-weight:700;margin-left:6px;vertical-align:middle}\
.cwe-card{border:1px solid var(--rule);border-top:4px solid var(--blue-deep);padding:16px 18px;margin:12px 0}\
.cwe-card.alt{border-top-color:var(--rule)}\
.cwe-card .nm{font-family:'Helvetica Neue',Arial,sans-serif;font-size:19px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin:0}\
.cwe-card .hl{margin:4px 0 8px}\
.cwe-card ul{margin:0 0 8px;padding-left:18px;font-size:14px}\
.cwe-card .pr{font-family:'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:800;color:var(--blue-deep);font-variant-numeric:tabular-nums}\
.cwe-card .pr small{font-size:12px;color:var(--muted);font-weight:400;letter-spacing:.06em;text-transform:uppercase;display:block}\
.cwe-total{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;background:var(--navy);color:#fff;padding:16px 18px;margin:16px 0}\
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
.cwe-spin{display:inline-block;width:14px;height:14px;border:2px solid #fff;border-right-color:transparent;border-radius:50%;animation:cwe-spin .7s linear infinite;vertical-align:-2px;margin-right:6px}\
@keyframes cwe-spin{to{transform:rotate(360deg)}}\
@media print{body>*{display:none !important}body>.cwe-print-root{display:block !important}.cwe{border:0;max-width:none;font-size:12px}.cwe-nav,.cwe-cta,.cwe-prog,.cwe .no-print{display:none !important}.cwe-head{border-top-width:3px}.cwe-body{padding:0 0.2in}@page{size:letter;margin:0.6in 0.7in}}";

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
  function pickSize(cat, baths, people) {
    for (var i = 0; i < cat.sizingRules.length; i++) {
      var r = cat.sizingRules[i];
      if (baths <= r.maxBaths && people <= r.maxPeople) { return r.size; }
    }
    return cat.sizes[cat.sizes.length - 1].id;
  }
  function priceFor(p, sizeId) { return p.price.flat != null ? p.price.flat : p.price[sizeId]; }
  function priceMin(p, cat) { return p.price.flat != null ? p.price.flat : p.price[cat.sizes[0].id]; }
  function priceMax(p, cat) { return p.price.flat != null ? p.price.flat : p.price[cat.sizes[cat.sizes.length - 1].id]; }
  function region(cat, zip) {
    var pre = String(zip || "").slice(0, 3);
    for (var i = 0; i < cat.regions.length; i++) { if (cat.regions[i].prefixes.indexOf(pre) >= 0) { return cat.regions[i]; } }
    return null;
  }

  function recommend(cat, st) {
    var sizeId = pickSize(cat, st.home.baths, st.home.people);
    var core = [], addons = [], alt = null, diagnosis = [], causes = [], notes = [];
    var reg = region(cat, st.zip);
    var waterNote = (reg && reg.water) || cat.defaultWaterNote;

    if (st.source === "city") {
      var goal = null; cat.cityGoals.forEach(function (g) { if (g.id === st.city.goal) { goal = g; } });
      var tier = goal && goal.core ? cat.products[goal.core].tier : 0;
      var add = goal ? goal.addons.slice() : [];
      st.city.concerns.forEach(function (id) {
        cat.cityConcerns.forEach(function (c) {
          if (c.id !== id) { return; }
          if (c.addon) { add.push(c.addon); }
          if (c.minTier && tier > 0 && c.minTier > tier) { tier = c.minTier; notes.push("We moved you up a tier because you checked \"" + c.label + ".\""); }
          if (c.minTier && tier === 0) { notes.push("\"" + c.label + "\" is a whole-home concern. Reverse osmosis handles it at the sink. A whole-home system handles every tap and shower."); }
        });
      });
      if (tier > 0) {
        Object.keys(cat.products).forEach(function (k) { var p = cat.products[k]; if (p.family === "city" && p.tier === tier) { core.push(k); } });
      }
      diagnosis.push(waterNote);
      if (goal) { diagnosis.push("Your main goal: " + goal.label.toLowerCase() + ". " + goal.sub); }
      addons = uniq(add);
    } else {
      var cs = {};
      st.well.symptoms.forEach(function (id) { cat.wellSymptoms.forEach(function (s) { if (s.id === id) { cs[s.cause] = 1; } }); });
      var labHits = [];
      cat.labFields.forEach(function (f) {
        var v = st.well.lab[f.id];
        if (v == null || v === "") { return; }
        var hit = false;
        if (f.type === "yesno") { hit = v === "yes"; }
        else if (f.limitLow != null) { hit = Number(v) < f.limitLow; }
        else { hit = Number(v) > f.limit; }
        if (hit) { cs[f.cause] = 1; labHits.push(f.label + ": " + esc(v) + " (" + f.note + ")"); }
      });
      causes = Object.keys(cs);
      var has = function (c) { return cs[c] === 1; };
      var heavyIron = (has("iron") && has("manganese")) || Number(st.well.lab.iron) > 3;

      if (has("iron") && has("sulfur")) { core.push("AERO"); if (heavyIron) { core.push("FERRO"); } }
      else if (has("sulfur")) { core.push("AERO"); }
      else if (has("iron") || has("manganese")) { core.push("FERRO"); }
      else if (has("taste")) { core.push("FERRO"); notes.push("Bad taste alone is usually iron or manganese. We show the most common fix. A free water test will confirm it."); }
      if (has("acid")) { core.push("ELARA"); }
      if (has("hardness")) { addons.push("CASCADE"); }
      if (has("sediment")) { addons.push("SEDIMENT"); }
      if (has("bacteria")) { addons.push("UV"); }
      if (st.well.drinking) { addons.push("PURA"); }

      var problemCount = ["iron", "manganese", "sulfur", "acid", "hardness", "sediment"].filter(has).length;
      if (problemCount >= 3 && cat.products.POSEIDON) { alt = "POSEIDON"; }

      if (!causes.length) {
        notes.push("You did not report any problems, so we show the most common well water system in our area. A free water test tells us exactly what you need.");
        core.push("AERO");
      }
      causes.forEach(function (c) { if (cat.causes[c]) { diagnosis.push(cat.causes[c].plain); } });
      if (labHits.length) { diagnosis.push("From your lab numbers: " + labHits.join("; ") + "."); }
      if (reg && reg.water) { diagnosis.push(reg.water); }
    }

    core = uniq(core); addons = uniq(addons);
    // With no whole-home system, the first add-on is the recommendation.
    if (!core.length && addons.length) { core = [addons.shift()]; }
    var items = core.concat(addons).map(function (k) {
      var p = cat.products[k];
      return { code: k, product: p, role: core.indexOf(k) >= 0 ? "core" : "addon", price: priceFor(p, sizeId), min: priceMin(p, cat), max: priceMax(p, cat) };
    });
    var totals = { at: 0, min: 0, max: 0 };
    items.forEach(function (it) { totals.at += it.price; totals.min += it.min; totals.max += it.max; });

    return { sizeId: sizeId, region: reg, items: items, core: core, addons: addons, alt: alt, causes: causes, diagnosis: diagnosis, notes: notes, totals: totals };
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
      return head("Step 1", "Where is your home?", "We serve Virginia, Maryland, and Washington, DC. Your ZIP code also tells us about your local water.") +
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
        '<div class="cwe-opts" style="margin-top:14px"><label class="cwe-opt ' + (state.well.drinking ? "on" : "") + '"><input type="checkbox" id="cwe-drink" ' + (state.well.drinking ? "checked" : "") + '><span><b>I also want reverse osmosis drinking water</b><small>Bottled-water quality at the kitchen sink.</small></span></label></div>';
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
      return head("Step " + n, "Tell us about your home", "This sets the tank size. Bigger homes need more flow.") +
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
      if (r && r.served === true) { n.innerHTML = '<div class="cwe-note good"><b>' + esc(r.name) + "</b>. Good news, we serve your area." + (r.water ? " " + esc(r.water) : "") + "</div>"; }
      else if (r && r.served === "maybe") { n.innerHTML = '<div class="cwe-note warn"><b>' + esc(r.name) + "</b>. We may be able to serve your area. Finish the estimate and we will confirm.</div>"; }
      else { n.innerHTML = '<div class="cwe-note warn">We do not serve that ZIP code yet. You can still get an estimate, and we will let you know if that changes.</div>'; }
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
      if (s === "symptoms") { state.well.symptoms = checked("sym"); state.well.drinking = !!body.querySelector("#cwe-drink").checked; }
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
      var rs = body.querySelector("#cwe-restart"); if (rs) { rs.onclick = function () { stepIdx = 0; state.result = null; state.sent = false; state.id = estimateId(); root.querySelector(".cwe-foot span:last-child").textContent = "Estimate " + state.id; render(); }; }
      var m = body.querySelector("#cwe-mail"); if (m) { m.href = mailto(cat, state); }
    }

    function printEstimate() {
      var clone = root.querySelector(".cwe").cloneNode(true);
      var wrap = document.createElement("div"); wrap.className = "cwe-print-root"; wrap.appendChild(clone);
      document.body.appendChild(wrap);
      window.print();
      setTimeout(function () { document.body.removeChild(wrap); }, 500);
    }

    render();
  }

  // ------------------------------------------------------------------
  // Results page
  // ------------------------------------------------------------------
  function sizeLabel(cat, id) { for (var i = 0; i < cat.sizes.length; i++) { if (cat.sizes[i].id === id) { return cat.sizes[i]; } } return { label: id, fits: "" }; }

  function resultsHtml(cat, st, cfg) {
    var r = st.result, sz = sizeLabel(cat, r.sizeId);
    var h = '<p class="cwe-eyebrow">' + esc(cat.copy.resultsTitle) + "</p><h2>" + (st.contact.name ? esc(st.contact.name.split(" ")[0]) + ", here is your estimate." : "Here is your estimate.") + "</h2>" +
      '<div class="cwe-meta"><span>Estimate ' + esc(st.id) + "</span><span>" + esc(today()) + "</span><span>" + esc(st.source === "well" ? "Well water" : "City water") + (r.region ? " &middot; " + esc(r.region.name) : "") + " " + esc(st.zip) + "</span></div>";

    h += "<h3>What your water is telling us</h3><ul class=\"cwe-diag\">" + r.diagnosis.map(function (d) { return "<li>" + d + "</li>"; }).join("") + "</ul>";
    r.notes.forEach(function (n) { h += '<div class="cwe-note">' + esc(n) + "</div>"; });

    var anySized = r.items.some(function (it) { return it.product.price.flat == null; });
    h += "<h3>Recommended for your home</h3>" + (anySized ? "<p class=\"cwe-small\">Sized for <b>" + esc(st.home.baths) + (st.home.baths >= 6 ? "+" : "") + " bathrooms</b> and <b>" + esc(st.home.people) + (st.home.people >= 8 ? "+" : "") + " people</b>: a <b>" + esc(sz.label) + "</b> tank. Prices are installed.</p>" : "<p class=\"cwe-small\">Prices are installed.</p>");
    if (!r.items.length) { h += '<div class="cwe-note warn">We could not match a system from your answers. Call us and we will sort it out in five minutes.</div>'; }
    r.items.forEach(function (it) {
      var p = it.product;
      h += '<div class="cwe-card' + (it.role === "addon" ? " alt" : "") + '"><p class="nm">' + esc(p.name) + (it.role === "core" ? '<span class="cwe-tag">Recommended</span>' : '<span class="cwe-tag" style="background:#D2DCE4">Add-on</span>') + '</p><p class="hl">' + esc(p.headline) + "</p><ul>" + p.solves.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        '<p class="pr">' + (p.price.flat != null ? money(it.price) : money(it.price) + " <span style=\"font-size:14px;color:#5A6B78;font-weight:400\">at " + esc(sz.label) + " (" + range(it.min, it.max) + " across all sizes)</span>") + "<small>Installed price, estimated</small></p>" +
        (p.brochure ? '<a class="cwe-btn ghost sm no-print" href="' + esc(p.brochure) + '" target="_blank" rel="noopener">Download the brochure</a>' : "") + "</div>";
    });
    if (r.alt) {
      var a = cat.products[r.alt];
      h += '<div class="cwe-card alt"><p class="cwe-eyebrow">Or, one complete system</p><p class="nm">' + esc(a.name) + '</p><p class="hl">' + esc(a.headline) + '</p><p class="pr">' + money(priceFor(a, r.sizeId)) + " <span style=\"font-size:14px;color:#5A6B78;font-weight:400\">at " + esc(sz.label) + " (" + range(priceMin(a, cat), priceMax(a, cat)) + " across all sizes)</span><small>Installed price, estimated</small></p></div>";
    }

    // Totals
    h += '<div class="cwe-total"><span class="lbl">Your estimated range</span><span class="amt">' + range(r.totals.min, r.totals.max) + "</span>";
    h += '<span class="fin">' + (anySized ? "About " + money(r.totals.at) + " at the " + esc(sz.label) + " size we recommend." : "Installed, estimated.") + (cat.financing && cat.financing.enabled ? " Or about " + money(monthly(r.totals.at, cat.financing.apr, cat.financing.months)) + " per month " + esc(cat.financing.label) + "." : "") + "</span></div>";

    // Size table
    var sized = r.items.filter(function (it) { return it.product.price.flat == null; });
    if (sized.length) {
      h += "<h3>How price changes with tank size</h3><p class=\"cwe-small\">Your row is highlighted. Flat-price add-ons stay the same at every size.</p><div style=\"overflow-x:auto\"><table><thead><tr><th>Tank</th><th>Fits</th>" + sized.map(function (it) { return '<th class="num">' + esc(it.product.name.replace("ClearWave ", "")) + "</th>"; }).join("") + '<th class="num">Total</th></tr></thead><tbody>';
      cat.sizes.forEach(function (s) {
        var tot = 0;
        r.items.forEach(function (it) { tot += priceFor(it.product, s.id); });
        h += '<tr class="' + (s.id === r.sizeId ? "pick" : "") + '"><td>' + esc(s.label) + "</td><td>" + esc(s.fits) + "</td>" + sized.map(function (it) { return '<td class="num">' + money(priceFor(it.product, s.id)) + "</td>"; }).join("") + '<td class="num">' + money(tot) + "</td></tr>";
      });
      h += "</tbody></table></div>";
    }

    // Service plan
    if (cat.servicePlan) { h += '<div class="cwe-note"><b>' + esc(cat.servicePlan.name) + ", " + money(cat.servicePlan.price) + " per month.</b> " + esc(cat.servicePlan.blurb) + "</div>"; }

    // Special circumstances + disclaimer
    h += "<h3>What could change the price</h3><ul class=\"cwe-diag\">" + cat.specialCircumstances.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul><p class=\"cwe-small\">" + esc(cat.copy.disclaimer) + "</p>";

    // CTA
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
      size: sz.label, core: r.core, addons: r.addons, alt: r.alt, causes: r.causes,
      goal: st.city.goal, concerns: st.city.concerns, symptoms: st.well.symptoms,
      totalAtSize: r.totals.at, totalMin: r.totals.min, totalMax: r.totals.max
    };
  }

  function mailto(cat, st) {
    var s = summary(cat, st), r = st.result;
    var lines = ["Estimate " + st.id + " (" + today() + ")", "", "Name: " + st.contact.name, "Email: " + st.contact.email, "Phone: " + st.contact.phone, "ZIP: " + st.zip + (s.region ? " (" + s.region + ")" : ""), "Water: " + (st.source === "well" ? "Well" : "City"), "Home: " + st.home.baths + " baths, " + st.home.people + " people, size " + s.size, "",
      "Recommended: " + r.items.map(function (it) { return it.product.name + " " + money(it.price); }).join(", "), "Range: " + range(r.totals.min, r.totals.max), "", "Notes: " + st.contact.notes];
    return "mailto:" + cat.company.email + "?subject=" + encodeURIComponent("Water estimate " + st.id) + "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function sendLead(cat, st, cfg) {
    var payload = {
      estimateId: st.id, createdAt: new Date().toISOString(), campaign: cfg.campaign, pageUrl: location.href, referrer: document.referrer,
      contact: st.contact, zip: st.zip, cityName: st.cityName, source: st.source,
      home: st.home, city: st.city, well: { symptoms: st.well.symptoms, tested: st.well.tested, lab: st.well.lab, drinking: st.well.drinking },
      labReport: st.well.file ? { name: st.well.file.name, type: st.well.file.type, size: st.well.file.size, dataUrl: st.well.file.data } : null,
      recommendation: summary(cat, st),
      items: st.result.items.map(function (it) { return { code: it.code, name: it.product.name, role: it.role, price: it.price, min: it.min, max: it.max, brochure: it.product.brochure }; })
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
