document.addEventListener('DOMContentLoaded', function () {
    const passwordForm = document.getElementById('password-form');
    const responseMessage = document.getElementById('responseMessage');
    passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // You can add client-side validation here if needed

        // Send an AJAX request to your Node.js server
        fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    responseMessage.innerHTML = data.message;
                    passwordForm.reset();
                } else {
                    responseMessage.innerHTML = data.message;
                    passwordForm.reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                responseMessage.innerHTML = 'An error occurred. Please try again later.';
            });
    });
});