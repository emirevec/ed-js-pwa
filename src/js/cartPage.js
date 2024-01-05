async function cartPage (){
    await renderPage('../src/views/cart.hbs', "cart", cart.catalogue, () => {
        $("#cart_close").on('click', () => {
            $("#cart").empty();
        });
    });
};