// let admin = JSON.parse(localStorage.getItem("admin/onlineFoods"));
// document.getElementById("user").innerHTML = admin[0];

document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("admin/onlineFoods");
  window.location.assign("index");
});
