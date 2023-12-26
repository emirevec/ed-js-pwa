function renderPage (url, onLoad = null) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const form = Handlebars.compile(xhr.response);
        $("#app").append(form);
    })
}


/* import formview from "../views/form.hbs"

const form = Handlebars.compile(formview);

$("#app").append(form);
 */