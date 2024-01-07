const cart = {
    catalogue: [],
    items: [],

    add(newId) {
        let currentCart = this.items;

        let exist = this.items.find((it) => it.id == newId);
        
        if (exist) {
            currentCart = currentCart.map((currentItem) => {
                if (currentItem.id == newId ) {
                    return {
                        ...currentItem,
                        count: currentItem.count + 1
                    };
                } else {
                    return currentItem;
                };
            });
        } else {
            currentCart.push({id: newId, count: 1});
        };
            
        this.items = currentCart
    },

    /* add listo.
    increase
    remove 
    decrease */

    json(){
        return this.items.map((it) => {
            const itCatalogue = this.catalogue.find((itCat) => itCat.id == it.id);

            return {
                ...itCatalogue,
                ...it,
                ...{total: itCatalogue.precio * 4}
            };
        });
    },

    
};