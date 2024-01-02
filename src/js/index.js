let data = [];

function renderApp() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/views/app.hbs');
    xhr.send();
    xhr.addEventListener('load', () => {
        const template = Handlebars.compile(xhr.response);
        $("#app").empty();
        $("#app").append(template({ data }));
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
            renderApp();
        });
        $("#search_submit").on("click", (e) => {
            e.preventDefault();
            const searchName = $("#search_name").val().toLocaleLowerCase();
            data = data.filter((item) => item.nombre.toLocaleLowerCase() == searchName);
            renderApp();
        });
    });
};

function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/data/products.json')
    xhr.send();
    xhr.addEventListener('load', () => {
        data = JSON.parse(xhr.response);
        renderApp();
    });
};

$(function () {
    renderApp();
    getData();
});