# Nexora LeadFlow — Commercial Landing Page Template

Landing page comercial premium, responsiva e mobile-first, criada em HTML5, CSS3 e JavaScript puro. O template foi pensado para agências, consultorias, freelancers, startups, SaaS, negócios locais, clínicas, escolas, infoprodutores e empresas que precisam captar leads ou apresentar serviços com uma presença digital de alto valor.

## Visão geral do produto

**Nome comercial:** Nexora LeadFlow — Commercial Landing Page Template  
**Categoria:** HTML/CSS/JS Landing Page Template  
**Nicho:** Comercial, Agência, Consultoria, SaaS e Serviços Premium  
**Objetivo:** gerar leads, apresentar serviços, vender pacotes, agendar reuniões e direcionar para WhatsApp ou CRM.  
**Preço sugerido:** US$ 49 para licença simples; US$ 79 para licença estendida.

## O que está incluso

- Landing page completa em HTML, CSS e JavaScript puro.
- Design premium com visual tecnológico, moderno e sofisticado.
- Header sticky com menu mobile.
- Hero com CTA duplo, indicadores e mockup visual.
- Benefícios, problema/solução, features, tabs, como funciona, prova social, planos, tabela, formulário, FAQ e CTA final.
- Modal simples, toast/alerta e validação básica de formulário.
- Documentação HTML em `/docs/documentation.html`.
- README completo para customização e venda.
- Assets SVG editáveis em `/assets/img/`.

## Estrutura de arquivos

```txt
/index.html
/assets/css/style.css
/assets/js/main.js
/assets/img/logo-mark.svg
/assets/img/hero-mockup.svg
/assets/img/og-cover.svg
/docs/documentation.html
/README.md
```

## Como instalar

Não há instalação obrigatória. O template é estático.

1. Baixe o ZIP.
2. Extraia a pasta.
3. Abra `index.html` no navegador.
4. Edite os arquivos em qualquer editor de código.

## Como abrir localmente

Você pode abrir o `index.html` diretamente ou usar um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Como trocar textos

Abra `index.html` e edite o conteúdo das seções:

- `#hero`
- `#beneficios`
- `#solucao`
- `#features`
- `#como-funciona`
- `#depoimentos`
- `#planos`
- `#lead`
- `#faq`

## Como trocar cores

No arquivo `assets/css/style.css`, altere as variáveis dentro de `:root`:

```css
:root {
  --color-primary: #6d5ef7;
  --color-secondary: #00d4ff;
  --color-accent: #ffb86b;
  --color-bg: #070816;
  --color-surface: rgba(255, 255, 255, 0.08);
  --color-text: #f7f8ff;
  --color-muted: #a6adc8;
  --color-border: rgba(255, 255, 255, 0.14);
}
```

## Como trocar imagens

Substitua os arquivos dentro de `/assets/img/` mantendo os mesmos nomes, ou altere os caminhos no HTML.

Arquivos principais:

- `logo-mark.svg`
- `hero-mockup.svg`
- `og-cover.svg`

## Como alterar CTAs

Procure por botões com as classes:

- `.btn-primary`
- `.btn-secondary`
- `.btn-ghost`

Altere o texto e o atributo `href` para o destino desejado, como WhatsApp, checkout, formulário ou calendário.

## Como duplicar seções

Copie uma seção completa em `index.html`, incluindo abertura e fechamento:

```html
<section class="section" id="nome-da-secao">
  ...
</section>
```

Depois altere o ID, os textos e os links do menu, se necessário.

## Como remover seções

Remova o bloco `<section>` correspondente e retire o link da navegação caso exista.

## Componentes reutilizáveis

- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-ghost`
- `.section`
- `.section-header`
- `.card`
- `.benefit-card`
- `.feature-card`
- `.pricing-card`
- `.badge`
- `.tag`
- `.container`
- `.grid`
- `.faq-item`
- `.simple-table`
- `[data-tabs]`
- `[data-modal]`
- `[data-toast]`

## JavaScript incluído

O arquivo `assets/js/main.js` implementa:

- Menu mobile abre/fecha.
- Scroll suave para âncoras.
- Header com efeito ao rolar.
- Animações com Intersection Observer.
- FAQ accordion.
- Tabs.
- Modal.
- Validação simples de formulário.
- Toast/alerta de feedback.

## Como publicar

### GitHub Pages

1. Suba os arquivos para um repositório.
2. Vá em Settings → Pages.
3. Selecione a branch principal.
4. Publique a pasta root.

### Netlify

1. Acesse Netlify.
2. Arraste a pasta do projeto ou conecte o GitHub.
3. Não use build command.
4. Use `/` como publish directory.

### Vercel

1. Importe o repositório.
2. Framework: Other.
3. Build command: vazio.
4. Output directory: vazio ou root.

### Render

1. Crie um Static Site.
2. Conecte o repositório.
3. Build command: vazio.
4. Publish directory: `.`.

## Licença sugerida

Sugestão para venda:

- **Personal License:** uso em um projeto pessoal.
- **Commercial License:** uso em um projeto comercial próprio ou de cliente.
- **Extended License:** uso em múltiplos projetos de clientes, sem redistribuição do código original como template concorrente.

## Sugestões de customização

- Criar versões por nicho: SaaS, agência, clínica, escola, petshop, curso online, app mobile, IA e consultoria.
- Trocar o mockup SVG por imagens 3D, screenshots ou mockups de dashboard.
- Integrar formulário com Formspree, HubSpot, RD Station, Google Forms ou WhatsApp.
- Criar variações de paleta: dark premium, clean light, neon tech e corporate blue.
- Adicionar seção de cases, integração com calendário ou vídeo de apresentação.

## Conteúdo comercial para venda

### Descrição curta para Behance

Nexora LeadFlow is a premium commercial landing page template built with clean HTML, CSS and vanilla JavaScript. Designed for agencies, consultants, SaaS products and service-based businesses that need a modern, responsive and conversion-focused website.

### Descrição longa para venda

Nexora LeadFlow is a polished, conversion-focused landing page template crafted for digital agencies, consultants, startups, SaaS companies and premium service providers. Built with semantic HTML5, modern CSS3 and lightweight vanilla JavaScript, it includes all essential sections for a high-performing commercial page: hero, benefits, problem/solution, features, process, testimonials, pricing, comparison table, FAQ, lead form and final CTA.

The template is easy to customize, fully responsive and documented for fast editing. It includes reusable UI components, CSS variables, smooth animations, mobile navigation, accordion, tabs, modal and form validation. Perfect for freelancers, designers and agencies that want to sell templates, build client pages faster or publish a professional portfolio case.

### Recursos inclusos

- Responsive commercial landing page.
- Mobile-first layout.
- Premium dark UI style.
- Clean HTML/CSS/JS.
- Sticky header and mobile menu.
- FAQ accordion.
- Tabs component.
- Modal component.
- Toast/alert feedback.
- Lead form validation.
- Pricing cards.
- Comparison table.
- Documentation page.
- Marketplace-ready copy.

### Diferenciais

- No heavy dependencies.
- Easy customization with CSS variables.
- Realistic commercial copy, no lorem ipsum.
- Premium visual hierarchy.
- Behance-ready presentation concept.
- Built for agencies, freelancers and template sellers.

### Sugestão de preço

- Simple product: **US$ 29**
- Premium product: **US$ 49**
- Extended/Agency license: **US$ 79**

### 10 tags para Behance

Landing Page, UI Design, Web Design, HTML Template, CSS Template, JavaScript, SaaS Design, Agency Website, Conversion Design, Responsive Design

### 10 tags para marketplace

landing page template, html css template, agency landing page, commercial website, responsive landing page, vanilla javascript, saas landing page, lead generation template, web design template, premium website template

### Título SEO

Nexora LeadFlow — Premium Commercial Landing Page Template HTML CSS JS

### Descrição SEO

Premium commercial landing page template built with HTML, CSS and vanilla JavaScript. Fully responsive, mobile-first and designed for agencies, consultants, SaaS companies and service-based businesses.

### 3 variações de headline

1. Launch a premium commercial landing page without starting from scratch.
2. A conversion-focused landing page template for agencies, SaaS and consultants.
3. Turn visitors into qualified leads with a clean, modern and responsive template.

### 3 variações de CTA

1. Get the Template
2. Launch Your Landing Page
3. Start Building Faster

### Texto para capa do Behance

Nexora LeadFlow  
Premium Commercial Landing Page Template  
HTML · CSS · JavaScript · Responsive UI · Documentation Included

### Roteiro visual do case no Behance

1. **Hero Cover:** nome do template, mockup principal e tags HTML/CSS/JS.
2. **Problem:** páginas genéricas não comunicam valor nem convertem.
3. **Solution:** estrutura comercial com narrativa, prova social e CTA forte.
4. **UI System:** paleta, tipografia, botões, badges, cards e grid.
5. **Sections Overview:** hero, benefícios, features, planos, FAQ e CTA final.
6. **Responsive Design:** telas mobile, tablet e desktop.
7. **Components:** menu mobile, accordion, tabs, modal, toast e formulário.
8. **Documentation:** preview da documentação e estrutura de arquivos.
9. **Marketplace Preview:** recursos inclusos, preço sugerido e licenças.
10. **Final CTA:** disponível para Gumroad, Creative Market e Behance.

## Checklist final de venda

- [ ] Testar `index.html` em Chrome, Edge, Safari e Firefox.
- [ ] Conferir responsividade em 375px, 768px, 1440px e 1920px.
- [ ] Revisar links, CTAs e e-mail de contato.
- [ ] Trocar imagens de preview, se desejar.
- [ ] Criar capa Behance em 3200 × 1800 px.
- [ ] Exportar screenshots das seções.
- [ ] Compactar pasta em ZIP.
- [ ] Criar descrição em inglês para marketplace.
- [ ] Definir licença e preço.
- [ ] Publicar preview online para demonstração.
