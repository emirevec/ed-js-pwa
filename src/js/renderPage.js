export async function renderPage (url, id, data, callback){
    const responseObject = await fetch(url);
    const response = await responseObject.text();
    $("#"+id).html(Handlebars.compile(response)( data ));
    callback();
};