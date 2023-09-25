{/* <script>
    let regForm = require('../login.ejs');
</script>
console.log(regForm)
const form =  document.getElementById('regForm');
form.addEventListener('submit',registerUser); 


async function registerUser(event){
        event.preventDefault()
        const username = document.getElementById('usrname').value
        const password = document.getElementById('pswd').value
        user= JSON.stringify({
            username,
            password
        })
    }
async function login_post(user){
            const result = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
                }).then((res)=>res.json())
                console.log(result);
        }
    
$(document).ready(function(){
    $('#btn').click(()=>{
        registerUser()
        login_post(user)
    });
}); */}