/*
 * ClearWave Water Solutions — Estimator Catalog
 * ------------------------------------------------
 * This is the ONE file you edit to change products, prices, sizes, and words.
 * The widget (estimator.js) reads it and never needs to change.
 *
 * PRICING NOTE: every price below is an installed price PLACEHOLDER. They were
 * seeded from average Jobber sale prices per product line. Replace them with
 * your real price book before going live. Prices only change for special
 * circumstances (see `specialCircumstances` at the bottom).
 *
 * Product names shown to customers must be the new collection names only.
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
  // Ask for name + email/phone before showing the estimate.
  requireContact: true,
  // Show an "about $X per month" line. Turn on once financing terms are set.
  financing: { enabled: false, months: 120, apr: 9.99, label: "with approved financing" },
  // Monthly service plan shown on every estimate. Set to null to hide.
  servicePlan: {
    name: "ClearWave Concierge",
    price: 99,
    blurb: "We track and swap your filters, service the system every year, and you get priority phone support. No ordering. No guessing."
  },

  // Tank sizes. The estimator picks one from bathrooms + people, then shows
  // every size so the customer can see how price moves with size.
  sizes: [
    { id: "s10", label: "1.0 cu ft", fits: "1 to 2 bathrooms, up to 2 people" },
    { id: "s15", label: "1.5 cu ft", fits: "2 to 3 bathrooms, 3 to 4 people" },
    { id: "s20", label: "2.0 cu ft", fits: "3 to 4 bathrooms, 4 to 6 people" },
    { id: "s25", label: "2.5 cu ft", fits: "5 or more bathrooms, or 7 or more people" }
  ],

  // Sizing rule. First match wins.
  sizingRules: [
    { maxBaths: 2, maxPeople: 2, size: "s10" },
    { maxBaths: 3, maxPeople: 4, size: "s15" },
    { maxBaths: 4, maxPeople: 6, size: "s20" },
    { maxBaths: 99, maxPeople: 99, size: "s25" }
  ],

  // ---------------------------------------------------------------------
  // PRODUCTS
  // kind: "core" systems are the main recommendation. "addon" systems are
  // offered alongside. price is either { sizeId: price } or a flat number.
  // brochure: a URL to the PDF brochure (null hides the button).
  // ---------------------------------------------------------------------
  products: {
    // ---------- CITY WATER COLLECTION (four tiers) ----------
    CREST: {
      name: "ClearWave Crest",
      family: "city",
      kind: "core",
      tier: 1,
      headline: "Whole-home carbon filtration for softer skin, healthier hair, and better-tasting water.",
      solves: ["Chlorine taste and smell", "Dry, itchy skin", "Dull, brittle hair", "Chlorine in shower steam"],
      price: { s10: 5200, s15: 5700, s20: 6300, s25: 6900 },
      brochure: null
    },
    MERIDIAN: {
      name: "ClearWave Meridian",
      family: "city",
      kind: "core",
      tier: 2,
      headline: "Dual-stage catalytic filtration engineered for chloramine, trihalomethanes, and everyday health.",
      solves: ["Chlorine and chloramine", "Trihalomethanes (THMs)", "Disinfection byproducts", "Taste, odor, skin, and hair"],
      price: { s10: 8400, s15: 9200, s20: 10000, s25: 10900 },
      brochure: null
    },
    SOVEREIGN: {
      name: "ClearWave Sovereign",
      family: "city",
      kind: "core",
      tier: 3,
      headline: "Multi-stage advanced filtration for the contaminants a carbon filter alone will not touch.",
      solves: ["PFAS (forever chemicals)", "Microplastics", "Lead and heavy metals", "Pharmaceuticals", "Chlorine, chloramine, and THMs"],
      price: { s10: 9800, s15: 10700, s20: 11600, s25: 12600 },
      brochure: null
    },
    PINNACLE: {
      name: "ClearWave Pinnacle",
      family: "city",
      kind: "core",
      tier: 4,
      headline: "The most complete whole-home purity we offer. Every tap. Every shower. Uncompromising.",
      solves: ["Everything Sovereign removes", "Broadest contaminant reduction available", "Highest flow for larger homes", "Full-home purity for sensitive households"],
      price: { s10: 14500, s15: 15900, s20: 17300, s25: 18800 },
      brochure: null
    },

    // ---------- WELL WATER COLLECTION ----------
    FERRO: {
      name: "ClearWave Ferro",
      family: "well",
      kind: "core",
      headline: "Engineered iron and manganese removal. Ends orange and black staining at the source.",
      solves: ["Orange or red staining", "Black or brown staining", "Metallic taste", "Iron in laundry"],
      price: { s10: 5300, s15: 5900, s20: 6400, s25: 6900 },
      brochure: null
    },
    AERO: {
      name: "ClearWave Aero",
      family: "well",
      kind: "core",
      headline: "Air-injection oxidation that removes hydrogen sulfide and iron together. No chemicals.",
      solves: ["Rotten egg smell", "Hydrogen sulfide", "Clear-water (ferrous) iron", "Sulfur taste"],
      price: { s10: 5900, s15: 6300, s20: 6800, s25: 7300 },
      brochure: null
    },
    POSEIDON: {
      name: "ClearWave Poseidon",
      family: "well",
      kind: "core",
      headline: "Our complete well water system for water with several problems at once.",
      solves: ["Iron and sulfur", "Hardness", "Sediment", "Low pH", "Taste and odor"],
      price: { s10: 12500, s15: 13800, s20: 15200, s25: 16800 },
      brochure: null
    },
    ELARA: {
      name: "ClearWave Elara",
      family: "well",
      kind: "core",
      headline: "Acid neutralization that raises low pH and protects copper plumbing from pinhole leaks.",
      solves: ["Blue-green stains on fixtures", "Pinhole leaks", "Low pH (acidic water)", "Copper in water"],
      price: { s10: 3300, s15: 3600, s20: 3900, s25: 4300 },
      brochure: null
    },

    // ---------- SHARED ADD-ONS ----------
    CASCADE: {
      name: "ClearWave Cascade",
      family: "both",
      kind: "addon",
      headline: "Precision water softening. No more scale, spots, or dry skin from hard water.",
      solves: ["Hard water scale", "Spots on dishes and glass", "Soap that will not lather", "Dry skin from hardness"],
      price: { s10: 3600, s15: 4000, s20: 4500, s25: 5000 },
      brochure: null
    },
    PURA: {
      name: "ClearWave Pura",
      family: "both",
      kind: "addon",
      headline: "Reverse osmosis drinking water at the kitchen sink, with leak detection.",
      solves: ["Drinking and cooking water", "Fluoride, nitrates, and dissolved solids", "Bottled-water taste from the tap"],
      price: { flat: 2300 },
      brochure: null
    },
    UV: {
      name: "ClearWave UV Disinfection",
      family: "well",
      kind: "addon",
      headline: "Ultraviolet disinfection for bacteria and viruses. Nothing added to the water.",
      solves: ["Coliform or E. coli", "Untested or shallow wells", "Peace of mind after flooding"],
      price: { flat: 1800 },
      brochure: null
    },
    SEDIMENT: {
      name: "Sediment Pre-Filter",
      family: "well",
      kind: "addon",
      headline: "Catches sand, silt, and grit before it reaches your system or your fixtures.",
      solves: ["Cloudy water", "Sand or grit", "Clogged aerators"],
      price: { flat: 550 },
      brochure: null
    }
  },

  // ---------------------------------------------------------------------
  // CITY WATER GOALS. The customer picks one. It maps to a core tier.
  // ---------------------------------------------------------------------
  cityGoals: [
    { id: "drinking", label: "Better drinking water only", sub: "Clean water at the kitchen sink.", core: null, addons: ["PURA"] },
    { id: "skin_hair", label: "Fix my skin and hair", sub: "Chlorine is drying you out.", core: "CREST", addons: [] },
    { id: "health", label: "Whole-home health", sub: "Chlorine, chloramine, and trihalomethanes out of every tap and shower.", core: "MERIDIAN", addons: [] },
    { id: "advanced", label: "Remove the hard stuff", sub: "PFAS, microplastics, lead, and pharmaceuticals from the whole home.", core: "SOVEREIGN", addons: [] },
    { id: "complete", label: "The most complete purity available", sub: "Nothing left to chance.", core: "PINNACLE", addons: [] }
  ],

  // Extra city concerns (checkboxes). Each can bump the tier or add an add-on.
  cityConcerns: [
    { id: "scale", label: "Scale, spots on dishes, or soap scum", addon: "CASCADE" },
    { id: "drinking", label: "I also want reverse osmosis drinking water", addon: "PURA" },
    { id: "pfas", label: "PFAS or forever chemicals", minTier: 3 },
    { id: "microplastics", label: "Microplastics", minTier: 3 },
    { id: "thm", label: "Trihalomethanes or disinfection byproducts", minTier: 2 },
    { id: "lead", label: "Lead or old pipes", minTier: 3 },
    { id: "sensitive", label: "Someone at home has eczema, allergies, or a health condition", minTier: 2 }
  ],

  // ---------------------------------------------------------------------
  // WELL WATER SYMPTOMS. Each symptom points at a likely cause.
  // ---------------------------------------------------------------------
  wellSymptoms: [
    { id: "orange", label: "Orange or red staining in tubs, toilets, or laundry", cause: "iron" },
    { id: "black", label: "Black or brown staining, or dark slime", cause: "manganese" },
    { id: "egg", label: "Rotten egg smell", cause: "sulfur" },
    { id: "bluegreen", label: "Blue-green stains on sinks or fixtures", cause: "acid" },
    { id: "pinhole", label: "Pinhole leaks or corroded copper pipes", cause: "acid" },
    { id: "itchy", label: "Itchy or dry skin, soap will not lather, spots on dishes", cause: "hardness" },
    { id: "taste", label: "Metallic or bad taste", cause: "taste" },
    { id: "cloudy", label: "Cloudy water, sand, or grit", cause: "sediment" },
    { id: "sick", label: "Tested positive for bacteria, or the well has never been tested", cause: "bacteria" }
  ],

  // Plain-language names for each cause, used in the diagnosis.
  causes: {
    iron: { label: "ferrous or ferric iron", plain: "Iron. It leaves orange and red stains and a metallic taste." },
    manganese: { label: "manganese", plain: "Manganese. It leaves black or brown stains and can stain laundry." },
    sulfur: { label: "hydrogen sulfide", plain: "Hydrogen sulfide gas. That is the rotten egg smell." },
    acid: { label: "low pH (acidic water)", plain: "Acidic water. It slowly eats copper pipes, which causes blue-green stains and pinhole leaks." },
    hardness: { label: "hard water", plain: "Hard water. Calcium and magnesium cause scale, spots, and dry skin." },
    taste: { label: "taste and odor", plain: "Taste and odor. Usually iron, manganese, or low pH is behind it." },
    sediment: { label: "sediment", plain: "Sediment. Sand and silt from the well." },
    bacteria: { label: "possible bacteria", plain: "Possible bacteria. A UV system protects you without chemicals." }
  },

  // Lab numbers a customer can type in if they have a report. Each rule
  // adds a cause when the number crosses the limit.
  labFields: [
    { id: "iron", label: "Iron (mg/L or ppm)", limit: 0.3, cause: "iron", note: "EPA secondary limit is 0.3 mg/L" },
    { id: "manganese", label: "Manganese (mg/L)", limit: 0.05, cause: "manganese", note: "EPA secondary limit is 0.05 mg/L" },
    { id: "h2s", label: "Hydrogen sulfide (mg/L)", limit: 0.05, cause: "sulfur", note: "Most people smell it above 0.05 mg/L" },
    { id: "ph", label: "pH", limitLow: 6.5, cause: "acid", note: "Below 6.5 is acidic" },
    { id: "hardness", label: "Hardness (grains per gallon)", limit: 7, cause: "hardness", note: "7 gpg and up is hard" },
    { id: "coliform", label: "Coliform bacteria", type: "yesno", cause: "bacteria", note: "Any coliform is a fail" }
  ],

  // Regions by ZIP prefix (first three digits). Used to confirm service
  // area and to add a short local water note.
  regions: [
    { prefixes: ["200","202","203","204","205"], name: "Washington, DC", state: "DC", served: true, water: "DC Water uses chloramine (chlorine plus ammonia). It does not gas off like plain chlorine, so catalytic carbon is the better fit." },
    { prefixes: ["201","220","221","222","223"], name: "Northern Virginia", state: "VA", served: true, water: "Most Northern Virginia systems use chloramine and the water is moderately hard (about 6 grains per gallon, estimated)." },
    { prefixes: ["224","225"], name: "Fredericksburg", state: "VA", served: true, water: "A mix of city water and private wells. Wells here often show iron and low pH." },
    { prefixes: ["229"], name: "Charlottesville", state: "VA", served: true, water: "City water is chlorinated. Wells in the county often show hardness, iron, and low pH." },
    { prefixes: ["230","231","232","238"], name: "Richmond metro", state: "VA", served: true, water: "Richmond-area city water is chlorinated and moderately hard (estimated). Chesterfield and Hanover wells often show iron and sulfur." },
    { prefixes: ["233","234","235","236","237"], name: "Virginia Beach / Hampton Roads", state: "VA", served: true, water: "Hampton Roads systems use chloramine. Shallow wells in the area often show iron, sulfur, and hardness." },
    { prefixes: ["206","207","208","209"], name: "Maryland (Montgomery and Prince George's)", state: "MD", served: true, water: "WSSC water uses chloramine and is moderately hard (estimated)." },
    { prefixes: ["210","211","212","214","217","218","219"], name: "Maryland", state: "MD", served: true, water: "" },
    { prefixes: ["226","227","228","239","240","241","242","243","244","245","246"], name: "Virginia", state: "VA", served: true, water: "" },
    { prefixes: ["270","271","272","273","274","275","276","277","278","279"], name: "Northern North Carolina", state: "NC", served: "maybe", water: "" }
  ],
  // Fallback water assumptions when no local note exists (brand standard).
  defaultWaterNote: "Most city water in our area is disinfected with chlorine or chloramine (about 5 mg/L, estimated) and is moderately hard (about 6 grains per gallon, estimated).",

  // Things that can move the price. Shown on every estimate.
  specialCircumstances: [
    "Long plumbing runs or a system that must sit far from the main line",
    "Crawlspace, attic, or outdoor installs that need extra work",
    "Well pump or pressure tank problems found on site",
    "Lab results that show very high levels of a contaminant",
    "Homes with more than 5 bathrooms or very high water use"
  ],

  // Words on the results page.
  copy: {
    resultsTitle: "Your ClearWave Estimate",
    disclaimer: "This is an estimate, not a quote. Final pricing comes from a free on-site water assessment. Prices only change for the special circumstances listed here.",
    nextStep: "Ready to fix your water? Call or text us and we will get your system scheduled.",
    labUploadNote: "Have a lab report? Attach it and we will read it before we call."
  }
};
