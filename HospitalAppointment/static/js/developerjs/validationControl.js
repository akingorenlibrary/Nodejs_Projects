const validationForm=document.querySelector("#validationForm");
const tc=document.querySelector("#tc");
const tcFeedBack=document.querySelector("#tcFeedBack");
var sayac=0;

validationForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={tc:tc.value};
    console.log("data: ",data)
    if(sayac==0){
    try{
        fetch("/validation",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"content-type":"application/json"}
        })
        .then(result=>result.json())
        .then(response=>{
            console.log(response)
           if(response.succeded)
           {
            sayac=0;
            tc.classList.remove("is-invalid")
            tc.classList.add("is-valid")
            tcFeedBack.innerHTML=""
            location.assign("/appointmentDetail")
           }else{
            sayac=0;
            tc.classList.remove("is-valid")
            tc.classList.add("is-invalid")
            tcFeedBack.innerHTML="Tc hatalı"
           }
        })
    }
    catch(error){
        console.log(error);
        sayac=0;
    }
}
sayac++;

})