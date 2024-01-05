async function cartPage (){
    await renderPage('../src/views/cart.hbs', "cart", data, () => {
        $("#cart_close").on('click', () => {
            $("#cart").empty();
        });
    });
};