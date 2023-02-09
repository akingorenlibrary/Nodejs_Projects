const date = document.querySelector("#date");
const alertDanger = document.querySelector("#alertDanger");
const getDate = document.querySelector("#getDate");
const getClock = document.querySelector("#getClock");
//const allClockBtn=document.querySelectorAll(".btn-check");
const timeArea = document.querySelector("#timeArea");
const approve = document.querySelector("#approve");
const okeyDate = document.querySelector("#okeyDate");
const okeyClock = document.querySelector("#okeyClock");
const alertDangerModal = document.querySelector("#alertDangerModal");
const okeyBtn = document.querySelector("#okeyBtn");

var timeTemp = null;
var getDatetemp;
var sayac = 0;

$(document).ready(function () {
    date.addEventListener("change", (e) => {

        if (date.value != "") {
            getDatetemp = new Date(date.value);
            var toDayDate = new Date();
            //console.log("getDatetemp: ",getDatetemp);
            //console.log("toDayDate: ",toDayDate);

            if (getDatetemp.getFullYear() == toDayDate.getFullYear() && ((getDatetemp.getMonth() > toDayDate.getMonth()) || (getDatetemp.getMonth() == toDayDate.getMonth() && getDatetemp.getDate() >= toDayDate.getDate()))) {

                alertDangerModal.style.display = "none";
                fetch("/appointmentQuery", {
                        method: "POST",
                        body: JSON.stringify({
                            date: date.value
                        }),
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    .then(result => result.json())
                    .then(response => {
                        // console.log("response: ",response);
                        var times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"]
                        if (response.succeded) {
                            alertDanger.style.display = "none";
                            timeArea.innerHTML = "";
                            for (let x = 0; x < times.length; x++) {
                                let status = false;
                                response.timeList.forEach(element => {
                                    if (element == times[x]) {
                                        status = true;
                                    }
                                });
                                if (status) {
                                    timeArea.innerHTML += "<input type='radio' class='btn-check' name='options' id='option" + x + "' value='" + times[x] + "' autocomplete='off' disabled>" +
                                        "<label class='btn btn-secondary' style='margin-bottom:5px' for='option" + x + "'>" + times[x] + "</label>&nbsp";
                                } else {
                                    timeArea.innerHTML += "<input type='radio' class='btn-check' name='options' id='option" + x + "' value='" + times[x] + "' autocomplete='off'>" +
                                        "<label class='btn btn-secondary' style='margin-bottom:5px' for='option" + x + "'>" + times[x] + "</label>&nbsp";
                                }

                            }

                            let dateTemp = getDatetemp.getDate();
                            let monthTemp = getDatetemp.getMonth() + 1;
                            if (dateTemp > 0 && dateTemp < 10) {
                                dateTemp = "0" + dateTemp;
                            }
                            if (monthTemp > 0 && monthTemp < 10) {
                                monthTemp = "0" + monthTemp;
                            }
                            getDate.innerHTML = "Tarih: " + dateTemp + "/" + monthTemp + "/" + getDatetemp.getFullYear();

                            $('#timeModal').modal('show');

                            var allClockBtn = document.querySelectorAll(".btn-check");
                            for (let i = 0; i < allClockBtn.length; i++) {
                                allClockBtn[i].addEventListener("click", () => {
                                    //console.log(allClockBtn[i].value);
                                    alertDangerModal.style.display = "none";
                                    getClock.innerHTML = "Saat: " + allClockBtn[i].value;
                                    timeTemp = allClockBtn[i].value;

                                })
                            }



                        } else {
                            $('#timeModal').modal('toggle');
                            alertDangerModal.style.display = "none";
                            alertDanger.style.display = "block";
                            alertDanger.innerHTML = "Hata oluştu";
                        }
                    });

            } else {
                //hatalı tarih seçimi
                alertDanger.style.display = "block";
                alertDanger.innerHTML = "Hatalı tarih seçimi";
            }
        }

        approve.addEventListener("click", (e) => {
            e.preventDefault();
            //console.log("sayac: ", sayac);

            if (timeTemp == null) {
                alertDangerModal.style.display = "block";
                alertDangerModal.innerHTML = "Lütfen bir saat seçin"
            } else {
                if(sayac==0){
                fetch("/makeAppointment", {
                        method: "POST",
                        body: JSON.stringify({
                            date: date.value,
                            time: timeTemp
                        }),
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    .then(result => result.json())
                    .then(response => {
                        //console.log(response);
                        if (response.succeded) {
                            //sayac=0;
                            $('#timeModal').modal('toggle');
                            $('#okeyModal').modal('show');
                            let dateTemp = getDatetemp.getDate();
                            let monthTemp = getDatetemp.getMonth() + 1;
                            if (dateTemp > 0 && dateTemp < 10) {
                                dateTemp = "0" + dateTemp;
                            }
                            if (monthTemp > 0 && monthTemp < 10) {
                                monthTemp = "0" + monthTemp;
                            }
                            okeyDate.innerHTML = "Tarih: " + dateTemp + "/" + monthTemp + "/" + getDatetemp.getFullYear();
                            okeyClock.innerHTML = "Saat: " + timeTemp;
                            okeyBtn.addEventListener("click", () => {
                                $('#okeyModal').modal('toggle');
                            });
                            $('#okeyModal').on('hidden.bs.modal', function (e) {
                                location.assign("/appointmentDetail");
                            })


                        } else {
                            sayac=0;
                            $('#timeModal').modal('toggle');
                            alertDanger.style.display = "block";
                            alertDanger.innerHTML = "Hata oluştu";
                        }


                    })
                    .catch(error=>{
                        $('#timeModal').modal('toggle');
                        alertDanger.style.display = "block";
                        alertDanger.innerHTML = "Hata oluştu";
                    });
                }
                sayac++;

            }
        });


    });
});