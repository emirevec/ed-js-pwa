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

        $(".cart_remove_item").on('click', (e)=> {            
            if (cart.json().length == 1) {
                cart.remove(e.target.id);
                $("#cart_slide").removeClass("translate-x-0").addClass("translate-x-full");
                $("#cart_opacity").removeClass("opacity-100").addClass("opacity-0");
                setTimeout(() => {$("#cart").empty()}, 250);
                navigate('/');
            }else{
                cart.remove(e.target.id);
                navigate('/cart');
                setTimeout(() => { 
                    $("#cart_slide").removeClass("translate-x-full").addClass("translate-x-0");
                    $("#cart_opacity").removeClass("opacity-0").addClass("opacity-100");
                }, 250);
            };
        });
        
        $(".cart_increase").on('click', (e) => {
            let id = $(e.target).closest('.cart_li').find('.cart_item_id').text().trim();
            cart.increase(id);
            navigate('/cart');
            setTimeout(() => { 
                $("#cart_slide").removeClass("translate-x-full").addClass("translate-x-0");
                $("#cart_opacity").removeClass("opacity-0").addClass("opacity-100");
            }, 250);
        });
        
        $(".cart_decrease").on('click', (e) => {
            let id = $(e.target).closest('.cart_li').find('.cart_item_id').text().trim();
            cart.decrease(id);        
            navigate('/cart');
            setTimeout(() => { 
                $("#cart_slide").removeClass("translate-x-full").addClass("translate-x-0");
                $("#cart_opacity").removeClass("opacity-0").addClass("opacity-100");
            }, 250);
        })
    });
};