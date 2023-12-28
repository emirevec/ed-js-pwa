function render (url, id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const template = Handlebars.compile(xhr.response);
        $("#" + id).append(template);
    })
}

$(function(){
    render('../src/views/form.hbs', "form");
    render('../src/views/products.hbs', "products");
});
