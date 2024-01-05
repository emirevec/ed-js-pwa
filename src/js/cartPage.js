async function cartPage (){
    const data = cart.json();
    await renderPage('../src/views/cart.hbs', "cart", data, () => {
        $("#cart_close").on('click', () => {
            $("#cart_slide").removeClass("translate-x-0").addClass("translate-x-full");
            $("#cart_opacity").removeClass("opacity-100").addClass("opacity-0");
            setTimeout(() => {$("#cart").empty()}, 250);
        });
    });
};