const express = require('express');
const handlebars = require("express-handlebars");
const http = require('http');
const productRoutes = require('./routes/productsRoutes');
const ProductManager = require('./managers/productsManager');
const path = require("path");
const app = express();
const server = http.createServer(app);

//* Server io
const { Server } = require("socket.io");
const io = new Server(server);

//* SETEO handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//*Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//*Rutas de vistas
app.use('/', productRoutes);

// Integración Socket.IO
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Enviar la lista inicial
    socket.emit('productos', ProductManager.getAll());

    // Agregar nuevo producto
    socket.on('agregarProducto', async (producto) => {
        const nuevoProducto = await ProductManager.add(producto);
        io.emit('productos', ProductManager.getAll());
    });

    // Eliminar un producto
    socket.on('eliminarProducto', async (id) => {
        await ProductManager.removeById(id);
        io.emit('productos', ProductManager.getAll());
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

module.exports = server;