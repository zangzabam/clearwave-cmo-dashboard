/*
 * ClearWave Water Solutions — Estimator Catalog
 * ------------------------------------------------
 * This is the ONE file you edit to change products, prices, questions,
 * regions, and words. The widget (estimator.js) reads it.
 *
 * PRICING
 *  - City water tiers use the installed prices from the Jobber quote template.
 *  - Well water is priced by tank count: a single tank is about $8,000 to
 *    $9,000, and each extra tank adds $1,000. Larger 13-inch tanks cost more.
 *    See `wellPricing` below. Items marked PLACEHOLDER still need a real number.
 *
 * Product names shown to customers must be the collection names only.
 */
window.CLEARWAVE_CATALOG = {
  company: {
    name: "ClearWave Water Solutions",
    tagline: "Pure Water, Pure Life",
    phone: "757-828-8594",
    phoneHref: "tel:+17578288594",
    smsHref: "sms:+17578288594",
    email: "support@clearwavewater.com",
    website: "clearwavewater.com",
    websiteHref: "https://clearwavewater.com"
  },

  // Where estimates and leads go. Leave null to skip.
  // Best option: a Zapier "Catch Hook" URL. Zapier can then email the
  // brochure, create the client in Jobber, and text you the lead.
  leadEndpoint: null,
  // Calendly (or any booking) link. Leave null to hide the "Book" button.
  bookingUrl: null,
  // Ask for name + email + phone before showing the estimate.
  requireContact: true,
  // Products included free with every whole-home system. They are only
  // charged when the customer wants that product by itself.
  includedWithSystem: ["ELARA"],
  // Folder where the brochure PDFs live, relative to estimator.js.
  brochureBase: "brochures/",
  // Full URL to that folder once hosted (used by the one-file build, which
  // has no script location to resolve against). Example:
  // "https://clearwavewater.com/estimator/brochures/"
  brochureBaseAbsolute: null,

  // Financing lines on the estimate. From the 2026 sales deck: 10.9% APR
  // over 144 months, and 0% for 24 months. These are examples; the note
  // says other terms and rates exist.
  financing: {
    enabled: true,
    options: [
      { label: "10.9% APR over 144 months", apr: 10.9, months: 144 },
      { label: "0% financing for 24 months", apr: 0, months: 24 }
    ],
    note: "Financing examples only. Several plans are available with different terms and rates, and you can apply right from your quote."
  },

  // Shown on every estimate. From the Jobber quote template and brochures.
  included: [
    "Limited lifetime warranty on the tank, valve, media, and labor",
    "3 years of annual service free: salt, recalibration, filter changes, and water testing",
    "5-year soap and cleaning package made for your system",
    "Before-and-after drinking water lab test mailed to you",
    "90-day price match guarantee",
    "If our solution does not fix the problem, we work with you for free until it is fixed",
    "Veteran-owned. All products made in the USA"
  ],

  // ---------------------------------------------------------------------
  // TANK SIZES (well water). Size is about how much the tank can remove,
  // not house size. A 10-inch tank can go on a large home. Levels below
  // come from the Ferro and Poseidon spec sheets.
  // ---------------------------------------------------------------------
  sizes: [
    { id: "s10", label: "10-inch tank", fits: "Light levels" },
    { id: "s12", label: "12-inch tank", fits: "Moderate levels" },
    { id: "s13", label: "13-inch tank", fits: "Heavy levels" }
  ],
  // Every well system starts at 10-inch. Lab numbers move it up. First match wins.
  // "below" is used for pH, where lower is worse.
  capacitySizing: [
    { field: "iron", above: 20, size: "s13" }, { field: "iron", above: 10, size: "s12" },
    { field: "manganese", above: 5, size: "s13" }, { field: "manganese", above: 3, size: "s12" },
    { field: "hardness", above: 40, size: "s13" }, { field: "hardness", above: 30, size: "s12" },
    { field: "ph", below: 5.5, size: "s13" }, { field: "ph", below: 6.0, size: "s12" }
  ],
  sizeNote: "Most homes start with a 10-inch tank. Tank size is set by how much your water needs removed, not by the size of your house. Your free water test sets the final size.",

  // Well water pricing rule.
  // Single-tank price by tank size. Iron tanks (Ferro, Poseidon) use the
  // default. Lighter tanks have their own line. With more than one tank the
  // priciest tank sets the base and each extra tank adds additionalTank.
  wellPricing: {
    singleTank: {
      default: { s10: 8000, s12: 9000, s13: 13000 },
      AERO: { s10: 6000, s12: 8000, s13: 10000 },
      TERRA: { s10: 6000, s12: 8000, s13: 10000 },   // PLACEHOLDER, same as Aero
      FLOW: { s10: 6000, s12: 8000, s13: 10000 }     // PLACEHOLDER, same as Aero
    },
    additionalTank: 1000,
    note: "Each extra tank adds about $1,000."
  },

  // "Large home" for city water. Inside a package the larger system is
  // picked (Signature: Sovereign, Estate: Pinnacle) for higher flow.
  largeHome: { minBaths: 4, minPeople: 6 },

  // ---------------------------------------------------------------------
  // PRODUCTS
  // family: city | well | both.  kind: core | addon.
  // price: { flat: N } for a fixed installed price, { tank: true } for well
  // tanks priced by the wellPricing rule.
  // ---------------------------------------------------------------------
  products: {
    // ---------- CITY WATER COLLECTION ----------
    FLOW: {
      package: "Tier 1 of 3: Essentials Protection",
      name: "ClearWave Flow",
      family: "both",
      kind: "addon",
      tier: 0,
      tagline: "The foundation of a refined home begins with the water inside it.",
      headline: "Whole-home water softening with high cross-link resin and a garnet filtration bed.",
      solves: ["Hard water scale", "Spots on glass and dishes", "Dry skin and dull laundry", "Water heater and fixture protection"],
      specs: "48,000 grains. 10 GPM. Single tank.",
      // City: fixed price. Well: counts as one tank under the wellPricing rule.
      sizing: { s10: "Hardness up to 30 grains", s12: "Hardness up to 40 grains", s13: "Hardness of 50 grains or more" },
      price: { flat: 5477, tank: true },
      brochure: "clearwave-flow.pdf"
    },
    CREST: {
      package: "Tier 1 of 3: Essentials Protection",
      name: "ClearWave Crest",
      family: "city",
      kind: "core",
      tier: 1,
      tagline: "What most companies call their best, we call our starting point.",
      headline: "Catalytic carbon filtration and softening in one intelligent tank. Chlorine and chloramine out, scale gone.",
      solves: ["Chlorine and chloramine", "Dry skin and brittle hair", "Chemical taste and odor", "Hard water scale"],
      specs: "48,000 grains. 10 GPM. 3-stage media. Single tank.",
      price: { flat: 8487 },
      brochure: "clearwave-crest.pdf"
    },
    MERIDIAN: {
      package: "Tier 2 of 3: Signature Protection",
      name: "ClearWave Meridian",
      family: "city",
      kind: "core",
      tier: 2,
      tagline: "Where science meets sophistication.",
      headline: "Four premium media in one system. Chlorine, chloramine, VOCs, heavy metals, and hardness handled together.",
      solves: ["Chlorine, chloramine, and disinfection byproducts", "VOCs and trihalomethanes", "Lead and heavy metals", "Pharmaceuticals", "Hard water scale"],
      specs: "48,000 grains. 10 GPM. 4 media plus anti-bacteria and garnet layers. Single 10-inch tank.",
      price: { flat: 10477 },
      brochure: "clearwave-meridian.pdf"
    },
    SOVEREIGN: {
      package: "Tier 2 of 3: Signature Protection",
      name: "ClearWave Sovereign",
      family: "city",
      kind: "core",
      tier: 3,
      tagline: "Approaching distilled quality from every tap.",
      headline: "Catalytic carbon, KDF, anion filtration, and a multi-media DI resin bed. Soft water without the slippery feel.",
      solves: ["PFOA and PFOS (forever chemicals)", "Nitrates and sulfates", "Lead and mercury", "Pharmaceuticals and emerging contaminants", "Chlorine and chloramine", "Hardness, with no slippery feel"],
      specs: "64,000 grains. 15+ GPM. 13-inch tank. Uses 33% less water.",
      price: { flat: 12847 },
      brochure: "clearwave-sovereign.pdf"
    },
    DIAMOND: {
      package: "Tier 3 of 3: Estate Protection",
      name: "ClearWave Meridian Diamond Edition",
      family: "city",
      kind: "core",
      tier: 4,
      tagline: "Meridian performance in a larger 13-inch tank.",
      headline: "The full Meridian media stack in a 13-inch single tank, with microplastic and PFAS reduction for larger homes.",
      solves: ["Microplastics", "PFOA and PFOS", "Chlorine, chloramine, and VOCs", "Lead and heavy metals", "Pharmaceuticals", "Hard water scale at high flow"],
      specs: "13-inch single tank. Higher flow for larger homes.",
      price: { flat: 15396 },
      brochure: "clearwave-meridian.pdf"
    },
    PINNACLE: {
      package: "Tier 3 of 3: Estate Protection",
      name: "ClearWave Pinnacle",
      family: "city",
      kind: "core",
      tier: 5,
      tagline: "The summit of water purity.",
      headline: "Dual-tank architecture, six premium media stages, and 80,000 grain capacity. Filtered water 24/7, even during regeneration.",
      solves: ["Everything the Meridian Diamond removes", "Microplastics and PFOA/PFOS", "Free radicals", "24/7 protection with two tanks", "Commercial flow for large homes", "WiFi valve with remote diagnostics"],
      specs: "80,000 grains. 15+ GPM. Two 10-inch tanks. WiFi-enabled valve.",
      price: { flat: 17396 },
      brochure: "clearwave-pinnacle.pdf"
    },
    ELARA: {
      name: "ClearWave Elara",
      family: "both",
      kind: "addon",
      headline: "3-stage reverse osmosis drinking water at the kitchen sink, with a 2-gallon tank and an alkaline remineralizer filter. Included free with every whole-home system.",
      solves: ["Drinking and cooking water", "Fluoride, nitrates, and dissolved solids", "Alkaline remineralizer puts healthy minerals back", "Bottled-water taste from the tap"],
      specs: "Under-sink. 3-stage reverse osmosis plus alkaline remineralizer. 2-gallon tank.",
      price: { flat: 2499 },
      brochure: null
    },

    // ---------- WELL WATER COLLECTION (priced by tank) ----------
    FERRO: {
      name: "ClearWave Ferro",
      family: "well",
      kind: "core",
      tagline: "Where iron ends. Water begins.",
      headline: "Removes dissolved iron and manganese and softens your water in the same pass. One tank. Two jobs.",
      solves: ["Orange and rust staining", "Manganese (black staining)", "Hard water scale", "Metallic taste", "Dingy laundry"],
      specs: "Iron and manganese up to 30 ppm. 10, 12, or 13-inch tank. Smart metered valve.",
      sizing: { s10: "Iron up to 10 ppm", s12: "Iron up to 20 ppm", s13: "Iron of 30 ppm or more" },
      price: { tank: true },
      brochure: "clearwave-ferro.pdf"
    },
    POSEIDON: {
      name: "ClearWave Poseidon",
      family: "well",
      kind: "core",
      tagline: "Pure water, powered by air.",
      headline: "Air-injection oxidation removes ferric and ferrous iron, manganese, and the rotten-egg smell of sulfur. No salt. No chemicals.",
      solves: ["Rusty or orange-looking water (ferric iron)", "Dissolved iron (ferrous)", "Manganese", "Rotten egg smell", "Salt-free and chemical-free"],
      specs: "Ferric iron up to 30+ ppm. 10, 12, or 13-inch tank. Self-cleaning air-recharge backwash.",
      sizing: { s10: "Rust (ferric iron) up to 10 ppm", s12: "Rust up to 20 ppm", s13: "Rust of 30 ppm or more" },
      price: { tank: true },
      brochure: "clearwave-poseidon.pdf"
    },
    AERO: {
      name: "ClearWave Aero",
      family: "well",
      kind: "core",
      tagline: "Air does the work.",
      headline: "Air over catalytic carbon. Off-gasses hydrogen sulfide, then traps chlorine, chemicals, and bad taste.",
      solves: ["Rotten egg smell", "Hydrogen sulfide", "Bad taste and odor", "Chlorine, chloramine, and THMs"],
      specs: "10, 12, or 13-inch tank. Self-cleaning air-recharge backwash.",
      sizing: { s10: "Light hydrogen sulfide, a faint smell at hot taps", s12: "Moderate hydrogen sulfide, a smell at every tap", s13: "Heavy hydrogen sulfide, a strong smell through the whole home" },
      price: { tank: true },
      brochure: "clearwave-aero.pdf"
    },
    TERRA: {
      name: "ClearWave Terra",
      family: "well",
      kind: "core",
      tagline: "Earth's correction, engineered.",
      headline: "Natural coral calcite raises low pH with no chemicals. Protects copper pipes from pinhole leaks and stops blue-green stains.",
      solves: ["Low pH (acidic water)", "Pinhole leaks and copper corrosion", "Blue-green staining", "Sour or metallic taste"],
      specs: "Coral calcite media. 10, 12, or 13-inch tank. Self-cleaning backwash.",
      sizing: { s10: "Mildly acidic water, pH 6.0 to 6.9", s12: "Acidic water, pH 5.5 to 6.0", s13: "Very acidic water, pH below 5.5" },
      price: { tank: true },
      brochure: "clearwave-terra.pdf"
    },
    PURA: {
      name: "ClearWave Pura",
      family: "well",
      kind: "core",
      headline: "Nitrate removal and water softening in one system.",
      solves: ["Nitrates from farms and septic", "Hard water scale", "Spots and dry skin"],
      specs: "10, 12, or 13-inch tank.",
      sizing: { s10: "Light nitrates", s12: "Moderate nitrates", s13: "Heavy nitrates" },
      price: { tank: true },
      brochure: null
    },
    UV: {
      name: "ClearWave UV Light",
      family: "well",
      kind: "addon",
      headline: "Whole-home biological purification. Bacteria, coliform, and viruses neutralized with light, not chemicals.",
      solves: ["Bacteria and coliform", "Virus neutralization", "Untested or shallow wells", "Chemical-free"],
      specs: "Inline UV chamber.",
      price: { flat: 1800 },   // PLACEHOLDER
      brochure: null
    }
  },

  // ---------------------------------------------------------------------
  // CITY WATER GOALS. The customer picks one. It maps to a core tier.
  // ---------------------------------------------------------------------
  cityGoals: [
    { id: "drinking", label: "Better drinking water only", sub: "Clean water at the kitchen sink. Nothing else.", core: null, addons: ["ELARA"] },
    { id: "soft", label: "Soft water only", sub: "Stop scale, spots, and dry skin from hard water.", core: "FLOW", addons: [] },
    { id: "essentials", label: "Essentials Protection", sub: "Hardness, chlorine, and the everyday stuff that ruins skin, hair, and fixtures.", core: "CREST", addons: [] },
    { id: "signature", label: "Signature Protection", sub: "Deeper removal of chromium-6, trihalomethanes, haloacetic acids, arsenic, and lead. More media contact time as city water changes.", core: "MERIDIAN", largeCore: "SOVEREIGN", addons: [] },
    { id: "estate", label: "Estate Protection", sub: "Large homes, heavy water use, or simply the best on the market.", core: "DIAMOND", largeCore: "PINNACLE", addons: [] }
  ],

  // Extra city concerns. minTier moves the customer up a tier.
  cityConcerns: [
    { id: "thm", label: "Trihalomethanes or haloacetic acids (disinfection byproducts)", minTier: 2 },
    { id: "chromium", label: "Chromium-6", minTier: 2 },
    { id: "voc", label: "VOCs (volatile organic compounds)", minTier: 2 },
    { id: "lead", label: "Lead or old pipes", minTier: 2 },
    { id: "pharma", label: "Pharmaceuticals", minTier: 2 },
    { id: "sensitive", label: "Someone at home has eczema, allergies, or a health condition", minTier: 2 },
    { id: "pfas", label: "PFAS or forever chemicals", minTier: 3 },
    { id: "nitrates", label: "Nitrates", minTier: 3 },
    { id: "microplastics", label: "Microplastics", minTier: 4 }
  ],

  // Feature rows for the city comparison table (from the system comparison
  // chart). y = yes, n = no, p = partial (less effective).
  cityCompare: {
    columns: ["FLOW", "CREST", "MERIDIAN", "SOVEREIGN", "DIAMOND", "PINNACLE"],
    rows: [
      { label: "Softening (scale)", v: "yyyyyy" },
      { label: "Chlorine and chloramine", v: "nyyyyy" },
      { label: "VOCs and THMs", v: "nyyyyy" },
      { label: "Heavy metals (lead)", v: "npyyyy" },
      { label: "Pharmaceuticals", v: "npyyyy" },
      { label: "Nitrates", v: "npyyyy" },
      { label: "PFOA / PFOS", v: "nnpyyy" },
      { label: "Microplastics", v: "nnnnyy" },
      { label: "Free radicals", v: "nnnyyy" },
      { label: "No slippery feel", v: "nnnynn" },
      { label: "Dual tank, 24/7 filtration", v: "nnnnny" },
      { label: "Installed price", v: "price" }
    ]
  },

  // ---------------------------------------------------------------------
  // WELL WATER SYMPTOMS. Each symptom points at a likely cause.
  // ---------------------------------------------------------------------
  wellSymptoms: [
    { id: "orange", label: "Orange or red stains in tubs, toilets, or laundry", cause: "iron" },
    { id: "rusty", label: "Water comes out of the tap orange or rusty, or has rust particles", cause: "ferric" },
    { id: "black", label: "Black or brown stains, or dark slime", cause: "manganese" },
    { id: "egg", label: "Rotten egg smell", cause: "sulfur" },
    { id: "bluegreen", label: "Blue-green stains on sinks or fixtures", cause: "acid" },
    { id: "pinhole", label: "Pinhole leaks or corroded copper pipes", cause: "acid" },
    { id: "itchy", label: "Itchy or dry skin, soap will not lather, spots on dishes", cause: "hardness" },
    { id: "taste", label: "Metallic or bad taste", cause: "taste" },
    { id: "cloudy", label: "Cloudy water, sand, or grit", cause: "sediment" },
    { id: "farm", label: "Near farmland or an old septic field (nitrate risk)", cause: "nitrate" },
    { id: "sick", label: "Tested positive for bacteria, or the well has never been tested", cause: "bacteria" }
  ],

  // Plain-language names for each cause, used in the diagnosis.
  causes: {
    iron: { plain: "Dissolved (ferrous) iron. It is clear in the glass but leaves orange and red stains. This is the most common well problem we see." },
    ferric: { plain: "Ferric iron. Iron that has already turned to rust particles in the water. It needs air oxidation, and it usually comes with dissolved iron too." },
    manganese: { plain: "Manganese. It leaves black or brown stains and can stain laundry." },
    sulfur: { plain: "Hydrogen sulfide gas. That is the rotten egg smell." },
    acid: { plain: "Acidic water (low pH). It slowly eats copper pipes, which causes blue-green stains and pinhole leaks." },
    hardness: { plain: "Hard water. Calcium and magnesium cause scale, spots, and dry skin." },
    taste: { plain: "Taste and odor. Usually iron, sulfur, or low pH is behind it." },
    sediment: { plain: "Sediment. Sand and silt from the well. We handle this with a pre-filter at install." },
    nitrate: { plain: "Possible nitrates. Common near farms and septic fields, and a health concern for infants." },
    bacteria: { plain: "Possible bacteria. A UV system protects you without chemicals." }
  },

  // Lab numbers a customer can type in if they have a report.
  labFields: [
    { id: "iron", label: "Iron (mg/L or ppm)", limit: 0.3, cause: "iron", note: "EPA limit is 0.3 mg/L" },
    { id: "manganese", label: "Manganese (mg/L)", limit: 0.05, cause: "manganese", note: "EPA limit is 0.05 mg/L" },
    { id: "h2s", label: "Hydrogen sulfide (mg/L)", limit: 0.05, cause: "sulfur", note: "Most people smell it above 0.05" },
    { id: "ph", label: "pH", limitLow: 6.5, cause: "acid", note: "Below 6.5 is acidic" },
    { id: "hardness", label: "Hardness (grains per gallon)", limit: 7, cause: "hardness", note: "7 gpg and up is hard" },
    { id: "nitrate", label: "Nitrate (mg/L as N)", limit: 10, cause: "nitrate", note: "EPA limit is 10 mg/L" },
    { id: "coliform", label: "Coliform bacteria", type: "yesno", cause: "bacteria", note: "Any coliform is a fail" }
  ],

  // Regions by ZIP prefix (first three digits). Used only for the local
  // water note. A ZIP that is not listed still gets a full estimate.
  regions: [
    { prefixes: ["200","202","203","204","205"], name: "Washington, DC", state: "DC", water: "DC Water uses chloramine (chlorine plus ammonia). It does not gas off like plain chlorine, so catalytic carbon is the right tool." },
    { prefixes: ["201","220","221","222","223"], name: "Northern Virginia", state: "VA", water: "Most Northern Virginia systems use chloramine and the water is moderately hard (about 6 grains per gallon, estimated)." },
    { prefixes: ["224","225"], name: "Fredericksburg", state: "VA", water: "A mix of city water and private wells. Wells here often show iron and low pH." },
    { prefixes: ["229"], name: "Charlottesville", state: "VA", water: "City water is chlorinated. Wells in the county often show hardness, iron, and low pH." },
    { prefixes: ["230","231","232","238"], name: "Richmond metro", state: "VA", water: "Richmond-area city water is chlorinated and moderately hard (estimated). Chesterfield and Hanover wells often show iron and sulfur." },
    { prefixes: ["233","234","235","236","237"], name: "Virginia Beach / Hampton Roads", state: "VA", water: "Hampton Roads systems use chloramine. Shallow wells in the area often show iron, sulfur, and hardness." },
    { prefixes: ["206","207","208","209"], name: "Maryland (Montgomery and Prince George's)", state: "MD", water: "WSSC water uses chloramine and is moderately hard (estimated)." },
    { prefixes: ["210","211","212","214","217","218","219"], name: "Maryland", state: "MD", water: "" },
    { prefixes: ["226","227","228","239","240","241","242","243","244","245","246"], name: "Virginia", state: "VA", water: "" },
    { prefixes: ["270","271","272","273","274","275","276","277","278","279"], name: "Northern North Carolina", state: "NC", water: "" }
  ],
  defaultWaterNote: "Most city water in our area is disinfected with chlorine or chloramine (about 5 mg/L, estimated) and is moderately hard (about 6 grains per gallon, estimated).",
  // Shown on every city water estimate. The most common findings in our area.
  cityCommonFinding: "The most common things we find in city water across our area are high chromium-6, trihalomethanes (TTHMs), and haloacetic acids (HAA5). The last two form when chlorine reacts with organic matter in the water. A whole-home carbon system is built to reduce all three.",

  copy: {
    resultsTitle: "Your ClearWave Estimate",
    priceNoteCity: "This is your installed price. It includes everything listed under \"Included with every ClearWave system.\" No surprises at the door.",
    priceNoteWell: "Your installed price depends only on tank size, shown in the table above. Wells are finicky, so we always do a free on-site water test before final sizing. If it shows more iron than a 10-inch tank can handle, we size up to the next tank.",
    nextStep: "Ready to fix your water? Call or text us and we will get your system scheduled.",
    labUploadNote: "Have a lab report? Attach it and we will read it before we call."
  }
};
