//Ref: https://developer.mozilla.org/en-US/docs/Web/API/notification
document.addEventListener("DOMContentLoaded", setupNotifications);
function setupNotifications() {
  let nbtn = document.querySelector("#notificationsBtn");
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notifications");
  } else if (Notification.permission === "default") {
    nbtn.style.display = "inline-block";
    nbtn.addEventListener("click", function () {
      window.Notification.requestPermission();
      console.log(window.Notification.permission);
    });
  }
}
