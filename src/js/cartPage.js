async function cartPage (){
    const data = {
        items: cart.json(),
        total: cart.total()
    }
    console.log(data);
    await renderPage('../src/views/cart.hbs', "cart", data, () => {
        $("#cart_close").on('click', () => {
            $("#cart_slide").removeClass("translate-x-0").addClass("translate-x-full");
            $("#cart_opacity").removeClass("opacity-100").addClass("opacity-0");
            setTimeout(() => {$("#cart").empty()}, 250);
            navigate('/')
        });
    });
};