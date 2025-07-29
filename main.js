/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO TABS ====================*/
const portfolioTabs = document.querySelectorAll('[data-target]'),
      portfolioContents = document.querySelectorAll('[data-content]')

portfolioTabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        portfolioContents.forEach(content =>{
            content.classList.remove('portfolio__active')
        })
        target.classList.add('portfolio__active')

        portfolioTabs.forEach(tab =>{
            tab.classList.remove('portfolio__active')
        })
        tab.classList.add('portfolio__active')
    })
})

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SMOOTH SCROLLING ====================*/
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

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form');
const contactInputs = document.querySelectorAll('.contact__input');

// Form validation
function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Clear previous error styles
    contactInputs.forEach(input => {
        input.style.borderColor = '';
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        messageInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    return isValid;
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showNotification('Message sent successfully! Thank you for contacting me.', 'success');
            
            // Reset form
            contactForm.reset();
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} notification__icon"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/*==================== SCROLL ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            
            // Add stagger delay for multiple elements
            const siblings = entry.target.parentNode.children;
            if (siblings.length > 1) {
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        sibling.style.animationDelay = `${index * 0.1}s`;
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about__data, .skills__content, .services__content, .portfolio__data, .blog__card, .tiktok__card').forEach(el => {
    observer.observe(el);
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation for tagline
window.addEventListener('load', () => {
    const tagline = document.querySelector('.home__description');
    if (tagline) {
        const originalText = tagline.textContent;
        typeWriter(tagline, originalText, 80);
    }
});

/*==================== SKILL BARS ANIMATION ====================*/
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skills__percentage');
    
    skillBars.forEach(bar => {
        const percentage = bar.classList[1].split('__')[1]; // Get skill name
        const percentageMap = {
            'html': '95%',
            'css': '90%',
            'js': '85%',
            'react': '80%',
            'php': '80%',
            'node': '75%',
            'mysql': '85%',
            'mongo': '70%',
            'figma': '85%',
            'photoshop': '75%',
            'ux': '80%'
        };
        
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-in-out';
        
        setTimeout(() => {
            bar.style.width = percentageMap[percentage] || '50%';
        }, 500);
    });
}

// Trigger skill bar animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

/*==================== CURSOR EFFECT ====================*/
const cursor = document.createElement('div');
cursor.className = 'cursor-dot';
cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--first-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
cursorOutline.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--first-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.1s ease;
    opacity: 0.5;
`;
document.body.appendChild(cursorOutline);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorOutline.style.left = (e.clientX - 15) + 'px';
    cursorOutline.style.top = (e.clientY - 15) + 'px';
});

// Cursor hover effects
document.querySelectorAll('a, button, .services__button, .portfolio__button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

/*==================== LOADING SCREEN ====================*/
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('fade-out');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    }
});

/*==================== PARALLAX EFFECT ====================*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home__img, .about__img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/*==================== TIKTOK VIDEO INTERACTIONS ====================*/
document.querySelectorAll('.tiktok__play').forEach(playBtn => {
    playBtn.addEventListener('click', () => {
        // Simulate video play (since we're not embedding actual TikTok videos)
        const card = playBtn.closest('.tiktok__card');
        card.style.transform = 'scale(1.05)';
        playBtn.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            playBtn.style.opacity = '1';
            showNotification('Opening TikTok video...', 'info');
        }, 1000);
    });
});

/*==================== PORTFOLIO FILTER ANIMATIONS ====================*/
document.querySelectorAll('.portfolio__button').forEach(button => {
    button.addEventListener('click', () => {
        const portfolioData = document.querySelectorAll('.portfolio__data');
        
        // Add fade out animation
        portfolioData.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    });
});

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
    const counters = document.querySelectorAll('.about__info-title');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

/*==================== BLOG INTERACTIONS ====================*/
document.querySelectorAll('.blog__button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const blogCard = button.closest('.blog__card');
        const title = blogCard.querySelector('.blog__title a').textContent;
        
        showNotification(`Opening "${title}"...`, 'info');
        
        // Simulate blog post opening
        setTimeout(() => {
            showNotification('Blog post would open in a new page!', 'success');
        }, 1500);
    });
});

/*==================== SOCIAL MEDIA ANALYTICS ====================*/
function trackSocialClick(platform) {
    console.log(`Social media click tracked: ${platform}`);
    showNotification(`Opening ${platform}...`, 'info');
}

document.querySelectorAll('a[href*="github"], a[href*="tiktok"], a[href*="linkedin"]').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.href.includes('github') ? 'GitHub' : 
                         link.href.includes('tiktok') ? 'TikTok' : 'LinkedIn';
        trackSocialClick(platform);
    });
});

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Debounce function for scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    scrollActive();
    scrollHeader();
    scrollUp();
}, 10));

/*==================== KEYBOARD NAVIGATION ====================*/
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        modalViews.forEach(modal => {
            modal.classList.remove('active-modal');
        });
        
        navMenu.classList.remove('show-menu');
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.classList.contains('button')) {
        e.target.click();
    }
});

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Focus management for modals
modalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const modal = modalViews[index];
        const firstFocusable = modal.querySelector('.services__modal-close');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    });
});

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

/*==================== INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any components that need DOM to be fully loaded
    console.log('DevLili Portfolio Loaded Successfully!');
    
    // Add smooth reveal animation to sections
    setTimeout(() => {
        document.querySelectorAll('.section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

/*==================== SERVICE WORKER REGISTRATION ====================*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}