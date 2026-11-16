// Generates the on-brand illustration set in /public/images. Run: node tools/generate-visuals.mjs
import { writeFileSync } from 'node:fs';

const C = { n950: '#0b1129', n900: '#101838', n800: '#1a2552', n700: '#26336b', line: '#3a4678', mute: '#8e98c4', soft: '#c9d0ee', teal: '#00a8a8', teal2: '#3fd6d6', purple: '#7a3ae6', purple2: '#a883ff', orange: '#f88000', orange2: '#ffb15e', lime: '#b0c010', lime2: '#d3e24a', white: '#ffffff', shadow: '#070c1f' };
const f = (n) => Number(n.toFixed(1));

const rect = (x, y, w, h, r = 0, fill = 'none', stroke = '', sw = 2, cls = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${cls ? ` class="${cls}"` : ''}/>`;
const card = (x, y, w, h, r = 14, fill = C.n800, stroke = C.line) => rect(x + 8, y + 12, w, h, r, C.shadow) + rect(x, y, w, h, r, fill, stroke, 2);
const circle = (cx, cy, r, fill = 'none', stroke = '', sw = 2, cls = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${cls ? ` class="${cls}"` : ''}/>`;
const path = (d, fill = 'none', stroke = '', sw = 3, cls = '', extra = '') => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"` : ''}${cls ? ` class="${cls}"` : ''} ${extra}/>`;
const bar = (x, y, w, fill, h = 10) => rect(x, y, w, h, h / 2, fill);
const check = (cx, cy, s = 1, stroke = C.n900) => path(`M${cx - 7 * s} ${cy}l${5 * s} ${5 * s} ${10 * s}-${11 * s}`, 'none', stroke, 3.5 * s);
const person = (cx, cy, s = 1, col = C.white) => circle(cx, cy - 9 * s, 7 * s, col) + path(`M${cx - 14 * s} ${cy + 16 * s}c0-10 6-15 ${14 * s}-15s${14 * s} 5 ${14 * s} 15z`, col);

function gear(cx, cy, R, n, ratio = 0.82) {
  const s = (2 * Math.PI) / n, r = R * ratio, pts = [];
  for (let i = 0; i < n; i++) {
    const a = i * s;
    [[-0.44, r], [-0.28, R], [0.28, R], [0.44, r]].forEach(([k, rad]) => pts.push(`${f(cx + rad * Math.cos(a + k * s))},${f(cy + rad * Math.sin(a + k * s))}`));
  }
  return `M${pts.join('L')}Z`;
}

function frame(inner, accent = C.teal) {
  const gridV = Array.from({ length: 11 }, (_, i) => `M${100 + i * 100} 0V800`).join('');
  const gridH = Array.from({ length: 8 }, (_, i) => `M0 ${100 + i * 100}H1200`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
<style>
.spin{transform-box:fill-box;transform-origin:center;animation:spin 48s linear infinite}.spinr{transform-box:fill-box;transform-origin:center;animation:spin 30s linear infinite reverse}
.flow{stroke-dasharray:8 10;animation:flow 1.6s linear infinite}.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.6s ease-in-out infinite}
.rise{transform-box:fill-box;transform-origin:bottom;animation:rise 3.2s ease-in-out infinite alternate}.blink{animation:blink 1s steps(2) infinite}.float{animation:float 6s ease-in-out infinite}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes flow{to{stroke-dashoffset:-36}}@keyframes pulse{50%{transform:scale(1.12)}}@keyframes rise{from{transform:scaleY(.8)}to{transform:scaleY(1)}}@keyframes blink{50%{opacity:0}}@keyframes float{50%{transform:translateY(-8px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.n800}"/><stop offset="1" stop-color="${C.n950}"/></linearGradient>
<radialGradient id="g1" cx="0.15" cy="0.1" r="0.7"><stop offset="0" stop-color="${C.purple}" stop-opacity=".55"/><stop offset="1" stop-color="${C.purple}" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx="0.85" cy="0.95" r="0.7"><stop offset="0" stop-color="${accent}" stop-opacity=".5"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
<linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.purple2}"/><stop offset="1" stop-color="${C.purple}"/></linearGradient>
<linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.teal2}"/><stop offset="1" stop-color="${C.teal}"/></linearGradient>
<linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.orange2}"/><stop offset="1" stop-color="${C.orange}"/></linearGradient>
</defs>
<rect width="1200" height="800" fill="url(#bg)"/><rect width="1200" height="800" fill="url(#g1)"/><rect width="1200" height="800" fill="url(#g2)"/>
<path d="${gridV}${gridH}" stroke="#1d2960" stroke-width="1.5" fill="none"/>
<g>${path('M1010 0h64L914 800h-64z', C.teal)}${path('M1090 0h44L974 800h-44z', C.orange)}${path('M1150 0h30L1020 800h-30z', C.lime)}${path('M1196 0h4L1040 800h-24z', C.purple)}</g>
${inner}
</svg>`;
}

const scenes = {};

scenes.software = () => {
  const lines = [[0, 180, C.purple2], [1, 260, C.teal2], [1, 140, C.white], [2, 220, C.orange2], [2, 120, C.mute], [1, 90, C.white], [0, 150, C.purple2], [1, 300, C.teal2], [2, 180, C.lime2], [1, 70, C.white]];
  let y = 238, code = '';
  lines.forEach(([ind, w, col], i) => { code += rect(190, y - 5, 18, 8, 4, C.line) + bar(236 + ind * 34, y - 6, w, col, 11); y += 30; });
  return card(130, 130, 660, 420, 16) + rect(130, 130, 660, 54, 16, C.n700) + rect(130, 160, 660, 24, 0, C.n700) + circle(166, 157, 7, C.orange) + circle(190, 157, 7, C.lime) + circle(214, 157, 7, C.teal) + rect(300, 146, 280, 22, 11, C.n800) +
    code + rect(236 + 34 + 70, y - 36, 4, 20, 2, C.white, '', 0, 'blink') +
    `<g class="float">` + card(560, 330, 400, 270, 16, C.n900, C.purple) +
    [0, 1, 2].map((i) => circle(612, 394 + i * 66, 20, [C.teal, C.teal, C.orange][i]) + (i < 2 ? check(612, 394 + i * 66, 1) : path('M606 389v10M618 389v10', 'none', C.n900, 3.5)) + bar(652, 384 + i * 66, [220, 180, 140][i], C.soft, 11) + bar(652, 404 + i * 66, [150, 120, 190][i], C.line, 9)).join('') + `</g>` +
    card(690, 70, 250, 190, 16, C.n800, C.line) + [0, 1, 2, 3, 4].map((i) => rect(722 + i * 40, 230 - [60, 95, 75, 120, 140][i], 26, [60, 95, 75, 120, 140][i], 5, [C.purple2, C.teal2, C.purple2, C.orange2, C.lime2][i], '', 0, 'rise')).join('');
};

scenes.staffing = () => {
  const cx = 510, cy = 400;
  const left = [[60, 150], [60, 358], [60, 566]], right = [[740, 150], [740, 358], [740, 566]];
  const all = [...left, ...right];
  let s = all.map(([x, y], i) => path(`M${i < 3 ? x + 230 : x} ${y + 52}L${cx} ${cy}`, 'none', i === 4 ? C.orange : C.line, i === 4 ? 4 : 2.5, i === 4 ? 'flow' : '')).join('');
  all.forEach(([x, y], i) => {
    const hot = i === 4;
    s += card(x, y, 230, 104, 14, C.n800, hot ? C.orange : C.line) + circle(x + 52, y + 52, 28, hot ? C.orange : C.n700) + person(x + 52, y + 54, 0.9, hot ? C.n900 : C.soft) + bar(x + 94, y + 34, 100, C.soft, 11) + bar(x + 94, y + 56, 70, C.line, 9) + bar(x + 94, y + 74, 40, hot ? C.orange2 : C.n700, 9);
    if (hot) s += circle(x + 214, y + 14, 16, C.lime) + check(x + 214, y + 14, 0.8);
  });
  s += circle(cx, cy, 108, 'none', C.line, 2, 'spin') + circle(cx, cy, 84, 'url(#og)') + circle(cx, cy, 84, 'none', C.white, 3) + person(cx, cy + 6, 2.2, C.n900);
  return s;
};

scenes.cloud = () => {
  const cloud = 'M400 330a70 70 0 0 1 10-139a110 110 0 0 1 210 20a70 70 0 0 1 0 119Z';
  let s = '';
  [[330, 560], [530, 560], [730, 560]].forEach(([x, y], i) => { s += path(`M${x + 90} ${y}C${x + 90} 440 ${515 + i * 10} 400 ${515 + i * 10} 340`, 'none', [C.teal2, C.purple2, C.orange2][i], 3, 'flow'); });
  s += `<g class="float">${rect(400, 190, 220, 140, 0, 'none')}<path d="${cloud}" transform="translate(5 14)" fill="${C.shadow}"/><path d="${cloud}" fill="url(#tg)" stroke="${C.white}" stroke-width="3"/>` +
    bar(470, 258, 80, C.n900, 12) + bar(470, 282, 50, 'rgba(16,24,56,.55)'.replace('rgba(16,24,56,.55)', '#0f7f86'), 10) + `</g>`;
  [[330, 560], [530, 560], [730, 560]].forEach(([x, y], i) => {
    s += card(x, y, 180, 170, 12, C.n800, C.line);
    for (let k = 0; k < 3; k++) s += rect(x + 18, y + 18 + k * 46, 144, 34, 7, C.n900, C.line, 1.5) + circle(x + 38, y + 35 + k * 46, 6, [C.lime, C.teal2, C.orange][(i + k) % 3], '', 0, 'pulse') + bar(x + 58, y + 30 + k * 46, 70, C.line, 9);
  });
  s += card(130, 250, 130, 90, 12, C.n800, C.line) + rect(150, 268, 90, 52, 6, C.n900, C.teal) + path('M190 345v0', 'none', C.line, 1) + path('M110 400L400 300', 'none', C.line, 2, 'flow');
  s += card(100, 440, 60, 110, 12, C.n800, C.line) + circle(130, 530, 6, C.soft) + rect(112, 456, 36, 60, 4, C.n900, C.purple2, 1.5) + path('M160 470L400 320', 'none', C.line, 2, 'flow');
  return s;
};

scenes.embedded = () => {
  let s = card(100, 120, 780, 560, 22, '#0f1c47', C.teal);
  const chipX = 330, chipY = 260, cw = 240;
  const traces = [
    [`M${chipX} ${chipY + 40}H220V220H150`, C.teal2], [`M${chipX} ${chipY + 100}H240V400H150`, C.orange2], [`M${chipX} ${chipY + 160}H200V560H150`, C.lime2],
    [`M${chipX + cw} ${chipY + 40}H660V200H780`, C.purple2], [`M${chipX + cw} ${chipY + 100}H700V360H780`, C.teal2], [`M${chipX + cw} ${chipY + 160}H640V520H780`, C.orange2],
    [`M${chipX + 60} ${chipY + cw}V590H420`, C.lime2], [`M${chipX + 180} ${chipY}V190H600`, C.teal2],
  ];
  traces.forEach(([d, c]) => { s += path(d, 'none', C.line, 6) + path(d, 'none', c, 3, 'flow'); });
  [[150, 220], [150, 400], [150, 560], [780, 200], [780, 360], [780, 520], [420, 590], [600, 190]].forEach(([x, y], i) => { s += circle(x, y, 14, C.n900, [C.teal2, C.orange2, C.lime2, C.purple2, C.teal2, C.orange2, C.lime2, C.teal2][i], 4); });
  s += rect(chipX + 6, chipY + 12, cw, cw, 18, C.shadow) + rect(chipX, chipY, cw, cw, 18, C.n900, C.lime, 3);
  for (let i = 0; i < 6; i++) { const o = 22 + i * 36; s += rect(chipX + o, chipY - 16, 14, 18, 3, C.mute) + rect(chipX + o, chipY + cw - 2, 14, 18, 3, C.mute) + rect(chipX - 16, chipY + o, 18, 14, 3, C.mute) + rect(chipX + cw - 2, chipY + o, 18, 14, 3, C.mute); }
  s += rect(chipX + 60, chipY + 60, 120, 120, 12, C.n700, C.line) + rect(chipX + 90, chipY + 90, 60, 60, 8, 'url(#og)', '', 0, 'pulse');
  s += card(540, 560, 380, 150, 14, C.n900, C.line) + path('M570 650h40l16-50 28 90 24-70 18 30h60l16-40 24 70 20-30h84', 'none', C.lime2, 4);
  return s;
};

scenes.banking = () => {
  const shield = 'M330 190L470 240V400C470 500 410 570 330 610C250 570 190 500 190 400V240Z';
  let s = `<path d="${shield}" transform="translate(10 14)" fill="${C.shadow}"/><path d="${shield}" fill="url(#pg)" stroke="${C.white}" stroke-width="3"/><path d="M330 215L445 256V400C445 482 396 544 330 580C264 544 215 482 215 400V256Z" fill="none" stroke="#ffffff" stroke-width="2" opacity=".45"/>` + path('M270 400l45 46 85-100', 'none', C.white, 14);
  s += `<g class="float">` + card(520, 150, 400, 240, 20, C.n900, C.purple2) + rect(520, 200, 400, 46, 0, C.n700) + rect(550, 280, 66, 50, 9, 'url(#og)') + path('M550 305h66M583 280v50', 'none', C.n900, 2) + bar(550, 350, 180, C.soft, 12) + bar(750, 350, 90, C.line, 12) + circle(850, 300, 24, 'none', C.orange2, 6) + circle(878, 300, 24, 'none', C.teal2, 6) + `</g>`;
  s += card(520, 430, 400, 250, 16, C.n800, C.line);
  [70, 110, 90, 150, 190].forEach((h, i) => { s += rect(560 + i * 70, 640 - h, 40, h, 6, [C.purple2, C.teal2, C.purple2, C.orange2, C.lime2][i], '', 0, 'rise'); });
  s += path('M560 600L640 560 700 580 780 520 850 470', 'none', C.white, 3, 'flow');
  s += circle(230, 660, 26, C.lime) + circle(290, 674, 20, C.orange) + circle(340, 660, 14, C.teal);
  return s;
};

scenes.mechanical = () => {
  let s = rect(100, 110, 800, 580, 22, '#0e1840', C.line, 2);
  s += path(Array.from({ length: 15 }, (_, i) => `M${140 + i * 50} 120V680`).join('') + Array.from({ length: 11 }, (_, i) => `M110 ${160 + i * 50}H890`).join(''), 'none', '#1a2a66', 1);
  s += path('M420 220V640M230 430H610', 'none', C.mute, 1.5, '', 'stroke-dasharray="14 8 3 8"') + path('M700 220V380M610 300H790', 'none', C.mute, 1.5, '', 'stroke-dasharray="14 8 3 8"');
  s += `<g class="spin"><path d="${gear(420, 430, 190, 14)}" fill="${C.n800}" stroke="${C.orange}" stroke-width="5"/>${circle(420, 430, 120, 'none', C.orange2, 3)}${circle(420, 430, 44, C.n900, C.white, 4)}${[0, 1, 2, 3, 4, 5].map((i) => circle(420 + 82 * Math.cos((i * Math.PI) / 3), 430 + 82 * Math.sin((i * Math.PI) / 3), 11, C.n900, C.orange2, 3)).join('')}</g>`;
  s += `<g class="spinr"><path d="${gear(700, 300, 96, 9)}" fill="${C.n800}" stroke="${C.teal2}" stroke-width="5"/>${circle(700, 300, 54, 'none', C.teal, 3)}${circle(700, 300, 20, C.n900, C.white, 4)}</g>`;
  s += path('M230 680H610M230 668V692M610 668V692', 'none', C.lime2, 3) + path('M230 680l14-7v14zM610 680l-14-7v14z', C.lime2) + bar(360, 700, 100, C.lime2, 8);
  s += path('M860 240V620M848 240h24M848 620h24', 'none', C.lime2, 3) + path('M860 240l-7 14h14zM860 620l-7-14h14z', C.lime2);
  s += card(560, 470, 300, 180, 14, C.n900, C.line) + bar(590, 500, 160, C.soft, 11) + bar(590, 530, 220, C.line, 9) + bar(590, 556, 190, C.line, 9) + bar(590, 582, 120, C.orange2, 9) + circle(810, 620, 14, 'none', C.lime2, 3);
  return s;
};

scenes.bpo = () => {
  let s = card(110, 120, 520, 380, 18, C.n900, C.line) + rect(110, 120, 520, 50, 18, C.n700) + rect(110, 150, 520, 20, 0, C.n700) + circle(146, 145, 7, C.orange) + circle(170, 145, 7, C.lime) + circle(194, 145, 7, C.teal);
  const bubbles = [[150, 200, 250, 'l', C.n700], [330, 270, 270, 'r', 'url(#tg)'], [150, 350, 200, 'l', C.n700], [380, 410, 220, 'r', 'url(#pg)']];
  bubbles.forEach(([x, y, w, side, fill], i) => { s += rect(x, y, w, 56, 18, fill) + bar(x + 24, y + 18, w - 90, side === 'l' ? C.soft : C.n900, 10) + bar(x + 24, y + 34, (w - 90) * 0.6, side === 'l' ? C.line : 'rgba(16,24,56,.5)'.replace('rgba(16,24,56,.5)', '#0f4c6b'), 8); });
  s += `<g class="float">` + circle(790, 230, 112, C.n800, C.orange, 4) + circle(790, 230, 90, 'none', C.line, 2, 'spin') +
    path('M722 240a68 68 0 0 1 136 0', 'none', C.white, 12) + rect(706, 232, 30, 66, 13, C.orange, C.white, 4) + rect(844, 232, 30, 66, 13, C.orange, C.white, 4) + path('M859 298c0 38-30 52-82 52', 'none', C.white, 8) + circle(768, 350, 13, C.teal2) + `</g>`;
  const steps = [C.purple2, C.teal2, C.orange2, C.lime2];
  steps.forEach((c, i) => { const x = 110 + i * 200; s += card(x, 580, 150, 96, 14, C.n800, C.line) + circle(x + 38, 628, 20, c) + (i === 3 ? check(x + 38, 628, 0.9) : '') + bar(x + 70, 616, 56, C.soft, 10) + bar(x + 70, 636, 40, C.line, 8); if (i < 3) s += path(`M${x + 160} 628h30`, 'none', c, 4, 'flow') + path(`M${x + 184} 620l10 8-10 8`, 'none', c, 4); });
  return s;
};

scenes.about = () => {
  const cx = 480, cy = 400, R = 270, cols = [C.purple2, C.orange, C.teal2, C.lime2, C.purple2, C.orange2, C.teal];
  let s = circle(cx, cy, R, 'none', C.line, 2, 'spin') + circle(cx, cy, R - 120, 'none', '#22306c', 2);
  const nodes = cols.map((c, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7; return [cx + R * Math.cos(a), cy + R * Math.sin(a), c]; });
  nodes.forEach(([x, y, c]) => { s += path(`M${cx} ${cy}L${f(x)} ${f(y)}`, 'none', c, 3, 'flow'); });
  nodes.forEach(([x, y, c], i) => { s += circle(f(x), f(y), 44, C.n800, c, 4) + circle(f(x), f(y), 16, c, '', 0, 'pulse'); });
  const petal = (rot, c) => `<ellipse cx="${cx}" cy="${cy - 58}" rx="34" ry="62" fill="${c}" transform="rotate(${rot} ${cx} ${cy})"/>`;
  s += circle(cx, cy, 96, C.n900, C.line, 3) + petal(-38, C.teal) + petal(-12, C.orange) + petal(14, C.lime) + petal(40, C.purple) + circle(cx, cy + 74, 10, C.teal);
  return s;
};

const accents = { software: C.purple, staffing: C.orange, cloud: C.teal, embedded: C.lime, banking: C.purple, mechanical: C.orange, bpo: C.teal, about: C.teal };
for (const [k, fn] of Object.entries(scenes)) {
  const label = { software: 'Software development', staffing: 'Staffing and talent matching', cloud: 'Cloud infrastructure', embedded: 'Embedded hardware and firmware', banking: 'Secure banking and financial technology', mechanical: 'Mechanical engineering and design', bpo: 'Business process outsourcing and support', about: 'Connected services' }[k];
  const svg = frame(fn(), accents[k]).replace('<svg ', `<svg role="img" aria-label="${label}" `);
  writeFileSync(new URL(`../public/images/${k}.svg`, import.meta.url), svg);
}
console.log('generated', Object.keys(scenes).length);
