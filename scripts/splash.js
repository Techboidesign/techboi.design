// Create splash screen element
function createSplashScreen() {
    // Only create splash screen if in standalone mode or if user has installed the app
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator.standalone === true) || 
        localStorage.getItem('pwaInstalled') === 'true') {
        
        const splash = document.createElement('div');
        splash.className = 'pwa-splash';
        
        const logo = document.createElement('img');
        logo.src = '/img/Avatar.png';
        logo.className = 'pwa-splash-logo';
        logo.alt = 'Techboi Design';
        
        const text = document.createElement('div');
        text.className = 'pwa-splash-text';
        text.textContent = 'TECHBOI.DESIGN';
        
        splash.appendChild(logo);
        splash.appendChild(text);
        document.body.appendChild(splash);
        
        // Hide splash screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.classList.add('loaded');
                
                // Remove splash screen from DOM after animation completes
                setTimeout(() => {
                    splash.parentNode.removeChild(splash);
                }, 500);
            }, 1500); // Adjust time as needed
        });
    }
}

// Run when the DOM is ready
document.addEventListener('DOMContentLoaded', createSplashScreen);

// Listen for app installed event
window.addEventListener('appinstalled', (event) => {
    localStorage.setItem('pwaInstalled', 'true');
    console.log('PWA was installed');
});