const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

/* kliknutí mimo menu */
overlay.addEventListener('click', closeMenu);

/* ESC zavře */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});
