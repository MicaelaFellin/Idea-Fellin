// Productos - Precios - Stock

const listaProductos =
    [
        {
            "id": 1,
            "nombre": "Elemento1",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 2,
            "nombre": "Elemento2",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 3,
            "nombre": "Elemento3",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 4,
            "nombre": "Elemento4",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 5,
            "nombre": "Elemento5",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 6,
            "nombre": "Elemento6",
            "img": "media/regulable-blanco.jpg",
            "desc":"Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        
    ]



console.log(listaProductos)
let catalog = document.getElementById('itemList')

listaProductos.forEach((prod) =>{

    // <div class="col-sm-12 col-md-6 col-xl-4"> //container
    //     <div class="card mb-3 m-3"> //margen
    //         <img src="media/regulable-blanco.jpg" class="card-img-top" alt="Regulable Blanco"> //imagen
    //         <div class="card-body"> //cardBody
    //             <h5 class="card-title text-center">Escritorio Regulable Blanco</h5> //title
    //             <p class="card-text">Realizado en hierro blanco y madera.</p> //text
    //         </div>
    //         <div class="card-footer text-center"> //footer
    //             <button type="button" class="btn btn-primary btn-sm">Comprar</button> //button
    //         </div>
    //     </div>
    // </div>

//Page Frame
let container = document.createElement('div')
container.classList.add('col-sm-12', 'col-md-6', 'col-xl-4')
//Card Frame
let margen = document.createElement('div')
margen.classList.add('card', 'mb-3', 'm-3')
//Image
let imagen = document.createElement('img')
imagen.classList.add('card-img-top')
imagen.setAttribute('src',prod.img)
imagen.setAttribute('alt',prod.nombre)
//Card body
let cardBody = document.createElement('div')
cardBody.classList.add('card-body')
//Card Title
let title = document.createElement('h5')
title.classList.add('card-title', 'text-center')
title.innerText = prod.nombre
//Card text
let text = document.createElement('p')
text.classList.add('card-text')
text.innerText = prod.desc
// footer
let footer = document.createElement('div')
footer.classList.add('card-footer', 'text-center')

//Button
let button = document.createElement('button')
button.classList.add('btn', 'btn-primary', 'btn-sm')
button.innerText = 'Comprar'
button.type = 'button'
button.setAttribute('mark', prod.id)

footer.append(button)

cardBody.append(title)
cardBody.append(text)

margen.append(imagen)
margen.append(cardBody)
margen.append(footer)
container.append(margen)
catalog.append(container)
})



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

// alert("Bienvenidos a The Wood Store, estos son nuestros escritorios disponibles: \n - " + listaNombres.join ("\n - "))

// Ciclo de compra con WHILE y condicional IF

function precio(cantidad, precio){
    precioTotal += (cantidad * precio)
}

// let opcion = prompt("Ingrese que escritorio desea comprar: \n- Escritorio clásico: 1 \n- Escritorio estilo industrial: 2 \n- Escritorio regulable en altura: 3 \n- Salir: 4")

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

// alert("Gracias por visitar nuestro sitio!")





