async function articlePage (){
    const search = new URLSearchParams(location.search);

    if (search.get('id') == null) {
        navigate('/');
        return;
    }

    const data = data.find((item) => item.id == search.get('id'));

    await renderPage('../views/article.hbs', data);
};