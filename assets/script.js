$(document).ready(function () {
 let jam;
 let namaHari;
 let hari;
 let flag = 0;
 let html = "";
 let arrAlarm = [];

 function getTime() {
  jam = moment().format("hh:mm:ss A");
  namaHari = moment().format("dddd");
  hari = moment().format("Do MMM YYYY");

  $("#jam").text(jam);
  $("#hari").text(namaHari + ", " + hari);
 }

 getTime();

 setInterval(() => {
  showNotif(moment().format("HH:mm"));
  getTime();
 }, 1000);

 //  ketika tombol delete di tekan
 $(document).on("click", ".delete", function () {
  let id = $(this).data("index");

  arrAlarm.splice(id, 1);
  $("#listAlarm").empty();
  displayList();
 });

 //  tombol set alarm ketika di klik
 $("#setAlarm").on("click", () => {
  $("#listAlarm").empty();

  let dataNote = $("#note").val();
  let dataTime = $("#alarm").val();
  data = {
   notes: dataNote,
   time: dataTime,
  };

  arrAlarm.push(data);

  $("#note").val("");
  $("#alarm").val("");

  $("#exampleModal").modal("hide");

  displayList();
 });

 function displayList() {
  html = "";
  arrAlarm.forEach((el, index) => {
   html += `
             <div class="col-md-12 my-2">
                  <div class="card w-100">
                      <div class="card-body p-1 m-1">
                          <div class="row">
                              <div class="col-md-7 col-sm-8">
                                  <span>${el.notes}</span>
                              </div>
                              <div class="col-md-3 col-sm-2 d-flex justify-content-end">
                                  <span>${el.time}</span>
                              </div>
                              <div class="col-md-2 col-sm-2 d-flex justify-content-end">
                                <span class="text-danger delete" id="delete" data-index="${index}">X</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  </div>
             `;
  });
  $("#listAlarm").append(html);
 }

 function showNotif(time) {
  arrAlarm.forEach((el) => {
   if (time == el.time) {
    if (flag != 1) {
     let alert = `
      <div class="alert alert-secondary text-center" role="alert">
      Waktu menunjukan pukul ${el.time}, waktu nya ${el.notes}
      </div>
                  `;

     $("#alert").append(alert);
    }
    flag = 1;
   }
  });
 }
});
