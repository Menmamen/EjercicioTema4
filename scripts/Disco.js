"use strict";

import { Autor } from "./Autor.js";
import { Coleccion } from "./Coleccion.js";
//Clase disco

export class Disco {
    constructor(nombre, autor, fechaPublicacion, tipo, estado, coleccion) {
        let estadosValidos = ["prestado", "disponible"];
        try {
            if (estadosValidos.includes(estado)) {
                if (!(autor instanceof Autor)) {
                    throw new Error('El autor debe ser una instancia de la clase Autor');
                } else {
                    this.nombre = nombre;
                    this.autor = autor;
                    this.fechaPublicacion = new Date(fechaPublicacion);
                    this.tipo = tipo;
                    this.estado = estado;
                    this.localizacion = "";
                    // Agregar automáticamente este disco a la lista de discos del autor
                    coleccion.agregarDisco(this);
                    autor.asignarDisco(this);
                }
            } else {
                throw new Error('El estado del disco no es válido');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    toString() {
        return `- Disco: ${this.nombre}, Autor: ${this.autor.nombre}, Fecha Publicación: ${this.fechaPublicacion.toLocaleDateString()}, Tipo: ${this.tipo}, Estado: ${this.estado}, Localización: ${this.localizacion}\n`;
    }


    prestar() {
        if (this.estado === 'disponible') {
            this.estado = 'prestado';
            return true;
        } else {
            console.log('El disco ya está prestado.');
            return false;
        }
    }

    devolver() {
        this.estado = 'disponible';
    }

}
