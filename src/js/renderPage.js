function renderPage(data, callback){
    $.ajax({
        url: '../src/views/app.hbs',
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


