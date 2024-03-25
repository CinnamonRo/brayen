$(document).ready(function () {
  //index
  $("#login").submit(function (event) {
    event.preventDefault(); // prevent form submit
    var username = $("#inputName").val();
    if (username !== "") {
      localStorage.setItem("username", username);
      window.location.href = "main.html";
    } else {
      alert("Masukkan nama");
    }
  });

  // header
  var username = localStorage.getItem("username");
  $("#nameShow").text(username);

  loadTransaction();
});

function loadTransaction() {
  var obj = $("#transactionList");
  var existingData = JSON.parse(localStorage.getItem("myData")) || [];

  $.each(existingData, function (index, value) {
    if (value.type === "pengeluaran") {
      obj.append(
        `<div class="pengeluaran"><div>
                    ` +
          value.catatan +
          `<br> ` +
          value.keterangan +
          `
                  </div>
                  <div class="money">
                    -` +
          formatRibuan(value.pengeluaran) +
          `
                  </div>
                  </div>`
      );
    } else {
      obj.append(
        `<div class="penghasilan"><div>
                    ` +
          value.catatan +
          `<br> ` +
          value.keterangan +
          `
                  </div>
                  <div class="money">
                    +` +
          formatRibuan(value.nominal) +
          `
                  </div>
                  </div>`
      );
    }
  });

  var total = $("#balance");
  if (localStorage.getItem("count")) {
    var existingCount = JSON.parse(localStorage.getItem("count")) || [];

    total.text(formatRibuan(existingCount.number));
  } else {
    total.text(formatRibuan(0));
  }
}

function submitOut() {
  $("#messageOutcome").empty();
  $("#tanggalPengeluaran").css("border", "");
  $("#keteranganPengeluaran").css("border", "");
  $("#pengeluaran").css("border", "");
  $("#catatanPengeluaran").css("border", "");

  let tanggalPengeluaran = $("#tanggalPengeluaran").val();
  let keteranganPengeluaran = $("#keteranganPengeluaran").val();
  let pengeluaran = $("#pengeluaran").val();
  let catatanPengeluaran = $("#catatanPengeluaran").val();

  var message = [];

  if (tanggalPengeluaran.trim() === "") {
    message.push("Silahkan Mengisi Tanggal");
    $("#tanggalPengeluaran").css("border", "1px solid red");
  }
  if (keteranganPengeluaran == "") {
    message.push("Silahkan Mengisi Keterangan");
    $("#keteranganPengeluaran").css("border", "1px solid red");
  }
  if (pengeluaran.trim() === "") {
    message.push("Silahkan mengisi nominal");
    $("#pengeluaran").css("border", "1px solid red");
  }
  if (catatanPengeluaran.trim() === "") {
    message.push("Silahkan mengisi Catatan");
    $("#catatanPengeluaran").css("border", "1px solid red");
  }

  $.each(message, function (index, value) {
    $("#messageOutcome").append(
      `<span class='errorMessage'>` + value + `</span> <br>`
    );
  });

  if (message.length == 0) {
    var dataPengeluaran = {
      type: "pengeluaran",
      tanggal: tanggalPengeluaran,
      keterangan: keteranganPengeluaran,
      pengeluaran: pengeluaran,
      catatan: catatanPengeluaran,
    };

    var existingData = JSON.parse(localStorage.getItem("myData")) || [];
    existingData.push(dataPengeluaran);
    localStorage.setItem("myData", JSON.stringify(existingData));

    if (localStorage.getItem("count")) {
      var existingCount = JSON.parse(localStorage.getItem("count"));
      var calculate = parseInt(existingCount.number) - parseInt(pengeluaran);

      existingCount.number = calculate;
      localStorage.setItem("count", JSON.stringify(existingCount));
    } else {
      var calculate = 0 - parseInt(pengeluaran);

      var count = { number: calculate };
      localStorage.setItem("count", JSON.stringify(count));
    }

    $("#messageOutcome").append(
      `<span class='successMessage'>Data Success Added</span> <br>`
    );

    setTimeout(function () {
      $(".successMessage").remove();
    }, 3000);

    $("#tanggalPengeluaran").val("");
    $("#keteranganPengeluaran").val("");
    $("#pengeluaran").val("");
    $("#catatanPengeluaran").val("");
  }
}

function submit() {
  $("#messageIncome").empty();
  $("#dateIn").css("border", "");
  $("#catIn").css("border", "");
  $("#moneyIn").css("border", "");
  $("#inNote").css("border", "");

  let tanggalPendapatan = $("#dateIn").val();
  let keterangan = $("#catIn").val();
  let nominal = $("#moneyIn").val();
  let catatan = $("#inNote").val();

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
  if (catatan.trim() === "") {
    message.push("Silahkan mengisi Catatan");
    $("#inNote").css("border", "1px solid red");
  }

  $.each(message, function (index, value) {
    $("#messageIncome").append(
      `<span class='errorMessage'>` + value + `</span> <br>`
    );
  });

  if (message.length == 0) {
    var data = {
      type: "penghasilan",
      tanggal: tanggalPendapatan,
      keterangan: keterangan,
      nominal: nominal,
      catatan: catatan,
    };

    var existingData = JSON.parse(localStorage.getItem("myData")) || [];
    existingData.push(data);
    localStorage.setItem("myData", JSON.stringify(existingData));

    if (localStorage.getItem("count")) {
      var existingCount = JSON.parse(localStorage.getItem("count"));

      var calculate = parseInt(existingCount.number) + parseInt(nominal);

      existingCount.number = calculate;
      localStorage.setItem("count", JSON.stringify(existingCount));
    } else {
      var calculate = 0 + parseInt(nominal);
      var count = { number: calculate };
      localStorage.setItem("count", JSON.stringify(count));
    }

    $("#messageIncome").append(
      `<span class='successMessage'>Data Success Added</span> <br>`
    );

    setTimeout(function () {
      $(".successMessage").remove();
    }, 3000);

    $("#dateIn").val("");
    $("#catIn").val("");
    $("#moneyIn").val("");
    $("#inNote").val("");
  }
}

function formatRibuan(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
