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

**Your site.** clearwavewater.com runs WordPress with Elementor behind
Cloudflare. That means:

1. Upload the `estimator` folder to the site (for example with the file
   manager in your host's control panel, or an FTP client) so that
   `https://clearwavewater.com/estimator/estimator.js` loads in a browser.
2. In Elementor, drag an **HTML** widget onto the page and paste the two
   lines from Option 1 below. Publish. That is the whole install.
3. For a landing page in a different builder, use Option 2 or 3.

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

**City water.** The customer picks one main goal. It maps to a tier. Every
whole-home tier includes softening, so no separate softener is added.

| Goal | System | Installed price |
|---|---|---|
| Better drinking water only | Elara (reverse osmosis) | $2,499 |
| Soft water only | Flow | $5,477 |
| Essentials Protection | Crest | $8,487 |
| Signature Protection | Meridian, or Sovereign for a larger home | $10,477 or $12,847 |
| Estate Protection | Meridian Diamond Edition, or Pinnacle for a larger home | $15,396 or $17,396 |

The three package names match the sales deck. A larger home is 4+ bathrooms
or 6+ people. Extra concerns can still move a customer up: lead,
pharmaceuticals, THMs, or a sensitive household means at least Meridian; PFAS
or nitrates means at least Sovereign; microplastics means at least the
Diamond Edition. The results page shows the collection comparison table with
the recommended column highlighted.

**Well water.** Each symptom points to a cause. Causes map to systems:

| What they see | Likely cause | System |
|---|---|---|
| Orange or red stains | Dissolved (ferrous) iron | Ferro (iron, manganese, and softening in one tank) |
| Stains plus rotten egg smell | Ferrous iron and sulfur | Ferro plus Aero (two tanks) |
| Rusty water from the tap plus stains, or very high iron | Ferric and ferrous iron | Poseidon plus Ferro (two tanks). Poseidon also handles the sulfur smell. |
| Rusty water alone | Ferric iron | Poseidon (rare, with a note that a test may add a Ferro) |
| Black or brown stains | Manganese | Ferro |
| Rotten egg smell alone | Hydrogen sulfide | Aero |
| Blue-green stains, pinhole leaks | Low pH | Terra (always first in line) |
| Itchy skin, spots, soap will not lather | Hardness | Flow, unless a Ferro is already there (it softens too) |
| Near farmland or septic | Nitrates | Pura (nitrate removal plus softening) |
| Bacteria, or never tested | Possible bacteria | UV Light (add-on) |

Lab numbers override symptoms (iron above 0.3 mg/L, pH below 6.5, hardness at
7 gpg or more, nitrate above 10 mg/L, any coliform).

**Well pricing rule.** Every well system is priced by tank, not per product.
Iron tanks (Ferro, Poseidon) run $8,000 (10-inch), $9,000 (12-inch), or
$13,000 (13-inch). Lighter tanks (Aero, and for now Terra and Flow as
placeholders) run $6,000, $8,000, or $10,000. With more than one tank the
priciest tank sets the base and each extra tank adds $1,000, so Ferro plus
Aero at 10-inch is $9,000. Flat add-ons (UV) are added on top.

**Tank sizing.** Tank size is about how much the tank can remove, not house
size. Every well system starts at 10-inch. Each product carries its own
wording for what each size handles (iron ppm for Ferro, rust for Poseidon,
hydrogen sulfide for Aero, pH for Terra, hardness for Flow). Lab numbers move
the size up: iron above 10 and 20 ppm, manganese above 3 and 5 ppm, hardness
above 30 and 40 gpg, pH below 6.0 and 5.5. Edit `capacitySizing` and each
product's `sizing` in the catalog to change them.

## Changing prices and products

Open `catalog.js`.

```js
price: { flat: 8487 }            // fixed installed price (city tiers, add-ons)
price: { tank: true }            // well tank, priced by the wellPricing rule
price: { flat: 5477, tank: true } // Flow: fixed on city water, a tank on well water
wellPricing: { singleTank: { s10: 8000, s12: 9000, s13: 13000 }, additionalTank: 1000 }
```

**Still placeholders, marked PLACEHOLDER in the file:**

- UV Light price (set to $1,800)
- Pura has no brochure yet

Financing shows two example lines from the sales deck (10.9% APR over 144
months, and 0% for 24 months) plus a note that other plans exist. Edit
`financing.options` to change them or set `enabled: false` to hide them.

Brochures live in `brochures/` and the download button appears on any product
that has a `brochure` file name. The city brochures were compressed from about
20 MB each to under 1 MB so they load fast on a phone. Set
`brochureBaseAbsolute` to the hosted folder URL before using the one-file build.

Old product names (FerroMax, SorbMax, H2O Protector, and so on) must not appear
in the catalog. Customers can view the file.

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
