const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('main-menu');

function toggleMenu() {
    navMenu.classList.toggle('active');
    const expanded = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        toggleMenu();
    }
});

// Smooth scrolling for internal navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Optionally close the menu on mobile after click
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('#project-filters button');
const projectArticles = document.querySelectorAll('#projects article');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-category');
        projectArticles.forEach(article => {
            if (category === 'all' || article.getAttribute('data-category') === category) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    });
});

// Lightbox effect
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('#projects img').forEach(img => {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.remove('hidden');
        lightboxImg.alt = this.alt;
        lightboxClose.focus();
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100vw';
    });
});

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    // Restore scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        closeLightbox();
    }
});
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});


// Contact form validation and real-time feedback
const contactForm = document.querySelector('#contact form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Helper to show error message
function showError(input, message) {
    let error = input.parentElement.querySelector('.error-message');
    if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        error.setAttribute('aria-live', 'polite');
        error.style.color = '#b00020';
        error.style.fontSize = '0.95em';
        error.style.display = 'block';
        error.style.marginTop = '0.2em';
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
}

// Helper to clear error message
function clearError(input) {
    let error = input.parentElement.querySelector('.error-message');
    if (error) error.textContent = '';
    input.removeAttribute('aria-invalid');
}

// Email validation regex
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real-time validation
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
    } else {
        clearError(nameInput);
    }
});
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
    } else {
        clearError(emailInput);
    }
});
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
    } else {
        clearError(messageInput);
    }
});

// On form submit
contactForm.addEventListener('submit', function(e) {
    let valid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        valid = false;
    }
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        valid = false;
    }
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});

