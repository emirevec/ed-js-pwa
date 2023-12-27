function renderPage (url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const form = Handlebars.compile(xhr.response);
        $("#app").append(form);
    })
}