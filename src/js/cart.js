export const cart = {
    items: [],

    catalogue: [],

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

    increase(id) {
        this.items = this.items.map((it) => {
            if(id == it.id) {
                return {
                    ...it,
                    count: it.count + 1
                }
            } else {
                return it
            }
        })
    },

    decrease(id) {
        this.items = this.items
            .map((it) => {
                if(id == it.id) {
                    return {
                        ...it,
                        count: it.count - 1
                    }
                } else {
                    return it
                }
            })
            .filter((it) => it.count > 0 );
    },

    remove(id) {
        this.items = this.items.filter((it) => it.id != id);
    },

    json(){
        return this.items.map((it) => {
            const itCatalogue = this.catalogue.find((itCat) => itCat.id == it.id);

            return {
                ...itCatalogue,
                ...it,
                ...{total: itCatalogue.precio * it.count}
            };
        });
    },

    total(){
        return this.json().reduce((prev, curr) => prev + curr.total , 0);
    }
};