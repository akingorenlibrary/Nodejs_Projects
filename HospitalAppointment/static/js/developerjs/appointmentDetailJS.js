const addCardArea=document.querySelector("#addCardArea");
const addMoreBtn=document.querySelector("#addMoreBtn");
const appointmentCard=document.querySelectorAll("#appointmentCard");
const modalDetailArea=document.querySelector("#modalDetailArea");
var sayac=0;
var getMore=3;

if(addMoreBtn){
    addMoreBtn.addEventListener("click",()=>{
        
        fetch("/addMoreAppointment",{
            method:"POST",
            body:JSON.stringify({date:date.value, time:timeTemp}),
            headers:{"content-type":"application/json"} 
        })
        .then(result=>result.json())
        .then(response=>{
            console.log(response);
        });
        
    });
}


for(let i=0;i<appointmentCard.length;i++)
{
    appointmentCard[i].addEventListener("click",()=>{
        $("#detailModal").modal("show");
        //console.log("id: ", appointmentCard[i].dataset.veri);

        fetch("/appointmentCardDetail",{
            method:"POST",
            body:JSON.stringify({id:appointmentCard[i].dataset.veri}),
            headers:{"content-type":"application/json"} 
        })
        .then(result=>result.json())
        .then(response=>{
            //console.log(response);
            if(response.succeded)
            {
                modalDetailArea.innerHTML=""+
                "<h6>Tarih: "+response.query.date+" (yyyy/mm/dd)</h6>"+
                "<h6>Saat: "+response.query.time+"</h6><br>"+
                "<button  type='button' id='deleteBtn' class='btn btn-danger btn-sm'>Randevuyu İptal Et</button>";
                const deleteBtn=document.querySelector("#deleteBtn");
                deleteBtn.addEventListener("click",()=>{
                    if(sayac==0){
                    fetch("/appointmentDelete",{
                        method:"POST",
                        body:JSON.stringify({id:appointmentCard[i].dataset.veri}),
                        headers:{"content-type":"application/json"} 
                    })
                    .then(result=>result.json())
                    .then(response=>{
                        if(response.succeded)
                        {
                            $('#detailModal').modal('toggle');
                            sayac=0;
                            $("#successModal").modal("show");
                            successModal.addEventListener('hidden.bs.modal', event => {
                                location.assign("/appointmentDetail");
                              })
                        }else{
                            sayac=0;
                            $('#detailModal').modal('toggle');
                            $("#errorModal").modal("show");
                        }
                    });
                }
                sayac++;
                });
            }
            else{
                $('#detailModal').modal('toggle');
                $("#errorModal").modal("show");
            }
        });
        
    });
}