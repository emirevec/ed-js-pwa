async function articlePage (){
    const search = new URLSearchParams(location.search);

    if (search.get('id') == null) {
        navigate('/');
        return;
    }

    const data = await getData("https://6596bb636bb4ec36ca033d52.mockapi.io/articles/"+search.get('id'));

    await renderPage('../src/views/article.hbs', {data}, () => {
        return;
    });
};