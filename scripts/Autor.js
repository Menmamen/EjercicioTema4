"use strict";
import { Disco } from "./Disco.js";
//Clase autor

export class Autor {
    constructor(nombre, fechaNacimiento) {
        this.nombre = nombre;
        this.fechaNacimiento = new Date(fechaNacimiento);
        this.discos = [];
    }

    //Metodo para agregar un disco al autor
    asignarDisco(disco) {
        this.discos.push(disco);
    }

    toString() {
        let autorInfo = `\nAutor: ${this.nombre}, Fecha de nacimiento: ${this.fechaNacimiento.toLocaleDateString()}, Discos:\n`;

        // Añadir los discos del autor, llamando al método toString de cada disco
        for (let disco of this.discos) {
            autorInfo += `  ${disco.toString()}`;  // Llamar al toString() de cada disco para mostrar la información detallada
        }
    
        return autorInfo;    }

}