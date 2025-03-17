// Wait for the page to load
window.addEventListener('load', () => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  
    // Add install prompt handling for PWA installation
    let deferredPrompt;
    const installButton = document.createElement('button');
    installButton.style.display = 'none';
    installButton.classList.add('pwa-install-button');
    installButton.textContent = 'Install App';
    document.body.appendChild(installButton);
  
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      installButton.style.display = 'block';
  
      installButton.addEventListener('click', () => {
        // Hide the install button
        installButton.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  });

  // PWA Modal functionality
function initPwaModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (!modal) return;
    
    // Close button logic
    const closeBtn = document.querySelector('.pwa-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Remember that user has seen the modal
            localStorage.setItem('pwaModalShown', Date.now().toString());
        });
    }
    
    // Also close when clicking outside the modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeBtn.click();
        }
    });
}

// Show modal with platform-specific instructions
function showInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (!modal) return;
    
    // Detect platform
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Show appropriate instructions
    document.querySelectorAll('.pwa-install-platform').forEach(el => {
        el.style.display = 'none';
    });
    
    if (isIOS) {
        document.querySelector('[data-platform="ios"]').style.display = 'block';
    } else if (isAndroid) {
        document.querySelector('[data-platform="android"]').style.display = 'block';
    } else {
        document.querySelector('[data-platform="desktop"]').style.display = 'block';
    }
    
    // Show modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Check whether to show the modal
function checkShowInstallModal() {
    // Only show if not already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true || 
        localStorage.getItem('pwaInstalled') === 'true') {
        return;
    }
    
    // Only show if not shown in the last week
    const lastShown = localStorage.getItem('pwaModalShown');
    if (lastShown) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const lastShownDate = new Date(parseInt(lastShown));
        if ((new Date()) - lastShownDate < oneWeek) {
            return;
        }
    }
    
    // Show modal after user has interacted with the site
    let interactions = 0;
    const interactionEvents = ['click', 'scroll', 'keydown'];
    
    function handleInteraction() {
        interactions++;
        
        // After 3 interactions, consider showing the install modal
        if (interactions >= 3) {
            setTimeout(showInstallModal, 1000); // Wait a second after interaction
            
            // Remove event listeners
            interactionEvents.forEach(event => {
                document.removeEventListener(event, handleInteraction);
            });
        }
    }
    
    // Add interaction listeners
    interactionEvents.forEach(event => {
        document.addEventListener(event, handleInteraction);
    });
}

// Initialize modal
document.addEventListener('DOMContentLoaded', () => {
    initPwaModal();
    
    // Wait a few seconds before checking if we should show the modal
    setTimeout(checkShowInstallModal, 5000);
});