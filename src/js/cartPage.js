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
    });
};