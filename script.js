// script.js — lightweight JS for smooth scroll + reveal-on-scroll
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // update focus for accessibility
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        window.setTimeout(()=>{ target.removeAttribute('tabindex') }, 1000);
      }
    });
  });

  // IntersectionObserver for reveal animations
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    // fallback
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.style.display = expanded ? 'none' : 'block';
    });
  }

  // Respect prefers-reduced-motion: remove animations if requested
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media && media.matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});
