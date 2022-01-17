const express = require("express");
const fs = require("fs");

const app = express();
let PORT = 8080 || process.env.PORT;

// let productos = ["lentes ", "casco ", "jean ", "zapatos "];

// let random = Math.floor(Math.random() * productos.length);
// console.log(random);
// let randomValue = productos[random];
// console.log(randomValue);

class Contenedor {
  productos = [];

  constructor(productos) {
    this.productos = productos;
  }

  escribirTXT() {
    try {
      const objetJson = JSON.stringify(this.productos);
      fs.writeFileSync("productos.txt", objetJson);
    } catch (err) {
      throw new Error(`Error en escritura: ${err.message}`);
    }
  }

  leerArray() {
    try {
      const leer = fs.readFileSync("productos.txt", "utf-8");
      console.log(leer);
      return leer;
    } catch (err) {
      throw new Erro(`Erro en lectura: ${err.message}`);
    }
  }

  leerArrayRandom() {
    try {
      let leerAleatorio = fs.readFileSync("productos.txt", "utf-8");
      let archivoRandom = JSON.parse(leerAleatorio);
      let random = Math.floor(Math.random() * archivoRandom.length);
      console.log(random);
      let randomValue = archivoRandom[random];
      console.log(randomValue);
      return randomValue;
    } catch (err) {
      throw new Erro(`Erro en lectura ramdom: ${err.message}`);
    }
    // let random = Math.floor(Math.random() * this.productos.length);
    // console.log(random);
    // let randomValue = this.productos[random];
    // console.log(randomValue);
    // return randomValue;
  }
}

// const NuevaLista = new Contenedor([
//   "Ironman",
//   "Spiderman",
//   "Batman",
//   "Capitan America",
//   "Superman",
// ]);
const NuevaLista = new Contenedor([
  "Ironman",
  "Spiderman",
  "Batman",
  "Capitan America",
  "Superman",
]);
NuevaLista.escribirTXT();
NuevaLista.leerArray();
NuevaLista.leerArrayRandom();

app.get("/", function (req, res) {
  res.send("<h1>LISTADO DE PRODUCTOS<h1>");
});

app.get("/productos", function (req, res) {
  res.send(`Listado de productos: ${NuevaLista.leerArray()}`);
});

app.get("/productosRamdom", function (req, res) {
  res.send(`El producto aleatorio es: ${NuevaLista.leerArrayRandom()}`);
});

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
