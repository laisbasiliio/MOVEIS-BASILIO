'use strict';
/* ===== Configuração (substituir por dados reais da empresa) ===== */
const WA = '5531997124289';
const PRAZO = { baseDias: 15, diasPorMovel: 3, diasPorM2: 1.5, margemMin: 0.9, margemMax: 1.3 }; // DEMONSTRATIVO
const PROJETOS = [
  { f: 'cozinha', c: 'Cozinhas', t: 'Cozinha planejada' },
  { f: 'torre-forno', c: 'Cozinhas', t: 'Torre para forno' },
  { f: 'closet-1', c: 'Quartos', t: 'Guarda-roupa / closet' },
  { f: 'closet-2', c: 'Quartos', t: 'Closet com sapateiro' },
  { f: 'escada-1', c: 'Painéis', t: 'Painel ripado' },
  { f: 'escada-2', c: 'Painéis', t: 'Painel e nicho sob a escada' },
  { f: 'painel-madeira', c: 'Painéis', t: 'Painel com portas embutidas' },
  { f: 'tv', c: 'Outros ambientes', t: 'Painel de TV com nicho de vidro' }
];
const FONTES = { // nomes extraídos de catálogos e sites públicos
  Duratex: 'https://www.duratexmadeira.com.br/?p=107125',
  Eucatex: 'https://www.aecweb.com.br/produto/colecao-origens-nativas/125744',
  'Neo Touch': 'https://www.em.com.br/mundo-corporativo/2026/10/7518009-eucatex-lanca-mdf-neo-touch-com-acabamento-ultrafosco.html',
  Arauco: 'https://arauco.com/brasil/wp-content/uploads/sites/17/2018/06/miolo_guia_marceneiros-2.pdf',
  'Arauco cores': 'https://archello.com/project/barto-apartment',
  Guararapes: 'https://www.bemparana.com.br/publicacao/colunas/decor-mix/guararapes-lanca-nova-colecao-repleta-de-significado-e-historia/',
  Masisa: 'https://www.aecweb.com.br/produto/linha-cores-masisa-mdp/22349',
  Espelho: 'https://www.agazeta.com.br/hub-imobi/decoracao/como-sair-do-basico-e-inovar-na-decoracao-da-casa-usando-espelhos-1022',
  'Vidro reflecta': 'https://www.buscape.com.br/busca/guarda+roupa+reflecta'
};
const TIPOS = ['Todos', 'Madeirados', 'Cores', 'Metálicos e alto brilho', 'Efeitos e pedras', 'Espelhos e vidros'];
const M = (tipo, marca, linha, lista) => lista.map(x => Array.isArray(x) ? [x[0], marca, linha, tipo, x[1]] : [x, marca, linha, tipo]);
const MATERIAIS = [
  ...M('Madeirados', 'Duratex', 'Linha Design', ['Carvalho Avelã', 'Carvalho Berlin', 'Carvalho Hanover', 'Carvalho Malva', 'Carvalho Munique', 'Nogueira Caiena', 'Nogueira Thar']),
  ...M('Madeirados', 'Duratex', 'Essencial Wood', ['Álamo', 'Carvalho Batur', 'Carvalho Eterno', 'Carvalho Luar', 'Cumaru Raiz', 'Freijó Puro', 'Inhotim', 'Itapuã', 'Jequitibá Rosa']),
  ...M('Madeirados', 'Duratex', 'Mostruário Duratex', ['Noce Califórnia', 'Nogueira Cadiz', 'Fresno Funchal', 'Ébano Monet', 'Nogueira Alva', 'Carvalho Évora']),
  ...M('Madeirados', 'Eucatex', 'Eucatex', ['Carvalho Tropical', 'Cumaru Nativo', 'Itaparica', 'Louro Freijó', 'Amêndoa Natural', 'Nogueira Terracota', 'Cacau Natural', 'Madero Cacau', 'Canyon Black Oak', 'Classic Oak', 'Carvalho Chamonix', 'Freijó Âmbar', 'Carvalho Córdoba', 'Celtic Oak', 'Carvalho Rústico', 'Nogueira Málaga', 'Italian Noce']),
  ...M('Madeirados', 'Arauco', 'Arauco', ['Cumaru Trend', 'Ipê Real', 'Carvalho Ristretto', 'Sertanejo']),
  ...M('Madeirados', 'Guararapes', 'Guararapes', ['Ipê', 'Imbuia']),
  ...M('Cores', 'Duratex', 'Duratex', [['Branco Diamante', '#F4F2EE'], ['Branco Gelo', '#EEF1F2'], ['Cinza Sagrado', '#8C8F91'], ['Gianduia', '#6B5446'], ['Noturno', '#2B3140'], ['Opala', '#E6E1D6'], ['Preto', '#151515'], ['Ultramarino', '#2F4C8F'], ['Grafite', '#4A4D50'], ['Mint', '#A9D6C2'], ['Pérola Urbana', '#D9D5CF'], ['Rosa Glamour', '#D9A3A8'], ['Rosa Infinito', '#E6BFC0'], ['Verde Real', '#2F6B4F'], ['Mirtilo', '#4B3A6B'], ['Trufa', '#4A3A33']]),
  ...M('Cores', 'Eucatex', 'Neo Touch', [['Azul Anil', '#2E3A87'], ['Verde Lótus', '#7C9A6B'], ['Marrom Solar', '#8B5A2B'], ['Cinza Mineral', '#8A8D8F'], ['Branco Alvorada', '#F2EFE8'], ['Grafite Absoluto', '#3A3D40'], ['Preto Ébano', '#1C1917']]),
  ...M('Cores', 'Masisa', 'Masisa', [['Branco', '#F5F5F3'], ['Branco Platinum', '#EDEDED'], ['Branco Alaska', '#F8F8F6'], ['Cinza Cristal', '#B7BCC0'], ['Ceniza', '#9C9B97'], ['Preto', '#151515'], ['Azul do Chile', '#2E5C8A']]),
  ...M('Cores', 'Arauco', 'Arauco cores', [['Jade Green', '#4F8F78']]),
  ...M('Metálicos e alto brilho', 'Duratex', 'Duratex', [['Prata', '#BFC3C7'], ['Steel', '#6F7479'], ['Titânio', '#7D8084'], ['Branco Diamante Cristallo', '#F7F7F5'], ['Preto Cristallo', '#0E0E0E'], ['Mirtilo Cristallo', '#4B3A6B'], ['Trufa Cristallo', '#4A3A33']]),
  ...M('Efeitos e pedras', 'Duratex', 'Duratex', [['Mood (efeito cimentício)', '#9A9A97'], ['Rust (visual aço corten)', '#8F4F2B'], ['Portoro', '#1E1B18'], ['Thassos', '#F1EFEA']]),
  ...M('Efeitos e pedras', 'Arauco', 'Arauco', [['Cobre Corten', '#A5593A']]),
  ...M('Espelhos e vidros', 'Espelhos', 'Espelho', [['Espelho Prata', '#C9D0D6'], ['Espelho Bronze', '#9B7B5A'], ['Espelho Fumê', '#5A5C60']]),
  ...M('Espelhos e vidros', 'Vidros', 'Vidro reflecta', [['Reflecta Prata', '#C9D0D6'], ['Reflecta Bronze', '#9B7B5A'], ['Reflecta Fumê', '#5A5C60'], ['Reflecta Champagne', '#CDB791']])
];
const TONS = [['ébano|black', '#2E2723'], ['imbuia|cacau|terracota', '#5E4032'], ['nogueira|noce', '#6B4A33'], ['cumaru', '#8A5A38'], ['ipê', '#8F6A3A'], ['freijó|louro|itaparica', '#B88F5E'], ['jequitibá', '#C99275'], ['álamo', '#D9C5A5'], ['amêndoa|avelã', '#B08F6C'], ['malva', '#9A8478'], ['fresno', '#CDB48F'], ['carvalho|oak|sertanejo', '#C29A68']];
const cor = m => m[4] || (TONS.find(t => new RegExp(t[0], 'i').test(m[0])) || [0, '#A8835A'])[1];
const visual = m => { const c = cor(m);
  if (m[3] === 'Madeirados') return `repeating-linear-gradient(90deg,rgba(0,0,0,.09) 0 1px,transparent 1px 7px),repeating-linear-gradient(100deg,rgba(255,255,255,.08) 0 3px,transparent 3px 19px),${c}`;
  if (m[3] === 'Espelhos e vidros') return `linear-gradient(120deg,rgba(255,255,255,.85),rgba(255,255,255,0) 28%,rgba(255,255,255,.35) 48%,rgba(255,255,255,0) 62%,rgba(255,255,255,.6)),linear-gradient(160deg,${c},#2c3338 160%)`;
  if (m[3] === 'Metálicos e alto brilho') return `linear-gradient(115deg,rgba(255,255,255,.55),rgba(255,255,255,0) 35%,rgba(255,255,255,.25) 70%),${c}`;
  if (m[3] === 'Efeitos e pedras') return `repeating-linear-gradient(45deg,rgba(0,0,0,.06) 0 2px,transparent 2px 6px),${c}`;
  return c; };
const $ = (s, r = document) => r.querySelector(s);
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

/* Links de WhatsApp */
document.querySelectorAll('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
$('#yr').textContent = new Date().getFullYear();

/* Menu mobile */
const nav = $('#nav'), burger = $('.burger');
burger.onclick = () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* Catálogo de materiais */
const tabs = $('#tabs'), sw = $('#sw'), det = $('#det'), busca = $('#busca'); let tipo = 'Todos';
tabs.innerHTML = TIPOS.map(t => `<button role="tab">${t}</button>`).join('');
tabs.querySelectorAll('button').forEach(b => b.onclick = () => { tipo = b.textContent; listar(); });
busca.oninput = listar;
function listar() {
  tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.textContent === tipo));
  const q = busca.value.trim().toLowerCase();
  const itens = MATERIAIS.filter(m => (tipo === 'Todos' || m[3] === tipo) && (m[0] + ' ' + m[1]).toLowerCase().includes(q));
  $('#cnt').textContent = `${itens.length} opção(ões) exibida(s). Tons ilustrativos e aproximados.`;
  sw.innerHTML = itens.map((m, i) => `<button data-i="${i}" aria-label="${m[0]}, ${m[1]}"><i style="background:${visual(m)}"></i><span>${m[0]}</span><small>${m[1]}</small></button>`).join('') || '<p>Nenhum material encontrado.</p>';
  sw.querySelectorAll('button').forEach(b => b.onclick = () => detalhe(itens[+b.dataset.i], b));
  if (itens.length) detalhe(itens[0], sw.firstElementChild); else det.innerHTML = '';
}
function detalhe(m, btn) {
  sw.querySelectorAll('button').forEach(b => b.classList.remove('on')); btn.classList.add('on');
  const url = FONTES[m[2]] || FONTES[m[1]];
  det.innerHTML = `<div class="big" style="background:${visual(m)}"></div><h3>${m[0]}</h3><p><b>${m[1]}</b> · ${m[3]}</p><p class="note">Tom aproximado para visualização. Consulte a amostra física e a disponibilidade com a fábrica.</p><p><a class="src" href="${url}" target="_blank" rel="noopener">Ver fonte ↗</a></p><a class="btn wa sm" target="_blank" rel="noopener" href="${wa('Olá! Tenho interesse em ' + m[0] + ' (' + m[1] + ', ' + m[3] + ') para o meu projeto.')}">Perguntar sobre este material</a>`;
}
listar();

/* Galeria + filtros + lightbox */
const gal = $('#gal'), chips = $('#chips'), lb = $('#lb'); let visiveis = [], idx = 0;
const cats = ['Todos', ...new Set(PROJETOS.map(p => p.c))];
chips.innerHTML = cats.map(c => `<button>${c}</button>`).join('');
function filtrar(c) {
  chips.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.textContent === c));
  visiveis = PROJETOS.filter(p => c === 'Todos' || p.c === c);
  gal.innerHTML = visiveis.map((p, i) => `<figure data-i="${i}" tabindex="0"><img src="images/${p.f}.jpg" alt="${p.t}" loading="lazy"><figcaption>${p.t}</figcaption></figure>`).join('');
  gal.querySelectorAll('figure').forEach(f => { f.onclick = () => abrir(+f.dataset.i); f.onkeydown = e => { if (e.key === 'Enter') abrir(+f.dataset.i); }; });
}
chips.querySelectorAll('button').forEach(b => b.onclick = () => filtrar(b.textContent)); filtrar('Todos');
function abrir(i) { idx = (i + visiveis.length) % visiveis.length; const p = visiveis[idx]; $('img', lb).src = `images/${p.f}.jpg`; $('img', lb).alt = p.t; $('figcaption', lb).textContent = `${p.t} · ${p.c}`; lb.hidden = false; $('.x', lb).focus(); }
$('.x', lb).onclick = () => lb.hidden = true; $('.pv', lb).onclick = () => abrir(idx - 1); $('.nx', lb).onclick = () => abrir(idx + 1);
lb.onclick = e => { if (e.target === lb) lb.hidden = true; };
document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lb.hidden = true; if (e.key === 'ArrowLeft') abrir(idx - 1); if (e.key === 'ArrowRight') abrir(idx + 1); });

/* Formulário de orçamento -> WhatsApp */
$('#form').onsubmit = e => {
  e.preventDefault(); const f = e.target, v = n => f[n].value.trim(), err = $('#err');
  if (!v('nome') || !v('tel') || !f.tipo.value || !v('amb') || !v('desc')) { err.textContent = 'Preencha nome, telefone, tipo de móvel, ambiente e descrição.'; return; }
  if (v('tel').replace(/\D/g, '').length < 10) { err.textContent = 'Informe um telefone com DDD.'; return; }
  err.textContent = '';
  const msg = ['*Solicitação de orçamento – Site Móveis Basílio*', `*Nome:* ${v('nome')}`, `*Telefone:* ${v('tel')}`, `*Móvel:* ${f.tipo.value}`, `*Ambiente:* ${v('amb')}`, `*Medidas aproximadas:* ${v('med') || 'não informadas'}`, `*Descrição:* ${v('desc')}`, `*Observações:* ${v('obs') || '-'}`].join('\n');
  window.open(wa(msg), '_blank', 'noopener');
};

/* Estimativa de prazo (demonstrativa) */
$('#est').onsubmit = e => {
  e.preventDefault(); const f = e.target, q = +f.q.value, l = +f.l.value, a = +f.a.value, r = $('#res');
  if (!(q > 0 && l > 0 && a > 0)) { r.textContent = 'Informe valores válidos.'; r.classList.add('on'); return; }
  const d = PRAZO.baseDias + q * PRAZO.diasPorMovel + l * a * PRAZO.diasPorM2;
  const mn = Math.round(d * PRAZO.margemMin), mx = Math.round(d * PRAZO.margemMax);
  r.innerHTML = `Estimativa inicial: <b>${mn} a ${mx} dias úteis</b><br><small>Previsão ilustrativa, não é prazo definitivo. A confirmação depende da avaliação da empresa.</small><br><a class="btn wa sm" style="margin-top:10px" target="_blank" rel="noopener" href="${wa(`Olá! Fiz a estimativa no site (${q} móvel(is), ${l} m x ${a} m: ${mn} a ${mx} dias úteis) e gostaria de confirmar o prazo.`)}">Confirmar com a fábrica</a>`;
  r.classList.add('on');
};

/* Animações ao rolar */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* Cabeçalho, menu ativo e voltar ao topo */
const hdr = $('.hdr'), topo = $('.top'), links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
addEventListener('scroll', () => {
  hdr.classList.toggle('sc', scrollY > 40); topo.classList.toggle('on', scrollY > 700);
  const y = scrollY + 140; let atual = '';
  links.forEach(a => { const s = $(a.getAttribute('href')); if (s && s.offsetTop <= y) atual = a.getAttribute('href'); });
  links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === atual));
}, { passive: true });
