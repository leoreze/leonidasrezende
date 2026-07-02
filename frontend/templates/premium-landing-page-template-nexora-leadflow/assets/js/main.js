/*
  Nexora LeadFlow — Vanilla JavaScript interactions
  Features: mobile menu, smooth anchors, sticky header, reveal animations,
  FAQ accordion, tabs, modal and simple form validation.
*/

(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const modal = document.querySelector('[data-modal]');
  const modalOpenButtons = document.querySelectorAll('[data-modal-open]');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  const leadForm = document.querySelector('[data-lead-form]');
  const toast = document.querySelector('[data-toast]');

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      const target = targetId && document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 14 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-faq] .faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const list = button.closest('[data-faq]');
      const isOpen = item.classList.contains('is-open');

      list.querySelectorAll('.faq-item').forEach((faqItem) => {
        faqItem.classList.remove('is-open');
        faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[data-tab]');
    const panels = tabs.querySelectorAll('[data-panel]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;

        buttons.forEach((btn) => {
          btn.classList.toggle('active', btn === button);
          btn.setAttribute('aria-selected', String(btn === button));
        });

        panels.forEach((panel) => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  });

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };

  modalOpenButtons.forEach((button) => button.addEventListener('click', openModal));
  modalCloseButtons.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');

    window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4200);
  };

  const validateField = (field) => {
    const group = field.closest('.form-group');
    const isValid = field.checkValidity();

    if (group) {
      group.classList.toggle('has-error', !isValid);
    }

    return isValid;
  };

  if (leadForm) {
    const fields = leadForm.querySelectorAll('input, select');

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => validateField(field));
    });

    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = Array.from(fields).every(validateField);

      if (!isValid) {
        showToast('Revise os campos destacados antes de enviar.');
        return;
      }

      leadForm.reset();
      fields.forEach((field) => field.closest('.form-group')?.classList.remove('has-error'));
      showToast('Solicitação recebida! Integre este formulário ao seu CRM ou WhatsApp.');
    });
  }
})();
