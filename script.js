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

    // 2. Sticky Navbar & Scroll Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll Progress
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
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
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

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

    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(sec => scrollSpyObserver.observe(sec));

    // Custom Cursor
    const cursorRing = document.getElementById('cursor-ring');
    
    if (cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        
        // Follow mouse
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Lerp loop for ring
        function animateRing() {
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(animateRing);
        }
        animateRing();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .tab-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // 7. Contact Form via Email (mailto)
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Opening Mail...';
            submitBtn.disabled = true;
            
            // Get form values
            const fullName = this.fullName.value;
            const email = this.email.value;
            const mobile = this.mobile.value;
            const subject = this.subject.value || 'Project Inquiry';
            const message = this.message.value;
            
            // Construct mailto link
            const mailBody = `Name: ${fullName}%0AEmail: ${email}%0AMobile: ${mobile}%0A%0A${message}`;
            const mailtoUrl = `mailto:jigneshrathod1102@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailBody}`;
            
            // Open Email Client
            window.location.href = mailtoUrl;
            
            // Show Success Toast
            toast.innerHTML = '✉️ Opening your mail app...';
            toast.classList.add('show');
            
            // Reset Form
            setTimeout(() => {
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
