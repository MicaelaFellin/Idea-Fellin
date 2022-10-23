// ARRAY DE PRODUCTOS

const listaProductos =
    [
        {
            "id": 1,
            "nombre": "Escritorio Regulable Blanco",
            "img": "media/regulable-blanco.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 60000,
            "stock": 5
        },
        {
            "id": 2,
            "nombre": "Escritorio Madera",
            "img": "media/Escritorio-paraiso.jpg",
            "desc": "Realizado en madera y melamina beige.",
            "precio": 80000,
            "stock": 5
        },
        {
            "id": 3,
            "nombre": "Escritorio Negro",
            "img": "media/escritorio negro.jpg",
            "desc": "Realizado en madera y estructura de hierro negro.",
            "precio": 200000,
            "stock": 5
        },
        {
            "id": 4,
            "nombre": "Escritorio Gris",
            "img": "media/escritorio-gris.jpg",
            "desc": "Realizado en madera y estructura de hierro gris.",
            "precio": 10000,
            "stock": 10
        },
        {
            "id": 5,
            "nombre": "Escritorio Blanco",
            "img": "media/escritorio blanco.jpg",
            "desc": "Realizado en madera y melamina blanca.",
            "precio": 90000,
            "stock": 10
        },
        {
            "id": 6,
            "nombre": "Escritorio Regulable Madera",
            "img": "media/regulable-madera.jpg",
            "desc": "Realizado en madera y estructura de hierro negro.",
            "precio": 50000,
            "stock": 10
        },

    ]
// CREAR PRODUCTO Y AGRERLO A LA LISTA DE PRODUCTOS
function agregarProducto(nombre, img, desc, precio, stock) {
    let producto = {}
    producto['id'] = listaProductos.length + 1
    producto['nombre'] = nombre
    producto['img'] = img
    producto['desc'] = desc
    producto['precio'] = precio
    producto['stock'] = stock
    listaProductos.push(producto)
}

agregarProducto('Escritorio Violeta','media/esquinero.jpg','Esquinero',258258,5)

// OBTENEMOS ELEMENTOS DEL HTML (CARDS-CARRITO-TOTAL)

let catalog = document.getElementById('itemList')
let cart = document.getElementById('cart')
let total= document.getElementById('total')
let borrarCarrito = document.getElementById('borrarCarrito')
borrarCarrito.addEventListener('click',borrarTodo)
let searchInput = document.getElementById('searchInput')
searchInput.addEventListener('input',buscar)



function borrarTodo(event){
    cartList = []
    saveCartToStorage()
    renderCart()

}
let listaProductosFiltrada = listaProductos

// MANEJADOR DE EVENTO INPUT

function buscar(event) {
    if (searchInput.value !== '') {
        listaProductosFiltrada = [] // BORRA LOS ELEMENTOS PARA QUE NO SE REPITAN EN LA BUSQUEDA POR CADA PALABRA

        let searchList = searchInput.value.toLowerCase().split(" ")

        searchList.forEach((palabra) => {

            if (palabra !== '') {
                listaProductosFiltrada = listaProductosFiltrada.concat(listaProductos.filter((prod) => {
                    return prod.desc.toLowerCase().search(palabra) >= 0
                }))

            }

        })
    } else {
        listaProductosFiltrada = listaProductos
    }
    listaProductosFiltrada = [...new Set(listaProductosFiltrada)]
    listaProductosFiltrada.sort((a, b) => a.id - b.id) //ordenar lista segun Id
    renderListaProductos(listaProductosFiltrada)

}


// LISTA DE CARRITO

let cartList = []
let precioTotal = 0

// CARGA DE STORAGE Y ACTUALIZACIÓN DEL CARRITO
renderListaProductos(listaProductos)
loadCartFromStorage()
renderCart()

// CREANDO LAS CARDS DESDE JS
function renderListaProductos(lista){
    catalog.innerHTML= ''

    lista.forEach((prod) => {

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
    imagen.setAttribute('src', prod.img)
    imagen.setAttribute('alt', prod.nombre)
    //Card body
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    //Card Title
    let title = document.createElement('h5')
    title.classList.add('card-title', 'text-center')
    title.innerText = `${prod.nombre}`
    //Card text
    let text = document.createElement('p')
    text.classList.add('card-text')
    text.innerText = prod.desc

    let precio = document.createElement('p')
    precio.classList.add('card-text','cardPrecio')
    precio.innerText = `$${prod.precio.toLocaleString()}`
    // footer
    let footer = document.createElement('div')
    footer.classList.add('card-footer', 'text-center')

    //Button
    let button = document.createElement('button')
    button.classList.add('btn', 'btn-primary', 'btn-sm')
    button.innerText = 'Comprar'
    button.type = 'button'
    button.setAttribute('productid', prod.id)
    button.setAttribute('id', `btnComprar-${prod.id}`)
    button.addEventListener('click', addItem)

    footer.append(button)

    cardBody.append(title)
    cardBody.append(text)
    cardBody.append(precio)
    margen.append(imagen)
    margen.append(cardBody)
    margen.append(footer)
    container.append(margen)
    catalog.append(container)
})
}
// MANEJADOR DE EVENTO BOTON COMPRAR Y GUARDADO EN STORAGE

function addItem(event) {
    cartList.push(event.target.getAttribute('productid'))
    renderCart()
    saveCartToStorage()
}


// ACTUALIZAR CARRITO

function renderCart() {
    cart.innerHTML = ''

    let cartElementIdList = [...new Set(cartList)]
    //Ordenar elementos segun ID
    cartElementIdList = cartElementIdList.sort((a, b) => a - b)

    cartElementIdList.forEach((cartElementId) => {
        let item = listaProductos.filter((producto) => {
            return producto.id === parseInt(cartElementId)
        })
        let cantidad = cartList.reduce((total, id) => {
            return id === cartElementId ? total += 1 : total
        }, 0)

        //Page Frame
        let container = document.createElement('div')
        container.classList.add('row', 'g-0')
        //Image Frame
        let imageFrame = document.createElement('div')
        imageFrame.classList.add('col-md-4')
        //Image
        let imagen = document.createElement('img')
        imagen.classList.add('card-img-top')
        imagen.setAttribute('src', item[0].img)
        imagen.setAttribute('alt', item[0].nombre)
        //Card body
        let bodyFrame = document.createElement('div')
        bodyFrame.classList.add('col-md-8')

        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        //Card Title
        let title = document.createElement('h5')
        title.classList.add('card-title', 'text-center')
        title.innerText = `${cantidad} x ${item[0].nombre}`
        //Card text
        let text = document.createElement('p')
        text.classList.add('card-text')
        text.innerText = `$${(item[0].precio*cantidad).toLocaleString()}`


        //Button frame
        let buttonFrame = document.createElement('div')
        buttonFrame.classList.add('col-md-4')

        //Button
        let button = document.createElement('button')
        button.classList.add('btn', 'btn-danger', 'btn-sm')
        button.innerText = 'Eliminar Todo'
        button.type = 'button'
        button.dataset.id = item[0].id
        button.addEventListener('click',eliminarTodos)
        buttonFrame.append(button)

      //Button frame
      let buttonFrame2 = document.createElement('div')
      buttonFrame2.classList.add('col-md-4')

      //Button2
      let button2 = document.createElement('button')
      button2.classList.add('btn', 'btn-danger', 'btn-sm')
      button2.innerText = 'Remover'
      button2.type = 'button'
      button2.dataset.id = item[0].id
      button2.addEventListener('click',removerElemento)
      buttonFrame2.append(button2)

        cardBody.append(title)
        cardBody.append(text)

        imageFrame.append(imagen)
        bodyFrame.append(cardBody)
        container.append(imageFrame)
        container.append(bodyFrame)
        container.append(buttonFrame2)
        container.append(buttonFrame)
        cart.append(container)

    })
    total.innerText = `Total: $${calcularTotal().toLocaleString()}`
}

// MANEJADOR DE EVENTO PARA ELIMINAR PRODUCTOS

function eliminarTodos(event) {
    cartList = cartList.filter((item) => {
        return item != event.target.dataset.id
    })

    renderCart()
    saveCartToStorage()
}

// MANEJADOR DE EVENTO PARA ELIMINAR 1 UNIDAD DE PRODUCTO

function removerElemento(event) {
    cartList.splice(cartList.indexOf(event.target.dataset.id), 1)
    renderCart()
    saveCartToStorage()
}

// CALCULO DE PRECIO TOTAL DE COMPRA

function calcularTotal() {
    return cartList.reduce((total, id) => {
        let item = listaProductos.filter((producto) => {
            return producto.id === parseInt(id)
        })
        return total + item[0].precio
    },0)
}

// JSON Y STORAGE

function saveCartToStorage(){
    localStorage.setItem('cartList', JSON.stringify(cartList))
}

function loadCartFromStorage(){
    if(localStorage.getItem('cartList') !== null){
        cartList = JSON.parse(localStorage.getItem('cartList'))
    }
}