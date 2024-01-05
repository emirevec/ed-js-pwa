const cart = {
    catalogue: [],
    items: [],

    add() {this.items = this.catalogue.filter((it)=> it.id == 4)},
    /* add 
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