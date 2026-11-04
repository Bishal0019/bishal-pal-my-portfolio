/**
 * ==========================================================================
 * BISHAL PAL PORTFOLIO — CORE SCRIPT
 * Vanilla JavaScript (ES6+) — Zero external runtime dependencies
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initReadingProgress();
    initNavigation();
    initMobileDrawer();
    initScrollSpy();
    initScrollReveal();
    initSkillsFilter();
    initProjectLightbox();
    initCopyEmail();
    initQuickComposer();
    initCopyrightYear();
});

/**
 * --------------------------------------------------------------------------
 * 1. THEME SWITCHER (Dark & Light Mode with Persistence & System Detection)
 * --------------------------------------------------------------------------
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Retrieve saved theme or infer from system preference
    const savedTheme = localStorage.getItem('bp_theme') ||
        (localStorage.getItem('dark-mode') === 'false' ? 'light' : null);

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'dark'); // Default dark

    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem('bp_theme', nextTheme);
        });
    }

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0B0C0E' : '#F7F7F5');
        }
    }

    // Listen for system preference changes if user hasn't set an explicit preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('bp_theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

/**
 * --------------------------------------------------------------------------
 * 2. READING PROGRESS BAR & STICKY HEADER STATE
 * --------------------------------------------------------------------------
 */
function initReadingProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (header) {
            if (scrollTop > 25) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 3. DESKTOP NAVIGATION & SMOOTH SCROLLING
 * --------------------------------------------------------------------------
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 4. MOBILE DRAWER NAVIGATION
 * --------------------------------------------------------------------------
 */
function initMobileDrawer() {
    const mobileBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!mobileBtn || !drawer) return;

    function toggleDrawer(open) {
        const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
        drawer.classList.toggle('open', isOpen);
        mobileBtn.classList.toggle('active', isOpen);
        mobileBtn.setAttribute('aria-expanded', isOpen.toString());
        drawer.setAttribute('aria-hidden', (!isOpen).toString());
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    mobileBtn.addEventListener('click', () => toggleDrawer());

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleDrawer(false);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            toggleDrawer(false);
        }
    });

    // Close if resized to desktop viewport
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && drawer.classList.contains('open')) {
            toggleDrawer(false);
        }
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 5. SCROLLSPY (Active Navigation Highlighting)
 * --------------------------------------------------------------------------
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => spyObserver.observe(section));
}

/**
 * --------------------------------------------------------------------------
 * 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver based)
 * --------------------------------------------------------------------------
 */
function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (revealItems.length === 0) return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealItems.forEach(el => el.classList.add('in-view'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Subtle stagger delay
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, (idx % 4) * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    revealItems.forEach(el => revealObserver.observe(el));
}

/**
 * --------------------------------------------------------------------------
 * 7. SKILLS FILTER TABS
 * --------------------------------------------------------------------------
 */
function initSkillsFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillCards = document.querySelectorAll('.skill-category-card');

    if (filterTabs.length === 0 || skillCards.length === 0) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.getAttribute('data-filter');

            // Update tab states
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Filter cards with smooth opacity transition
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 8. PROJECT IMAGE LIGHTBOX
 * --------------------------------------------------------------------------
 */
function initProjectLightbox() {
    const viewports = document.querySelectorAll('.browser-viewport');
    const modal = document.getElementById('image-lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !modalImg) return;

    function openModal(imgSrc, imgAlt) {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        if (modalCaption) {
            modalCaption.textContent = imgAlt;
        }
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalImg.src = '';
        }, 200);
    }

    viewports.forEach(vp => {
        vp.addEventListener('click', () => {
            const img = vp.querySelector('img');
            if (img) {
                openModal(img.src, img.alt);
            }
        });

        // Allow opening via Enter key on focusable viewports
        vp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = vp.querySelector('img');
                if (img) {
                    openModal(img.src, img.alt);
                }
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 9. ONE-CLICK EMAIL COPY WITH TACTILE FEEDBACK
 * --------------------------------------------------------------------------
 */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const email = copyBtn.getAttribute('data-email') || 'bishalpal0019@gmail.com';

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                // Fallback for non-https or older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.classList.remove('copied');
            }, 2500);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 10. QUICK MESSAGE COMPOSER (Opens mailto with pre-formatted subject & body)
 * --------------------------------------------------------------------------
 */
function initQuickComposer() {
    const form = document.getElementById('quick-mail-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('sender-name').value.trim();
        const subject = document.getElementById('message-subject').value.trim();
        const body = document.getElementById('message-body').value.trim();

        const targetEmail = 'bishalpal0019@gmail.com';
        const formattedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
        const formattedBody = encodeURIComponent(`Hello Bishal,\n\n${body}\n\nBest regards,\n${name}`);

        const mailtoUrl = `mailto:${targetEmail}?subject=${formattedSubject}&body=${formattedBody}`;
        window.location.href = mailtoUrl;
    });
}

/**
 * --------------------------------------------------------------------------
 * 11. DYNAMIC COPYRIGHT YEAR
 * --------------------------------------------------------------------------
 */
function initCopyrightYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
