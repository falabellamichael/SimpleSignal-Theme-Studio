// Independent catalog-wide contrast audit (double-checks repairPresetContrast).
// Reads the built out/presets.js and verifies every preset against the shipped
// contrast contract: core text 4.5:1, muted labels/icons/comments 3:1,
// alpha-aware compositing, syntax on editor AND chat code-block surfaces.
// Usage: node scripts/audit-contrast.cjs   (exit 1 on any failure)
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const presets = require(path.join(root, 'out', 'presets.js'));

function parse(hex) {
  let h = String(hex || '').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 && h.length !== 8) return null;
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16), a: h.length===8 ? parseInt(h.slice(6,8),16)/255 : 1 };
}
function comp(fg, bg) { return fg.a>=1 ? fg : { r: Math.round(fg.r*fg.a+bg.r*(1-fg.a)), g: Math.round(fg.g*fg.a+bg.g*(1-fg.a)), b: Math.round(fg.b*fg.a+bg.b*(1-fg.a)), a:1 }; }
function lum(c) { const f=(v)=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4}; return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b); }
function ratio(fgHex, bgHex, backdrop) {
  let fg = parse(fgHex), bg = parse(bgHex);
  if (!fg || !bg) return null;
  if (bg.a < 1) bg = comp(bg, parse(backdrop) || {r:30,g:30,b:30,a:1});
  fg = comp(fg, bg);
  const l1 = lum(fg), l2 = lum(bg);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
}

const CORE = [
  ['editor.foreground','editor.background'],['editor.foreground','editor.selectionBackground'],
  ['foreground','panel.background'],['foreground','chat.requestBackground'],['foreground','interactive.requestBackground'],
  ['foreground','textBlockQuote.background'],['foreground','editorWidget.background'],['foreground','sideBar.background'],
  ['editorHoverWidget.foreground','editorHoverWidget.background'],
  ['editorSuggestWidget.foreground','editorSuggestWidget.background'],
  ['editorSuggestWidget.selectedForeground','editorSuggestWidget.selectedBackground'],
  ['editorSuggestWidget.highlightForeground','editorSuggestWidget.selectedBackground'],
  ['editorSuggestWidget.highlightForeground','editorSuggestWidget.background'],
  ['editorWidget.foreground','editorWidget.background'],
  ['activityBar.foreground','activityBar.background'],['activityBarBadge.foreground','activityBarBadge.background'],
  ['sideBar.foreground','sideBar.background'],['sideBarTitle.foreground','sideBar.background'],
  ['sideBarSectionHeader.foreground','sideBarSectionHeader.background'],
  ['titleBar.activeForeground','titleBar.activeBackground'],['titleBar.inactiveForeground','titleBar.inactiveBackground'],
  ['statusBar.foreground','statusBar.background'],['statusBar.noFolderForeground','statusBar.noFolderBackground'],
  ['statusBar.debuggingForeground','statusBar.debuggingBackground'],
  ['tab.activeForeground','tab.activeBackground'],['tab.activeForeground','tab.hoverBackground'],
  ['terminal.foreground','terminal.background'],['terminal.ansiGreen','terminal.background'],
  ['terminal.ansiCyan','terminal.background'],['terminal.ansiYellow','terminal.background'],
  ['input.foreground','input.background'],['panelTitle.activeForeground','panel.background'],
  ['chat.avatarForeground','chat.avatarBackground'],['chat.slashCommandForeground','chat.slashCommandBackground'],
  ['badge.foreground','badge.background'],
  ['textLink.foreground','editor.background'],['textLink.foreground','panel.background'],
  ['textLink.foreground','chat.requestBackground'],['textLink.foreground','sideBar.background'],
  ['textLink.foreground','textCodeBlock.background'],['textLink.foreground','editorWidget.background'],
  ['textLink.foreground','editorHoverWidget.background'],
  ['textLink.activeForeground','editor.background'],['textLink.activeForeground','panel.background'],
  ['textLink.activeForeground','chat.requestBackground'],['textLink.activeForeground','editorWidget.background'],
  // Inline code renders on prose surfaces, never inside fenced code blocks.
  ['textPreformat.foreground','panel.background'],['textPreformat.foreground','chat.requestBackground'],
  ['textPreformat.foreground','textBlockQuote.background'],['textPreformat.foreground','sideBar.background'],
  ['textPreformat.foreground','editorHoverWidget.background'],
];
const MUTED = [
  ['descriptionForeground','sideBar.background'],['descriptionForeground','editor.background'],
  ['descriptionForeground','panel.background'],['descriptionForeground','chat.requestBackground'],
  ['descriptionForeground','input.background'],['descriptionForeground','editorWidget.background'],
  ['descriptionForeground','tab.inactiveBackground'],['descriptionForeground','editorHoverWidget.background'],
  ['disabledForeground','editor.background'],['disabledForeground','sideBar.background'],
  ['editorLineNumber.foreground','editorGutter.background'],['editorLineNumber.activeForeground','editorGutter.background'],
  ['activityBar.inactiveForeground','activityBar.background'],
  ['tab.inactiveForeground','tab.inactiveBackground'],['tab.inactiveForeground','tab.hoverBackground'],
  ['input.placeholderForeground','input.background'],['breadcrumb.foreground','editor.background'],
  ['panelTitle.inactiveForeground','panel.background'],
];
// Status/activity/title bars paint icons with their own foregrounds.
const ICONS = ['sideBar.background','editor.background','panel.background','editorWidget.background',
  'editorHoverWidget.background','editorSuggestWidget.background','input.background','tab.inactiveBackground',
  'editorGroupHeader.tabsBackground','chat.requestBackground','textCodeBlock.background','terminal.background'];
// Checkerboards keep a black editor/terminal/tabs half; global icons, links and
// muted chrome text belong to the light half (mirrors repairPresetContrast).
const CHECKER = new Set(['white-tuxedo','skeleton-valley']);
const DARKHALF = new Set(['editor.background','terminal.background','textCodeBlock.background','editorGroupHeader.tabsBackground','tab.inactiveBackground']);

let failures = 0, checked = 0;
const lines = [];
for (const p of presets.THEME_PRESETS) {
  const c = p.colors; const cb = CHECKER.has(p.id);
  const test = (f, b, min, kind) => {
    if (cb && (f==='textLink.foreground'||f==='textLink.activeForeground') && (b==='editor.background'||b==='textCodeBlock.background')) return;
    if (cb && f==='icon.foreground' && DARKHALF.has(b)) return;
    if (cb && (f==='descriptionForeground'||f==='disabledForeground') && DARKHALF.has(b)) return;
    const r = ratio(c[f], c[b], c['editor.background']);
    checked++;
    if (r === null || r < min) { failures++; lines.push(`FAIL [${kind}] ${p.id}: ${f}(${c[f]}) x ${b}(${c[b]}) = ${r && r.toFixed(2)} (min ${min})`); }
  };
  for (const [f,b] of CORE) test(f,b,4.5,'core');
  for (const [f,b] of MUTED) test(f,b,3,'muted');
  for (const b of ICONS) test('icon.foreground',b,3,'icon');
  for (const rule of p.tokenColors) {
    const scopes = Array.isArray(rule.scope)?rule.scope:[rule.scope];
    const min = scopes.some(s=>String(s).includes('comment'))?3:4.5;
    for (const b of ['editor.background','textCodeBlock.background']) {
      const r = ratio(rule.settings.foreground, c[b], c['editor.background']);
      checked++;
      if (r === null || r < min) { failures++; lines.push(`FAIL [syntax] ${p.id}: ${scopes[0]}(${rule.settings.foreground}) x ${b}(${c[b]}) = ${r && r.toFixed(2)} (min ${min})`); }
    }
  }
}
for (const l of lines) console.log(l);
console.log(`Checked ${checked} pairs across ${presets.THEME_PRESETS.length} presets; failures: ${failures}`);
process.exit(failures ? 1 : 0);
