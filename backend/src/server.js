import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../');
const frontend = path.join(root, 'frontend');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
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
