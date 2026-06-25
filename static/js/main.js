// ── Mobile Navigation ──────────────────────────────────────
const toggle = document.getElementById('mobile-toggle');
const nav    = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (nav && nav.classList.contains('is-open') &&
      !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ── Sticky header shadow ────────────────────────────────────
const header = document.getElementById('site-header');
if (header) {
  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
  );
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;pointer-events:none;';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

// ── Scroll-triggered animations ────────────────────────────
const animElements = document.querySelectorAll('.animate-in');
if (animElements.length && 'IntersectionObserver' in window) {
  const anim = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.animationPlayState = 'running';
        anim.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });
  animElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    anim.observe(el);
  });
}

// ── Smooth anchor scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Contact form handling is managed by per-page inline scripts.
