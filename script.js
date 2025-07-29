
// Scroll reveal animation
const revealElements = document.querySelectorAll('.feature, .description');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  observer.observe(el);
});

// Parallax effect for hero image
const heroImg = document.querySelector('.hero img');
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;
  heroImg.style.transform = `translate(${x}px, ${y}px)`;
});

// Modal image viewer
const images = document.querySelectorAll('.feature img');
images.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = 1000;

    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.borderRadius = '10px';
    modal.appendChild(modalImg);

    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
  });
});
