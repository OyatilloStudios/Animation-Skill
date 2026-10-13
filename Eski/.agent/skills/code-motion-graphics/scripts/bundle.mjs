// Inline local <script src="..."> files into one self-contained HTML (easy to share / open anywhere).
// Usage: node bundle.mjs film.html film-single.html
import fs from 'node:fs'; import path from 'node:path';
const [inp, out] = process.argv.slice(2); if (!inp || !out) { console.log('usage: node bundle.mjs film.html out.html'); process.exit(1); }
const dir = path.dirname(path.resolve(inp));
const html = fs.readFileSync(inp, 'utf8').replace(/<script\s+src="([^"]+)"\s*><\/script>/g, (m, src) => {
  if (/^https?:/.test(src)) return m; const p = path.join(dir, src); if (!fs.existsSync(p)) { console.warn('missing', src); return m; }
  return '<script>\n' + fs.readFileSync(p, 'utf8').replace(/<\/script/gi, '<\\/script') + '\n</script>'; });
fs.writeFileSync(out, html); console.log('bundled →', out, (html.length / 1024).toFixed(0) + ' KB');
