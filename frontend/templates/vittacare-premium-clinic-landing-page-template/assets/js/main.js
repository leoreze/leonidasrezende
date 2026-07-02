/*
  VittaCare Clinic Landing Page Template
  Vanilla JavaScript interactions:
  - Mobile menu
  - Sticky header state
  - Smooth close on anchor click
  - Reveal animations with Intersection Observer
  - Tabs
  - FAQ accordion
  - Modal
  - Form validation + toast
*/

(function () {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $("[data-header]");
  const nav = $("[data-nav]");
  const menuToggle = $("[data-menu-toggle]");
  const toast = $("[data-toast]");
  const modal = $("[data-modal]");

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function closeMobileMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    if (!nav || !menuToggle) return;
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function initMenu() {
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", toggleMobileMenu);

    $$('a[href^="#"]', nav).forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });
  }

  function initReveal() {
    const items = $$(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(item);
    });
  }

  function initFaq() {
    $$(".faq-item").forEach((item) => {
      const question = $(".faq-question", item);
      const answer = $(".faq-answer", item);

      if (!question || !answer) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.toggle("is-open");
        question.setAttribute("aria-expanded", String(isOpen));
        answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0px";
      });
    });

    window.addEventListener("resize", () => {
      $$(".faq-item.is-open").forEach((item) => {
        const answer = $(".faq-answer", item);
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      });
    });
  }

  function initTabs() {
    $$("[data-tabs]").forEach((tabs) => {
      const buttons = $$("[data-tab]", tabs);
      const panels = $$("[data-tab-panel]", tabs);

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.dataset.tab;

          buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
          panels.forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.tabPanel === target);
          });
        });
      });
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const closeButton = $("[data-modal-close]", modal);
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModal() {
    $$("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", openModal);
    });

    $$("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3400);
  }

  function isPhoneValid(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }

  function initPhoneMask() {
    const phoneInput = $('input[name="phone"]');
    if (!phoneInput) return;

    phoneInput.addEventListener("input", () => {
      const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      const ddd = digits.slice(0, 2);
      const first = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
      const second = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);

      let formatted = "";
      if (ddd) formatted = `(${ddd}`;
      if (ddd.length === 2) formatted += ") ";
      if (first) formatted += first;
      if (second) formatted += `-${second}`;

      phoneInput.value = formatted;
    });
  }

  function initForm() {
    const form = $("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements.name;
      const phone = form.elements.phone;
      const service = form.elements.service;

      let isValid = true;

      [name, phone, service].forEach((field) => {
        if (!field) return;
        field.classList.remove("is-error");
      });

      if (!name.value.trim() || name.value.trim().length < 3) {
        name.classList.add("is-error");
        isValid = false;
      }

      if (!isPhoneValid(phone.value)) {
        phone.classList.add("is-error");
        isValid = false;
      }

      if (!service.value) {
        service.classList.add("is-error");
        isValid = false;
      }

      if (!isValid) {
        showToast("Revise os campos obrigatórios antes de enviar.");
        return;
      }

      showToast("Solicitação enviada com sucesso. Personalize a integração no main.js.");
      form.reset();
    });
  }

  function initAnchorClose() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1040) closeMobileMenu();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setHeaderState();
    initMenu();
    initReveal();
    initFaq();
    initTabs();
    initModal();
    initPhoneMask();
    initForm();
    initAnchorClose();
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
})();
