// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// Scroll reveal animation (staggered)
const revealElements = document.querySelectorAll('.feature, .description');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// Parallax effect for hero image
const heroImg = document.querySelector('.hero img');
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;
  heroImg.style.transform = `translate(${x}px, ${y}px)`;
});

// Klik pada foto baju (hero) -> efek pulse + buka modal
heroImg.addEventListener('click', () => {
  heroImg.classList.add('clicked');
  setTimeout(() => heroImg.classList.remove('clicked'), 500);
  openModal(heroImg.src);
});

// Klik pada kartu fitur / gambar simbol -> efek pulse + modal
document.querySelectorAll('.feature').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('clicked');
    setTimeout(() => card.classList.remove('clicked'), 500);
    const img = card.querySelector('img');
    if (img) openModal(img.src);
  });
});

// Modal image viewer
function openModal(src) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';

  const modalImg = document.createElement('img');
  modalImg.src = src;
  modal.appendChild(modalImg);

  modal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  document.body.appendChild(modal);
}
