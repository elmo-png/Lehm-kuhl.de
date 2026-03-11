// Öffnet/schließt das mobile Menü
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
const gradientTextEl = document.querySelector('.gradientText');
if (gradientTextEl) {
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const opacity = Math.min(scrollY / 400, 1); // 400 kann angepasst werden
    gradientTextEl.style.background =
      `linear-gradient(to bottom, #f5f5f5 0%, rgba(245,245,245,${opacity}) 100%)`;
  });
}


// Progressive Enhancement: kleine Fokus-Markierung für Tastatur
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
});

// Scroll-Reveals für Hero und Fokusbereich
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('reveal-visible'));
  }
}

// Einfaches Carousel für die Travel-Gallery
const initCarousel = (carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  if (!track || !slides.length) return;

  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;
  };

  prevBtn?.addEventListener('click', () => {
    if (index === 0) return;
    index -= 1;
    update();
  });

  nextBtn?.addEventListener('click', () => {
    if (index >= slides.length - 1) return;
    index += 1;
    update();
  });

  update();
};

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

