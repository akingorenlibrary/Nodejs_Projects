const dateInput=document.querySelector("#date");
const dateForm=document.querySelector("#dateForm");
const alertDanger=document.querySelector("#alertDanger");
const dateInvalidFeedback=document.querySelector("#dateInvalidFeedback");
const saatlerDiv=document.querySelector("#saatlerDiv");

const clockForm=document.querySelector("#clockForm");
const clockBtns=document.getElementsByClassName("btn btn-light clockBtn");

var successModal=document.querySelector("#successModal");
var failModal=document.querySelector("#failModal");
var close=document.querySelector("#close");

var myModal=document.querySelector("#myModal");

close.addEventListener("click",()=>{
    successModal.close();
    location.assign("/appointmentDetail");
})

dateForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={
        dateInput:dateInput.value
    }

    try{

        fetch("/makeAppointment",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"content-type":"application/json"} 
        })
        .then(result=>result.json())
        .then(response=>{
            console.log(response);
            if(response.processDate==false)
            {
                saatlerDiv.style.display="none";
                dateInput.classList.add("is-invalid");
                dateInvalidFeedback.innerHTML=response.errorObject.date;
            }
            else if(response.processDate==true)
            {
                dateInput.classList.remove("is-invalid");
                dateInput.classList.add("is-valid");
                dateInvalidFeedback.innerHTML="";
    
                saatlerDiv.style.display="block";
                for(let i=0;i<clockBtns.length;i++)
                {
                    clockBtns[i].addEventListener("click",()=>{
                        console.log(clockBtns[i].value);
                        //fetch()  saat:clockBtns[i].value tarih:dateInput
                        const data2={
                            date:dateInput.value,
                            time:clockBtns[i].value
                        }
                        fetch("/makeAppointment/control",{
                            method:"POST",
                            body:JSON.stringify(data2),
                            headers:{"content-type":"application/json"}
                        })
                        .then(res=>res.json())
                        .then(result=>{
                            console.log("result :",result)
                            if(result.processControl==true)
                            {
                                successModal.showModal();
                            }
                            else if(result.processControl==false)
                            {
                                failModal.showModal();
                            }
                        })
                    });
                }
            }
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
        alertDanger.style.display="block";
        alertDanger.innter="Hata oluştu";
    }
})





