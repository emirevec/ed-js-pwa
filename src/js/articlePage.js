async function articlePage (){
    const search = new URLSearchParams(location.search);

    if (search.get('id') == null) {
        navigate('/');
        return;
    }

    const data = await getData("https://6596bb636bb4ec36ca033d52.mockapi.io/articles/"+search.get('id'));

    await renderPage('../src/views/article.hbs', "article", {data}, () => {
        $("#article_close").on('click', () => {
            $("#article").empty();
        });
        
        $("#article_submit").on('click', () => {
            cart.add();
            navigate(`/cart`);
            setTimeout(() => { 
                $("#cart_slide").removeClass("translate-x-full").addClass("translate-x-0");
                $("#cart_opacity").removeClass("opacity-0").addClass("opacity-100");
            }, 250);
            $("#article").empty();
        });
    });
};