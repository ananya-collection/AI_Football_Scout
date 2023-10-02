//Retrieve form data for signup

// const formSubmitted = () => {
//     let formData = {
//     name : document.getElementById("nameField").value,
//     email : document.getElementById("email").value,
//     password : document.getElementById("password").value
// };
//     console.log(formData);
//     console.log(signUp_post);
//     signUp_post(formData);
    
// }

// regForm.addEventListener($("#signUpBtn"),(event)=>{
//     event.preventDefault();
//     const name = document.getElementById('nameField').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     user= JSON.stringify({
//         name,
//         email,
//         password

// });
// });

// const formSubmitted = function(){
//     let formData = {};
//     formData.Name = $('#nameField').val();
//     formData.Email = $('#email').val();
//     formData.Password = $('#password').val();

//     console.log(formData);
//     (signUp_post(formData))
    
// }


// post function for sign up
// async function signUp_post(user){
//     const result = await fetch('/signUp', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: user,
//         success: (result)=>{
//             if(result.statusCode == 201){
//                 alert('user post successful');
//             }
//         }}).then((res)=>res.json())
//           console.log(result);
// }

// function signUp_post(user){
//     $.ajax({
//         url:'/signUp',
//         type:'POST',
//         data:user,
//         success: (result)=>{
//             if(result.statusCode == 201){
//                 alert('user post successful');
//             }
//         }
//     });
// }

// async function signUp_post(user){
//     const result = await fetch('/signUp', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: user
//         }).then((res)=>res.json())
//         console.log(result);
// }

const formEl= document.querySelector('#regForm');
formEl.addEventListener($('#signUpBtn'),signUp_post);


async function signUp_post(event){
    event.preventDefault();
    const formData= new FormData(formEl);
    const user= new URLSearchParams(formData);
    const result=  await fetch('/api/signUp', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        body: user
    }).then((res)=>res.json())
      then(user => console.log(user))
      console.log(result)
      .catch(error => console.log(error));
}
   


$().ready(function(){
    $("#loginBtn").click(function(){
       $("button[name=signUpBtn]").attr("disabled", true);
       $("#nameField").hide();
       $("#title").text("Sign In");
       $("#signUpBtn").addClass('disable');
       $("this").removeClass('disable');
       $(this).toggleClass('enable');

   });
   $("#signUpBtn").click(function(){
       $("button[name=loginBtn]").attr("disabled", true);
       $("#signUpBtn").attr('type', 'text');
       $("#signUpBtn").show(); 
     
    });
});
