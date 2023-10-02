
//Retrieve form data for signup

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



