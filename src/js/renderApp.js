async function renderApp() {
    const params = new URLSearchParams(location.search);
    let dat = data;

    if (params.get('q')) {
        dat = dat.filter((item) => item.nombre.toLocaleLowerCase().includes(params.get('q').toLocaleLowerCase()));
    };

    if (params.get('s')) {
        switch (params.get('s')) {
            case 'mayorPrecio':
                dat = dat.sort((a, b) =>
                    Number(a.precio) < Number(b.precio) ? 1 : -1
                )
                break;
            case 'menorPrecio':
                dat = dat.sort((a, b) =>
                    Number(a.precio) > Number(b.precio) ? 1 : -1
                )
                break;
        };
    };

    await renderPage('../src/views/app.hbs', "app" , dat, () => {
        $('.article-list .article').each((_, item) => {
            $(item).on('click', () => {
                navigate(`/article?id=${item.dataset.id}`);
            });
        });
        
        $("#search").on("submit", (e) => {
            e.preventDefault();
            const searchName = $("#search_name").val();
            const searchOrder = $("#search_order").val();
            navigate(`/?q=${searchName}&s=${searchOrder}`);
        });
    });
};