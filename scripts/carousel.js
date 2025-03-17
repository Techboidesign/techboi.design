// Chart.js Implementation
document.addEventListener('DOMContentLoaded', () => { // makes sure the DOM is loaded before starting
    const ctx = document.getElementById('workDistributionChart').getContext('2d'); // Defining the chart selector and data for the pie chart
    new Chart(ctx, { // Creating the pie chart
        type: 'pie', // Setting the chart type to pie chart (there are several types of charts available)
        data: {
            labels: ['UX Design', 'Marketing', 'Brand', 'Web Dev'], // Setting the labels for the pie chart
            datasets: [{
                data: [35, 40, 20, 5], // Setting the percentages for the pie chart
                backgroundColor: [ // Setting the colors for the pie chart - each one goes with the corresponding label and color
                    '#19191f',
                    '#FFD700',
                    '#ADADB8',
                    '#E4E4E7'
                ]
            }]
        },
        options: { // Setting the options for the pie chart - this includes the legend, layout, and radius
            responsive: true, // This makes the chart responsive (defined in styles.css)
            maintainAspectRatio: false, // 
            plugins: { // Here I'm defining additional css styles for the legend and the chart layout
                legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                        font: {
                            family: "'Press Start 2P'",
                            size: 10
                        },
                        color: '#FFFFFF',
                        padding: 25,
                        boxWidth: 15,
                        boxHeight: 15
                    }
                }
            },
            layout: {
                padding: {
                    bottom: 80,
                    top: 20,
                    left: 20,
                    right: 20
                }
            },
            radius: '90%' // This makes the pie chart larger
        }
    });
});


// CAROUSEL SCRIPT 
document.addEventListener('DOMContentLoaded', () => { // makes sure the DOM is loaded before starting
    const carousel = document.querySelector('.carousel'); // Defining carousel selectors: slide, buttons, array of image numbers and total images
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const imageCounter = document.getElementById('currentImageNum');
    const totalImagesDisplay = document.getElementById('totalImages');
    let currentSlide = 0;
    let autoAdvanceInterval = null;

    // Set total number of images dynamically
    const totalSlides = slides.length; // total number of images
    totalImagesDisplay.textContent = totalSlides; // displays the total number of images

    function updateCarousel() { // updates the carousel with the current slide - this is the function that will be called when the slide changes
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`; // moves the carousel to the current slide
        imageCounter.textContent = currentSlide + 1; // displays the current slide number
    }

    function goToPrevSlide() { // function to go to the previous slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // calculates the previous slide number
        updateCarousel(); // updates the carousel with the new slide
    }

    function goToNextSlide() { // function to go to the next slide
        currentSlide = (currentSlide + 1) % totalSlides; // calculates the next slide number
        updateCarousel(); // updates the carousel with the new slide
    }

    function simulateButtonPress(button) { // function to simulate a button press by adding and removing the active class - when you hit the arrow keystroke left or right
        button.classList.add('active'); // adds the active class to the button
        setTimeout(() => button.classList.remove('active'), 150); // removes the active class after 150ms
    }

    function startAutoAdvance() { // function to start the auto advance interval
        if (autoAdvanceInterval) clearInterval(autoAdvanceInterval); // clears the interval if it already exists
        autoAdvanceInterval = setInterval(goToNextSlide, 10000); // sets the interval to go to the next slide every 10 seconds
    }

    function stopAutoAdvance() { // function to stop the auto advance interval
        if (autoAdvanceInterval) { // checks if the interval exists
            clearInterval(autoAdvanceInterval); // clears the interval
            autoAdvanceInterval = null; // sets the interval to null
        }
    }

    // Button handlers
    prevBtn.addEventListener('click', () => { // event listener for the previous button
        stopAutoAdvance(); // stops the auto advance interval
        goToPrevSlide(); // goes to the previous slide
        startAutoAdvance(); // starts the auto advance interval
    });

    nextBtn.addEventListener('click', () => { // event listener for the next button
        stopAutoAdvance(); // stops the auto advance interval
        goToNextSlide(); // goes to the next slide
        startAutoAdvance(); // starts the auto advance interval
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => { // event listener for the keydown event
        if (e.key === 'ArrowLeft') {
            stopAutoAdvance();
            simulateButtonPress(prevBtn);
            goToPrevSlide();
            startAutoAdvance();
        } else if (e.key === 'ArrowRight') {
            stopAutoAdvance();
            simulateButtonPress(nextBtn);
            goToNextSlide();
            startAutoAdvance();
        }
    });

    // Pause on hover
    [carousel, prevBtn, nextBtn].forEach(element => { // event listeners for the carousel, previous button, and next button
        element.addEventListener('mouseenter', stopAutoAdvance); // stops the auto advance interval when the mouse enters the element
        element.addEventListener('mouseleave', startAutoAdvance); // starts the auto advance interval when the mouse leaves the element
    });

    // Initialize - this will set the carousel to the first slide and start the auto advance interval when the page loads or is refreshed 
    updateCarousel(); // updates the carousel with the current slide
    startAutoAdvance(); // starts the auto advance interval
});