// Alfa Diseño y Desarrollo Web - Interactividad JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Enhanced stagger animation to menu items
            const menuItems = navMenu.querySelectorAll('li');
            if (navMenu.classList.contains('active')) {
                // Opening animation - cascade from top to bottom
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = `${(index + 1) * 0.15}s`;
                    item.style.animationDelay = `${(index + 1) * 0.15}s`;
                    
                    // Add ripple effect
                    setTimeout(() => {
                        item.style.transform = 'translateY(0) scale(1.05)';
                        setTimeout(() => {
                            item.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }, (index + 1) * 150 + 300);
                });
            } else {
                // Closing animation - reverse cascade
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = `${(menuItems.length - index) * 0.05}s`;
                    item.style.animationDelay = '0s';
                });
            }
        });
        
        // Close menu when clicking on a link with enhanced animation
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            const menuItems = navMenu.querySelectorAll('li');
            
            // Animate out in reverse order
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-20px) scale(0.9)';
                    item.style.opacity = '0';
                }, index * 50);
            });
            
            // Close menu after animation
            setTimeout(() => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset styles
                menuItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                    item.style.animationDelay = '0s';
                    item.style.transform = '';
                    item.style.opacity = '';
                });
            }, menuItems.length * 50 + 200);
        }));
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Sistema de deslizamiento horizontal controlado
    // Activar con un pequeño delay para que la página esté completamente renderizada
    setTimeout(() => {
        document.querySelectorAll('.animate-text, .animate-text-delay, .animate-buttons').forEach((el, index) => {
            // Pequeño delay escalonado para mejor efecto visual
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100);
        });
    }, 300);
    
    // Typing animation for hero text
    const typeText = (element, text, speed = 50) => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-animation');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // Loading animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // Contact form validation (if exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Por favor, complete todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingrese un email válido', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('¡Mensaje enviado exitosamente!', 'success');
            this.reset();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Dark mode toggle (opcional)
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.ceil(current) + suffix;
                }, 20);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Cursor effect (opcional)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateCursor = () => {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            
            cursorX += diffX * 0.1;
            cursorY += diffY * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
    }
    

    
    // Scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--bg-primary);
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollTopBtn);
});

// Utils functions
const utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Random color generator
    randomColor: function() {
        const colors = ['#00d4ff', '#ff6b35', '#7c3aed', '#22c55e', '#ef4444', '#f59e0b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Initially hide answers
        if (answer) {
            answer.style.display = 'none';
        }
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question i');
                if (otherAnswer && otherItem !== item) {
                    otherAnswer.style.display = 'none';
                    otherIcon.style.transform = 'rotate(0deg)';
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // Toggle current FAQ
            if (isOpen) {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(45deg)';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
});

// Enhanced contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        // Add floating labels effect
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Enhanced form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const service = formData.get('service');
            const phone = formData.get('phone');
            
            // Validation
            let isValid = true;
            const errors = [];
            
            if (!name || name.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Por favor, ingrese un email válido');
                isValid = false;
            }
            
            if (!message || message.trim().length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            }
            
            if (phone && !isValidPhone(phone)) {
                errors.push('Por favor, ingrese un teléfono válido');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Optional: Redirect to WhatsApp with pre-filled message
                const whatsappMessage = `Hola, soy ${name}. ${message}. Mi email es: ${email}${phone ? '. Mi teléfono: ' + phone : ''}${service ? '. Estoy interesado en: ' + service : ''}.`;
                const whatsappUrl = `https://wa.me/59892500216?text=${encodeURIComponent(whatsappMessage)}`;
                
                setTimeout(() => {
                    if (confirm('¿Quieres continuar la conversación por WhatsApp?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 2000);
                
            }, 2000);
        });
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }
});

// Portfolio isotope-like filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                portfolioItems.forEach((item, index) => {
                    const shouldShow = filter === 'all' || item.classList.contains(filter);
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// Add smooth reveal animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // SEGUNDO INTERSECTION OBSERVER - DESHABILITADO TEMPORALMENTE
    /*
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-card, .animate-text, .animate-text-delay, .animate-buttons, .service-item, .portfolio-item, .team-member, .value-item, .reason-item, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    */
});

// Add typing effect to hero elements
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeTitle = () => {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeTitle, 50);
            } else if (heroDescription) {
                setTimeout(() => {
                    heroDescription.style.opacity = '1';
                    heroDescription.style.transform = 'translateY(0)';
                }, 300);
            }
        };
        
        setTimeout(typeTitle, 1000);
    }
});

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    const colors = {
        success: '#22c55e',
        error: '#cc0000',
        warning: '#ffff00',
        info: 'linear-gradient(135deg, #ffff00, #cc0000)'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Add icon
    const icon = document.createElement('i');
    icon.className = icons[type] || icons.info;
    notification.insertBefore(icon, notification.firstChild);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeNotification = (notif) => {
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notif.remove();
        }, 300);
    };
    
    setTimeout(() => {
        closeNotification(notification);
    }, duration);
}

// Add page transition effects
document.addEventListener('DOMContentLoaded', function() {
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--border-color); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: var(--text-secondary);">Cargando...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 500);
    });
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Update current year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

});