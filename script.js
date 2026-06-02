document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if(mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileNav.classList.contains('active') ? 'x' : 'menu';
            mobileToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });
    }

    // 2. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Tech Stack Tab Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const techGrids = document.querySelectorAll('.tech-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            techGrids.forEach(g => g.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger stat counters if it's the stats section
                if (entry.target.classList.contains('stats-container')) {
                    startCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Stat Number Count-up Animation
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // ms
            const frameRate = 30; // ms
            const totalFrames = duration / frameRate;
            let currentFrame = 0;
            
            const timer = setInterval(() => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                // Easing out
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(target * easeOutProgress);
                
                stat.textContent = currentCount + (target === 99 ? '%' : '+');
                
                if (currentFrame === totalFrames) {
                    clearInterval(timer);
                    stat.textContent = target + (target === 99 ? '%' : '+');
                }
            }, frameRate);
        });
    }

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 7. EmailJS Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network delay
            setTimeout(() => {
                toast.classList.add('show');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }, 1500);
        });
    }
});
