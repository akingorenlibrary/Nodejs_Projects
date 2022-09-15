const form=document.querySelector("form");
const username=document.querySelector("#username");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
const usernameAlertDanger=document.querySelector("#usernameAlertDanger");
const emailAlertDanger=document.querySelector("#emailAlertDanger");
const passwordAlertDanger=document.querySelector("#passwordAlertDanger");
const alertSuccess=document.querySelector("#alertSuccess");

form.addEventListener("submit",(e)=>{
   e.preventDefault();

   fetch("/register",{
   method:"POST",
   body:JSON.stringify({username:username.value,email:email.value,password:password.value}),
   headers: { "Content-Type": "application/json" }
   })
   .then(result=>{return result.json()})
   .then(response=>{

      if(response.process)
      {
        alertSuccess.style.display="block";
        alertSuccess.innerHTML="<b>Kayıt Başarılı</b>"
        setTimeout(()=>{
         return location.href="/login";
        },2000)
      }

      if(response.errorMessage && response.process==false)
      {
         //console.log(response.errorMessage);
         Object.keys(response.errorMessage).forEach(element=>{
            if(element=="username")
            {
               usernameAlertDanger.style.display="block";
               usernameAlertDanger.innerHTML=response.errorMessage[element];
            }
            else
            {
               usernameAlertDanger.style.display="none";
            }

            if(element=="email")
            {
               emailAlertDanger.style.display="block";
               emailAlertDanger.innerHTML=response.errorMessage[element];
            }
            else
            {
               emailAlertDanger.style.display="none";
            }

            
            if(element=="password")
            {
               passwordAlertDanger.style.display="block";
               passwordAlertDanger.innerHTML=response.errorMessage[element];
            }
            else
            {
               passwordAlertDanger.style.display="none";
            }
         })
      }
   })
   .catch(error=>{
      console.log(error);
      console.log("fetch hatası oluştu.")
   })
      
  
})
