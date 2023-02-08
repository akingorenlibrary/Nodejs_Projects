const tc=document.querySelector("#tc");
const validationForm=document.querySelector("#validationForm");
const tcInvalidFeedback=document.querySelector("#tcInvalidFeedback");

validationForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={
        tc:tc.value
    }

    try{
        fetch("/validation",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"content-type":"application/json"} 
        })
        .then(result=>result.json())
        .then(response=>{
            //console.log(response);
            if(response.errorMessages && response.errorMessages.tc)
            {
                tc.classList.remove("is-valid");
                tc.classList.add("is-invalid");
                tcInvalidFeedback.innerHTML=response.errorMessages.tc;
            }
            else
            {
                tc.classList.remove("is-invalid");
                tc.classList.add("is-valid");
                tcInvalidFeedback.innerHTML="";
                location.assign("/makeAppointment")
            }
        })
    }
    catch(error){
        console.log(error);
    }
});


