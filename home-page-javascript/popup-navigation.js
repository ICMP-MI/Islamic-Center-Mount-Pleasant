
const menuIcon = document.querySelector('.menu-icon-container');
const menuPopup = document.getElementById('menu-popup');

function openMenu() {
  menuPopup.classList.remove('hidden');
  menuIcon.setAttribute('aria-expanded', 'true');
  // Listen on the next tick's worth of clicks (see stopPropagation() in the
  // toggle handler below, which keeps the click that opened the menu from
  // immediately being seen here as an "outside" click).
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleMenuKeydown);
}

function closeMenu() {
  menuPopup.classList.add('hidden');
  menuIcon.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', handleOutsideClick);
  document.removeEventListener('keydown', handleMenuKeydown);
}

function handleOutsideClick(e) {
  if (!menuPopup.contains(e.target) && !menuIcon.contains(e.target)) {
    closeMenu();
  }
}

function handleMenuKeydown(e) {
  if (e.key === 'Escape') {
    closeMenu();
    menuIcon.focus();
  }
}

menuIcon.addEventListener('click', (e) => {
  // Without this, the same click that opens the menu would immediately bubble
  // to the document-level listener just added in openMenu() and close it again.
  e.stopPropagation();

  const isOpen = menuIcon.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});
