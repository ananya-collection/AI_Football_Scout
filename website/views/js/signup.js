document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('reg-Form');
    const responseMessage = document.getElementById('responseMessage');
    const btn = document.getElementById('btn').value;
    
    
    btn?.regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formName = document.getElementById('nameField').value;
        const formEmail= document.getElementById('email').value;
        const formPswd= document.getElementById('password').value;
        const formConPswd= document.getElementById('conf_password').value;
       
        // Send an AJAX request to the server
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formName, 
                formEmail,
                formPswd,
                formConPswd 
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status){
                    responseMessage.innerHTML = data.message;
                    regForm.reset();
                }else{
                   responseMessage.innerHTML = data.message;
                   regForm.reset();

                }
            })
            .catch((error) => {
                console.error(error);
                responseMessage.innerHTML = 'An error occurred. Please try again later.';
            });
    });
});