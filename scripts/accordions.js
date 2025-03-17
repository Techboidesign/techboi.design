// Script for the accordions on the FAQ page

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const toggle = header.querySelector('.accordion-toggle');
        const allContents = document.querySelectorAll('.accordion-content');
        const allHeaders = document.querySelectorAll('.accordion-header');
        
        // If clicking on an already open accordion, just close it
        if (header.classList.contains('active')) {
            header.classList.remove('active');
            content.classList.remove('active');
            toggle.textContent = '+';
            return;
        }

        // Close all accordions
        allContents.forEach(item => {
            item.classList.remove('active');
        });
        
        allHeaders.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-toggle').textContent = '+';
        });

        // Open clicked accordion
        header.classList.add('active');
        content.classList.add('active');
        toggle.textContent = '-';
    });
});