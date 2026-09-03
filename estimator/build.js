/*
 * Builds single-file versions of the estimator for landing page builders
 * that only accept one pasted HTML block.
 *
 *   node build.js
 *
 * Outputs:
 *   dist/clearwave-estimator.html   full page, ready to host anywhere
 *   dist/clearwave-estimator-snippet.html   paste into an HTML block
 */
const fs = require("fs");
const path = require("path");
const here = __dirname;
// A literal closing script tag inside inlined JS would end the block early.
const safe = (js) => js.replace(/<\/script/gi, "<\\/script");
const catalog = safe(fs.readFileSync(path.join(here, "catalog.js"), "utf8"));
const widget = safe(fs.readFileSync(path.join(here, "estimator.js"), "utf8"));
const page = fs.readFileSync(path.join(here, "index.html"), "utf8");

const snippet = '<div id="clearwave-estimator"></div>\n<script>\n' + catalog + '\n</script>\n<script>\n' + widget + '\n</script>\n';
fs.mkdirSync(path.join(here, "dist"), { recursive: true });
fs.writeFileSync(path.join(here, "dist", "clearwave-estimator-snippet.html"), snippet);

const full = page.replace(
  /<div id="clearwave-estimator"><\/div>[\s\S]*?<script src="estimator\.js"><\/script>/,
  (m) => snippet.trim()
);
fs.writeFileSync(path.join(here, "dist", "clearwave-estimator.html"), full);
console.log("Built dist/clearwave-estimator.html and dist/clearwave-estimator-snippet.html");
