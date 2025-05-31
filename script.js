const galleryData = [
    { src: 'Assets/Media/Images/nature1.jpg', category: 'nature', caption: 'Mountain Landscape' },
    { src: 'Assets/Media/Images/nature2.jpg', category: 'nature', caption: 'Forest Path' },
    { src: 'Assets/Media/Images/nature3.jpg', category: 'nature', caption: 'Waterfall' },
    { src: 'Assets/Media/Images/nature4.jpg', category: 'nature', caption: 'Sunset Beach' },
    { src: 'Assets/Media/Images/nature5.webp', category: 'nature', caption: 'Autumn Trees' },
    { src: 'Assets/Media/Images/city1.jpg', category: 'city', caption: 'City Skyline' },
    { src: 'Assets/Media/Images/city2.jpg', category: 'city', caption: 'Modern Architecture' },
    { src: 'Assets/Media/Images/city3.jpg', category: 'city', caption: 'Night Lights' },
    { src: 'Assets/Media/Images/city4.jpg', category: 'city', caption: 'Urban Street' },
    { src: 'Assets/Media/Images/city5.jpg', category: 'city', caption: 'Bridge View' },
    { src: 'Assets/Media/Images/animals1.jpg', category: 'animals', caption: 'Lion' },
    { src: 'Assets/Media/Images/animals2.jpg', category: 'animals', caption: 'Elephant' },
    { src: 'Assets/Media/Images/animals3.jpg', category: 'animals', caption: 'Colorful Bird' },
    { src: 'Assets/Media/Images/animals4.jpg', category: 'animals', caption: 'Cute Dog' },
    { src: 'Assets/Media/Images/animals5.jpg', category: 'animals', caption: 'Playful Cat' }
];


const gallery = document.querySelector('.gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');


let currentImageIndex = 0;


function initGallery() {
    gallery.innerHTML = '';

    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.index = index;

        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.caption}">
            <div class="overlay">${item.caption}</div>
        `;

        galleryItem.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(galleryItem);
    });
}


function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


function openLightbox(index) {
    currentImageIndex = parseInt(index);
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}


function updateLightbox() {
    const item = galleryData[currentImageIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
}


function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightbox();
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterGallery(button.dataset.filter);
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

initGallery();