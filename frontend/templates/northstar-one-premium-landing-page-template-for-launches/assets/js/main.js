(function () {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $('[data-header]');
  const nav = $('[data-nav]');
  const menuToggle = $('[data-menu-toggle]');
  const modal = $('[data-modal]');
  const toast = $('[data-toast]');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');
    window.setTimeout(() => toast.classList.remove('active'), 3200);
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    $$('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = $(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealElements = $$('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  $$('[data-tabs]').forEach((tabs) => {
    const buttons = $$('[data-tab]', tabs);
    const panels = $$('[data-tab-panel]', tabs);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;
        buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
      });
    });
  });

  $$('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = $('.faq-answer', item);
      const isOpen = item.classList.contains('active');

      $$('.faq-item').forEach((faqItem) => {
        faqItem.classList.remove('active');
        const faqButton = $('.faq-question', faqItem);
        const faqAnswer = $('.faq-answer', faqItem);
        if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
        if (faqAnswer) faqAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  $$('[data-modal-open]').forEach((button) => button.addEventListener('click', openModal));
  $$('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  const form = $('[data-lead-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const requiredFields = $$('[required]', form);
      const invalidField = requiredFields.find((field) => !field.checkValidity());

      if (invalidField) {
        invalidField.focus();
        showToast('Preencha os campos obrigatórios para continuar.');
        return;
      }

      form.reset();
      showToast('Interesse enviado com sucesso. Personalize esta ação no main.js.');
    });
  }
})();
