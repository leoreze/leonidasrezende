import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import pg from 'pg';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../');
const backendRoot = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(backendRoot, '.env') });
const frontend = path.join(root, 'frontend');
const uploadsDir = path.join(frontend, 'uploads');
const templateZipsDir = path.join(uploadsDir, 'templates');
const liveTemplatesDir = path.join(frontend, 'templates');
const app = express();
const port = process.env.PORT || 3000;

// Dados cadastrados no admin ficam em uma pasta persistente separada dos seeds do ZIP.
// Assim, quando você baixar/extrair uma nova versão do projeto, seus cadastros não são sobrescritos.
const seedDataDir = path.join(root, 'data');
const dataDir = process.env.MARKETPLACE_DATA_DIR
  ? path.resolve(process.env.MARKETPLACE_DATA_DIR)
  : path.join(root, 'marketplace-data');
const templatesFile = path.join(dataDir, 'templates.json');
const segmentsFile = path.join(dataDir, 'segments.json');
const productsFile = path.join(dataDir, 'products.json');
const seedTemplatesFile = path.join(seedDataDir, 'templates.json');
const seedSegmentsFile = path.join(seedDataDir, 'segments.json');
const seedProductsFile = path.join(seedDataDir, 'products.json');
const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const adminPassword = String(process.env.ADMIN_PASSWORD || '');
const configuredAliases = String(process.env.ADMIN_EMAIL_ALIASES || '')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const adminEmailAliases = new Set([adminEmail, ...configuredAliases].filter(Boolean));
const adminSecret = String(process.env.ADMIN_JWT_SECRET || '');
const missingAdminEnv = [
  ['ADMIN_EMAIL', adminEmail],
  ['ADMIN_PASSWORD', adminPassword],
  ['ADMIN_JWT_SECRET', adminSecret]
].filter(([, value]) => !value).map(([key]) => key);
const adminAuthConfigured = missingAdminEnv.length === 0;

async function readJson(file, fallback = [], seedFile = '') {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (seedFile) {
      try {
        const seedRaw = await fs.readFile(seedFile, 'utf8');
        return JSON.parse(seedRaw);
      } catch (seedError) {
        return fallback;
      }
    }
    return fallback;
  }
}

async function writeJson(file, data) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

const readTemplates = () => readJson(templatesFile, [], seedTemplatesFile);
const writeTemplates = (templates) => writeJson(templatesFile, templates);
const readSegments = () => readJson(segmentsFile, [], seedSegmentsFile);
const writeSegments = (segments) => writeJson(segmentsFile, segments);
const readProducts = () => readJson(productsFile, [], seedProductsFile);
const writeProducts = (products) => writeJson(productsFile, products);

function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
}

function publicSegmentsFromTemplates(templates = []) {
  const map = new Map();
  templates.forEach((item) => {
    const name = item.segment || 'Outros';
    if (!map.has(name)) map.set(name, { id: slugify(name), name, slug: slugify(name), status: 'published', description: '' });
  });
  return [...map.values()];
}

function signAdminToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', adminSecret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyAdminToken(token) {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', adminSecret).update(body).digest('base64url');
  const sigBuffer = Buffer.from(sig);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function requireMarketplaceAdmin(req, res, next) {
  if (!adminAuthConfigured) {
    return res.status(500).json({ error: `Admin não configurado. Defina ${missingAdminEnv.join(', ')} no backend/.env local ou nas variáveis do Render.` });
  }
  const header = req.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  const payload = verifyAdminToken(token);
  if (!payload || payload.email !== adminEmail) return res.status(401).json({ error: 'Acesso não autorizado.' });
  req.admin = payload;
  next();
}


app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(frontend, { maxAge: '1h' }));

const pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL.includes('render.com') ? { rejectUnauthorized: false } : false })
  : null;

const services = [
  { slug:'branding', price:'R$ 680+', title:{pt:'Branding Estratégico', en:'Strategic Branding'}, desc:{pt:'Identidade visual, posicionamento, logo, paleta, tipografia e brand book para marcas que precisam parecer maiores e vender melhor.', en:'Visual identity, positioning, logo, palette, typography and brand book for brands that need to look stronger and sell better.'}},
  { slug:'landing-pages', price:'R$ 680+', title:{pt:'Landing Pages que Convertem', en:'High-Converting Landing Pages'}, desc:{pt:'Páginas mobile-first com UX writing, SEO, performance, CTA forte e estrutura para geração de leads.', en:'Mobile-first pages with UX writing, SEO, performance, strong CTAs and lead-generation structure.'}},
  { slug:'presentations', price:'R$ 680+', title:{pt:'Apresentações de Alto Impacto', en:'High-Impact Presentations'}, desc:{pt:'Pitch decks, propostas comerciais e apresentações executivas com storytelling, design premium e animações.', en:'Pitch decks, commercial proposals and executive presentations with storytelling, premium design and animations.'}},
  { slug:'uiux', price:'R$ 980+', title:{pt:'UX/UI e Produtos Digitais', en:'UX/UI & Digital Products'}, desc:{pt:'Interfaces para apps, SaaS, dashboards, sistemas internos, PWAs e produtos digitais orientados por resultado.', en:'Interfaces for apps, SaaS, dashboards, internal systems, PWAs and result-driven digital products.'}},
  { slug:'ai-products', price:'sob consulta', title:{pt:'IA para Negócios', en:'AI for Business'}, desc:{pt:'Agentes, automações, dashboards inteligentes e fluxos com IA para reduzir tarefas manuais e acelerar decisões.', en:'Agents, automations, intelligent dashboards and AI workflows to reduce manual tasks and speed decisions.'}}
];

const cases = [
  { title:'PetFunny OS', type:'Sistema + IA + PWA', desc:'Gestão para banho e tosa com agenda, tutores, pacotes, financeiro, app do tutor e recursos de IA.' },
  { title:'LoopinPet', type:'SaaS Multi-tenant', desc:'Plataforma white-label para pet shops, clínicas e redes de franquias.' },
  { title:'PetGuard AI', type:'AI Health Product', desc:'Produto digital para triagem, monitoramento e saúde preventiva de pets com IA.' },
  { title:'Pueri Domus AI', type:'Educação + IA', desc:'Ecossistema educacional com diretrizes, prompts, portal e experiências de IA para aprendizagem.' }
];

app.get('/api/site', (req, res) => res.json({ services, cases }));


app.post('/api/admin/login', (req, res) => {
  if (!adminAuthConfigured) {
    return res.status(500).json({ error: `Admin não configurado. Defina ${missingAdminEnv.join(', ')} no arquivo backend/.env local ou nas variáveis do Render.` });
  }
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (!email || !password) return res.status(400).json({ error: 'Informe e-mail e senha.' });
  if (!adminEmailAliases.has(email) || password !== adminPassword) {
    return res.status(401).json({ error: 'E-mail ou senha inválidos. Use o e-mail e senha configurados no backend/.env.' });
  }
  const expiresInMs = 1000 * 60 * 60 * 12;
  const token = signAdminToken({ email: adminEmail, role: 'admin', exp: Date.now() + expiresInMs });
  res.json({ token, email: adminEmail, expiresAt: new Date(Date.now() + expiresInMs).toISOString() });
});

app.get('/api/admin/me', requireMarketplaceAdmin, (req, res) => {
  res.json({ email: adminEmail, role: 'admin' });
});

app.get('/api/admin/overview', requireMarketplaceAdmin, async (req, res) => {
  const [templates, segments, products] = await Promise.all([readTemplates(), readSegments(), readProducts()]);
  res.json({
    totals: {
      templates: templates.length,
      publishedTemplates: templates.filter((item) => item.status === 'published').length,
      segments: segments.length,
      products: products.length
    },
    email: adminEmail
  });
});


app.post('/api/uploads/image', requireMarketplaceAdmin, async (req, res) => {
  const { fileName, dataUrl } = req.body || {};
  if (!dataUrl || typeof dataUrl !== 'string') {
    return res.status(400).json({ error: 'Envie uma imagem para upload.' });
  }
  const match = dataUrl.match(/^data:(image\/(png|jpe?g|webp|gif|svg\+xml));base64,(.+)$/i);
  if (!match) {
    return res.status(400).json({ error: 'Formato inválido. Use PNG, JPG, WEBP, GIF ou SVG.' });
  }
  const mime = match[1].toLowerCase();
  const extensionMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg'
  };
  const ext = extensionMap[mime] || 'png';
  const base64 = match[3];
  const buffer = Buffer.from(base64, 'base64');
  const maxBytes = 8 * 1024 * 1024;
  if (!buffer.length || buffer.length > maxBytes) {
    return res.status(400).json({ error: 'A imagem precisa ter até 8MB.' });
  }
  const baseName = slugify(String(fileName || `imagem-${Date.now()}`).replace(/\.[a-z0-9]+$/i, ''));
  const finalName = `${Date.now()}-${baseName}.${ext}`;
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, finalName), buffer);
  res.json({ url: `/uploads/${finalName}`, fileName: finalName });
});


app.post('/api/uploads/template-zip', requireMarketplaceAdmin, async (req, res) => {
  const { slug: rawSlug, fileName, dataUrl } = req.body || {};
  const slug = slugify(rawSlug || fileName || `template-${Date.now()}`);
  if (!slug) return res.status(400).json({ error: 'Informe o slug do template antes de enviar o ZIP.' });
  if (!dataUrl || typeof dataUrl !== 'string') return res.status(400).json({ error: 'Envie um arquivo ZIP.' });

  const match = dataUrl.match(/^data:(application\/zip|application\/x-zip-compressed|application\/octet-stream);base64,(.+)$/i);
  if (!match && !dataUrl.startsWith('data:')) {
    return res.status(400).json({ error: 'Formato inválido. Envie um ZIP válido.' });
  }
  const base64 = match ? match[2] : dataUrl.split(',')[1];
  const buffer = Buffer.from(base64 || '', 'base64');
  const maxBytes = 80 * 1024 * 1024;
  if (!buffer.length || buffer.length > maxBytes) return res.status(400).json({ error: 'O ZIP precisa ter até 80MB.' });

  const finalZipName = `${slug}.zip`;
  const zipPath = path.join(templateZipsDir, finalZipName);
  const extractDir = path.join(liveTemplatesDir, slug);
  await fs.mkdir(templateZipsDir, { recursive: true });
  await fs.mkdir(liveTemplatesDir, { recursive: true });
  await fs.rm(extractDir, { recursive: true, force: true });
  await fs.mkdir(extractDir, { recursive: true });
  await fs.writeFile(zipPath, buffer);

  let zip;
  try {
    zip = new AdmZip(buffer);
  } catch (error) {
    await fs.rm(zipPath, { force: true });
    return res.status(400).json({ error: 'Não foi possível abrir o ZIP. Verifique o arquivo.' });
  }

  const entries = zip.getEntries().filter((entry) => !entry.isDirectory);
  if (!entries.length) return res.status(400).json({ error: 'O ZIP está vazio.' });

  let rootPrefix = '';
  const firstParts = entries.map((entry) => entry.entryName.split('/').filter(Boolean)[0]).filter(Boolean);
  if (firstParts.length && firstParts.every((part) => part === firstParts[0])) rootPrefix = `${firstParts[0]}/`;

  for (const entry of entries) {
    let entryName = entry.entryName.replace(/\\/g, '/');
    if (rootPrefix && entryName.startsWith(rootPrefix)) entryName = entryName.slice(rootPrefix.length);
    entryName = entryName.replace(/^\/+/, '');
    if (!entryName || entryName.includes('..') || path.isAbsolute(entryName)) continue;
    const targetPath = path.resolve(extractDir, entryName);
    if (!targetPath.startsWith(`${extractDir}${path.sep}`) && targetPath !== extractDir) continue;
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, entry.getData());
  }

  async function findIndexHtml(dir, base = '') {
    const items = await fs.readdir(path.join(dir, base), { withFileTypes: true }).catch(() => []);
    for (const item of items) {
      const relative = path.join(base, item.name).replace(/\\/g, '/');
      if (item.isFile() && item.name.toLowerCase() === 'index.html') return relative;
    }
    for (const item of items) {
      const relative = path.join(base, item.name).replace(/\\/g, '/');
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== '__MACOSX') {
        const found = await findIndexHtml(dir, relative);
        if (found) return found;
      }
    }
    return '';
  }

  const previewRelative = await findIndexHtml(extractDir);
  if (!previewRelative) {
    await fs.rm(extractDir, { recursive: true, force: true });
    return res.status(400).json({ error: 'O ZIP foi enviado, mas não encontrei um index.html para abrir a live demo.' });
  }

  const previewUrl = `/templates/${slug}/${previewRelative}`;
  const downloadUrl = `/uploads/templates/${finalZipName}`;
  res.json({ slug, previewUrl, downloadUrl, fileName: finalZipName });
});

app.get('/api/segments', async (req, res) => {
  const segments = await readSegments();
  if (segments.length) return res.json(segments);
  const templates = await readTemplates();
  res.json(publicSegmentsFromTemplates(templates));
});

app.post('/api/segments', requireMarketplaceAdmin, async (req, res) => {
  const segments = await readSegments();
  const payload = req.body || {};
  if (!payload.name) return res.status(400).json({ error: 'Informe o nome do segmento.' });
  const id = payload.id || `seg-${Date.now()}`;
  const next = {
    id,
    name: payload.name,
    slug: payload.slug || slugify(payload.name),
    description: payload.description || '',
    status: payload.status || 'published',
    updatedAt: new Date().toISOString()
  };
  const index = segments.findIndex((item) => item.id === id || item.slug === next.slug);
  if (index >= 0) segments[index] = { ...segments[index], ...next };
  else segments.unshift(next);
  await writeSegments(segments);
  res.json(next);
});

app.delete('/api/segments/:id', requireMarketplaceAdmin, async (req, res) => {
  const segments = await readSegments();
  await writeSegments(segments.filter((item) => item.id !== req.params.id && item.slug !== req.params.id));
  res.json({ ok: true });
});

app.get('/api/products', async (req, res) => {
  res.json(await readProducts());
});

app.get('/api/products/:slug', async (req, res) => {
  const products = await readProducts();
  const product = products.find((item) => item.slug === req.params.slug || item.id === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
  res.json(product);
});

app.post('/api/products', requireMarketplaceAdmin, async (req, res) => {
  const products = await readProducts();
  const payload = req.body || {};
  if (!payload.title || !payload.slug) return res.status(400).json({ error: 'Informe título e slug da categoria.' });
  const id = payload.id || `prd-${Date.now()}`;
  const next = {
    id,
    title: payload.title,
    slug: payload.slug || slugify(payload.title),
    status: payload.status || 'published',
    description: payload.description || '',
    updatedAt: new Date().toISOString()
  };
  const index = products.findIndex((item) => item.id === id || item.slug === payload.slug);
  if (index >= 0) products[index] = { ...products[index], ...next };
  else products.unshift(next);
  await writeProducts(products);
  res.json(next);
});

app.delete('/api/products/:id', requireMarketplaceAdmin, async (req, res) => {
  const products = await readProducts();
  await writeProducts(products.filter((item) => item.id !== req.params.id && item.slug !== req.params.id));
  res.json({ ok: true });
});

app.get('/api/templates', async (req, res) => {
  const templates = await readTemplates();
  res.json(templates);
});

app.get('/api/templates/:slug', async (req, res) => {
  const templates = await readTemplates();
  const template = templates.find((item) => item.slug === req.params.slug || item.id === req.params.slug);
  if (!template) return res.status(404).json({ error: 'Template não encontrado.' });
  res.json(template);
});

app.post('/api/templates', requireMarketplaceAdmin, async (req, res) => {
  const templates = await readTemplates();
  const payload = req.body || {};
  if (!payload.title || !payload.slug) return res.status(400).json({ error: 'Informe título e slug.' });
  const id = payload.id || `tpl-${Date.now()}`;
  const next = { ...payload, id, updatedAt: new Date().toISOString() };
  const index = templates.findIndex((item) => item.id === id || item.slug === payload.slug);
  if (index >= 0) templates[index] = { ...templates[index], ...next };
  else templates.unshift(next);
  await writeTemplates(templates);
  res.json(next);
});

app.delete('/api/templates/:id', requireMarketplaceAdmin, async (req, res) => {
  const templates = await readTemplates();
  const next = templates.filter((item) => item.id !== req.params.id && item.slug !== req.params.id);
  await writeTemplates(next);
  res.json({ ok: true });
});

app.get('/marketplace', (req, res) => res.sendFile(path.join(frontend, 'marketplace.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(frontend, 'admin.html')));
app.get('/admin/templates', (req, res) => res.sendFile(path.join(frontend, 'admin.html')));
app.get('/demo/:slug', (req, res) => res.sendFile(path.join(frontend, 'demo.html')));


app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, message, locale } = req.body || {};
  if (!name || (!email && !phone)) return res.status(400).json({ error: 'Informe nome e pelo menos e-mail ou WhatsApp.' });
  try {
    if (pool) {
      await pool.query('INSERT INTO leads(name,email,phone,service,message,locale) VALUES($1,$2,$3,$4,$5,$6)', [name, email, phone, service, message, locale || 'pt']);
    }
    res.json({ ok: true, whatsapp: `https://wa.me/${process.env.WHATSAPP_NUMBER || '5516999999999'}?text=${encodeURIComponent(`Olá, sou ${name}. Tenho interesse em ${service || 'um projeto'}: ${message || ''}`)}` });
  } catch (error) {
    console.error('[lead:error]', error);
    res.status(500).json({ error: 'Erro ao salvar lead.' });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(frontend, 'index.html')));

app.listen(port, () => console.log(`Leonidas Rezende landing rodando em http://localhost:${port}`));
