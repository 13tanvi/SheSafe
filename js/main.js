/* ========================================
   SheSafe – Global JavaScript
   ======================================== */

// ---- Hamburger / Mobile Menu ----
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Mark active nav link based on current page filename
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(current)) a.classList.add('active');
  });
  document.querySelectorAll('.bnav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.includes(current)) item.classList.add('active');
  });
}

// ---- Modal ----
function showModal(icon, title, message) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-icon').textContent  = icon;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent   = message;
  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

// Close modal when clicking backdrop
document.addEventListener('click', e => {
  const overlay = document.getElementById('modal-overlay');
  if (e.target === overlay) closeModal();
});

// ---- SOS Trigger ----
function triggerSOS() {
  showModal(
    '🚨',
    'SOS Activated!',
    'Your live location is being shared with emergency responders. Calling 112 now. Stay calm — help is on the way.'
  );
}

// ---- Dial Number ----
function dialNumber(num, label) {
  showModal(
    '📞',
    `Connecting to ${label}`,
    `Dialing ${num}. This call is toll-free and available 24 / 7 across the country.`
  );
}

// ---- Animate on scroll ----
function initScrollAnim() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnim();
});
