// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Link GSAP to Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);


// Custom Cursor Glow Logic
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // We update cursor fast natively
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Interactive hover effects on buttons and links
const interactives = document.querySelectorAll('a, button, .service-card, .ps-card, .project-card, .about-card');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, rgba(0,0,0,0) 60%)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(0,0,0,0) 70%)';
    });
});


// Initialization of VanillaTilt for elements with data-tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});


// GSAP Scroll Animations

// Hero Section Entry Animation
const heroTl = gsap.timeline();
heroTl.from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
      .from('.hero-subtext', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, "-=0.6")
      .from('.hero-actions', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.5)' }, "-=0.5");

// Problem -> Solution Reveal
gsap.from('.problem', {
    scrollTrigger: {
        trigger: '.problem-solution',
        start: 'top 80%',
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.solution', {
    scrollTrigger: {
        trigger: '.problem-solution',
        start: 'top 80%',
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.ps-arrow', {
    scrollTrigger: {
        trigger: '.problem-solution',
        start: 'top 80%',
    },
    opacity: 0,
    scale: 0,
    duration: 0.5,
    delay: 0.8
});

// Services Stagger Animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'all'
});

// Portfolio Projects Parallax Sequence
const projects = gsap.utils.toArray('.project-card');
projects.forEach((proj, i) => {
    gsap.from(proj, {
        scrollTrigger: {
            trigger: proj,
            start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Timeline / Work Process Stagger
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.work-process',
        start: 'top 80%',
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// About Section Reveal
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out'
});

// Testimonial Slider Logic
const testItems = document.querySelectorAll('.testimonial-item');
const dotsContainer = document.querySelector('.testimonial-dots');
let currentTestimonial = 0;
let testInterval;

if (testItems.length > 0) {
    // Create dots
    testItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('t-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(index);
            resetTestInterval();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.t-dot');

    function goToTestimonial(index) {
        testItems[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = index;
        
        testItems[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }

    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testItems.length;
        goToTestimonial(nextIndex);
    }

    function startTestInterval() {
        testInterval = setInterval(nextTestimonial, 3500);
    }

    function resetTestInterval() {
        clearInterval(testInterval);
        startTestInterval();
    }

    startTestInterval();

    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(testInterval);
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, rgba(0,0,0,0) 60%)';
    });
    slider.addEventListener('mouseleave', () => {
        startTestInterval();
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(0,0,0,0) 70%)';
    });
}

// Add scroll animation for testimonials section
gsap.from('.testimonials', {
    scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});


// Hero Canvas Abstract Particle Animation
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

console.log("QavoniX Studio 3D Portfolio JS Initialized.");
