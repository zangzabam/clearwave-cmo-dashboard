# ClearWave Water System Estimator

A plug-and-play estimator for homeowners. They answer a few questions, and it
shows the ClearWave system that fits, an installed price range, and how price
changes with tank size. Every estimate is captured as a lead.

Everything is plain HTML and JavaScript. No framework, no build step needed
for the basic embed, no server. It works on any website or landing page.

## Files

| File | What it is |
|---|---|
| `catalog.js` | **The only file you edit.** Products, prices, sizes, questions, regions, and words. |
| `estimator.js` | The widget. Question flow, recommendation engine, results page, lead capture. |
| `index.html` | A full hosted page with the estimator on it. |
| `embed.html` | A bare page meant to be placed in an iframe. |
| `build.js` | Makes a one-file copy for landing page builders (`node build.js`). |
| `dist/clearwave-estimator.html` | One-file full page. Host it anywhere. |
| `dist/clearwave-estimator-snippet.html` | One-file snippet. Paste into any "custom HTML" block. |

## How to put it on a page

**Option 1. Script tag (best for clearwavewater.com).**
Upload the `estimator` folder to your web host, then put this where you want it:

```html
<div id="clearwave-estimator"></div>
<script src="https://clearwavewater.com/estimator/estimator.js"></script>
```

The script finds `catalog.js` next to itself. Optional settings go on the script tag:

```html
<script src="https://clearwavewater.com/estimator/estimator.js"
  data-source="well"
  data-campaign="meta-well-water-richmond"
  data-endpoint="https://hooks.zapier.com/hooks/catch/XXXX/YYYY/"
  data-booking="https://calendly.com/clearwave/assessment"></script>
```

| Attribute | What it does |
|---|---|
| `data-source="city"` or `"well"` | Skips the "where does your water come from" question. Use on a well water landing page. |
| `data-campaign` | A tag saved with every lead so you know which page it came from. |
| `data-endpoint` | Where leads are sent. Overrides `leadEndpoint` in the catalog. |
| `data-booking` | Booking link for the "Book a free assessment" button. |
| `data-target` | CSS selector of the element to render into, if not `#clearwave-estimator`. |
| `data-catalog` | Load a different catalog file (for example, a test price list). |

**Option 2. Paste one block (Unbounce, Leadpages, GoHighLevel, Wix, Squarespace code block).**
Run `node build.js`, open `dist/clearwave-estimator-snippet.html`, copy all of it,
and paste it into the page builder's HTML block. Nothing else to upload.

**Option 3. Iframe.**
Host `embed.html` and use:

```html
<iframe id="cw-est" src="https://clearwavewater.com/estimator/embed.html" style="width:100%;border:0;height:900px"></iframe>
<script>window.addEventListener("message",function(e){if(e.data&&e.data.cw==="height"){document.getElementById("cw-est").style.height=e.data.height+"px"}});</script>
```

## How it decides what to recommend

**City water.** The customer picks one main goal. It maps to a tier:

| Goal | System |
|---|---|
| Better drinking water only | Pura (reverse osmosis) |
| Fix my skin and hair | Crest |
| Whole-home health (chlorine, chloramine, THMs) | Meridian |
| Remove the hard stuff (PFAS, microplastics, lead, pharmaceuticals) | Sovereign |
| The most complete purity available | Pinnacle |

Extra concerns can move them up a tier (checking PFAS moves Crest to Sovereign)
or add Cascade (softening) and Pura (drinking water).

**Well water.** Each symptom points to a cause. Causes map to systems:

| Symptom | Likely cause | System |
|---|---|---|
| Orange or red stains | Iron | Ferro |
| Black or brown stains | Manganese | Ferro |
| Rotten egg smell | Hydrogen sulfide | Aero |
| Orange stains and rotten egg smell | Iron and hydrogen sulfide | Aero (plus Ferro when iron is heavy) |
| Blue-green stains, pinhole leaks | Low pH | Elara |
| Itchy skin, spots, soap will not lather | Hardness | Cascade (add-on) |
| Cloudy, sand, grit | Sediment | Sediment pre-filter (add-on) |
| Bacteria, or never tested | Possible bacteria | UV (add-on) |

If they have a lab report, the numbers override the symptoms (iron above
0.3 mg/L, pH below 6.5, hardness at 7 gpg or more, and so on). Three or more
well problems also shows Poseidon as a one-system alternative.

**Sizing.** Bathrooms and people pick a tank size (1.0, 1.5, 2.0, or 2.5 cu ft).
The results page shows the price at every size so the customer can see how the
number moves. Flat-price add-ons (Pura, UV, sediment) do not change with size.

## Changing prices and products

Open `catalog.js`. Each product has a `price` block:

```js
price: { s10: 5300, s15: 5900, s20: 6400, s25: 6900 }   // by tank size
price: { flat: 2300 }                                    // one price
```

The prices in there now are **placeholders seeded from average Jobber sale
prices per product line**. Replace them with your real installed price book
before going live. Also fill in `brochure` with a PDF link for each product
and the "Download the brochure" button appears on its own.

Old product names (FerroMax, SorbMax, H2O Protector, and so on) must not appear
in the catalog. Customers can view the file. Mapping used to seed pricing:

| Old Jobber line | Catalog product |
|---|---|
| H2O Shield / Single Carbon | Crest |
| H2O Protector / Dual Carbon | Meridian |
| Re-Ionator Pro Ultra | Sovereign |
| Super Protector | Pinnacle |
| FerroMax | Ferro |
| SorbMax Air / OxiMax Air | Aero |
| NeuMAX | Elara |
| H2O Sidekick | Cascade |
| H2O RO PRO (Leak Detection) | Pura |

This mapping is a best guess. Please confirm it.

## Where leads go

Set `leadEndpoint` in `catalog.js` (or `data-endpoint` on the script tag) to a
Zapier **Catch Hook** URL. Every finished estimate is sent there as JSON with
the contact info, ZIP, answers, the recommended products and prices, the lab
report as a file (if under 4 MB), and the campaign tag.

Suggested Zap:

1. Webhooks by Zapier: Catch Hook.
2. Gmail: send the customer their estimate and the brochure PDF for the product in `items[0].name`.
3. Jobber: create client and request.
4. SMS to you: "New estimate CW-... $X to $Y, well water, Richmond."

If no endpoint is set, nothing is lost. The customer still sees the estimate,
can save it as a PDF, and can email it to support@clearwavewater.com with one
click.

## Ad tracking

The widget fires these on its own, so your pixels can count conversions:

- `dataLayer` events: `cw_estimator_step`, `cw_estimator_result`, `cw_estimator_lead`
- Meta pixel: `fbq("track","Lead")` when a lead is captured
- Google: `gtag("event","generate_lead")` when a lead is captured
- DOM events on `window`: `cw:step`, `cw:result`, `cw:lead`

## Testing locally

```
cd estimator
python3 -m http.server 8080
```

Then open <http://localhost:8080/>. The page must be served over http, not opened
as a file, because the widget loads `catalog.js` from its own folder.
