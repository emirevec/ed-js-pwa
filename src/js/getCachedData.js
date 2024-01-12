export default async function getCachedData(url) {
    const cachedId = `cache-${url}`;
    //Crea un id en base a la url recibida.
    const cacheData = localStorage.getItem(cachedId);
    //Busca con el id anterior contenido en localStorage y lo gurada en la variable

    if (cacheData){
        return cacheData;
        //De haber contenido en la variable la retorna.
    } else{ 
        const res = await fetch(url);
        const response = await res.text();
        //Hace una petición a la url y la guarda.
        
        localStorage.setItem(cachedId, response);
        //Guarda en el localStorage bajo el id creado, el contenido recibido de la petición.
        return response;
        //retorna la info en formato texto (luego get data el aplica el metodo json())
    };
};