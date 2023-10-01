$().ready(function(){
    $("#loginBtn").click(function(){
       // $("#nameField").style.maxHeight= '0';
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


