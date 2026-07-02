'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const root = document.documentElement;
const sidebar = $('[data-sidebar]');
const overlay = $('[data-overlay]');
const command = $('[data-command]');
const modal = $('[data-modal]');
const toast = $('[data-toast]');
const chartCanvas = $('#revenueChart');
let toastTimer;

function showToast(message = 'Action completed successfully.') {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function openOverlay() {
  overlay?.classList.add('is-visible');
  document.body.classList.add('is-locked');
}

function closeOverlay() {
  overlay?.classList.remove('is-visible');
  document.body.classList.remove('is-locked');
}

function openSidebar() {
  sidebar?.classList.add('is-open');
  openOverlay();
}

function closeSidebar() {
  sidebar?.classList.remove('is-open');
  if (!command?.classList.contains('is-open') && !modal?.classList.contains('is-open')) closeOverlay();
}

function openCommand() {
  command?.classList.add('is-open');
  command?.setAttribute('aria-hidden', 'false');
  openOverlay();
  setTimeout(() => $('[data-command-input]')?.focus(), 50);
}

function closeCommand() {
  command?.classList.remove('is-open');
  command?.setAttribute('aria-hidden', 'true');
  if (!sidebar?.classList.contains('is-open') && !modal?.classList.contains('is-open')) closeOverlay();
}

function openModal() {
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
  openOverlay();
}

function closeModal() {
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
  if (!sidebar?.classList.contains('is-open') && !command?.classList.contains('is-open')) closeOverlay();
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('ccp-theme', theme);
}

function toggleTheme() {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
  drawChart(currentChartKey);
}

const storedTheme = localStorage.getItem('ccp-theme');
if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);

$('[data-sidebar-toggle]')?.addEventListener('click', openSidebar);
$('[data-sidebar-close]')?.addEventListener('click', closeSidebar);
$('[data-command-open]')?.addEventListener('click', openCommand);
$('[data-command-close]')?.addEventListener('click', closeCommand);
$$('[data-theme-toggle]').forEach((btn) => btn.addEventListener('click', toggleTheme));
$$('[data-modal-open]').forEach((btn) => btn.addEventListener('click', openModal));
$$('[data-modal-close]').forEach((btn) => btn.addEventListener('click', closeModal));
$$('[data-toast-trigger]').forEach((btn) => btn.addEventListener('click', () => showToast('Report exported. Template interaction ready.')));

overlay?.addEventListener('click', () => {
  closeSidebar();
  closeCommand();
  closeModal();
});

document.addEventListener('keydown', (event) => {
  const isCommand = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
  if (isCommand) {
    event.preventDefault();
    openCommand();
  }
  if (event.key === 'Escape') {
    closeSidebar();
    closeCommand();
    closeModal();
  }
});

$$('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    $$('.nav-link').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    closeSidebar();
  });
});

$$('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = $(button.dataset.target);
    closeCommand();
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const commandInput = $('[data-command-input]');
commandInput?.addEventListener('input', () => {
  const term = commandInput.value.trim().toLowerCase();
  $$('.command-list button').forEach((button) => {
    button.style.display = button.textContent.toLowerCase().includes(term) ? 'flex' : 'none';
  });
});

const chartData = {
  revenue: [38, 54, 48, 72, 66, 88, 82, 104, 118, 112, 138, 152],
  users: [24, 32, 41, 46, 58, 62, 74, 81, 89, 97, 110, 124],
  profit: [18, 26, 28, 39, 35, 48, 52, 60, 67, 72, 86, 94]
};
let currentChartKey = 'revenue';

function getCssVar(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function drawChart(key = 'revenue') {
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext('2d');
  const width = chartCanvas.width;
  const height = chartCanvas.height;
  const data = chartData[key] || chartData.revenue;
  const max = Math.max(...data) * 1.12;
  const padding = 38;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const text = getCssVar('--color-muted') || '#94A3B8';
  const border = getCssVar('--color-border') || 'rgba(255,255,255,.1)';
  const primary = getCssVar('--color-primary') || '#2DD4BF';
  const secondary = getCssVar('--color-secondary') || '#38BDF8';

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = border;
  ctx.font = '700 18px Inter, sans-serif';
  ctx.fillStyle = text;

  for (let i = 0; i < 5; i += 1) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  const points = data.map((value, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - (value / max) * chartHeight;
    return { x, y, value };
  });

  const gradient = ctx.createLinearGradient(0, padding, width, height - padding);
  gradient.addColorStop(0, secondary);
  gradient.addColorStop(0.55, primary);
  gradient.addColorStop(1, '#F59E0B');

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else {
      const prev = points[index - 1];
      const cx = (prev.x + point.x) / 2;
      ctx.bezierCurveTo(cx, prev.y, cx, point.y, point.x, point.y);
    }
  });
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.strokeStyle = gradient;
  ctx.stroke();

  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(padding, height - padding);
  ctx.closePath();
  const fill = ctx.createLinearGradient(0, padding, 0, height);
  fill.addColorStop(0, 'rgba(45, 212, 191, .20)');
  fill.addColorStop(1, 'rgba(45, 212, 191, 0)');
  ctx.fillStyle = fill;
  ctx.fill();

  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = primary;
    ctx.fill();
  });

  ctx.fillStyle = text;
  ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].forEach((label, index) => {
    const x = padding + (chartWidth / 5) * index;
    ctx.fillText(label, x - 12, height - 10);
  });
}

drawChart(currentChartKey);

$$('[data-chart]').forEach((button) => {
  button.addEventListener('click', () => {
    currentChartKey = button.dataset.chart;
    $$('[data-chart]').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    drawChart(currentChartKey);
  });
});

const resizeObserver = new ResizeObserver(() => drawChart(currentChartKey));
if (chartCanvas) resizeObserver.observe(chartCanvas);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach((element) => revealObserver.observe(element));

$$('[data-checklist] input').forEach((input) => {
  input.addEventListener('change', () => {
    showToast(input.checked ? 'Task marked as complete.' : 'Task reopened.');
  });
});

$('[data-notification]')?.addEventListener('click', () => showToast('You have 3 new executive alerts.'));
