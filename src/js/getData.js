function getData(calback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/data/products.json')
    xhr.send();
    xhr.addEventListener('load', () => {
        let data = JSON.parse(xhr.response);
        calback();
    });
};

export default getData