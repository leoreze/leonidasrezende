# LivrePro — Professional Services Landing Page Template

**LivrePro** é uma landing page premium para profissionais liberais, consultores, advogados, arquitetos, terapeutas, coaches, designers, contadores, personal trainers, educadores e especialistas independentes.

O template foi criado para comunicar autoridade, apresentar serviços de alto valor, gerar confiança e converter visitantes em contatos, reuniões, orçamentos ou mensagens no WhatsApp.

---

## Visão geral do produto

**Nicho:** profissionais liberais e especialistas independentes  
**Marca fictícia:** LivrePro  
**Tom visual:** premium, moderno, elegante, estratégico e confiável  
**Objetivo da página:** gerar leads, agendar diagnóstico, solicitar proposta e apresentar serviços  
**CTA principal:** Agendar diagnóstico  
**CTA secundário:** Ver apresentação  

---

## O que está incluso

- Landing page completa em HTML5
- CSS3 moderno com variáveis
- JavaScript puro
- Header sticky
- Menu mobile
- Hero section premium
- Seção de benefícios
- Problema e solução
- Tabs de serviços
- Como funciona
- Prova social
- Cards de preço
- Formulário com validação simples
- FAQ accordion
- Modal de apresentação
- Toast de confirmação
- Footer completo
- SVGs de logo, mockup e capa Open Graph
- Documentação em HTML
- README completo
- Copy comercial para Behance, Patreon e marketplaces

---

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

---

## Como instalar

1. Baixe o arquivo ZIP.
2. Descompacte em seu computador.
3. Abra a pasta no VS Code, Cursor ou editor de preferência.
4. Abra o arquivo `index.html` no navegador.
5. Para edição com recarregamento automático, use a extensão **Live Server**.

---

## Como trocar textos

Abra o arquivo:

```txt
index.html
```

Edite diretamente os blocos de texto, incluindo:

- Headline principal
- Subtítulo do hero
- CTAs
- Benefícios
- Serviços
- Passos de como funciona
- Depoimentos
- Planos
- Perguntas frequentes
- Informações do footer

---

## Como trocar cores

Abra:

```txt
assets/css/style.css
```

Altere as variáveis CSS no início do arquivo:

```css
:root {
  --color-primary: #16b8a6;
  --color-secondary: #4353ff;
  --color-accent: #f7c873;
  --color-bg: #f7f8fc;
  --color-surface: #ffffff;
  --color-text: #0d1b2a;
  --color-muted: #64748b;
  --color-border: #dde3f0;
}
```

Sugestões rápidas:

- Advocacia: azul-marinho, dourado e branco
- Arquitetura: grafite, areia e verde-oliva
- Terapia: verde suave, creme e azul claro
- Consultoria: azul, ciano e cinza executivo
- Design/branding: roxo, coral e preto premium

---

## Como trocar imagens

Os assets estão em:

```txt
assets/img/
```

Você pode substituir:

- `logo-mark.svg`
- `hero-mockup.svg`
- `og-cover.svg`

Mantenha o mesmo nome dos arquivos ou atualize os caminhos no `index.html`.

---

## Como alterar CTAs

Procure no `index.html` por:

- `Agendar diagnóstico`
- `Agendar conversa`
- `Solicitar proposta`
- `Ver apresentação`

Você pode alterar os textos e links para:

- WhatsApp
- Calendly
- Google Forms
- Typeform
- Página de pagamento
- E-mail
- Agenda própria

Exemplo para WhatsApp:

```html
<a class="btn btn-primary" href="https://wa.me/5511999999999">Falar no WhatsApp</a>
```

---

## Como duplicar seções

Cada bloco principal está dentro de uma tag:

```html
<section class="section">
  ...
</section>
```

Para duplicar uma seção:

1. Copie o bloco inteiro.
2. Cole abaixo da seção desejada.
3. Edite textos, IDs e links.

---

## Como remover seções

Apague o bloco completo da seção no `index.html`. Exemplo:

```html
<section class="section faq-section" id="faq">
  ...
</section>
```

Depois, remova o link correspondente no menu, se existir.

---

## Componentes reutilizáveis

### Botões

```css
.btn
.btn-primary
.btn-secondary
.btn-ghost
.btn-light
.btn-sm
.btn-lg
.full
```

### Estrutura

```css
.container
.section
.section-header
.grid
.grid-3
```

### Cards

```css
.card
.benefit-card
.feature-card
.pricing-card
.testimonial-card
.step-card
```

### Elementos comerciais

```css
.badge
.tag
.cta-box
.metric-row
.mini-table
```

### Interações

```css
.faq-item
.faq-question
.faq-answer
.tabs
.tab-btn
.tab-panel
.modal
.toast
```

---

## JavaScript incluído

O arquivo `assets/js/main.js` implementa:

- Menu mobile abre/fecha
- Header com efeito ao rolar
- Scroll suave para âncoras
- FAQ accordion
- Tabs de serviços
- Modal simples
- Toast/alerta
- Validação simples de formulário
- Animações de entrada com Intersection Observer

---

## Como publicar

### GitHub Pages

1. Crie um repositório.
2. Envie todos os arquivos.
3. Acesse **Settings → Pages**.
4. Selecione a branch principal.
5. Publique.

### Netlify

1. Acesse Netlify.
2. Arraste a pasta do projeto para o painel.
3. Aguarde o deploy.

### Vercel

1. Importe o repositório.
2. Não configure build command.
3. Publique como site estático.

### Render

1. Crie um Static Site.
2. Conecte seu repositório.
3. Use a pasta raiz como diretório de publicação.

---

## Licença sugerida

Sugestão de licença para venda:

- Uso pessoal permitido
- Uso comercial permitido para projetos finais de clientes
- Modificação permitida
- Distribuição do template original não permitida
- Revenda como template apenas com licença extendida

Adapte a licença conforme sua estratégia comercial.

---

## Produto para venda

### Nome comercial

**LivrePro — Professional Services Landing Page Template**

### Descrição curta para Behance

A premium landing page template designed for independent professionals, consultants, lawyers, architects, therapists, designers and service-based experts who need a modern, responsive and conversion-focused online presence.

### Descrição longa para venda

**LivrePro** is a premium landing page template created for independent professionals and service-based experts who want to present their authority, services, process and offers with clarity and sophistication.

Built with clean HTML, CSS and vanilla JavaScript, this template includes a complete commercial structure: hero section, benefits, problem/solution, service tabs, process steps, testimonials, pricing cards, lead form, FAQ accordion, modal, toast notification and full documentation.

It is ideal for consultants, lawyers, architects, therapists, coaches, designers, accountants, educators, personal trainers and freelancers who need a professional landing page ready to customize and publish.

### Recursos inclusos

- Fully responsive layout
- Clean HTML5 structure
- Modern CSS variables
- Vanilla JavaScript interactions
- Sticky header
- Mobile menu
- Service tabs
- Pricing cards
- FAQ accordion
- Lead capture form
- Modal preview
- Toast notification
- Documentation HTML
- README file
- SVG assets
- SEO-friendly structure

### Diferenciais

- Premium visual direction
- Conversion-focused copy
- Flexible for multiple professions
- No heavy dependencies
- Easy to customize
- Marketplace-ready structure
- Behance-ready product concept
- Clean and reusable components

### Sugestão de preço

- Preço promocional: **US$ 19**
- Preço padrão recomendado: **US$ 29**
- Versão premium com mockups: **US$ 49**
- Bundle com variações de nicho: **US$ 79–99**

Recomendação: comece vendendo por **US$ 29**. Ao adicionar mockups, variações de cores e mais páginas, suba para **US$ 49**.

---

## Tags para Behance

Landing Page, Web Design, UI Design, UX Design, Professional Website, HTML Template, CSS Template, Freelancer Website, Consultant Website, Responsive Design

## Tags para marketplace

Landing Page Template, Professional Services Template, Consultant Template, Lawyer Website Template, Freelancer Template, HTML CSS JS, Responsive Website, Service Business Template, No Code Alternative, Website UI Kit

---

## SEO

### Título SEO

LivrePro — Premium Landing Page Template for Independent Professionals

### Descrição SEO

Premium responsive landing page template for independent professionals, consultants, lawyers, architects, therapists, designers and service-based experts. Built with HTML, CSS and vanilla JavaScript.

---

## Headlines de venda

1. **Turn your expertise into a premium online presence.**
2. **A conversion-ready landing page for independent professionals.**
3. **Present your services, build trust and book more clients.**

## Variações de CTA

1. **Get the Template**
2. **Build Your Professional Page**
3. **Launch Your Service Landing Page**

---

## Texto para capa do Behance

**LivrePro** is a premium landing page template for independent professionals who need a clear, elegant and conversion-focused online presence. Designed for consultants, lawyers, architects, therapists, designers and service-based experts, the template combines strategic copy, refined UI, reusable components and clean front-end code.

---

## Roteiro visual do case no Behance

1. **Hero Cover**  
   Capa 3200×1800 com mockup desktop e mobile, nome LivrePro e headline do produto.

2. **Product Overview**  
   Explicar o nicho, objetivo do template e público-alvo.

3. **Desktop Landing Page**  
   Mostrar a página completa em um mockup vertical ou monitor.

4. **Hero Section Detail**  
   Destacar headline, CTAs, mockup e indicadores de confiança.

5. **Reusable Components**  
   Mostrar botões, cards, badges, tabs, FAQ, pricing e formulário.

6. **Mobile Experience**  
   Apresentar telas mobile-first em smartphone.

7. **Sections Breakdown**  
   Benefícios, problema/solução, serviços, processo, prova social, planos e FAQ.

8. **Code & Documentation**  
   Mostrar organização de pastas, README e documentation.html.

9. **Marketplace Value**  
   Destacar o que está incluso, preço sugerido e possibilidades de customização.

10. **Final CTA**  
   Encerrar com mockup premium e chamada para compra/download.

---

## Checklist final de venda

- [ ] Verificar links e CTAs
- [ ] Testar formulário
- [ ] Testar FAQ e tabs
- [ ] Testar menu mobile
- [ ] Testar em Chrome, Edge, Safari e Firefox
- [ ] Testar em mobile, tablet e desktop
- [ ] Gerar mockups para Behance
- [ ] Criar capa hero 3200×1800
- [ ] Criar imagens preview para marketplace
- [ ] Revisar licença
- [ ] Comprimir ZIP final
- [ ] Publicar no Behance, Patreon, Gumroad ou Creative Market

---

## Suporte e customização

Este template foi estruturado para ser editável, leve e fácil de adaptar. Para transformar em produto ainda mais premium, adicione:

- Página de obrigado
- Página de política de privacidade
- Variações de nicho
- Versão dark mode
- Integração com WhatsApp
- Integração com Calendly
- Mockups profissionais
- Mini guia em PDF
