// Typing Animation
const typingElement = document.getElementById('typing');
const words = ['Designineer', 'Developer', 'Visionary'];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;

function type() {
  if (wordIndex >= words.length) {
    wordIndex = 0;
  }

  currentWord = words[wordIndex];
  let displayWord = isDeleting ? currentWord.substring(0, letterIndex--) : currentWord.substring(0, letterIndex++);

  typingElement.textContent = displayWord;

  if (!isDeleting && letterIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex++;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 150);
  }
}
type();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Toggle Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
