function renderPage(url, data, callback){
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'html'
        })
        .done(function(response){
            const template = Handlebars.compile(response);
            $("#app").empty();
            $("#app").append(template({ data }));
            callback();
    });
}

export default renderPage


