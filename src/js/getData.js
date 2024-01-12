import cachedData from "./cachedData.js";

export async function getData(url){
    const response = await cachedData(url);
    let data = await JSON.parse(response);
    return data;
};