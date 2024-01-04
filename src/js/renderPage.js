async function renderPage (url, data, callback){
    const responseObject = await fetch(url);
    const response = await responseObject.text();
    $("#app").html(Handlebars.compile(response)({ data }));
    callback();
};