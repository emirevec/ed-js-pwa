function registrarServiceWorker() {
    if ( 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
            .then(reg => {
                console.log("El sw se registró.", reg);
            })
            .catch(err => { 
                console.log("Error al registrar sw.", err)
            });
            
    } else {
        console.error("serviceWorker no está disponible");
    };
};