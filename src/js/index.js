let data = [];

function render (url, id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const template = Handlebars.compile(xhr.response);
        $("#" + id).empty();
        $("#" + id).append(template({data}));
    });
};

function getData () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/data/products.json')
    xhr.send();
    xhr.addEventListener('load', () => {
        data = JSON.parse(xhr.response);
        render('../src/views/products.hbs', "products");
    });
};

$("#search_order").on("change", (e) => {
    switch (e.target.value) {
        case 'mayorPrecio':
            data = data.sort((a, b) =>
                Number(a.precio) < Number(b.precio) ? 1 : -1
            )
            break;
        case 'menorPrecio':
            data = data.sort((a, b) =>
                Number(a.precio) > Number(b.precio) ? 1 : -1
            )
            break;
    };
    render('../src/views/products.hbs', "products");
});

$("#search_submit").on("click", (e) => {
    e.preventDefault();
    const searchName = $("#search_name").val().toLocaleLowerCase();
    data = data.filter((item) => item.nombre.toLocaleLowerCase() == searchName);
    render('../src/views/products.hbs', "products");
});

$(function(){
    render('../src/views/products.hbs', "products");
    getData();
});
