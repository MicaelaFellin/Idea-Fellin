// Productos - Precios - Stock

/* VARIABLES ANTES DE APLICAR OBJETOS

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
*/

// Objetos y Función constructora

function Producto(nombre, precio, stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    // Agregando método para hacer cálculo de stock
    
    this.restarStock = function(cantidad){
        this.stock -= cantidad
    }
}

let Producto1 = new Producto("Escritorio clasico", 60000, 5)
let Producto2 = new Producto("Escritorio estilo industrial", 80000, 5)
let Producto3 = new Producto("Escritorio regulable en altura", 200000, 3)

// Arrays

let listaProductos = [Producto1, Producto2, Producto3]

// Método de array
console.log(listaProductos.length)

/* Forma para agregar productos nuevos con stock a la listaNombres
let listaNombres = []
for(const prod of listaProductos){
    if(prod.stock > 0){
        listaNombres.push(prod.nombre)
}
}*/

// Funciones de orden superior y método de búsqueda de arrays FILTER / MAP / SOME

let listaProductosConStock = listaProductos.filter((prod) => prod.stock > 0) //En nuestro caso los stocks son mayores a cero, por lo tanto se muestran en el prompt.

let listaNombres = listaProductosConStock.map((prod) => prod.nombre)

let existe = listaProductos.some (producto => producto.nombre === "Escritorio blanco") 

console.log (existe) // Como en nuestro inventario no tenemos disponible escritorio blanco, en consola nos devuelve false.

let precioTotal = 0

// Objetos

/*let Producto1 = {
    nombre: "Escritorio clásico",
    precio: 60000,
    stock: 5,
}

let Producto2 = {
    nombre: "Escritorio estilo industrial",
    precio: 80000,
    stock: 5,
}

let Producto3 = {
    nombre: "Escritorio regulable en altura",
    precio: 200000,
    stock: 3,
}*/


// Mensaje de Bienvenida
// Aplicando método Join al array listaNombres

alert("Bienvenidos a The Wood Store, estos son nuestros escritorios disponibles: \n - " + listaNombres.join ("\n - "))

// Ciclo de compra con WHILE y condicional IF

function precio(cantidad, precio){
    precioTotal += (cantidad * precio)
}

let opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")

while(opcion != "4"){

    if(opcion == "1"){
        let cantidadProducto1 = parseInt(prompt("Ingresa que cantidad de "+ Producto1.nombre + " desea comprar:")) 

        if(cantidadProducto1 <= Producto1.stock){
            precio(cantidadProducto1, Producto1.precio)
            alert("El total de su compra es: " + "$" + precioTotal)
            //Producto1.stock = Producto1.stock - cantidadProducto1
            Producto1.restarStock(cantidadProducto1)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas.toLowerCase() == "si"){  // Agregué método del objeto 
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + Producto1.stock + " unidades de este escritorio")
        }
    }
    else if(opcion == "2"){
        let cantidadProducto2 = parseInt(prompt("Ingrese que cantidad de " + Producto2.nombre + " desea comprar:"))

        if(cantidadProducto2 <= Producto2.stock){
            precio(cantidadProducto2, Producto2.precio)
            alert("El total de su compra es: " + "$" + precioTotal)
            //Producto2.stock = Producto2.stock - cantidadProducto2
            Producto2.restarStock(cantidadProducto2)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas.toLowerCase() == "si"){  // Agregué método del objeto 
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + Producto2.stock + " unidades de este escritorio")
        }
    }
    else if (opcion == "3"){
        let cantidadProducto3 = parseInt(prompt("Ingrese que cantidad de " + Producto3.nombre + " desea comprar:"))

        if(cantidadProducto3 <= Producto3.stock){
            precio(cantidadProducto3, Producto3.precio)
            alert("El total de su compra es: " + "$" + precioTotal)
            //Producto3.stock = Producto3.stock - cantidadProducto3
            Producto3.restarStock(cantidadProducto3)
            let algoMas = prompt("¿Desea comprar algo mas?: \n- si \n- no")
            if (algoMas.toLowerCase() == "si"){  // Agregué método del objeto 
                opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
            }
            else{
                break
            }
        }
        else{
            alert("Por el momento contamos con " + Producto3.stock + " unidades de este escritorio")
        }
    }
    else{
        alert("No contamos con ese producto")
        opcion = prompt("Ingrese que escritorio desea comprar: \n - Escritorio clásico: 1 \n - Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")
    }
    
}

// Saludo final

alert("Gracias por visitar nuestro sitio!")





