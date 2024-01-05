async function cartPage (){
    await renderPage('../src/views/cart.hbs', "cart",_ , () => {
        $("#cart_close").on('click', () => {
            $("#cart").empty();
        });
    });
};