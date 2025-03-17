// Description: This file contains the functions to inject the navigation and header into the HTML.
// In this case I'm addin the HEADER and FOOTER to the page instead of manually adding it to each page.



// Function to inject the navigation
function injectNavigation() {
    const nav = `
        <nav>
            <div class="nav-content">
                <a href="index.html"><img src="img/avatar.gif" alt="Logo" class="logo"></a>
                <ul>
                    <li><a href="index.html#portfolio">WORK</a></li>
                    <li><a href="about.html">ABOUT</a></li>
                    <li><a href="contact.html">CONTACT</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Insert at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', nav);
}

// Function to inject the header (if needed)
function injectHeader() {
    // Only inject header if the element with id 'injectHeader' exists
    const headerPlaceholder = document.getElementById('injectHeader');
    if (headerPlaceholder) {
        const header = `
            <header>
                <div class="header-content">
                    <canvas id="portfolioCanvas"></canvas>
                </div>
                <div class="scroll-indicator" onclick="scrollToPortfolio()">></div>
            </header>
        `;
        
        headerPlaceholder.outerHTML = header;
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    injectNavigation();
    injectHeader();
});


function injectFooter() {
    const footer = `
      <footer>
        <div class="footer-content">
          <p>&copy; 2025 Techboi.design</p>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footer);
  }
  
  // Add injectFooter() to your DOMContentLoaded event:
  document.addEventListener('DOMContentLoaded', function() {
    injectNavigation();
    injectHeader();
    injectFooter();
    injectPwaModal();
  });



  // Function to inject the PWA install modal
function injectPwaModal() {
    const modal = `
        <div id="pwa-install-modal" class="pwa-modal">
            <div class="pwa-modal-content">
                <span class="pwa-modal-close">&times;</span>
                <h2>Install This App</h2>
                
                <div class="pwa-install-instructions">
                    <div class="pwa-install-platform" data-platform="android">
                        <h3>On Android:</h3>
                        <ol>
                            <li>Tap the <strong>Install App</strong> button when it appears</li>
                            <li>Or tap the menu button (<strong>⋮</strong>) in Chrome</li>
                            <li>Select <strong>Add to Home screen</strong></li>
                        </ol>
                    </div>
                    
                    <div class="pwa-install-platform" data-platform="ios">
                        <h3>On iOS:</h3>
                        <ol>
                            <li>Tap the Share button (<strong>📤</strong>) in Safari</li>
                            <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
                            <li>Tap <strong>Add</strong> in the top right</li>
                        </ol>
                    </div>
                    
                    <div class="pwa-install-platform" data-platform="desktop">
                        <h3>On Desktop:</h3>
                        <ol>
                            <li>Look for the install icon (<strong>+</strong>) in the address bar</li>
                            <li>Or click the <strong>Install App</strong> button when it appears</li>
                        </ol>
                    </div>
                </div>
                
                <p class="pwa-modal-note">Install this app on your device for the best experience!</p>
            </div>
        </div>
    `;
    
    // Insert at the end of the body
    document.body.insertAdjacentHTML('beforeend', modal);
}