import fs from 'fs/promises';
import { randomUUID } from 'crypto';

class ProductManager{

    constructor(ruta){

        this.ruta = ruta;
        this.products = []

    }

    async cargarProductos() {
        const json = await fs.readFile(this.ruta, 'utf-8');
        this.products = JSON.parse(json);
    }

    async addProduct(newProduct){

        const product = this.products.find((product) => product.code === newProduct.code)

        if(product){

            //console.log("El producto que quiere agregar ya existe en la Base de datos")

        }else{

            this.products.push(newProduct)

            console.log("El producto se creo exitosamente: ");
            console.log(newProduct);

            await this.guardarProductos();

        }              

    }

    async guardarProductos() {
        const json = await JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.ruta, json);
    }

    getProductById(id){

        const product = this.products.find((product) => product.id === id);

        if(product){

            console.log("El producto solicitado es: ", product);

        }else{

            console.log("El producto solicitado no existe");

        }

    }

}

class Product{

    constructor(title, description, price, thumbnail, code, stock, id ) {

        this.title = title;

        this.description = description;

        this.price = price;

        this.thumbnail = thumbnail;

        this.code = code;

        this.stock = stock;

        this.id = id;

    }

}

const products = new ProductManager('./archivos.txt');

await products.cargarProductos();

console.log("productos:")
console.log(products);

const product0 = new Product("NoteBookHP", "Intel I7", "270000", "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/monitor-gamer-27-benq-zowie-xl2731k-dark-grey-0.jpg", "4", "8", "4");

await products.addProduct(product0);

products.getProductById(1)
console.log("todos los productos: ")
console.log(products);