const data = {
    products: [
        {
            "nombre": "Unbranded Cotton Shoes",
            "descripcion": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
            "precio": "15.00",
            "urlImagen": "http://loremflickr.com/640/480/wear",
            "id": "4"
        },
        {
            "nombre": "Modern Frozen Chair",
            "descripcion": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
            "precio": "300.00",
            "urlImagen": "http://loremflickr.com/640/480/Keyboard",
            "id": "5"
        },
        {
            "nombre": "Oriental Rubber Car",
            "descripcion": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
            "precio": "80.00",
            "urlImagen": "http://loremflickr.com/640/480/Maple",
            "id": "6"
        },
        {
            "nombre": "Awesome Plastic Bacon",
            "descripcion": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
            "precio": "144.00",
            "urlImagen": "http://loremflickr.com/640/480/shoes",
            "id": "7"
        },
        {
            "nombre": "Recycled Metal Ball",
            "descripcion": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
            "precio": "800.00",
            "urlImagen": "http://loremflickr.com/640/480/automobile",
            "id": "8"
        },
        {
            "nombre": "Handcrafted Concrete Towels",
            "descripcion": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
            "precio": "605.00",
            "urlImagen": "http://loremflickr.com/640/480/Towels",
            "id": "9"
        },
        {
            "nombre": "Handmade Bronze Salad",
            "descripcion": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
            "precio": "566.00",
            "urlImagen": "http://loremflickr.com/640/480/bikes",
            "id": "11"
        },
        {
            "nombre": "Bespoke Bronze Keyboard",
            "descripcion": "The Football Is Good For Training And Recreational Purposes",
            "precio": "587.00",
            "urlImagen": "http://loremflickr.com/640/480/training",
            "id": "12"
        },
        {
            "nombre": "Awesome Cotton Gloves",
            "descripcion": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            "precio": "391.00",
            "urlImagen": "http://loremflickr.com/640/480/shirts",
            "id": "13"
        },
        {
            "nombre": "Handmade Concrete Bacon",
            "descripcion": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
            "precio": "306.00",
            "urlImagen": "http://loremflickr.com/640/480/Bacon",
            "id": "14"
        }
    ]
}
function render (url, id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const template = Handlebars.compile(xhr.response);
        $("#" + id).empty();
        $("#" + id).append(template(data));
    })
}

$("#search_order").on("change", (e) => {
    switch (e.target.value) {
        case 'mayorPrecio':
            data.products = data.products.sort((a, b) =>
                Number(a.precio) < Number(b.precio) ? 1 : -1
            )
            break;
        case 'menorPrecio':
            data.products = data.products.sort((a, b) =>
                Number(a.precio) > Number(b.precio) ? 1 : -1
            )
            break;
    }
    render('../src/views/products.hbs', "products");
});

$("#search_submit").on("click", (e) => {
    e.preventDefault();
    const searchName = $("#search_name").val().toLocaleLowerCase();
    data.products = data.products.nombre.filter((n) => n === searchName);
    console.log(searchName);
    console.log(data.products);
});

$(function(){
    render('../src/views/products.hbs', "products");
});
