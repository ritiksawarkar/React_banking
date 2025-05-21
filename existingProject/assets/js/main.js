// Main JavaScript file for FinVerse Banking Platform

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const landingNav = document.querySelector('.landing-nav');
    
    if (mobileMenuToggle && landingNav) {
        mobileMenuToggle.addEventListener('click', function() {
            landingNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    if (testimonialSlider && testimonialCards.length > 0) {
        // Add accessibility attributes to buttons
        prevBtn.setAttribute('title', 'Previous testimonial');
        nextBtn.setAttribute('title', 'Next testimonial');

        // Set initial state
        updateSlider();

        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            updateSlider();
        });

        // Next button click handler
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateSlider();
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateSlider();
        }, 5000);

        function updateSlider() {
            const offset = -currentIndex * 100;
            testimonialSlider.style.transform = `translateX(${offset}%)`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === testimonialCards.length - 1;
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (landingNav && landingNav.classList.contains('active')) {
                    landingNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add animation classes to elements
    document.querySelectorAll('.feature-card, .benefits-content, .benefits-image, .testimonial-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
});