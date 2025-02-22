/* Carmen Montalvo Luque */
//He creado un archivo main.js para coordenar todas las funciones con el index.html

"use strict";

// Importar clases

import { Autor } from "./Autor.js";
import { Disco } from "./Disco.js";
import { Coleccion } from "./Coleccion.js";

//Inicializo un array de autores
let autores = [];

//Inicializo un array de discos
let discos = [];

//Inicializo la coleccion
let coleccion = new Coleccion();

//Función para precargar los discos
function precargarDiscos() {
    //Defino algunos autores 
    const autor1 = new Autor("The Beatles", "1960-01-01");
    const autor2 = new Autor("Pink Floyd", "1965-01-01");
    const autor3 = new Autor("Michael Jackson", "1958-08-29");
    const autor4 = new Autor("Adele", "1988-05-05");

    //Los añado al array de autores
    autores = [autor1, autor2, autor3, autor4];

    //Creo los discos con sus autores en la colección
    discos = [
        new Disco("Abbey Road", autor1, "1969-09-26", "rock", "disponible", coleccion),
        new Disco("The Dark Side of the Moon", autor2, "1973-03-01", "rock", "disponible", coleccion),
        new Disco("Thriller", autor3, "1982-11-30", "pop", "disponible", coleccion),
        new Disco("21", autor4, "2011-01-24", "pop", "disponible", coleccion),
        new Disco("Let It Be", autor1, "1970-05-08", "rock", "disponible", coleccion),
        new Disco("The Wall", autor2, "1979-11-30", "rock", "disponible", coleccion),
        new Disco("Bad", autor3, "1987-08-31", "pop", "disponible", coleccion),
        new Disco("25", autor4, "2015-11-20", "pop", "disponible", coleccion),
        new Disco("Revolver", autor1, "1966-08-05", "rock", "disponible", coleccion),
        new Disco("Wish You Were Here", autor2, "1975-09-12", "rock", "disponible", coleccion),
        new Disco("Off the Wall", autor3, "1979-08-10", "pop", "disponible", coleccion),
        new Disco("19", autor4, "2008-01-28", "pop", "disponible", coleccion),
        new Disco("Rubber Soul", autor1, "1965-12-03", "rock", "disponible", coleccion),
        new Disco("Animals", autor2, "1977-02-23", "rock", "disponible", coleccion),
        new Disco("Invincible", autor3, "2001-10-30", "pop", "disponible", coleccion),
        new Disco("The Greatest Hits", autor4, "2016-12-02", "pop", "disponible", coleccion),
        new Disco("Sgt. Pepper's Lonely Hearts Club Band", autor1, "1967-05-26", "rock", "disponible", coleccion),
        new Disco("The Division Bell", autor2, "1994-03-28", "rock", "disponible", coleccion),
        new Disco("HIStory", autor3, "1995-06-13", "pop", "disponible", coleccion),
        new Disco("Magical Mystery Tour", autor1, "1967-11-27", "rock", "disponible", coleccion)
    ];

    //Aviso de que se han cargado los discos
    alert('Se han precargado 20 discos y sus autores.');

}

//Llamo a la función al cargar la página
window.onload = function () {
    precargarDiscos();
}


//Funcion para agregar autores nuevos
window.agregarAutores = function () {
    let nombre = prompt("Introduzca el nombre del autor:");
    let fechaNacimiento = prompt("Introduzca la fecha de nacimiento (YYYY-MM-DD):");
    let nuevoAutor = new Autor(nombre, fechaNacimiento);
    if(nuevoAutor){
        autores.push(nuevoAutor);
        alert("El autor se ha añadido correctamente a la colección.")
    }
}


//Funcion para agregar discos nuevos
window.agregarDiscos = function () {
    let autorNom = prompt("Introduzca el nombre del autor:");
    let creado = false;
    //busco el autor en el array de autores
    for (let i = 0; i < autores.length; i++) {
        if (autores[i].nombre === autorNom) {
            //Si existe, lo asigno y recojo el resto de datos
            let autor = autores[i];
            let nombre = prompt("Introduzca el nombre del disco:");
            let fechaPublicacion = prompt("Introduzca la fecha de publicación (YYYY-MM-DD):");
            let tipo = prompt("Introduzca el tipo de música:");
            let estado = prompt("Introduzca el estado del disco (disponible/prestado):");
            //Creo el disco nuevo y lo añado al array de discos
            let nuevoDisco = new Disco(nombre, autor, fechaPublicacion, tipo, estado, coleccion);
            //Compruebo si se ha creado correctamente
            if(nuevoDisco){
                discos.push(nuevoDisco);
                creado = true;
            }
            
            //Salgo del bucle
            i = autores.length;
        }
    }
    //Aviso de si se ha creado el disco o no 
    if (!creado) {
        alert("Ha ocurrido un error.");
    } else {
        alert("El disco se ha añadido correctamente a la colección.")
    }

}


//Funcion mostrar coleccion en el HTML
//Llamo al boton del html
const boton = document.getElementById("listar");

boton.addEventListener("click", function () {
    const listado = document.getElementById("listado");
    //Escribo en el div el texto correspondiente
    listado.innerText = "Colección de discos por tipo: \n\n" + coleccion.listarPorTipo();
});


//He añadido una funcion extra para ocultar la lista de discos
const boton2 = document.getElementById("ocultar");
//Borro el texto del div
boton2.addEventListener("click", function () {
    const listado = document.getElementById("listado");
    listado.innerText = "";
});


//Funcion listar la colección completa
const boton3 = document.getElementById("mostrar");
//Escribo en el div el texto correspondiente
boton3.addEventListener("click", function () {
    const listado = document.getElementById("listado");
    listado.innerText = "Colección completa: \n" + coleccion.listarEstanterias();
});


//Funcion borrar discos
window.borrarDiscos = function () {
    let nombreDisco = prompt("Introduzca el nombre del disco:");
    let encontrado = false;
    //Busco el disco en el array de discos
    for (let i = 0; i < discos.length; i++) {
        if (discos[i].nombre === nombreDisco) {
            encontrado = true;
            let disco = discos[i];
            //Lo borro de la colección
            coleccion.eliminarDisco(disco);
            //Lo borro del array de discos
            discos.splice(i, 1);
            //Lo borro de la lista de discos del autor
            for (let i = 0; i < autores.length; i++) {
                if (autores[i].nombre === disco.autor.nombre) {
                    autores[i].discos.splice(autores[i].discos.indexOf(disco), 1);
                }
            }
            //Salgo del for una vez borrado el disco
            i = discos.length;
        }
    }
    if (!encontrado) {
        alert("El disco introducido no forma parte de la colección");
    }
}


//Función prestar disco
window.prestarDisco = function () {
    let nombreDisco = prompt("Introduzca el nombre del disco a prestar:");
    let encontrado = false;

    // Busco el disco en las estanterías de la colección
    for (let estanteria of coleccion.estanterias) {
        for (let disco of estanteria) {
            if (disco.nombre === nombreDisco) {
                encontrado = true;
                // Intento prestar el disco utilizando el método prestar() de la clase Disco
                if (disco.prestar()) {
                    alert(`El disco "${disco.nombre}" se ha prestado correctamente.`);
                } else {
                    alert(`El disco "${disco.nombre}" ya está prestado.`);
                }
                return;  // Termina la ejecución de la función una vez encontrado el disco
            }

        }
    }
    // Si no se encuentro el disco en la colección
    if (!encontrado) {
        alert(`El disco "${nombreDisco}" no se encuentra en la colección.`);
    }
}


//Función devolver disco
window.devolverDisco = function () {
    let nombreDisco = prompt("Introduzca el nombre del disco a prestar:");
    let encontrado = false;

    // Busco el disco en las estanterías de la colección
    for (let estanteria of coleccion.estanterias) {
        for (let disco of estanteria) {
            if (disco.nombre === nombreDisco) {
                encontrado = true;
                // Intento prestar el disco utilizando el método prestar() de la clase Disco
                if (disco.devolver()) {
                    alert(`El disco "${disco.nombre}" se ha devulto correctamente.`);
                } else {
                    alert(`El disco "${disco.nombre}" ya está prestado.`);
                }
                // Salgo del bucle después de haber encontrado y procesado el disco
                return;  // Termina la ejecución de la función una vez encontrado el disco
            }

        }
    }

    // Si no se encuentro el disco en la colección
    if (!encontrado) {
        alert(`El disco "${nombreDisco}" no se encuentra en la colección.`);
    }

}


//Función listar autores
const boton4 = document.getElementById('listAuto');

boton4.addEventListener('click', function () {
    //Primero ordeno los autores alfabeticamente
    const autoresOrdenados = autores.sort((a, b) => a.nombre.localeCompare(b.nombre));
    const listado = document.getElementById('listado');
    //Escribo en el div el texto correspondiente
    listado.innerText = 'Autores: \n' + autoresOrdenados;
});


//Función terminar la ejecución
window.terminar = function () {
    // Aviso de que salimos del programa
    alert("La ejecución del programa ha terminado.");
    // Cierra la ventana del navegador
    window.close();
}


//Función resetear la coleccion
window.resetearColeccion = function () {
    // Reseteo el array de autores
    autores = [];
    // Reseteo el array de discos
    discos = [];
    // Reseteo la colección
    coleccion = new Coleccion();
    alert("La colección ha sido reseteada.");
}




























