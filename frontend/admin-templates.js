const state = {
  token: localStorage.getItem('marketAdminToken') || '',
  email: localStorage.getItem('marketAdminEmail') || '',
  segments: [],
  products: [],
  templates: []
};

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
const splitList = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
const joinList = (value) => Array.isArray(value) ? value.join(', ') : '';
const authHeaders = () => ({ Authorization: `Bearer ${state.token}` });
const jsonHeaders = () => ({ 'Content-Type': 'application/json', ...authHeaders() });

function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}


function formatUsdPrice(value = '') {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const numeric = raw.replace(/[^0-9.,]/g, '').replace(',', '.');
  const amount = parseFloat(numeric || '0');
  if (!Number.isFinite(amount) || amount <= 0) return '';
  return `US$ ${Math.round(amount)}`;
}

function applyUsdMask(input) {
  if (!input) return;
  input.value = formatUsdPrice(input.value);
}

async function api(path, options = {}) {
  const response = await fetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Erro na solicitação.');
  return data;
}

function toast(message) {
  const el = document.createElement('div');
  el.className = 'admin-toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}


function readFileAsDataUrl(file, errorMessage = 'Não foi possível ler o arquivo.') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(errorMessage));
    reader.readAsDataURL(file);
  });
}

async function uploadImageForField(fieldId) {
  const fileInput = $(`${fieldId}_file`);
  const hint = $(`${fieldId}_hint`);
  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    toast('Selecione uma imagem primeiro.');
    return;
  }
  const file = fileInput.files[0];
  if (!file.type.startsWith('image/')) {
    toast('Selecione um arquivo de imagem válido.');
    return;
  }
  const maxBytes = 8 * 1024 * 1024;
  if (file.size > maxBytes) {
    toast('Imagem muito grande. Use até 8MB.');
    return;
  }
  const button = document.querySelector(`[data-upload="${fieldId}"]`);
  const original = button ? button.textContent : '';
  try {
    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando...';
    }
    if (hint) hint.textContent = 'Enviando imagem...';
    const dataUrl = await readFileAsDataUrl(file);
    const uploaded = await api('/api/uploads/image', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ fileName: file.name, dataUrl })
    });
    $(fieldId).value = uploaded.url;
    if (hint) hint.textContent = `Imagem enviada: ${uploaded.url}`;
    toast('Imagem enviada com sucesso.');
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = original;
    }
  }
}


async function uploadTemplateZip() {
  const fileInput = $('template_zip_file');
  const hint = $('template_zip_hint');
  const slug = $('template_slug').value.trim() || slugify($('template_title').value);
  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    toast('Selecione o arquivo ZIP do template primeiro.');
    return;
  }
  if (!slug) {
    toast('Informe o título ou slug do template antes de enviar o ZIP.');
    return;
  }
  const file = fileInput.files[0];
  if (!file.name.toLowerCase().endsWith('.zip')) {
    toast('Envie um arquivo .zip válido.');
    return;
  }
  const maxBytes = 80 * 1024 * 1024;
  if (file.size > maxBytes) {
    toast('ZIP muito grande. Use até 80MB.');
    return;
  }
  const button = $('templateZipUploadBtn');
  const original = button ? button.textContent : '';
  try {
    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando e descompactando...';
    }
    if (hint) hint.textContent = 'Enviando ZIP e preparando live demo...';
    const dataUrl = await readFileAsDataUrl(file, 'Não foi possível ler o ZIP.');
    const uploaded = await api('/api/uploads/template-zip', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ slug, fileName: file.name, dataUrl })
    });
    $('template_slug').value = uploaded.slug;
    $('template_preview').value = uploaded.previewUrl;
    $('template_downloadUrl').value = uploaded.downloadUrl;
    if (hint) hint.textContent = `Live demo criada: ${uploaded.previewUrl}`;
    toast('ZIP enviado e live demo criada com sucesso.');
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = original;
    }
  }
}

function showLogin() {
  document.body.classList.add('admin-login-mode');
  $('loginView').hidden = false;
  $('adminView').hidden = true;
  $('logoutBtn').hidden = true;
}

function showAdmin() {
  document.body.classList.remove('admin-login-mode');
  $('loginView').hidden = true;
  $('adminView').hidden = false;
  $('logoutBtn').hidden = false;
}

function setOptions(select, items, placeholder = 'Selecione') {
  select.innerHTML = `<option value="">${esc(placeholder)}</option>` + items.map((item) => `<option value="${esc(item.name || item.title || item.slug)}">${esc(item.name || item.title)}</option>`).join('');
}

function setCategoryOptions(select, items) {
  select.innerHTML = '<option value="">Selecione a categoria</option>' + items.map((item) => `<option value="${esc(item.title || item.slug)}">${esc(item.title || item.slug)}</option>`).join('');
}

function renderStats(overview = {}) {
  const totals = overview.totals || {};
  $('adminStats').innerHTML = [
    ['Categorias', totals.products || state.products.length],
    ['Segmentos', totals.segments || state.segments.length],
    ['Templates', totals.templates || state.templates.length],
    ['Publicados', totals.publishedTemplates || state.templates.filter((item) => item.status === 'published').length]
  ].map(([label, value]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('');
}

function updateSelects() {
  setCategoryOptions($('template_category'), state.products);
}

function renderSegments() {
  $('segmentsList').innerHTML = state.segments.map((item) => `
    <div class="admin-item">
      <div class="admin-thumb"><span>SEG</span></div>
      <div class="admin-item-main">
        <strong>${esc(item.name)}</strong>
        <span>${esc(item.slug)} • ${esc(item.status || 'published')}</span>
        <small>${esc(item.description)}</small>
      </div>
      <button type="button" data-edit-segment="${esc(item.id)}" class="market-btn ghost">Editar</button>
      <button type="button" data-del-segment="${esc(item.id)}" class="market-btn ghost danger">Excluir</button>
    </div>`).join('') || '<p class="admin-empty">Nenhum segmento cadastrado.</p>';

  document.querySelectorAll('[data-edit-segment]').forEach((button) => button.onclick = () => fillSegment(state.segments.find((item) => item.id === button.dataset.editSegment)));
  document.querySelectorAll('[data-del-segment]').forEach((button) => button.onclick = () => deleteItem('segments', button.dataset.delSegment));
}

function renderProducts() {
  $('productsList').innerHTML = state.products.map((item) => `
    <div class="admin-item">
      <div class="admin-thumb"><span>CAT</span></div>
      <div class="admin-item-main">
        <strong>${esc(item.title)}</strong>
        <span>${esc(item.slug)} • ${esc(item.status || 'published')}</span>
        <small>${esc(item.description)}</small>
      </div>
      <button type="button" data-edit-product="${esc(item.id)}" class="market-btn ghost">Editar</button>
      <button type="button" data-del-product="${esc(item.id)}" class="market-btn ghost danger">Excluir</button>
    </div>`).join('') || '<p class="admin-empty">Nenhuma categoria cadastrada.</p>';

  document.querySelectorAll('[data-edit-product]').forEach((button) => button.onclick = () => fillProduct(state.products.find((item) => item.id === button.dataset.editProduct)));
  document.querySelectorAll('[data-del-product]').forEach((button) => button.onclick = () => deleteItem('products', button.dataset.delProduct));
}

function renderTemplates() {
  $('templatesList').innerHTML = state.templates.map((item) => `
    <div class="admin-item">
      <div class="admin-thumb">${item.cover ? `<img src="${esc(item.cover)}" alt="">` : '<span>TPL</span>'}</div>
      <div class="admin-item-main">
        <strong>${esc(item.title)}</strong>
        <span>${esc(item.category)} • ${esc(item.price)} • ${esc(item.status || 'published')}</span>
        <small>${esc(item.description)}</small>
      </div>
      <a href="/demo/${esc(item.slug)}" target="_blank" class="market-btn ghost">Demo</a>
      <button type="button" data-edit-template="${esc(item.id)}" class="market-btn ghost">Editar</button>
      <button type="button" data-del-template="${esc(item.id)}" class="market-btn ghost danger">Excluir</button>
    </div>`).join('') || '<p class="admin-empty">Nenhum template cadastrado.</p>';

  document.querySelectorAll('[data-edit-template]').forEach((button) => button.onclick = () => fillTemplate(state.templates.find((item) => item.id === button.dataset.editTemplate)));
  document.querySelectorAll('[data-del-template]').forEach((button) => button.onclick = () => deleteItem('templates', button.dataset.delTemplate));
}

function renderAll() {
  updateSelects();
  renderSegments();
  renderProducts();
  renderTemplates();
}

async function loadAll() {
  const [segments, products, templates, overview] = await Promise.all([
    api('/api/segments'),
    api('/api/products'),
    api('/api/templates'),
    api('/api/admin/overview', { headers: authHeaders() })
  ]);
  state.segments = segments;
  state.products = products;
  state.templates = templates;
  renderStats(overview);
  renderAll();
}

function fillSegment(item = {}) {
  $('segment_id').value = item.id || '';
  $('segment_name').value = item.name || '';
  $('segment_slug').value = item.slug || slugify(item.name || '');
  $('segment_status').value = item.status || 'published';
  $('segment_description').value = item.description || '';
  scrollTo({ top: 0, behavior: 'smooth' });
}

function fillProduct(item = {}) {
  $('product_id').value = item.id || '';
  $('product_title').value = item.title || '';
  $('product_slug').value = item.slug || slugify(item.title || '');
  $('product_status').value = item.status || 'published';
  $('product_description').value = item.description || '';
  scrollTo({ top: 0, behavior: 'smooth' });
}

function fillTemplate(item = {}) {
  $('template_id').value = item.id || '';
  $('template_title').value = item.title || '';
  $('template_slug').value = item.slug || slugify(item.title || '');
  $('template_category').value = item.category || '';
  $('template_price').value = formatUsdPrice(item.price || '') || item.price || '';
  $('template_status').value = item.status || 'published';
  $('template_badge').value = item.badge || '';
  $('template_cover').value = item.cover || '';
  $('template_preview').value = item.preview || '';
  $('template_buyUrl').value = item.buyUrl || '';
  $('template_downloadUrl').value = item.downloadUrl || '';
  $('template_description').value = item.description || '';
  $('template_features').value = joinList(item.features);
  $('template_formats').value = joinList(item.formats);
  scrollTo({ top: 0, behavior: 'smooth' });
}

function clearForm(formId) {
  const form = $(formId);
  form.reset();
  form.querySelectorAll('input[type="hidden"]').forEach((input) => input.value = '');
  if (formId === 'segmentForm') $('segment_status').value = 'published';
  if (formId === 'productForm') $('product_status').value = 'published';
  if (formId === 'templateForm') $('template_status').value = 'published';
}

async function deleteItem(resource, id) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;
  await api(`/api/${resource}/${encodeURIComponent(id)}`, { method: 'DELETE', headers: authHeaders() });
  toast('Item excluído.');
  await loadAll();
}

async function saveSegment(event) {
  event.preventDefault();
  const payload = {
    id: $('segment_id').value || undefined,
    name: $('segment_name').value.trim(),
    slug: $('segment_slug').value.trim() || slugify($('segment_name').value),
    status: $('segment_status').value,
    description: $('segment_description').value.trim()
  };
  await api('/api/segments', { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(payload) });
  clearForm('segmentForm');
  toast('Segmento salvo.');
  await loadAll();
}

async function saveProduct(event) {
  event.preventDefault();
  const payload = {
    id: $('product_id').value || undefined,
    title: $('product_title').value.trim(),
    slug: $('product_slug').value.trim() || slugify($('product_title').value),
    status: $('product_status').value,
    description: $('product_description').value.trim()
  };
  await api('/api/products', { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(payload) });
  clearForm('productForm');
  toast('Categoria salva.');
  await loadAll();
}

async function saveTemplate(event) {
  event.preventDefault();
  const payload = {
    id: $('template_id').value || undefined,
    title: $('template_title').value.trim(),
    slug: $('template_slug').value.trim() || slugify($('template_title').value),
    category: $('template_category').value,
    price: formatUsdPrice($('template_price').value) || $('template_price').value.trim(),
    status: $('template_status').value,
    badge: $('template_badge').value.trim(),
    cover: $('template_cover').value.trim(),
    preview: $('template_preview').value.trim(),
    buyUrl: $('template_buyUrl').value.trim(),
    downloadUrl: $('template_downloadUrl').value.trim(),
    description: $('template_description').value.trim(),
    features: splitList($('template_features').value),
    formats: splitList($('template_formats').value)
  };
  await api('/api/templates', { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(payload) });
  clearForm('templateForm');
  toast('Template salvo.');
  await loadAll();
}

function bindTabs() {
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      $(`panel-${button.dataset.tab}`).classList.add('active');
    };
  });
}

function bindSlugHelpers() {
  [
    ['segment_name', 'segment_slug'],
    ['product_title', 'product_slug'],
    ['template_title', 'template_slug']
  ].forEach(([source, target]) => {
    $(source).addEventListener('blur', () => {
      if (!$(target).value.trim()) $(target).value = slugify($(source).value);
    });
  });
}

function bindEvents() {
  $('loginForm').onsubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: $('loginEmail').value, password: $('loginPassword').value })
      });
      state.token = data.token;
      state.email = data.email;
      localStorage.setItem('marketAdminToken', state.token);
      localStorage.setItem('marketAdminEmail', state.email);
      showAdmin();
      await loadAll();
    } catch (error) {
      alert(error.message || 'Não foi possível entrar. Confira o e-mail e a senha do admin.');
    }
  };

  $('logoutBtn').onclick = () => {
    localStorage.removeItem('marketAdminToken');
    localStorage.removeItem('marketAdminEmail');
    state.token = '';
    state.email = '';
    showLogin();
  };

  $('segmentForm').onsubmit = (event) => saveSegment(event).catch((error) => alert(error.message));
  $('productForm').onsubmit = (event) => saveProduct(event).catch((error) => alert(error.message));
  $('templateForm').onsubmit = (event) => saveTemplate(event).catch((error) => alert(error.message));
  document.querySelectorAll('[data-clear]').forEach((button) => button.onclick = () => clearForm(button.dataset.clear));
  document.querySelectorAll('[data-upload]').forEach((button) => {
    button.onclick = () => uploadImageForField(button.dataset.upload).catch((error) => alert(error.message));
  });
  ['template_cover'].forEach((fieldId) => {
    const fileInput = $(`${fieldId}_file`);
    if (fileInput) fileInput.addEventListener('change', () => uploadImageForField(fieldId).catch((error) => alert(error.message)));
  });
  const zipBtn = $('templateZipUploadBtn');
  if (zipBtn) zipBtn.onclick = () => uploadTemplateZip().catch((error) => alert(error.message));
  const zipInput = $('template_zip_file');
  if (zipInput) zipInput.addEventListener('change', () => uploadTemplateZip().catch((error) => alert(error.message)));
  const priceInput = $('template_price');
  if (priceInput) {
    priceInput.addEventListener('blur', () => applyUsdMask(priceInput));
    priceInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') applyUsdMask(priceInput); });
  }
  bindTabs();
  bindSlugHelpers();
}

async function boot() {
  bindEvents();
  if (!state.token) return showLogin();
  try {
    await api('/api/admin/me', { headers: authHeaders() });
    showAdmin();
    await loadAll();
  } catch (error) {
    localStorage.removeItem('marketAdminToken');
    localStorage.removeItem('marketAdminEmail');
    showLogin();
  }
}

boot();
