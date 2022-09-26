// Productos - Precios - Stock

// Escritorios clásicos
let nombreProducto1 = "Escritorio clásico"
let precioProducto1 = 60000
let stockProducto1 = 5

// Escritorios estilo industrial
let nombreProducto2 = "Escritorio estilo industrial"
let precioProducto2 = 80000
let stockProducto2 = 5

// Escritorios regulables
let nombreProducto3 = "Escritorio regulable en altura"
let precioProducto3 = 200000
let stockProducto3 = 3

let precioTotal = 0

// Mensaje de Bienvenida

alert("Bienvenidos a The Wood Store, a continuacion selecciona los articulos que desees comprar")

// Ciclo de compra con WHILE y condicional IF

function precio(cantidad, precio){
    precioTotal += (cantidad * precio)
}

let opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")

while(opcion != "4"){

    if(opcion == "1"){
        let cantidadProducto1 = parseInt(prompt("Ingresa que cantidad de " + nombreProducto1 + " desea comprar:")) 

        if(cantidadProducto1 <= stockProducto1){
            precio(cantidadProducto1, precioProducto1)
            alert("El total de su compra es: " + "$" + precioTotal)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas == "si"){
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + stockProducto1 + " unidades de este escritorio")
        }
    }
    else if(opcion == "2"){
        let cantidadProducto2 = parseInt(prompt("Ingrese que cantidad de " + nombreProducto2 + " desea comprar:"))

        if(cantidadProducto2 <= stockProducto2){
            precio(cantidadProducto2, precioProducto2)
            alert("El total de su compra es: " + "$" + precioTotal)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas == "si"){
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + stockProducto2 + " unidades de este escritorio")
        }
    }
    else if (opcion == "3"){
        let cantidadProducto3 = parseInt(prompt("Ingrese que cantidad de " + nombreProducto3 + " desea comprar:"))

        if(cantidadProducto3 <= stockProducto3){
            precio(cantidadProducto3, precioProducto3)
            alert("El total de su compra es: " + "$" + precioTotal)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas == "si"){
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + stockProducto3 + " unidades de este escritorio")
        }
    }
    else{
        alert("No contamos con ese producto")
        opcion = prompt("Ingrese que escritorio desea comprar: \n - Escritorio clásico: 1 \n - Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
    }
    
}

alert("Gracias por visitar nuestro sitio!")






