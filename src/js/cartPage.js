import { renderPage } from './renderPage.js';
import { navigate } from './navigate.js';
import { cart } from './cart.js'

export default async function cartPage (){
    await renderPage('../src/views/cart.hbs', "cart", {
        items: cart.json(),
        total: cart.total()
    }, () => {
        $("#cart_close").on('click', () => {
            $("#cart_slide").removeClass("translate-x-0").addClass("translate-x-full");
            $("#cart_opacity").removeClass("opacity-100").addClass("opacity-0");
            setTimeout(() => {$("#cart").empty()}, 250);
            navigate('/')
        });

        $(".cart_remove_id").on('click', (e)=> {
            console.log(e.target.id);
            console.log(cart.json());

            if (cart.json().length == 1) {
                cart.remove(e.target.id);
                $("#cart_slide").removeClass("translate-x-0").addClass("translate-x-full");
                $("#cart_opacity").removeClass("opacity-100").addClass("opacity-0");
                setTimeout(() => {$("#cart").empty()}, 250);
                navigate('/');
            }else{
                $(`#${e.target.id}`).closest("#cart_li").remove();
            };
        });
    });
};