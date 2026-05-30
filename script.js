const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const projectCards = document.querySelectorAll('.project-card');
const viewDetailsButtons = document.querySelectorAll('.view-details');
const modals = document.querySelectorAll('.project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const githubRepos = document.getElementById('github-repos');
const githubFollowers = document.getElementById('github-followers');
const githubFollowing = document.getElementById('github-following');

const themeConfig = {
  light: {
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4.354a1 1 0 0 1 1 1v1.292a1 1 0 0 1-2 0V5.354a1 1 0 0 1 1-1zm0 11.708a1 1 0 0 1 1 1v1.292a1 1 0 0 1-2 0v-1.292a1 1 0 0 1 1-1zm7.646-5.354a1 1 0 0 1 1 1h1.292a1 1 0 0 1 0 2h-1.292a1 1 0 0 1-1-1 1 1 0 0 1 1-1zm-13.292 0a1 1 0 0 1 1 1H5.354a1 1 0 0 1 0 2h1.292a1 1 0 0 1-1-1 1 1 0 0 1 1-1zm9.192-6.346a1 1 0 0 1 1.414 0l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914a1 1 0 0 1 0-1.414zm-8.486 8.486a1 1 0 0 1 1.414 0l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914a1 1 0 0 1 0-1.414zM16.95 16.95a1 1 0 0 1 1.414 0l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914a1 1 0 0 1 0-1.414zm-8.486-8.486a1 1 0 0 1 1.414 0l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914a1 1 0 0 1 0-1.414zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/></svg>',
    label: 'Switch to dark mode'
  },
  dark: {
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.75 12.5a6.75 6.75 0 0 1-6.75 6.75 6.75 6.75 0 0 1-5.04-10.997 7.498 7.498 0 1 0 10.29 10.29 6.746 6.746 0 0 1 1.5-5.043z"/></svg>',
    label: 'Switch to light mode'
  }
};

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  themeIcon.innerHTML = themeConfig[theme].svg;
  themeToggle.setAttribute('aria-label', themeConfig[theme].label);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(theme);
}

themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

projectCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const button = event.target.closest('.view-details');
    const anchor = event.target.closest('a');
    if (button || anchor) return;
    const url = card.dataset.url;
    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  });
});

viewDetailsButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const target = button.dataset.target;
    openModal(target);
  });
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('show');
  modalBackdrop.classList.add('show');
  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  modal.classList.remove('show');
  modalBackdrop.classList.remove('show');
  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

modals.forEach((modal) => {
  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', () => closeModal(modal));
});

modalBackdrop.addEventListener('click', () => {
  modals.forEach((modal) => {
    if (modal.classList.contains('show')) {
      closeModal(modal);
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.classList.contains('show')) {
        closeModal(modal);
      }
    });
  }
});

function handleNavHighlight() {
  const sections = document.querySelectorAll('main section');
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

window.addEventListener('scroll', handleNavHighlight);
handleNavHighlight();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

function validateInput(input) {
  if (!input.checkValidity()) {
    input.classList.add('invalid');
    return false;
  }
  input.classList.remove('invalid');
  return true;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.querySelector('#name');
  const email = contactForm.querySelector('#email');
  const message = contactForm.querySelector('#message');

  const fieldsAreValid = [name, email, message].every(validateInput);
  if (!fieldsAreValid) {
    formStatus.textContent = 'Please fill in all fields with valid information.';
    formStatus.style.color = '#f97316';
    return;
  }

  formStatus.textContent = 'Preparing message...';
  formStatus.style.color = '#38bdf8';

  const mailtoLink = `mailto:srishankar4444@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name.value)}&body=${encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`)}`;
  window.location.href = mailtoLink;
  formStatus.textContent = 'Opening email client...';
  formStatus.style.color = '#34d399';
});

function initializeParticles() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60 },
        size: { value: 3 },
        color: { value: '#38bdf8' },
        line_linked: { enable: true, color: '#38bdf8' },
        move: { speed: 2 },
      },
    });
  }
}

function fetchGithubStats() {
  fetch('https://api.github.com/users/SriShankar2006')
    .then((response) => response.json())
    .then((data) => {
      githubRepos.textContent = data.public_repos ?? '--';
      githubFollowers.textContent = data.followers ?? '--';
      githubFollowing.textContent = data.following ?? '--';
    })
    .catch(() => {
      githubRepos.textContent = '26+';
      githubFollowers.textContent = '180+';
      githubFollowing.textContent = '80+';
    });
}

function initScrollReveal() {
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.hero-copy, .hero-panel, .content-block, .timeline-card, .skill-card, .project-card, .github-card, .github-graph-card, .contact-panel, .contact-form', {
      distance: '40px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 100,
      reset: false,
    });
  }
}

function initTilt() {
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 14,
      speed: 350,
      glare: true,
      'max-glare': 0.25,
    });
  }
}

initTheme();
initializeParticles();
fetchGithubStats();
initScrollReveal();
initTilt();
