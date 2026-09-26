// ====== Scroll progress bar ======
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ====== Scroll reveal observer ======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.description').forEach(el => revealObserver.observe(el));

// ====== Parallax effect untuk hero image ======
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

// ====== Modal image viewer ======
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

// ====== CRUD Fitur Simbol ======
const defaultFeatures = [
  { id: 1, name: "All Seeing Eye", img: "all-seeing-eye.jpg", desc: "Melambangkan mata ketiga yang mampu menembus batas dunia nyata dan menyaksikan kebenaran tersembunyi." },
  { id: 2, name: "A Dark Sun", img: "dark-sun.jpg", desc: "Simbol kekuatan dari sisi bayangan yang sering diabaikan, tetapi justru menyimpan potensi pencerahan." },
  { id: 3, name: "Symbolic Hand Gesture", img: "symbolic-hand.jpg", desc: "Melambangkan perlindungan, kekuatan, dan aliran energi spiritual yang tak terlihat." },
  { id: 4, name: "A Cat With All Seeing Eye", img: "cat-eye.jpg", desc: "Kucing mistis sebagai penjaga alam batin, dengan mata yang mampu melihat kebenaran mutlak." }
];

function loadFeatures() {
  const stored = localStorage.getItem('features');
  return stored ? JSON.parse(stored) : defaultFeatures;
}
function saveFeatures(data) {
  localStorage.setItem('features', JSON.stringify(data));
}

let features = loadFeatures();
const container = document.getElementById('featuresContainer');

function renderFeatures() {
  container.innerHTML = '';
  features.forEach(f => {
    const card = document.createElement('div');
    card.className = 'feature';
    card.innerHTML = `
      <img src="${f.img}" alt="${f.name}">
      <h3>${f.name}</h3>
      <p>${f.desc}</p>
      <div class="feature-actions">
        <button class="edit-btn" data-id="${f.id}">Edit</button>
        <button class="delete-btn" data-id="${f.id}">Hapus</button>
      </div>
    `;
    // Klik gambar untuk zoom (Read via modal)
    card.querySelector('img').addEventListener('click', () => {
      card.classList.add('clicked');
      setTimeout(() => card.classList.remove('clicked'), 500);
      openModal(f.img);
    });
    container.appendChild(card);
  });

  // Re-attach scroll reveal ke kartu baru
  document.querySelectorAll('.feature').forEach(el => {
    el.classList.remove('visible');
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px) scale(0.97)';
    revealObserver.observe(el);
  });

  // Edit
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const f = features.find(x => x.id === id);
      openForm(f);
    });
  });

  // Delete
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      if (confirm('Hapus simbol ini?')) {
        features = features.filter(x => x.id !== id);
        saveFeatures(features);
        renderFeatures();
      }
    });
  });
}

// ====== Form Modal (Create/Update) ======
const formOverlay = document.getElementById('formOverlay');
const formTitle = document.getElementById('formTitle');
const featureId = document.getElementById('featureId');
const featureName = document.getElementById('featureName');
const featureImg = document.getElementById('featureImg');
const featureDesc = document.getElementById('featureDesc');

function openForm(feature = null) {
  if (feature) {
    formTitle.textContent = 'Edit Simbol';
    featureId.value = feature.id;
    featureName.value = feature.name;
    featureImg.value = feature.img;
    featureDesc.value = feature.desc;
  } else {
    formTitle.textContent = 'Tambah Simbol';
    featureId.value = '';
    featureName.value = '';
    featureImg.value = '';
    featureDesc.value = '';
  }
  formOverlay.classList.add('active');
}

document.getElementById('addFeatureBtn').addEventListener('click', () => openForm());
document.getElementById('cancelFeatureBtn').addEventListener('click', () => {
  formOverlay.classList.remove('active');
});

document.getElementById('saveFeatureBtn').addEventListener('click', () => {
  const name = featureName.value.trim();
  const img = featureImg.value.trim();
  const desc = featureDesc.value.trim();
  if (!name || !img || !desc) {
    alert('Semua field wajib diisi!');
    return;
  }

  if (featureId.value) {
    // Update
    const id = parseInt(featureId.value);
    features = features.map(f => f.id === id ? { id, name, img, desc } : f);
  } else {
    // Create
    const newId = features.length ? Math.max(...features.map(f => f.id)) + 1 : 1;
    features.push({ id: newId, name, img, desc });
  }

  saveFeatures(features);
  renderFeatures();
  formOverlay.classList.remove('active');
});

// Render pertama kali saat halaman dimuat
renderFeatures();
