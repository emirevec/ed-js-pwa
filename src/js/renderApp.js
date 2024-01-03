import renderPage from "./renderPage.js";

function renderApp(data) {
    const params = new URLSearchParams(location.search);

    if (params.get('q')) {
        data = data.filter((item) => item.nombre.toLocaleLowerCase().includes(params.get('q').toLocaleLowerCase()));
    };

    if (params.get('s')) {
        switch (params.get('s')) {
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
    };

    renderPage('../src/views/app.hbs', data, () => {
        $("#search").on("submit", (e) => {
            e.preventDefault();
            const searchName = $("#search_name").val();
            const searchOrder = $("#search_order").val();
            history.pushState({}, '', `/?q=${searchName}&s=${searchOrder}`);
            renderApp();
        });
    });
};

export default renderApp;