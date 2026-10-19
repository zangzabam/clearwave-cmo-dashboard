# ClearWave Water Estimator — Team Handoff

Last updated: October 19, 2026

## Links

| What | Where |
|---|---|
| Live demo to click through | https://claude.ai/code/artifact/9b0cfd4e-c3bd-4491-8000-03d7ec03b8ca |
| Code (GitHub) | https://github.com/zangzabam/clearwave-cmo-dashboard/tree/claude/clearway-water-estimator-j2ider/estimator |
| Download the code as a zip | https://github.com/zangzabam/clearwave-cmo-dashboard/archive/refs/heads/claude/clearway-water-estimator-j2ider.zip |
| Full technical notes | `estimator/README.md` in the same folder |

Note on the demo link: brochure download buttons do not work on the demo page. They work once the folder is on the website.

## What is in the folder

Open the zip. Everything you need is inside `estimator/`.

| File or folder | What it is | Who touches it |
|---|---|---|
| `catalog.js` | Prices, products, questions, rules, words | Whoever changes prices |
| `estimator.js` | The tool itself | Nobody, unless fixing a bug |
| `brochures/` | 9 product PDFs | Add new PDFs here |
| `index.html` | A full standalone page with the tool on it | Optional |
| `embed.html` | A bare page for use inside an iframe | Optional |
| `dist/clearwave-estimator-snippet.html` | One-file copy for landing page builders | Paste into HTML blocks |
| `build.js` | Rebuilds the one-file copy after a change | Run `node build.js` |

## Install on clearwavewater.com (WordPress + Elementor)

1. Upload the whole `estimator` folder to the website's public files. Use the file manager in the hosting control panel, or an FTP client. The goal is that this address opens in a browser and shows code: `https://clearwavewater.com/estimator/estimator.js`
2. Check a brochure loads too: `https://clearwavewater.com/estimator/brochures/clearwave-crest.pdf`
3. In Elementor, open the page where the tool should live. Drag an **HTML** widget onto it.
4. Paste these two lines into the HTML widget:

```html
<div id="clearwave-estimator"></div>
<script src="https://clearwavewater.com/estimator/estimator.js?v=1"></script>
```

5. Publish the page. Done.

## Install on a landing page builder (Unbounce, Leadpages, GoHighLevel, Wix, Squarespace)

Pick one:

**Option A, point at the website copy (best).** Add a custom HTML block and paste the same two lines above. The tool loads from clearwavewater.com. Add `data-source="well"` to the script tag on a well water page to skip the city/well question:

```html
<div id="clearwave-estimator"></div>
<script src="https://clearwavewater.com/estimator/estimator.js?v=1" data-source="well" data-campaign="meta-well-richmond"></script>
```

**Option B, paste everything.** Open `dist/clearwave-estimator-snippet.html`, copy all of it, paste into a custom HTML block. Before doing this, set `brochureBaseAbsolute` in `catalog.js` to `"https://clearwavewater.com/estimator/brochures/"` and run `node build.js`, or the brochure buttons will not work.

**Option C, iframe.** Host `embed.html` and use:

```html
<iframe id="cw-est" src="https://clearwavewater.com/estimator/embed.html" style="width:100%;border:0;height:900px"></iframe>
<script>window.addEventListener("message",function(e){if(e.data&&e.data.cw==="height"){document.getElementById("cw-est").style.height=e.data.height+"px"}});</script>
```

## Settings on the script tag

| Add to the script tag | What it does |
|---|---|
| `data-source="well"` or `"city"` | Skips the "where does your water come from" step |
| `data-campaign="any-name"` | Tags every lead from that page so you know where it came from |
| `data-endpoint="https://hooks.zapier.com/..."` | Where leads are sent (see below) |
| `data-booking="https://calendly.com/..."` | Shows a "Book a free assessment" button |

## Where leads go

Right now leads are **not sent anywhere automatically**. The customer sees the estimate, can save it as a PDF, and can email it to support@clearwavewater.com with one click. To capture every lead:

1. In Zapier, make a Zap that starts with **Webhooks by Zapier: Catch Hook**. Copy the hook URL.
2. Put that URL in `catalog.js` as `leadEndpoint`, or on the script tag as `data-endpoint`.
3. Add Zap steps: email the customer their estimate and brochure, create the client in Jobber, text the sales team.

Every finished estimate posts name, email, phone, ZIP, every answer, the recommended products and prices, the campaign tag, and the lab report file if one was attached.

The tool also fires `Lead` to the Meta pixel and `generate_lead` to Google if those are on the page.

## Changing prices or products

Open `catalog.js`. Everything is labeled. Common edits:

- City price: find the product (CREST, MERIDIAN, and so on) and change `price: { flat: 8487 }`.
- Well tank prices: the `wellPricing` block. Iron tanks and lighter tanks have their own lines by tank size.
- Financing lines: the `financing` block. Set `enabled: false` to hide them.
- Bonus list: the `included` list.
- Brochure: put the PDF in `brochures/` and set `brochure: "file-name.pdf"` on the product.

After editing, save the file to the server. The website embed picks it up on the next page load. If you use the pasted snippet, run `node build.js` and re-paste.

**Watch the commas.** A missing comma or quote breaks the tool. Test on a hidden page first.

## Cloudflare

The site sits behind Cloudflare, which caches scripts. After any change, either purge the cache in Cloudflare, or bump the number in `estimator.js?v=1` to `?v=2` on the page.

## Still open (placeholders in the catalog)

- UV Light price is set to $1,800. Confirm.
- Terra and Flow single-tank well prices copy the Aero line ($6,000 / $8,000 / $10,000). Confirm.
- Meridian Diamond Edition links to the regular Meridian brochure. A Diamond brochure exists on Google Drive and can be added.
- Elara has no brochure button. An Elara brochure exists on Google Drive and can be added.
- No lead webhook or booking link is set yet.

## Support

Changes have been made in this Claude Code session so far. Any teammate can also edit `catalog.js` directly by following the notes above.
