import getCachedData from "./getCachedData.js";

export async function getData(url){
    const response = await getCachedData(url);
    let data = await JSON.parse(response);
    return data;
};