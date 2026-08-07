/* ═══════════════════════════════════════════
   main.js — Portfolio interactions
   Все фичи изолированы в функции — легко добавлять новые
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLangToggle();
  initTypedRole();
  initScrollReveal();
});

/* ───────────────────────────────────────────
   NAV — scroll border + burger (mobile)
─────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Burger menu (mobile) — пока просто toggle nav links
  const burger = document.getElementById('burger');
  const links  = nav.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '60px';
      links.style.right = '16px';
      links.style.background = 'var(--color-surface)';
      links.style.border = '1px solid var(--color-border)';
      links.style.borderRadius = 'var(--radius-md)';
      links.style.padding = '16px';
      links.style.gap = '16px';
    });
  }
}

/* ───────────────────────────────────────────
   LANGUAGE TOGGLE — EN / RU
   Ищет все элементы с data-en и data-ru
   Сохраняет выбор в localStorage
─────────────────────────────────────────── */
function initLangToggle() {
  const btn     = document.getElementById('langToggle');
  const html    = document.documentElement;
  let   current = localStorage.getItem('lang') || 'en';

  applyLang(current);

  btn.addEventListener('click', () => {
    current = current === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', current);
    applyLang(current);
  });
}

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-en][data-ru]').forEach(el => {
    el.textContent = el.dataset[lang] || el.textContent;
  });

  // Кнопка Resume тоже обновляется
  const resumeBtn = document.querySelector('.btn-resume');
  if (resumeBtn) {
    resumeBtn.textContent = lang === 'ru' ? 'файл ↓' : 'file ↓';
  }

  // Обновить typed role при смене языка
  initTypedRole(lang);
}

/* ───────────────────────────────────────────
   TYPED ROLE — эффект печатающегося текста
─────────────────────────────────────────── */
const ROLES = {
  en: [
    'Backend Engineer',
    'SRE Enthusiast',
    'Systems Thinker',
  ],
  ru: [
    'Backend-разработчик',
    'SRE Enthusiast',
    'Системный инженер',
  ]
};

let typedTimeout = null;

function initTypedRole(lang) {
  const el = document.getElementById('typedRole');
  if (!el) return;

  // Сбросить предыдущую анимацию
  if (typedTimeout) clearTimeout(typedTimeout);
  el.textContent = '';

  const currentLang = lang || document.documentElement.getAttribute('data-lang') || 'en';
  const roles = ROLES[currentLang] || ROLES.en;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function type() {
    const role = roles[roleIndex];

    if (!deleting) {
      el.textContent = role.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === role.length) {
        deleting = true;
        typedTimeout = setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = role.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = deleting ? 40 : 80;
    typedTimeout = setTimeout(type, speed);
  }

  type();
}

/* ───────────────────────────────────────────
   SCROLL REVEAL — анимация появления секций
   Добавь class="reveal" к любому элементу
─────────────────────────────────────────── */
function initScrollReveal() {
  // Навешиваем класс reveal на карточки автоматически
  const targets = document.querySelectorAll(
    '.project-card, .skill-group, .highlight-card, .contact-card, .contact__link, .section__title'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
