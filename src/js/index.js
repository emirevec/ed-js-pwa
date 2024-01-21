import { navigate } from './navigate.js';
import { getData } from './getData.js';
import { renderApp } from './renderApp.js';
import { cart } from './cart.js'



const applicationServerPublicKey = 'BPTljA0cWi4YHPeaj2MAI_5VPtPhhMMSLw9Z_ZG5QDKfxhFPc-8ZSvXx_B_BAjA07zE4wOpwScnIBiyfztrr2Vo'
let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    };

    return outputArray;
};

function updateBtn() {
    if (isSubscribed) {
        $(".push_st").text("Turn OFF push notifications.");
    } else {
        $(".push_st").text("Turn ON push notifications.");
    };

    $("#push_btn").prop("disable", false);
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed:', subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn();
        });
};

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            };
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function () {
            console.log('User is unsubscribed.');
            isSubscribed = false;
            updateBtn();
        });
};

function initialiseUI(reg) {
    swRegistration = reg
    setTimeout(()=>{
        $("#push_btn").on('click', () => {
            $("#push_btn").prop("disable", true);
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        })},2000);

    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            };

            updateBtn();
        });
};

function registrarServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('../sw.js')
            .then(reg => {
                console.log("The sw was registered.", reg);
                
                initialiseUI(reg);
                
                Notification.requestPermission((res) => {
                    if ( res === 'granted') {
                        navigator.serviceWorker.ready.then((res) => {
                        console.warn(res);
                        });
                    } else {
                        console.warn("Push notification denied")
                    };
                });
            })
            .catch(err => {
                console.log("Fail to register sw.", err)
            });
                
    } else {
        console.error("Sw, pushManager or both is/are not available");
    };
};

$(window).on('popstate', () => {
    navigate(location.pathname)
});

$(function () {
    getData("https://6596bb636bb4ec36ca033d52.mockapi.io/articles")
    .then(v => {
        cart.catalogue = v;
        renderApp();
    });
    
    /* if(window.caches) {
        registrarServiceWorker();
    }else{ 
        console.warn("Window does not accept caches");
    }; */
});
    