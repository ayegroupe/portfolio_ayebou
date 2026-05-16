// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const fillEls = document.querySelectorAll('.fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
fillEls.forEach(el => barObserver.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  setTimeout(() => {
    formSuccess.style.display = 'block';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message ✉️';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

// ===== TYPED HERO ROLE =====
const roles = [
  'Azure Cloud Administrator',
  'Data Engineer — MS Fabric',
  'Systems & Network Admin',
  'IT Infrastructure Professional'
];
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const current = roles[ri];
    if (!deleting) {
      roleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      roleEl.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
}
