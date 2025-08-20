// Download CV functionality
function downloadCV() {
    // For demo purposes, show a message
    showToast('CV download feature coming soon! Please contact me for my resume.', 'success');
    
    // To implement actual CV download:
    // 1. Add your CV file to the project (e.g., 'jignesh-rathod-cv.pdf')
    // 2. Replace the code above with:
    /*
    const link = document.createElement('a');
    link.href = 'jignesh-rathod-cv.pdf';
    link.download = 'Jignesh_Rathod_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
}

// JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initBackToTop();
    initParticles();
    
    // Initialize EmailJS
    emailjs.init('4tCLE3Cgj4wetogMM');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link based on scroll position
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            scrollToSection(targetId);
            
            // Close mobile menu if open
            const navbar = document.getElementById('navbar');
            navbar.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', updateActiveNav);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-card, .education-item, .portfolio-item, .stat-card, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Typing effect for hero role
function initTypingEffect() {
    const roleElement = document.getElementById('roleText');
    const roles = [
        'Flutter Developer',
        'Mobile App Developer', 
        'UI/UX Enthusiast',
        'Tech Innovator'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after page load
    setTimeout(typeEffect, 1000);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.fullName || !data.email || !data.message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // For demo purposes, simulate email sending
        setTimeout(() => {
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
        // Note: To use EmailJS, you need to:
        // 1. Sign up at emailjs.com
        // 2. Create a service (Gmail, Outlook, etc.)
        // 3. Create an email template
        // 4. Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values
        // 5. Uncomment the code below:
        
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: data.fullName,
            from_email: data.email,
            phone: data.mobile,
            subject: data.subject,
            message: data.message,
            to_name: 'Jignesh Rathod'
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }).catch(function(error) {
            console.error('FAILED...', error);
            showToast('Failed to send message. Please try again or contact directly.', 'error');
        }).finally(function() {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        */
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.borderColor = 'var(--neon-green)';
        toast.style.boxShadow = 'var(--glow-green)';
    } else {
        toastIcon.className = 'fas fa-exclamation-circle';
        toast.style.borderColor = 'var(--neon-pink)';
        toast.style.boxShadow = 'var(--glow-pink)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
}

// Initialize floating particles
function initParticles() {
    createFloatingParticles();
    createHoverEffects();
}

// Create floating particles
function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--neon-cyan);
            border-radius: 50%;
            opacity: 0.2;
            animation: float ${3 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
}

// Hover effects for cards
function createHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .portfolio-item, .stat-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Handle scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Non-critical initializations
        initAdditionalAnimations();
    });
} else {
    setTimeout(initAdditionalAnimations, 100);
}

function initAdditionalAnimations() {
    // Add subtle animations to decorative elements
    const decorativeElements = document.querySelectorAll('.deco-1, .deco-2, .circle');
    
    decorativeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    }
});

// Accessibility improvements
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
}

// Initialize accessibility improvements
improveAccessibility();

// Preload critical resources
function preloadResources() {
    // Preload your profile photo
    const profileImg = new Image();
    profileImg.src = 'PHOTO.jpg';
    
    // Note: Add your actual project images here when available
    // const criticalImages = [
    //     'path/to/your/project-1.jpg',
    //     'path/to/your/project-2.jpg',
    //     'path/to/your/project-3.jpg'
    // ];
    // 
    // criticalImages.forEach(src => {
    //     const img = new Image();
    //     img.src = src;
    // });
}

// Call preload when page loads
window.addEventListener('load', preloadResources);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not found';
        });
    });
});

// Tab functionality for tech demo
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

console.log('Portfolio website loaded successfully! 🚀');