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
window.admiral('addEventListener','transact.subscribed',writeSubscriberCookie)
window.admiral('addEventListener','measure.detected',checkForActiveSubscription);
window.admiral('addEventListener','transact.loggedOut',handleLogout);
window.admiral('addEventListener','transact.loggedIn',handleLogin);
function writeSubscriberCookie(subscriptions) {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    document.cookie = "_tbn=1; expires=" + timber.expiration() + ";path=/";
    subscriptions.offers.forEach((offer) => {
        if (offer.offerID === "5e1e38e4bb23620733c1e544" && !offer.addon) {
            document.cookie = "_tbn=2; expires=" + timber.expiration() + ";path=/";
        }
    })
}
function checkForActiveSubscription(data) {
    if (!data.subscribed) {
        document.cookie = "_tbn=0; expires=" + timber.expiration() + ";path=/";
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
    checkLocalStorageForSubscriptions('subscriptions');
    var cValue = readCookie('_tbn');
    if (cValue === "2") {
        removeAds();
        handlePremiumFeatures('.premiumFeature');
        timber.status.textContent = "Premium Subscriber";
        timber.loginBtn.textContent = "Manage Account";
        timber.loginBtn.onclick = () => window.admiral('show','transact.manage');
        timber.textLoginBtn.style.display = 'none';
        return;
    } else if (cValue === "1") {
        removeAds();
        handlePremiumFeatures('.premiumFeature');
        timber.status.textContent = "Subscribed Visitor";
        timber.loginBtn.textContent = "Manage Account";
        timber.loginBtn.onclick = () => window.admiral('show','transact.manage');
        timber.textLoginBtn.style.display = 'none';
        return;
    }
    loadAds();
    preventPremiumFeatures('.premiumFeature');
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
    document.cookie = "_tbn=0; expires=0;path=/";
    document.cookie = "_oak=0; expires=0;path=/";
    document.cookie = "_offerType=;expires=0;path=/";
    localStorage.clear();
    parent.location.reload();
}
function handleLogin() {
    document.cookie = "_oak=1; expires=" + timber.expiration() + ";path=/";
}
//Check Local Storage for subscriptons item and then loop through to see if email offer is accepted. If so, do something
function checkLocalStorageForSubscriptions(item) {
    let s = localStorage.getItem(item);
    if (!s) {
        console.log("No subscriptions are in local storage");
        return;
    }
    s = JSON.parse(s)
    console.log(s);
    s.offers.forEach(o=>{
        if (!o.addOn) {
            document.cookie = "_offerType=" + o.offerType + ";expires=" + timber.expiration() + ";/path=/";
        }
    })
}
//This uses the force method of our API to display an Engage for non-subscribers and provides the expected behavior for subscribers
function handlePremiumFeatures(x) {
    let f = document.querySelectorAll(x);
    f.forEach(h=>{
        h.addEventListener('click',function() {
        alert("This alert only works for subscribers");
    })})
    return f;
}
function preventPremiumFeatures(x) {
    let g = document.querySelectorAll(x);
    g.forEach(n=>{
        n.addEventListener('click', function() {
            window.admiral('targeting','force',{candidateIDs:['611d3769d653c12094369623','611d3769d653c12094369626']})
        })
    })
}
window.onload = setupSite();