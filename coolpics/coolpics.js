
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
});

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    console.log(e.target);

    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('pic', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Close modal by pressing Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.open) {
        modal.close();
    }
});
