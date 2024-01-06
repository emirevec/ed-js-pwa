const cart = {
    catalogue: [],
    items: [],

    add(newId) {
        console.log(newId);
        console.log("Estos son los items que ya estaban en cart. this.items:")
        console.log(this.items);

        let newCart = this.items;
        console.log("Agruega los items que ya existen en cart, a un newCart. newCart:");
        console.log(newCart);
        
        const exist = this.items.find((it) => it.id == newId);
        console.log("Si el nuevo item a agregar ya existía en cart, exist será 'true' sino 'undefined'");
        console.log(exist);

        if(!exist) {
            console.log("Como el nuevo item a agregar, NO estaba en cart, le agrega el nuevo item");
            newCart.push(this.catalogue.filter((it) => it.id == newId));
            console.log(newCart);
        } else {
            newCart = newCart.map((item) => { 
                if (item.id == newId) 
                    return {
                        ...item,
                        conut: item.count + 1
                    };
                else return item;
            });
            console.log("Como el nuevo item a agregar, ya estaba en cart, le agrega ese item en particular +1 al count")
        };

        this.items = newCart;
        console.log("Estos son los items que quedan en this.items:")
        console.log(this.items);
        },

    
    /* add {this.items = this.catalogue.filter((it)=> it.id == 4)}, 
    increase
    remove 
    decrease */

    json(){
        return this.items.map((it) => {
            const itCatalogue = this.catalogue.find((itCat) => itCat.id == it.id);

            return {
                ...it,
                ...{total: itCatalogue.precio * 4}
            };
        });
    },

    
};