document.addEventListener('DOMContentLoaded', () => {
    const validateKeyForm = document.getElementById('validateKeyForm');
    const addKeyForm = document.getElementById('addKeyForm');
    const validateMessage = document.getElementById('validateMessage');
    const addMessage = document.getElementById('addMessage');

    // Backend API URL
    const apiURL = 'https://your-railway-backend-url.com';

    // Validate Key Form Submission
    validateKeyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const key = document.getElementById('validateKeyInput').value;
        const response = await fetch(`${apiURL}/validate-key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key })
        });

        const data = await response.json();
        if (data.valid) {
            validateMessage.style.color = 'green';
            validateMessage.textContent = 'Key is valid!';
        } else {
            validateMessage.style.color = 'red';
            validateMessage.textContent = data.message;
        }
    });

    // Add Key Form Submission
    addKeyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const key = document.getElementById('addKeyInput').value;
        const expirationTime = document.getElementById('expirationInput').value;
        const response = await fetch(`${apiURL}/add-key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key, expirationTime })
        });

        const data = await response.json();
        if (response.ok) {
            addMessage.style.color = 'green';
            addMessage.textContent = 'Key added successfully!';
        } else {
            addMessage.style.color = 'red';
            addMessage.textContent = data.message || 'Failed to add key.';
        }
    });
});
