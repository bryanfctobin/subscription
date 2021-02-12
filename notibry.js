document.addEventListener("DOMContentLoaded", setupNotifications);
function setupNotifications() {
  let nbtn = document.querySelector("#notificationsBtn");
  nbtn.addEventListener("click", function () {
    window.Notification.requestPermission();
    console.log(window.Notification.permission);
  });
}
