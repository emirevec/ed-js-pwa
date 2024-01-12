import { navigate } from './navigate.js';
import { getData } from './getData.js';
import { renderApp } from './renderApp.js';
import { cart } from './cart.js'

$(window).on('popstate', () => {
    navigate(location.pathname)
});

function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../../sw.js')
            .then(reg => {
                console.log("El sw se registró.", reg);

                Notification.requestPermission((res) => {
                    if ( res === 'granted') {
                        navigator.serviceWorker.ready.then((res) => {
                        })
                    }
                });
            })
            .catch(err => {
                console.log("Error al registrar sw.", err)
            });

    } else {
        console.error("serviceWorker no está disponible");
    };
};

$(function () {
    if(window.caches) {
        registrarServiceWorker();
    }else{ 
        console.warn("Bypass", method, url);
    };
    
    getData("https://6596bb636bb4ec36ca033d52.mockapi.io/articles")
        .then(v => {
            cart.catalogue = v;
            renderApp();
        });
});
