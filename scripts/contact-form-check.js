document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const inputs = {
        name: document.getElementById('name'), // Get input fields by ID
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };

    // Validate fields on blur
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('blur', () => validate(key)); // Validate on blur - when focus is lost
    });

    // Clear error on input
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', () => {
            inputs[key].classList.remove('error');
            document.getElementById(`${key}Error`).textContent = '';
        });
    });

    // Validate field  (name, email, message)
    function validate(field) {
        const value = inputs[field].value.trim(); // Remove whitespace
        let error = ''; // Reset error message

        switch(field) {
            case 'name': // Check if name is at least 2 words
                const words = value.split(/\s+/).filter(word => word.length >= 3); // Split by whitespace 
                if (words.length < 2) {
                    error = 'Enter full name'; 
                }
                break;

            case 'email':
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/i; // Email recognition pattern
                if (!emailRegex.test(value)) {
                    error = 'Enter valid email';
                }
                break;

            case 'message':
                if (value.length < 20) {   // Check if message is at least 20 characters
                    error = 'Message must be 20+ characters';
                }
                break;
        }

        if (error) {
            inputs[field].classList.add('error');
            document.getElementById(`${field}Error`).textContent = error;
            return false;
        }
        return true;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isValid = Object.keys(inputs).every(key => validate(key));
        if (isValid) {
            console.log('Form valid - ready to submit');
        }
    });
});