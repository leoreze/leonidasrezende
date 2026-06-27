const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.navbar');
menu?.addEventListener('click', () => nav.classList.toggle('is-open'));
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => nav.classList.remove('is-open')));

const translations = {
  pt: {
    pageTitle: 'Leonidas Rezende | Design, Tecnologia, IA e Produtos Digitais',
    metaDescription: 'Design estratégico, UX/UI, IA, branding, landing pages, apresentações e produtos digitais para empresas que precisam inovar e vender melhor.',
    navSobre: 'Sobre', navServicos: 'Serviços', navProdutos: 'Produtos', navResultados: 'Resultados', navCases: 'Cases', navContato: 'Contato', briefing: 'Briefing',
    heroTag: '[ Leonidas Rezende ]',
    heroTitle: 'Design.<br>Tecnologia.<br><span>Inteligência.</span>',
    heroLead: 'Transformo ideias em experiências digitais, produtos, marcas e sistemas que geram valor real para empresas e pessoas.',
    heroMicro: 'Há mais de 25 anos unindo estratégia, design, tecnologia e IA para criar soluções inovadoras que fazem a diferença.',
    heroPrimary: 'Vamos conversar <b>→</b>', heroSecondary: 'Ver cases <b>→</b>', trust: 'Empresas que confiam no meu trabalho',
    aboutMeTag: 'Sobre mim', aboutMeTitle: '25 anos conectando design, tecnologia e estratégia para transformar ideias em negócios digitais.', aboutMeP1: 'Sou Leonidas Rezende, consultor de Design, Tecnologia, UX/UI e Inteligência Artificial. Minha trajetória une criação visual, estratégia de negócio, desenvolvimento de produtos digitais, marketing e automação para construir soluções que geram valor real.', aboutMeP2: 'Atuei em projetos para marcas e instituições como Grupo SEB, Magalu, Ourofino, Unimed, Conexia, Evolucional e outros negócios que precisavam organizar ideias, melhorar experiências e acelerar resultados digitais.',
    servicesTag: 'O que eu faço', servicesTitle: 'Soluções completas para transformar o seu negócio',
    s1Title: 'Branding Estratégico', s1Desc: 'Marcas fortes, memoráveis e com posicionamento claro para se destacar.',
    s2Title: 'Design UI/UX', s2Desc: 'Interfaces intuitivas que conectam usabilidade, estética e resultado.',
    s3Title: 'Produtos Digitais', s3Desc: 'Do conceito ao lançamento: web, mobile, sistemas e plataformas completas.',
    s4Title: 'Inteligência Artificial', s4Desc: 'Automação, IA generativa e integração inteligente para seu negócio.',
    s5Title: 'Apresentações', s5Desc: 'Apresentações que comunicam, persuadem e vendem sua ideia.',
    casesTag: 'Projetos em destaque', casesTitle: 'Alguns cases que geraram impacto e resultados reais', casesBtn: 'Ver todos os cases →',
    c1Title: 'PetFunny OS', c1Desc: 'Sistema de gestão para pet shops', c2Title: 'LoopinEdu', c2Desc: 'Plataforma SaaS Educacional', c3Title: 'PetGuard AI', c3Desc: 'Inteligência artificial para pet saúde', c4Title: 'Ciclo Vivo', c4Desc: 'Identidade Visual para Reconstrução Humana',
    aboutTag: 'Projetos que contam histórias', aboutTitle: 'Resultados que refletem experiência e compromisso',
    stat1: 'Anos de experiência', stat2: 'Projetos entregues', stat3: 'Marcas criadas', stat4: 'Produtos digitais', stat5: 'Usuários impactados indiretamente',
    testTag: 'O que dizem sobre meu trabalho', testTitle: 'Depoimentos de clientes e parceiros', testQuote: '“Leonidas tem uma visão estratégica incrível. Nosso produto ganhou clareza, usabilidade e resultados expressivos.”', testRole: 'CEO — Pet Shop X',
    productsTag: 'Serviços e produtos', productsTitle: 'Pacotes para acelerar sua presença digital', p1Title: 'Branding + Landing + Pitch', p1Desc: 'Pacote completo para lançar, apresentar e vender melhor.', p2Title: 'Landing Page Premium', p2Desc: 'Design, copy, SEO, UX e CTA forte para conversão.', p3Title: 'Produto Digital MVP', p3Desc: 'Fluxos, interface, protótipo, front-end e base de produto.',
    contactTag: 'Pronto para começar?', contactTitle: 'Vamos criar algo incrível juntos?', contactDesc: 'Se você tem um projeto, uma ideia ou precisa transformar seu negócio, estou pronto para ajudar.', contactPrimary: 'Iniciar projeto →', contactSecondary: 'Agendar reunião',
    footerDesc: 'Design, Tecnologia e Inteligência Artificial para transformar ideias em soluções que geram valor e impacto.', footerNav: 'Navegação', footerServices: 'Serviços', footerContact: 'Contato', footerSocial: 'Redes sociais', footerTalk: 'Vamos conversar', footerAbout:'Sobre', footerProducts:'Produtos', footerBranding:'Branding', footerUi:'UI/UX Design', footerDigital:'Produtos Digitais', footerAi:'Inteligência Artificial', footerPresentation:'Apresentações', badgeSystem:'Sistema', badgeWeb:'Web', badgeSaas:'SaaS', badgeMobile:'Mobile', badgeEducation:'Educação', copyright: '© 2026 Leonidas Rezende. Todos os direitos reservados.'
  },
  en: {
    pageTitle: 'Leonidas Rezende | Design, Technology, AI and Digital Products',
    metaDescription: 'Strategic design, UX/UI, AI, branding, landing pages, presentations and digital products for companies that need to innovate and sell better.',
    navSobre: 'About', navServicos: 'Services', navProdutos: 'Products', navResultados: 'Results', navCases: 'Cases', navContato: 'Contact', briefing: 'Briefing',
    heroTag: '[ Leonidas Rezende ]',
    heroTitle: 'Design.<br>Technology.<br><span>Intelligence.</span>',
    heroLead: 'I transform ideas into digital experiences, products, brands and systems that create real value for companies and people.',
    heroMicro: 'For over 25 years, I have combined strategy, design, technology and AI to create innovative solutions that make a difference.',
    heroPrimary: 'Let’s talk <b>→</b>', heroSecondary: 'View cases <b>→</b>', trust: 'Companies that trust my work',
    aboutMeTag: 'About me', aboutMeTitle: '25 years connecting design, technology and strategy to transform ideas into digital businesses.', aboutMeP1: 'I am Leonidas Rezende, a Design, Technology, UX/UI and Artificial Intelligence consultant. My journey combines visual creation, business strategy, digital product development, marketing and automation to build solutions that generate real value.', aboutMeP2: 'I have worked on projects for brands and institutions such as Grupo SEB, Magalu, Ourofino, Unimed, Conexia, Evolucional and other businesses that needed to organize ideas, improve experiences and accelerate digital results.',
    servicesTag: 'What I do', servicesTitle: 'Complete solutions to transform your business',
    s1Title: 'Strategic Branding', s1Desc: 'Strong, memorable brands with clear positioning built to stand out.',
    s2Title: 'UI/UX Design', s2Desc: 'Intuitive interfaces that connect usability, aesthetics and results.',
    s3Title: 'Digital Products', s3Desc: 'From concept to launch: web, mobile, systems and complete platforms.',
    s4Title: 'Artificial Intelligence', s4Desc: 'Automation, generative AI and intelligent integrations for your business.',
    s5Title: 'Presentations', s5Desc: 'Presentations that communicate, persuade and sell your idea.',
    casesTag: 'Featured projects', casesTitle: 'Selected cases that generated impact and real results', casesBtn: 'View all cases →',
    c1Title: 'PetFunny OS', c1Desc: 'Management system for pet shops', c2Title: 'LoopinEdu', c2Desc: 'Educational SaaS Platform', c3Title: 'PetGuard AI', c3Desc: 'Artificial intelligence for pet health', c4Title: 'Ciclo Vivo', c4Desc: 'Visual Identity for Human Reconstruction',
    aboutTag: 'Projects that tell stories', aboutTitle: 'Results that reflect experience and commitment',
    stat1: 'Years of experience', stat2: 'Projects delivered', stat3: 'Brands created', stat4: 'Digital products', stat5: 'Users indirectly impacted',
    testTag: 'What people say about my work', testTitle: 'Client and partner testimonials', testQuote: '“Leonidas has an incredible strategic vision. Our product gained clarity, usability and expressive results.”', testRole: 'CEO — Pet Shop X',
    productsTag: 'Services and products', productsTitle: 'Packages to accelerate your digital presence', p1Title: 'Branding + Landing + Pitch', p1Desc: 'A complete package to launch, present and sell better.', p2Title: 'Premium Landing Page', p2Desc: 'Design, copy, SEO, UX and strong CTA focused on conversion.', p3Title: 'Digital Product MVP', p3Desc: 'Flows, interface, prototype, front-end and product foundation.',
    contactTag: 'Ready to start?', contactTitle: 'Let’s create something incredible together?', contactDesc: 'If you have a project, an idea or need to transform your business, I am ready to help.', contactPrimary: 'Start project →', contactSecondary: 'Schedule meeting',
    footerDesc: 'Design, Technology and Artificial Intelligence to transform ideas into solutions that generate value and impact.', footerNav: 'Navigation', footerServices: 'Services', footerContact: 'Contact', footerSocial: 'Social media', footerTalk: 'Let’s talk', footerAbout:'About', footerProducts:'Products', footerBranding:'Branding', footerUi:'UI/UX Design', footerDigital:'Digital Products', footerAi:'Artificial Intelligence', footerPresentation:'Presentations', badgeSystem:'System', badgeWeb:'Web', badgeSaas:'SaaS', badgeMobile:'Mobile', badgeEducation:'Education', copyright: '© 2026 Leonidas Rezende. All rights reserved.'
  }
};

const bind = {
  '.nav-links a[href="#about"]': 'navSobre', '.nav-links a[href="#services"]': 'navServicos', '.nav-links a[href="#products"]': 'navProdutos', '.nav-links a[href="#results"]': 'navResultados', '.nav-links a[href="#cases"]': 'navCases', '.nav-links a[href="#contact"]': 'navContato',
  '.briefing': 'briefing', '.about-me .tag': 'aboutMeTag', '.about-me h2': 'aboutMeTitle', '.about-me .about-text p:nth-child(1)': 'aboutMeP1', '.about-me .about-text p:nth-child(2)': 'aboutMeP2', '.hero .tag': 'heroTag', '.hero h1': 'heroTitle', '.lead': 'heroLead', '.micro': 'heroMicro', '.hero-ctas .primary': 'heroPrimary', '.hero-ctas .ghost': 'heroSecondary', '.trust > span': 'trust',
  '#services .tag': 'servicesTag', '#services h2': 'servicesTitle', '#services article:nth-child(1) h3': 's1Title', '#services article:nth-child(1) p': 's1Desc', '#services article:nth-child(2) h3': 's2Title', '#services article:nth-child(2) p': 's2Desc', '#services article:nth-child(3) h3': 's3Title', '#services article:nth-child(3) p': 's3Desc', '#services article:nth-child(4) h3': 's4Title', '#services article:nth-child(4) p': 's4Desc', '#services article:nth-child(5) h3': 's5Title', '#services article:nth-child(5) p': 's5Desc',
  '#cases .tag': 'casesTag', '#cases h2': 'casesTitle', '#cases .section-row .btn': 'casesBtn', '.case-grid article:nth-child(1) h3': 'c1Title', '.case-grid article:nth-child(1) p': 'c1Desc', '.case-grid article:nth-child(2) h3': 'c2Title', '.case-grid article:nth-child(2) p': 'c2Desc', '.case-grid article:nth-child(3) h3': 'c3Title', '.case-grid article:nth-child(3) p': 'c3Desc', '.case-grid article:nth-child(4) h3': 'c4Title', '.case-grid article:nth-child(4) p': 'c4Desc',
  '#results .tag': 'aboutTag', '#results h2': 'aboutTitle', '.stats article:nth-child(1) span': 'stat1', '.stats article:nth-child(2) span': 'stat2', '.stats article:nth-child(3) span': 'stat3', '.stats article:nth-child(4) span': 'stat4', '.stats article:nth-child(5) span': 'stat5',
  '.testimonial .tag': 'testTag', '.testimonial h2': 'testTitle', '.testimonial blockquote': 'testQuote', '.author small': 'testRole',
  '#products .tag': 'productsTag', '#products h2': 'productsTitle', '#products article:nth-child(1) h3': 'p1Title', '#products article:nth-child(1) p': 'p1Desc', '#products article:nth-child(2) h3': 'p2Title', '#products article:nth-child(2) p': 'p2Desc', '#products article:nth-child(3) h3': 'p3Title', '#products article:nth-child(3) p': 'p3Desc',
  '#contact .tag': 'contactTag', '#contact h2': 'contactTitle', '#contact .contact-copy > p:not(.tag)': 'contactDesc', '#contact .primary': 'contactPrimary', '#contact .ghost': 'contactSecondary',
  '.footer > div:first-child p': 'footerDesc', '.footer-nav h4': 'footerNav', '.footer-services-column h4': 'footerServices', '.footer-services-column a:nth-child(2)': 'footerBranding', '.footer-services-column a:nth-child(3)': 'footerUi', '.footer-services-column a:nth-child(4)': 'footerDigital', '.footer-services-column a:nth-child(5)': 'footerAi', '.footer-services-column a:nth-child(6)': 'footerPresentation', '.footer-contact h4': 'footerContact', '.footer-contact .btn': 'footerTalk', '.footer-nav a:nth-child(2)': 'footerAbout', '.footer-nav a:nth-child(3)': 'navServicos', '.footer-nav a:nth-child(4)': 'footerProducts', '.footer-nav a:nth-child(5)': 'navResultados', '.footer-nav a:nth-child(6)': 'navCases', '.footer-nav a:nth-child(7)': 'navContato', '.case-grid article:nth-child(1) span:nth-of-type(1)': 'badgeSystem', '.case-grid article:nth-child(1) span:nth-of-type(2)': 'badgeWeb', '.case-grid article:nth-child(2) span:nth-of-type(1)': 'badgeSystem', '.case-grid article:nth-child(2) span:nth-of-type(2)': 'badgeSaas', '.case-grid article:nth-child(3) span:nth-of-type(2)': 'badgeMobile', '.case-grid article:nth-child(4) span:nth-of-type(1)': 'badgeEducation', '.case-grid article:nth-child(4) span:nth-of-type(2)': 'badgeWeb', '.copyright': 'copyright'
};

function setLanguage(locale) {
  const t = translations[locale];
  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  document.title = t.pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription);
  Object.entries(bind).forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (!el || !t[key]) return;
    if (t[key].includes('<')) el.innerHTML = t[key];
    else el.textContent = t[key];
  });
  const footerTalk = document.querySelector('.footer-contact .whatsapp-btn');
  if (footerTalk) { const icon = footerTalk.querySelector('span')?.outerHTML || ''; footerTalk.innerHTML = `${icon} ${t.footerTalk}`; }
  document.querySelector('.lang').textContent = locale === 'pt' ? 'EN' : 'PT';
  localStorage.setItem('lr-lang', locale);
}

let currentLang = localStorage.getItem('lr-lang') || 'pt';
setLanguage(currentLang);
document.querySelector('.lang')?.addEventListener('click', () => {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  setLanguage(currentLang);
  renderTestimonial(testimonialIndex);
});


const testimonialItems = {
  pt: [
    {
      quote: '“Leonidas transformou o PetFunny OS em uma plataforma clara, bonita e muito mais fácil de vender. O projeto ganhou visão de produto, organização e presença digital.”',
      name: 'Rafael Araújo',
      role: 'CEO — PetFunny OS',
      avatar: '/assets/avatar-rafael.jpg',
      avatarAlt: 'Foto de Rafael Araújo',
      project: '/assets/mockup-petfunnyos.jpg',
      projectAlt: 'Mockup do projeto PetFunny OS'
    },
    {
      quote: '“O LoopinEdu ficou com uma narrativa muito mais estratégica. A solução passou a comunicar valor para escolas, famílias e equipes pedagógicas com mais clareza.”',
      name: 'Amanda Ribeiro',
      role: 'Diretora Pedagógica — LoopinEdu',
      avatar: '/assets/avatar-amanda.jpg',
      avatarAlt: 'Foto de Amanda Ribeiro',
      project: '/assets/mockup-loopinedu.jpg',
      projectAlt: 'Mockup do projeto LoopinEdu'
    },
    {
      quote: '“O PetGuard AI traduziu uma ideia complexa em uma experiência simples, confiável e visualmente forte para saúde pet, com foco real em usabilidade.”',
      name: 'Dr. Lucas Martins',
      role: 'Médico Veterinário — PetGuard AI',
      avatar: '/assets/avatar-lucas.jpg',
      avatarAlt: 'Foto de Lucas Martins',
      project: '/assets/mockup-petguardai.jpg',
      projectAlt: 'Mockup do projeto PetGuard AI'
    },
    {
      quote: '“A identidade do Ciclo Vivo ganhou sensibilidade, presença e propósito. A marca passou a expressar acolhimento, reconstrução e confiança de forma muito profissional.”',
      name: 'Mariana Souza',
      role: 'Coordenadora — Instituto Ciclo Vivo',
      avatar: '/assets/avatar-mariana2.jpg',
      avatarAlt: 'Foto de Mariana Souza',
      project: '/assets/mockup-ciclovivo.jpg',
      projectAlt: 'Mockup do projeto Ciclo Vivo'
    }
  ],
  en: [
    {
      quote: '“Leonidas transformed PetFunny OS into a clear, beautiful and much easier-to-sell platform. The project gained product vision, structure and digital presence.”',
      name: 'Rafael Araújo',
      role: 'CEO — PetFunny OS',
      avatar: '/assets/avatar-rafael.jpg',
      avatarAlt: 'Photo of Rafael Araújo',
      project: '/assets/mockup-petfunnyos.jpg',
      projectAlt: 'PetFunny OS project mockup'
    },
    {
      quote: '“LoopinEdu gained a much more strategic narrative. The solution now communicates value to schools, families and pedagogical teams with greater clarity.”',
      name: 'Amanda Ribeiro',
      role: 'Pedagogical Director — LoopinEdu',
      avatar: '/assets/avatar-amanda.jpg',
      avatarAlt: 'Photo of Amanda Ribeiro',
      project: '/assets/mockup-loopinedu.jpg',
      projectAlt: 'LoopinEdu project mockup'
    },
    {
      quote: '“PetGuard AI translated a complex idea into a simple, reliable and visually strong pet health experience with a real focus on usability.”',
      name: 'Dr. Lucas Martins',
      role: 'Veterinarian — PetGuard AI',
      avatar: '/assets/avatar-lucas.jpg',
      avatarAlt: 'Photo of Lucas Martins',
      project: '/assets/mockup-petguardai.jpg',
      projectAlt: 'PetGuard AI project mockup'
    },
    {
      quote: '“Ciclo Vivo’s identity gained sensitivity, presence and purpose. The brand now expresses care, reconstruction and trust in a very professional way.”',
      name: 'Mariana Souza',
      role: 'Coordinator — Instituto Ciclo Vivo',
      avatar: '/assets/avatar-mariana2.jpg',
      avatarAlt: 'Photo of Mariana Souza',
      project: '/assets/mockup-ciclovivo.jpg',
      projectAlt: 'Ciclo Vivo project mockup'
    }
  ]
};

let testimonialIndex = 0;

function renderTestimonial(index = testimonialIndex) {
  const list = testimonialItems[currentLang] || testimonialItems.pt;
  testimonialIndex = (index + list.length) % list.length;
  const item = list[testimonialIndex];
  const quote = document.querySelector('#testimonial-quote');
  const avatar = document.querySelector('#testimonial-avatar');
  const name = document.querySelector('#testimonial-name');
  const role = document.querySelector('#testimonial-role');
  const project = document.querySelector('#testimonial-project');

  [quote, project].forEach((el) => el?.classList.add('is-changing'));

  window.setTimeout(() => {
    if (quote) quote.textContent = item.quote;
    if (avatar) {
      avatar.src = item.avatar;
      avatar.alt = item.avatarAlt;
    }
    if (name) name.textContent = item.name;
    if (role) role.textContent = item.role;
    if (project) {
      project.src = item.project;
      project.alt = item.projectAlt;
    }
    document.querySelectorAll('[data-testimonial-dot]').forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
    });
    [quote, project].forEach((el) => el?.classList.remove('is-changing'));
  }, 180);
}

document.querySelector('#testimonial-prev')?.addEventListener('click', () => renderTestimonial(testimonialIndex - 1));
document.querySelector('#testimonial-next')?.addEventListener('click', () => renderTestimonial(testimonialIndex + 1));
document.querySelectorAll('[data-testimonial-dot]').forEach((dot) => {
  dot.addEventListener('click', () => renderTestimonial(Number(dot.dataset.testimonialDot)));
});

renderTestimonial(0);
