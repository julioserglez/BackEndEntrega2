document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // conexión con el servidor

    // Actualizar la lista de productos en tiempo real
    socket.on('productos', (productos) => {
        const lista = document.getElementById('lista-productos');
        lista.innerHTML = '';
        console.log(productos);
        productos.forEach(prod => {
            const li = document.createElement('li');
            li.classList.add('contenedor-producto');
            li.innerHTML = `<strong>${prod.name}</strong> - $${prod.price} | ${prod.description}
                <button class="eliminar" data-id="${prod.id}">Eliminar</button>`;
            lista.appendChild(li);
        });
    });

    // Manejo del formulario de agregar producto
    const formAgregar = document.getElementById('form-agregar');
    formAgregar.addEventListener('submit', evt => {
        evt.preventDefault();
        const data = {
            name: formAgregar.nombre.value.trim(),
            description: formAgregar.descripcion.value.trim(),
            price: parseFloat(formAgregar.precio.value)
        };
        socket.emit('agregarProducto', data);
        formAgregar.reset();
    });

    // Manejo de eliminación
    document.getElementById('lista-productos').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('eliminar')) {
            const id = evt.target.dataset.id;
            socket.emit('eliminarProducto', id);
        }
    });
});
