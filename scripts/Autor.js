/* Carmen Montalvo Luque */
/* He incluido todos los métodos dentro de la clase exportada para que se exporten a la vez y no haya conflicto
al acceder a los atributos de la clase */

"use strict";
//Importo la clase disco para comprobar luego el formato de los discos añadidos
import { Disco } from "./Disco.js";

//Clase autor, solo es necesario introducir nombre y fecha para crearlo, tiene un método ToString y 
//un método para añadir discos del autor

export class Autor {
    constructor(nombre, fechaNacimiento) {
        try {
            // Validar fechaNacimiento
            if (new Date() < new Date(fechaNacimiento)) {
                throw new Error('La fecha de nacimiento no puede ser posterior a la fecha actual');
            }
            //Asigno los valores despues de la validación 
            this.nombre = nombre;
            this.fechaNacimiento = new Date(fechaNacimiento);
            //Creo una array de discos vacío para el autor
            this.discos = [];
        } catch (error) {
            alert(error.message);
        }

    }

    //Metodo para agregar un disco al autor
    asignarDisco(disco) {
        //Compruebo que el disco introducido sea una instancia de la clase disco
        if (!(disco instanceof Disco)) {
            throw new Error('El disco debe ser una instancia de la clase Disco');
        } else {
            //Si el disco es válido, lo añado al array de discos del autor
            this.discos.push(disco);
        }
    }

    //ToString para dar formato automáticamente al llamar a un autor
    toString() {
        let autorInfo = `\nAutor: ${this.nombre}, Fecha de nacimiento: ${this.fechaNacimiento.toLocaleDateString()}, Discos:\n`;

        // Añadir los discos del autor, llamando al método toString de cada disco
        for (let disco of this.discos) {
            autorInfo += `  ${disco.toString()}`;  // Llamar al toString() de cada disco para mostrar la información detallada
        }

        return autorInfo;
    }

}