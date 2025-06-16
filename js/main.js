// H2+ Media - Revolutionary JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-content"><span class="btn-icon">⏳</span><span class="btn-text">Sending...</span></span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('🚀 Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 
                       type === 'error' ? 'rgba(220, 38, 38, 0.1)' : 
                       'rgba(0, 217, 255, 0.1)';
        const borderColor = type === 'success' ? '#10B981' : 
                           type === 'error' ? '#DC2626' : 
                           '#00D9FF';
        const textColor = borderColor;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 1.5rem 2rem;
            background: ${bgColor};
            border: 1px solid ${borderColor};
            border-radius: 12px;
            color: ${textColor};
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            line-height: 1.5;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 5000);
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for reveal animations
    document.querySelectorAll('.fade-in, .scale-in, .service-card, .dashboard-card, .lab-item').forEach(el => {
        el.classList.add('fade-in');
        revealObserver.observe(el);
    });

    // ===== EASTER EGG: H+H HOTKEY =====
    let keypressSequence = '';
    const konami = 'h+h';
    
    document.addEventListener('keydown', (e) => {
        keypressSequence += e.key.toLowerCase();
        
        if (keypressSequence.length > konami.length) {
            keypressSequence = keypressSequence.slice(-konami.length);
        }
        
        if (keypressSequence === konami) {
            showHologramMessage();
            keypressSequence = '';
        }
    });
    
    function showHologramMessage() {
        // Create hologram overlay
        const hologramOverlay = document.createElement('div');
        hologramOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            animation: hologramFadeIn 0.5s ease;
        `;
        
        const hologramContent = document.createElement('div');
        hologramContent.style.cssText = `
            text-align: center;
            padding: 3rem;
            background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(124, 58, 237, 0.1));
            border: 2px solid #00D9FF;
            border-radius: 20px;
            color: #00D9FF;
            font-family: 'Space Grotesk', sans-serif;
            animation: hologramGlow 2s ease-in-out infinite alternate;
            max-width: 600px;
            position: relative;
        `;
        
        hologramContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #00D9FF;">CEO Message Activated</h2>
            <p style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem; color: #E5E7EB;">
                "Welcome to H2+ Media's digital flagship. You've discovered our easter egg! 
                This represents our attention to detail and innovation that we bring to every project. 
                Ready to transform your media presence?"
            </p>
            <p style="font-size: 0.9rem; color: #9CA3AF;">- H2+ Media Leadership Team</p>
            <button id="closeHologram" style="
                margin-top: 2rem;
                padding: 1rem 2rem;
                background: linear-gradient(135deg, #00D9FF, #7C3AED);
                border: none;
                border-radius: 50px;
                color: #0A0A0F;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Close Hologram</button>
        `;
        
        // Add CSS animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hologramFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes hologramGlow {
                from { box-shadow: 0 0 20px #00D9FF; }
                to { box-shadow: 0 0 40px #00D9FF, 0 0 60px #00D9FF; }
            }
        `;
        document.head.appendChild(style);
        
        hologramOverlay.appendChild(hologramContent);
        document.body.appendChild(hologramOverlay);
        
        // Close hologram
        document.getElementById('closeHologram').addEventListener('click', () => {
            hologramOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(hologramOverlay);
                document.head.removeChild(style);
            }, 500);
        });
        
        // Close with ESC key
        const escListener = (e) => {
            if (e.key === 'Escape') {
                hologramOverlay.click();
                document.removeEventListener('keydown', escListener);
            }
        };
        document.addEventListener('keydown', escListener);
    }

    // ===== BUTTON INTERACTIONS =====
    document.querySelectorAll('.quantum-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease;
                pointer-events: none;
            `;
            
            // Add ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rippleEffect {
                    to { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
                document.head.removeChild(style);
            }, 600);
        });
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy load background animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });

    // Observe animated elements
    document.querySelectorAll('[class*="animation"], [class*="float"], [class*="glow"]').forEach(el => {
        animationObserver.observe(el);
    });

    // ===== SOUND EFFECTS (Optional) =====
    function playHoverSound() {
        // Create audio context for subtle hover sounds
        // This would require audio files - placeholder for now
        if (window.AudioContext || window.webkitAudioContext) {
            // Subtle click sound implementation would go here
        }
    }

    // Add hover sound to interactive elements (optional)
    document.querySelectorAll('.quantum-btn, .service-card, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            // playHoverSound(); // Uncomment if you want sound effects
        });
    });

    console.log('🚀 H2+ Media - Revolutionary systems fully initialized!');
    console.log('💫 Easter egg: Press H+H for a special message!');
});== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth trail following
    function updateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .dashboard-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorTrail.style.opacity = '0.6';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorTrail.style.opacity = '0.3';
        });
    });

    // ===== NAVIGATION SCROLL EFFECT =====
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ===== ANIMATED COUNTERS =====
    function animateCounter(element, target, duration = 2000) {
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const currentValue = Math.floor(progress * target);
            element.textContent = currentValue + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Trigger counters when in view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.target);
                const suffix = entry.target.textContent.includes('%') ? '%' : 
                              entry.target.textContent.includes('$') ? '$' : '';
                entry.target.dataset.suffix = suffix;
                
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== SERVICE FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            serviceCards.forEach(card => {
                const categories = card.dataset.category || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== PORTFOLIO CAROUSEL =====
    let currentSlide = 0;
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioTrack = document.querySelector('.portfolio-track');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function updateCarousel() {
        portfolioTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        portfolioItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % portfolioItems.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + portfolioItems.length) % portfolioItems.length;
        updateCarousel();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // ===== LIVE DASHBOARD METRICS =====
    function updateLiveMetrics() {
        const viewerElement = document.getElementById('liveViewers');
        const engagementElement = document.getElementById('engagement');
        const revenueElement = document.getElementById('revenue');
        
        if (viewerElement) {
            const viewers = Math.floor(Math.random() * 1000) + 15000;
            viewerElement.textContent = viewers.toLocaleString();
        }
        
        if (engagementElement) {
            const engagement = Math.floor(Math.random() * 20) + 75;
            engagementElement.textContent = engagement + '%';
        }
        
        if (revenueElement) {
            const revenue = Math.floor(Math.random() * 5000) + 45000;
            revenueElement.textContent = '$' + revenue.toLocaleString();
        }
    }
    
    // Update metrics every 3 seconds
    updateLiveMetrics();
    setInterval(updateLiveMetrics, 3000);

    // ===
// H2+ UNIQUE FEATURES JAVASCRIPT - ADD TO END OF js/main.js

// UNIQUE FEATURE 1: Real-Time Global Activity Map
function createGlobalActivityMap() {
    const mapHTML = `
        <div class="global-activity-map" id="globalMap">
            <div class="map-header">
                <div class="map-title">Live Global Activity</div>
                <div class="live-indicator-map"></div>
            </div>
            <div class="world-map"></div>
            <div class="activity-stats">
                <div class="activity-stat">Active: <span class="activity-value" id="activeUsers">247</span></div>
                <div class="activity-stat">Projects: <span class="activity-value" id="liveProjects">12</span></div>
                <div class="activity-stat">Countries: <span class="activity-value" id="countries">34</span></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', mapHTML);

    // Update activity numbers
    setInterval(() => {
        document.getElementById('activeUsers').textContent = Math.floor(Math.random() * 100) + 200;
        document.getElementById('liveProjects').textContent = Math.floor(Math.random() * 10) + 8;
        document.getElementById('countries').textContent = Math.floor(Math.random() * 15) + 30;
    }, 3000);
}

// UNIQUE FEATURE 2: AI Voice Assistant
function createAIVoiceAssistant() {
    const voiceHTML = `
        <div class="ai-voice-assistant" id="voiceAssistant">
            <div class="voice-icon">🎤</div>
            <div class="voice-tooltip">Ask H2+ AI Assistant</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', voiceHTML);

    const voiceBtn = document.getElementById('voiceAssistant');
    voiceBtn.addEventListener('click', function() {
        this.classList.add('listening');
        
        // Simulate AI response
        setTimeout(() => {
            this.classList.remove('listening');
            showNotification('🤖 AI Assistant: "How can I help you transform your media today?"', 'info');
        }, 2000);
    });
}

// UNIQUE FEATURE 3: Neural Network Background
function createNeuralNetwork() {
    const neuralHTML = `<div class="neural-network" id="neuralNetwork"></div>`;
    document.querySelector('.hero-section').insertAdjacentHTML('afterbegin', neuralHTML);

    const network = document.getElementById('neuralNetwork');
    
    // Create neural nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        network.appendChild(node);
    }

    // Create connections between nodes
    for (let i = 0; i < 15; i++) {
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        connection.style.left = Math.random() * 100 + '%';
        connection.style.top = Math.random() * 100 + '%';
        connection.style.width = Math.random() * 200 + 50 + 'px';
        connection.style.transform = `rotate(${Math.random() * 360}deg)`;
        connection.style.animationDelay = Math.random() * 4 + 's';
        network.appendChild(connection);
    }
}

// UNIQUE FEATURE 4: Typing Effect for Headlines
function createTypingEffect() {
    const headlines = document.querySelectorAll('.title-line');
    headlines.forEach((headline, index) => {
        if (index === 1) { // Apply to "Media Production" line
            headline.classList.add('typing-headline');
            
            const text = headline.textContent;
            headline.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                headline.textContent += text[charIndex];
                charIndex++;
                
                if (charIndex >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    });
}

// UNIQUE FEATURE 5: Floating Social Proof
function createFloatingTestimonial() {
    const testimonials = [
        {
            content: "H2+ transformed our media strategy completely. The AI tools saved us 80% editing time!",
            author: "Sarah Chen",
            title: "Netflix Content Director",
            avatar: "SC"
        },
        {
            content: "The quantum streaming technology is revolutionary. Zero latency, perfect quality.",
            author: "Marcus Rodriguez", 
            title: "ESPN Technical Lead",
            avatar: "MR"
        },
        {
            content: "H2+'s documentary work won us 3 Emmy nominations. Absolutely phenomenal team.",
            author: "Dr. Elena Vasquez",
            title: "BBC Documentary Producer", 
            avatar: "EV"
        }
    ];

    let currentTestimonial = 0;
    
    const testimonialHTML = `
        <div class="floating-testimonial" id="floatingTestimonial">
            <div class="testimonial-content" id="testimonialContent"></div>
            <div class="testimonial-author">
                <div class="author-avatar" id="authorAvatar"></div>
                <div class="author-info">
                    <div class="author-name" id="authorName"></div>
                    <div class="author-title" id="authorTitle"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', testimonialHTML);

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        document.getElementById('testimonialContent').textContent = testimonial.content;
        document.getElementById('authorName').textContent = testimonial.author;
        document.getElementById('authorTitle').textContent = testimonial.title;
        document.getElementById('authorAvatar').textContent = testimonial.avatar;
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    updateTestimonial();
    setInterval(updateTestimonial, 15000);
}

// UNIQUE FEATURE 6: Interactive Particle Cursor Trail
function createParticleTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'particle-trail';
    document.body.appendChild(trailContainer);

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) { // Create particles 30% of the time
            const particle = document.createElement('div');
            particle.className = 'trail-particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.background = Math.random() > 0.5 ? 'var(--h2-electric)' : 'var(--h2-neural)';
            
            trailContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    });
}

// ENHANCED: Replace existing buttons with consultation button
function enhanceHeroButtons() {
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        heroActions.innerHTML = `
            <a href="#contact" class="consultation-btn">
                <span class="btn-icon">📞</span>
                <span class="btn-text">Request Consultation</span>
            </a>
            <button class="quantum-btn secondary" id="watchDemo">
                <span class="btn-content">
                    <span class="btn-icon">▶️</span>
                    <span class="btn-text">Watch Demo</span>
                </span>
                <div class="btn-ripple"></div>
            </button>
        `;
    }
}

// UNIQUE FEATURE 7: Real-Time Visitor Counter
function createVisitorCounter() {
    const counterHTML = `
        <div style="
            position: fixed;
            top: 100px;
            left: 30px;
            padding: 1rem;
            background: rgba(0, 217, 255, 0.05);
            border: 1px solid rgba(0, 217, 255, 0.2);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            z-index: 1000;
            font-size: 0.85rem;
            color: var(--h2-electric);
        " id="visitorCounter">
            <div style="margin-bottom: 0.5rem;">👁️ Live Visitors</div>
            <div style="font-size: 1.5rem; font-weight: 700;" id="visitorCount">1,247</div>
            <div style="font-size: 0.7rem; color: var(--titanium); margin-top: 0.2rem;">+23 in last hour</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', counterHTML);

    // Update visitor count
    setInterval(() => {
        const count = Math.floor(Math.random() * 500) + 1000;
        document.getElementById('visitorCount').textContent = count.toLocaleString();
    }, 4000);
}

// Initialize all unique features
function initializeUniqueFeatures() {
    createGlobalActivityMap();
    createAIVoiceAssistant();
    createNeuralNetwork();
    createFloatingTestimonial();
    createParticleTrail();
    enhanceHeroButtons();
    createVisitorCounter();
    
    // Add typing effect after page loads
    setTimeout(createTypingEffect, 1000);

    console.log('🌟 All UNIQUE features initialized!');
    console.log('🚀 Features: Global Map, AI Voice, Neural Network, Floating Testimonials, Particle Trail');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUniqueFeatures);
} else {
    initializeUniqueFeatures();
}
// H2+ CONSULTATION BOX JAVASCRIPT - ADD TO END OF js/main.js

// Enhanced Consultation Box Functionality
function initConsultationBox() {
    const consultationBox = document.getElementById('consultationBox');
    const closeBtn = document.getElementById('closeConsultation');
    const ctaBtn = document.getElementById('consultationCTA');
    
    // Show consultation box after 5 seconds
    setTimeout(() => {
        if (consultationBox) {
            consultationBox.style.opacity = '0';
            consultationBox.style.transform = 'translateX(100%)';
            consultationBox.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                consultationBox.style.opacity = '1';
                consultationBox.style.transform = 'translateX(0)';
            }, 100);
        }
    }, 5000);
    
    // Close consultation box
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            consultationBox.style.transform = 'translateX(100%)';
            consultationBox.style.opacity = '0';
            
            setTimeout(() => {
                consultationBox.style.display = 'none';
            }, 600);
        });
    }
    
    // CTA button interaction
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            // Create explosion effect
            const explosion = document.createElement('div');
            explosion.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, var(--h2-neural) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ctaExplosion 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            // Add explosion animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ctaExplosion {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            this.appendChild(explosion);
            
            setTimeout(() => {
                this.removeChild(explosion);
                document.head.removeChild(style);
            }, 600);
            
            // Show success message
            showNotification('🚀 Redirecting to consultation form...', 'success');
        });
    }
}

// Enhanced stats animation with new values
function updateStatsAnimation() {
    const statNumbers = document.querySelectorAll('[data-target]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let suffix = '';
        
        // Add appropriate suffix
        if (stat.textContent.includes('%') || stat.closest('.stat-label').textContent.includes('Satisfaction')) {
            suffix = '%';
        }
        
        // Reset for new animation
        stat.dataset.animated = 'false';
        stat.textContent = '0' + suffix;
    });
}

// Auto-hide consultation box on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const consultationBox = document.getElementById('consultationBox');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (consultationBox && consultationBox.style.display !== 'none') {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide consultation box
            consultationBox.style.transform = 'translateX(100%) scale(0.8)';
            consultationBox.style.opacity = '0.3';
        } else {
            // Scrolling up - show consultation box
            consultationBox.style.transform = 'translateX(0) scale(1)';
            consultationBox.style.opacity = '1';
        }
    }
    lastScrollTop = scrollTop;
});

// Enhanced hero animations
function enhanceHeroAnimations() {
    // Add typing effect to "Better and Faster"
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            line.textContent += text[charIndex];
            charIndex++;
            
            if (charIndex >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50 + (index * 30)); // Delay each line
    });
}

// Consultation box reminder
function consultationReminder() {
    const consultationBox = document.getElementById('consultationBox');
    
    // Show reminder every 2 minutes if box is closed
    setInterval(() => {
        if (consultationBox && consultationBox.style.display === 'none') {
            showNotification('💡 Need help with your project? Get free consultation!', 'info');
        }
    }, 120000); // 2 minutes
}

// Initialize all consultation features
function initConsultationFeatures() {
    initConsultationBox();
    updateStatsAnimation();
    consultationReminder();
    
    // Add enhanced typing effect after a delay
    setTimeout(enhanceHeroAnimations, 2000);
    
    console.log('🔥 H2+ Consultation features initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsultationFeatures);
} else {
    initConsultationFeatures();
}
