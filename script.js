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
