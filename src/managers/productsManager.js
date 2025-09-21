const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

function leerProductos() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function guardarProductos(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    getAll: () => leerProductos(),
    add: ({ name, description, price }) => {
        let productos = leerProductos();
        const nuevo = {
            id: productos.length ? productos[productos.length - 1].id + 1 : 1,
            name,  price, description
        };
        productos.push(nuevo);
        guardarProductos(productos);
        return nuevo;
    },
    removeById: (id) => {
        let productos = leerProductos();
        productos = productos.filter(prod => String(prod.id) !== String(id));
        guardarProductos(productos);
    }
}
