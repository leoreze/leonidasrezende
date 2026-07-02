
let templates=[];let active='Todos';
const grid=document.querySelector('#templateGrid');const filters=document.querySelector('#segmentFilters');
const esc=s=>String(s||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const formatPrice=(value)=>{const raw=String(value||'').trim();if(!raw)return 'US$ 29';if(/^\d+(?:[.,]\d+)?$/.test(raw))return `US$ ${raw.replace(',', '.')}`;return raw;};
async function load(){const r=await fetch('/api/templates');templates=await r.json();renderFilters();renderCards();}
function renderFilters(){const segments=['Todos',...new Set(templates.filter(t=>t.status==='published').map(t=>t.category||'Outros'))];filters.innerHTML=segments.map(s=>`<button class="${s===active?'active':''}" data-seg="${esc(s)}">${esc(s)}</button>`).join('');filters.querySelectorAll('button').forEach(b=>b.onclick=()=>{active=b.dataset.seg;renderFilters();renderCards();});}
function renderCards(){const list=templates.filter(t=>t.status==='published').filter(t=>active==='Todos'||t.category===active);grid.innerHTML=list.map(t=>`<article class="template-card"><span class="template-badge">${esc(t.badge||'Live')}</span><img src="${esc(t.cover)}" alt="${esc(t.title)}"><div class="template-body"><div class="template-meta"><span>${esc(t.category||'Template')}</span><span class="template-price">${esc(formatPrice(t.price))}</span></div><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><div class="template-actions"><a class="market-btn" href="/demo/${esc(t.slug)}">Live demo</a><a class="market-btn ghost" href="${esc(t.buyUrl||'#')}">Comprar</a></div></div></article>`).join('')||'<p>Nenhum template publicado neste segmento.</p>';}
load().catch(()=>{grid.innerHTML='<p>Não foi possível carregar os templates.</p>'});
