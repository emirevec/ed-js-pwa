export default async function cachedData(url) {
    const cachedId = `cache-${url}`;
    const cacheData = localStorage.getItem(cachedId);

    if (cacheData){
        return cacheData;
    } else{ 
        const res = await fetch(url);
        const response = await res.text();
        localStorage.setItem(cachedId, response);
        return response;
    };
};