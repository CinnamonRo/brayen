$(document).ready(function () {
  //index
  $("#login").submit(function (event) {
    event.preventDefault(); // prevent form submit
    var username = $("#inputName").val();
    localStorage.setItem("username", username);
    window.location.href = "main.html";
  });

  // header
  var username = localStorage.getItem("username");
  $("#nameShow").text(username);
});

function submitOut() {
  let tanggalPengeluaran = $("#tanggalPengeluaran").val();
  let keteranganPengeluaran = $("#keteranganPengeluaran").val();
  let pengeluaran = $("pengeluaran").val();
  let catatanPengeluaran = $("catatanPengeluaran").val();

  var message = [];

  if (tanggalPendapatan.trim() === "") {
    message.push("Silahkan Mengisi Tanggal");
    $("#tanggalPengeluaran").css("border", "1px solid red");
  }
  if (keterangan == "") {
    message.push("Silahkan Mengisi Keterangan");
    $("#keteranganPengeluaran").css("border", "1px solid red");
  }
  if (nominal.trim() === "") {
    message.push("Silahkan mengisi nominal");
    $("#pengeluaran").css("border", "1px solid red");
  }

  $.each(message, function (index, value) {
    console.log("Index: " + index + ", Value: " + value);
    $("#messageIncome").append(
      `<span class='errorMessage'>` + value + `</span> <br>`
    );
  });

  var dataPengeluaran = {
    tanggal: tanggalPengeluaran,
    keteragan: keteranganPengeluaran,
    pengeluaran: pengeluaran,
    catatan: catatanPengeluaran,
  };

  var existingData = JSON.parse(localStorage.getItem("myData")) || [];
  existingData.push(data);
  localStorage.setItem("myData", JSON.stringify(existingData));
}
function submit() {
  let tanggalPendapatan = $("#dateIn").val();
  let keterangan = $("#catIn").val();
  let nominal = $("#moneyIn").val();
  let catatan = $("#inNote").val();

  console.log("cek data date : " + tanggalPendapatan);
  console.log("cek data keterangan : " + keterangan);
  console.log("cek data nominal : " + nominal);
  console.log("cek data catatan : " + catatan);

  var message = [];

  if (tanggalPendapatan.trim() === "") {
    message.push("Silahkan Mengisi Tanggal");
    $("#dateIn").css("border", "1px solid red");
  }
  if (keterangan == "") {
    message.push("Silahkan Mengisi Keterangan");
    $("#catIn").css("border", "1px solid red");
  }
  if (nominal.trim() === "") {
    message.push("Silahkan mengisi nominal");
    $("#moneyIn").css("border", "1px solid red");
  }

  $.each(message, function (index, value) {
    console.log("Index: " + index + ", Value: " + value);
    $("#messageIncome").append(
      `<span class='errorMessage'>` + value + `</span> <br>`
    );
  });

  console.log("cek data message ", message);

  var data = {
    tanggal: tanggalPendapatan,
    keterangan: keterangan,
    nominal: nominal,
    catatan: catatan,
  };

  var existingData = JSON.parse(localStorage.getItem("myData")) || [];
  existingData.push(data);
  localStorage.setItem("myData", JSON.stringify(existingData));
}
