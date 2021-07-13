var timber = {
    status: document.querySelector("#status"),
    loginBtn: document.querySelector("#loginBtn"),
    textLoginBtn: document.querySelector("#textLoginBtn"),
    expiration: function() {
        var now = new Date();
        now.setTime(now.getTime() + (7 * 24 * 60 * 60 * 1000));
        return now.toUTCString();
    },
    smyrna: document.querySelector("#smyrna"),
    penny: document.createElement('img')
}
var offersObject = {

}
window.admiral('addEventListener','transact.subscribed',writeSubscriberCookie)
window.admiral('addEventListener','measure.detected',checkForActiveSubscription);
window.admiral('addEventListener','transact.loggedOut',handleLogout);
function writeSubscriberCookie(subscriptions) {
    document.cookie = "_tbn=1; expires" + timber.utcString + ";path=/";
    subscriptions.offers.forEach((offer) => {
        console.log(offer);
        if (offer.offerID === "5e1e38e4bb23620733c1e544" && !offer.addon) {
            document.cookie = "_tbn=2; expires" + timber.utcString + ";path=/";
        }
    })
}
function checkForActiveSubscription(data) {
    if (!data.subscribed) {
        console.log("Non Subscribed User");
        document.cookie = "_tbn=0; expires=" + timber.utcString + ";path=/";
    }
}
function readCookie(cookie) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var keyvalues = cookies[i].split('=');
        var key = keyvalues[0].trim();
        if (cookie === key) {
            var value = keyvalues[1].trim();
            return value;
        }
    }
}
function setupSite() {
    var cValue = readCookie('_tbn');
    if (cValue === "2") {
        removeAds();
        console.log("Premium Subscriber");
        console.log("Standard Subscriber");
        timber.status.textContent = "Premium Subscriber";
        timber.loginBtn.textContent = "Manage Account";
        timber.loginBtn.onclick = () => window.admiral('show','transact.manage');
        timber.textLoginBtn.style.display = 'none';
        return;
    } else if (cValue === "1") {
        removeAds();
        console.log("Standard Subscriber");
        timber.status.textContent = "Subscribed Visitor";
        timber.loginBtn.textContent = "Manage Account";
        timber.loginBtn.onclick = () => window.admiral('show','transact.manage');
        timber.textLoginBtn.style.display = 'none';
        return;
    }
    console.log("Non Subscriber");
    loadAds();
    timber.loginBtn.textContent = "Subscribe";
    timber.loginBtn.onclick = () => window.admiral('show','transact.subscribe',{offerID:'5e1e38e4bb23620733c1e544'});
    timber.status.textContent = "No Active Subscription";
    timber.textLoginBtn.onclick = () => window.admiral('show','transact.login');
}
function loadAds() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        timber.penny.src = "https://admiralarmada.com/cookie/content/smyrna-sm.png";
    } else {
        timber.penny.src = "https://admiralarmada.com/cookie/content/smyrna.png";
    }
    timber.smyrna.appendChild(timber.penny);
}
function removeAds() {
    timber.smyrna.style.display = 'none';
}
function handleLogout() {
    console.log("The visitor has logged out");
    document.cookie = "_tbn=0; expires=" + timber.utcString + ";path=/";
    parent.location.reload();
}
window.onload = setupSite();