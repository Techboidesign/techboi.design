// This creates a smooth transition between pages

// Handle page transitions
class PageTransition {
    constructor() {
        this.curtain = document.querySelector('.curtain');
        this.content = document.body;
        this.links = document.querySelectorAll('a[href]');
        
        // Show initial page with entrance animation
        this.playEntranceAnimation();
        
        // Bind event listeners
        this.bindEvents();
    }

    bindEvents() {
        // Handle all link clicks
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only handle internal links
                if (link.href && link.href.startsWith(window.location.origin)) {
                    e.preventDefault();
                    this.playExitAnimation(link.href);
                }
            });
        });
    }

    playEntranceAnimation() {
        // Add entrance animation class
        this.curtain.classList.add('curtain-enter');
        
        // After animation completes, hide curtain and show content
        setTimeout(() => {
            this.curtain.style.transform = 'translateY(-100%)';
            this.content.classList.add('content-visible');
        }, 500); // Match the animation duration
    }

    playExitAnimation(newPageUrl) {
        // Reset curtain position and add exit animation
        this.curtain.style.transform = 'translateY(100%)';
        this.curtain.classList.add('curtain-exit');
        
        // Fade out current content
        this.content.classList.remove('content-visible');
        
        // After exit animation completes, navigate to new page
        setTimeout(() => {
            window.location.href = newPageUrl;
        }, 500); // Match the animation duration
    }
}

// Initialize transitions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
});




function scrollToPortfolio() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        window.scrollTo({
            top: portfolioSection.offsetTop,
            behavior: 'smooth'
        });
    }
}