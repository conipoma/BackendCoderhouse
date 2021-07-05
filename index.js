class Archivo {
    
    fs = require('fs');

    constructor(file){
        this.file = file;
        this.encode = 'utf-8';
    };
    
    async read(){
        try {
            let data = await this.fs.promises.readFile(`./${this.file}`, this.encode);
            return JSON.parse(data);
        } catch {
            console.log("archivo vacio");
            return [];
        }
    };
    
    async save(newProduct) {
        const data = await this.read();
        newProduct.id = data.lenght +1;
        data.push(newProduct);
        try {
            await this.fs.promises.writeFile(this.file, JSON.stringify(data, null, '\t'));
        } catch(err) {
            console.log('El archivo no se pudo guardar', err);
        }
    }

    async erase() {
        try{
            await this.fs.promises.unlink(`./${this.file}`);
        } catch(err){
            console.log('No se pudo borrar el archivo', err);
        }
    }

}

// Crear producto
class Producto {
    constructor(title, price, thumbnail) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    };
}

const test = async () => {
    const newItem1 = new Producto('Lápiz', 250.59, 'url1');
    const newItem2 = new Producto('Goma', 79.99, 'url2');

    const rutaArchivo = new Archivo('productos.txt');

    await rutaArchivo.save(newItem1);
    await rutaArchivo.save(newItem2);

    // await rutaArchivo.erase();
}

test();
