import { renderPage } from './renderPage.js';
import { navigate } from './navigate.js';
import { cart } from './cart.js';

export async function renderApp() {
    const params = new URLSearchParams(location.search);
    let dat = cart.catalogue;

    if (params.get('q')) {
        dat = dat.filter((item) => item.nombre.toLocaleLowerCase().includes(params.get('q').toLocaleLowerCase()));
    };

    if (params.get('s')) {
        switch (params.get('s')) {
            case 'higherPrice':
                dat = dat.sort((a, b) =>
                    Number(a.precio) < Number(b.precio) ? 1 : -1
                )
                break;
            case 'lowerPrice':
                dat = dat.sort((a, b) =>
                    Number(a.precio) > Number(b.precio) ? 1 : -1
                )
                break;
        };
    };

    await renderPage('../src/views/app.hbs', "app" , { items: dat }, () => {
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

        $("#mobile-btn").on('click', ()=>{
            $("#mob-btn-op").toggleClass("block hidden");
            $("#mob-btn-cl").toggleClass("block hidden");
            $("#menu-extend").toggleClass("block hidden");
        });

        $(".nav_to_cart").on('click', ()=>{
            navigate('/cart');
            setTimeout(() => { 
                $("#cart_slide").toggleClass("translate-x-full translate-x-0");
                $("#cart_opacity").toggleClass("opacity-0 opacity-100");
            }, 250);
        });

        $("#user_btn").on('click',()=>{
            $("#user_menu").toggleClass("transform opacity-0 scale-95 transform opacity-100 scale-100");
        });

        $(".push_btn").on('click', ()=>{
            console.log("click en campana")
            $(".push_btn").toggleClass("bg-green-300 bg-green-700 ring-2 ring-green-500")
        });

    });
};