/* Carmen Montalvo Luque */
/* He incluido todos los métodos dentro de la clase exportada para que se exporten a la vez y no haya conflicto
al acceder a los atributos de la clase */

"use strict";
//Importo las otras clases 

import { Autor } from "./Autor.js";
import { Coleccion } from "./Coleccion.js";

//Clase disco: para crearlo se necesitan el nombre, autor, fecha, tipo de musica, estado y la colección 
//a la que se va a agregar el disco. Tiene un metodo ToString, uno para prestar y uno para devolver.

/* Antes de crearlo he comprobado en el constructor: 
1. Que el estado introducido sea válido (prestado o disponible).
2. Que el autor introducido sea una instancia de la clase Autor.
3. Que la fecha de publicación sea anterior a la fecha actual.
4. Que el autor no pueda nacer antes de la fecha de publicación.
5. Que la coleccion sea una instancia de la clase Coleccion.

Si se produce alguna de estas excepciones, se muestra un alert con el mensaje de error correspondiente.
Si no, se crea el objeto disco y se agrega automáticamente al autor y a la colección.
 */

export class Disco {
    constructor(nombre, autor, fechaPublicacion, tipo, estado, coleccion) {
        //Defino los estado válidos para el disco
        let estadosValidos = ["prestado", "disponible"];
        try {
            // Validar estado
            if (!estadosValidos.includes(estado)) {
                throw new Error('El estado del disco no es válido');
            }

            // Validar autor
            if (!(autor instanceof Autor)) {
                throw new Error('El autor debe ser una instancia de la clase Autor');
            }

            // Validar fechaPublicacion
            if (new Date() < new Date(fechaPublicacion)) {
                throw new Error('La fecha de publicación no puede ser posterior a la fecha actual');
            }

            // Validar fecha de nacimiento
            if (autor.fechaNacimiento > new Date(fechaPublicacion)) {
                throw new Error('El autor no puede nacer después de la fecha de publicación');
            }

            // Validar coleccion
            if (!(coleccion instanceof Coleccion)) {
                throw new Error('La colección debe ser una instancia de la clase Coleccion');
            }

            // Assignar los valores despues de las validaciones 
            this.nombre = nombre;
            this.autor = autor;
            this.fechaPublicacion = new Date(fechaPublicacion);
            this.tipo = tipo;
            this.estado = estado;
            this.localizacion = ""; //Dejo la localización vacía porque el valor se asigna al añadirlo a la coleccion

            // añado el disco a la colección y a la lista de discos de su autor
            coleccion.agregarDisco(this);
            autor.asignarDisco(this);
        } catch (error) {
            alert(error.message);
        }
    }


    //ToString para dar formato automáticamente al llamar a un disco
    toString() {
        return `- Disco: ${this.nombre}, Autor: ${this.autor.nombre}, Fecha Publicación: ${this.fechaPublicacion.toLocaleDateString()}, Tipo: ${this.tipo}, Estado: ${this.estado}, Localización: ${this.localizacion}\n`;
    }


    //Método para prestar discos
    prestar() {
        if (this.estado === 'disponible') {
            this.estado = 'prestado';
            return true;
        } else {
            return false;
        }
    }

    //Aunque el enunciado no lo pedía, he hecho un método para devolver los discos
    devolver() {
        if (this.estado === 'prestado') {
            this.estado = 'disponible';
            return true;
        } else {
            return false;
        }
    }

}
