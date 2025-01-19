/* Carmen Montalvo Luque */
/* He incluido todos los métodos dentro de la clase exportada para que se exporten a la vez y no haya conflicto
al acceder a los atributos de la clase */

"use strict";
import { Disco } from "./Disco.js";
//Clase Colección: no necesita pasar datos para crearla, se genera automáticamente un array de arrays vacío
//Tiene un método que añade discos a la colección, dos para listar la colección y uno para borrar discos de la coleccion

export class Coleccion {
    constructor() {
        this.estanterias = [[]];
    }

    //Método para añadir discos a la colección
    agregarDisco(disco) {
        //Compruebo que disco sea una instancia de la clase disco
        try {
            if (!(disco instanceof Disco)) {
                throw new Error('El parámetro debe ser una instancia de la clase Disco');
            } else {
                //Si es una instancia, lo añado a la colección
                //Compruebo si la estantería actual está llena (10 elementos)
                let ultimaEstanteria = this.estanterias[this.estanterias.length - 1];
                if (ultimaEstanteria.length >= 10) {
                    //Si está llena creo una vacía y la añado a las estanterías
                    ultimaEstanteria = [];
                    this.estanterias.push(ultimaEstanteria);
                }
                //Añado el disco a la última estantería y actualizo la localización
                ultimaEstanteria.push(disco);
                disco.localizacion = `Estantería ${this.estanterias.length}, Posición ${ultimaEstanteria.length}`;
            }

        } catch (error) {
            alert(error.message);
        }

    }

    //Método para listar la coleccion completa por estanterías
    listarEstanterias() {
        //Creo un string y voy recorriendo y añadiendo las estanterías al string
        let coleccionCompleta = "\n";
        for (let i = 0; i < this.estanterias.length; i++) {
            coleccionCompleta += `\nEstantería ${i + 1}:\n`;
            for (let disco of this.estanterias[i]) {
                coleccionCompleta += `${disco}`;
            }
        }
        //Devuelvo el string de todas las estanterías
        return coleccionCompleta;
    }

    //Método para listar la colección por tipo de música
    listarPorTipo() {
        //Creo un array solo de todas las estanterías
        const todosLosDiscos = this.estanterias.flat();
        //Ordeno por tipo de música utilizando sort para ordenar y localeCompare para comparar las cadenas.
        //Al usar esto, me ordena alfabéticamente por tipo de música.
        const discosOrdenados = todosLosDiscos.sort((a, b) => a.tipo.localeCompare(b.tipo));
        //Recorro el array y los añado a un String con el formato que quiero
        let stringDiscos = "";
        for (let disco of discosOrdenados) {
            stringDiscos += `${disco}`;
        }
        //Devuelvo la lista ordenada de discos
        return stringDiscos;

    };

    //Método para eliminar un disco de la colección
    eliminarDisco(disco) {
        //Busco el disco en cada estantería y lo elimino si lo encuentro, controlo si se borra con un booleano
        let borrado = false;
        for (let estanteria of this.estanterias) {
            const index = estanteria.indexOf(disco);
            if (index > -1) {
                estanteria.splice(index, 1);
                //No dejo que salga del bucle al borrar por si el disco estuviese por error en más de una estantería
                borrado = true;
            }
        }
        if (borrado) {
            alert("El disco se ha borrado adecuadamente");
        } else {
            alert("El disco no se ha encontrado en la colección");
        }
    }
}