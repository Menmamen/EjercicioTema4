"use strict";
import { Disco } from "./Disco.js";
//Clase Colección

export class Coleccion {
    constructor() {
        this.estanterias = [[]];
    }

    agregarDisco(disco) {
        let ultimaEstanteria = this.estanterias[this.estanterias.length - 1];
        if (ultimaEstanteria.length >= 10) {
            ultimaEstanteria = [];
            this.estanterias.push(ultimaEstanteria);
        }
        ultimaEstanteria.push(disco);
        disco.localizacion = `Estantería ${this.estanterias.length}, Posición ${ultimaEstanteria.length}`;
    }

    listarEstanterias() {
        let coleccionCompleta = "\n";
        //Devuelvo la lista de todas las estanterías
        for(let i= 0; i < this.estanterias.length; i++) {
            coleccionCompleta += `\nEstantería ${i+1}:\n`;
            for(let disco of this.estanterias[i]) {
                coleccionCompleta += `${disco}`;
            }
        }

        return coleccionCompleta;
    }

    listarPorTipo() {
        //Creo un array solo de todas las estanterías
        const todosLosDiscos = this.estanterias.flat();
        //Ordeno por tipo de música utilizando sort para ordenar y localeCompare para comparar las cadenas.
        const discosOrdenados = todosLosDiscos.sort((a, b) => a.tipo.localeCompare(b.tipo));
        //Devuelvo la lista ordenada de discos
        return discosOrdenados;

    };

    eliminarDisco(disco) {
        //Busco el disco en cada estantería y lo elimino si lo encuentro
        let borrado = false;
        for (let estanteria of this.estanterias) {
            const index = estanteria.indexOf(disco);
            if (index > -1) {
                estanteria.splice(index, 1);
                //No dejo que salga del bucle al borrar por si el disco estuviese por error en más de una estantería
                borrado = true;
            }
        }
        if(borrado){
            alert("El disco se ha borrado adecuadamente");
        }else{
            alert("El disco no se ha encontrado en la colección");
        }
    }
}