/* ========================================
   SheSafe – Report Page JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- GPS Location ----
  const locBtn  = document.getElementById('loc-btn');
  const locInput = document.getElementById('loc-input');

  if (locBtn && locInput) {
    locBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        locInput.value = 'Geolocation not supported';
        return;
      }
      locBtn.textContent = '⏳';
      navigator.geolocation.getCurrentPosition(
        pos => {
          locInput.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
          locBtn.textContent = '✅';
          setTimeout(() => locBtn.textContent = '📍', 2000);
        },
        () => {
          locInput.value = 'Unable to retrieve location';
          locBtn.textContent = '📍';
        }
      );
    });
  }

  // ---- Form Submit ----
  const form = document.getElementById('report-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name-input').value.trim();
      const type = document.getElementById('type-select').value;
      const desc = document.getElementById('desc-input').value.trim();

      if (!name || !type || !desc) {
        showModal('⚠️', 'Missing Fields', 'Please fill in your name, issue type, and description before submitting.');
        return;
      }

      showModal('✅', 'Report Submitted', 'Thank you for speaking up. Our team will review your report within 24 hours. You are not alone — we are here for you.');
      form.reset();
    });
  }

});
