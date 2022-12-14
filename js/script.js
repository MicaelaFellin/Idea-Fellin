let listaProductosFiltrada = []
let listaProductos = []
// FETCH LISTA DE PRODUCTOS

fetch('data/listaproductos.json')
    .then((resp) => resp.json())
    .then((productos) => {

        listaProductos = productos
        listaProductosFiltrada = productos
        renderListaProductos(productos)
        // CARGA DE STORAGE Y ACTUALIZACIÓN DEL CARRITO
        loadCartFromStorage()
        renderCart()
    })

// CREAR PRODUCTO Y AGREGARLO A LA LISTA DE PRODUCTOS

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

agregarProducto('Escritorio en L', 'media/esquinero.jpg', 'Esquinero', 70000, 5)


//OBTENER PRODUCTO POR ID
function getProduct(Id) {
    let product =  listaProductos.filter((prod) => {
        return prod.id == Id
    })
    return product[0]
}
// FUNCIONES PARA CALCULO DE STOCK
function restarStock(productId) {
    let producto = getProduct(productId)
    if (producto.stock > 0) {
        producto.stock -= 1
        return true
    }
    return false
}
function agregarStock(productId){
    getProduct(productId).stock +=1
}
function restaurarStock(productId,cantidad){
    getProduct(productId).stock += cantidad
}

// OBTENEMOS ELEMENTOS DEL HTML (CARDS-CARRITO-TOTAL)

let catalog = document.getElementById('itemList')
let cart = document.getElementById('cart')
let total = document.getElementById('total')
let borrarCarrito = document.getElementById('borrarCarrito')
borrarCarrito.addEventListener('click', borrarTodo)
let searchInput = document.getElementById('searchInput')
searchInput.addEventListener('input', buscar)

// BOTON PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO

function borrarTodo(event) {

    Swal.fire({
        title: `Estas seguro que quieres vaciar el carrito`,
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            let cartElementIdList = [...new Set(cartList)] // NUEVO ARRAY SIN PRODUCTOS REPETIDOS

            cartElementIdList.forEach((cartElementId) => {
                let cantidad = cartList.reduce((total, id) => {
                    return id === cartElementId ? total += 1 : total
                }, 0)
                restaurarStock(cartElementId,cantidad)
            })

            cartList = []
            saveCartToStorage()
            renderCart()
            refreshListaProductos()
            Swal.fire({
                title: 'El carrito esta vacio',
                timer: 1200,
                icon: "success",
                showConfirmButton: false})
        }
        else
        {
            Swal.fire({
                title: 'No borro nada del carrito',
                timer: 1200,
                icon: "success",
                showConfirmButton: false})

        }
      })
}


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


// CREANDO LAS CARDS DESDE JS

function renderListaProductos(lista) {
    catalog.innerHTML = ''

    lista.forEach((prod) => {

        //EJEMPLO DE CARD DESDE EL HTML

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
        //Card Precio
        let precio = document.createElement('p')
        precio.classList.add('card-text', 'cardPrecio')
        precio.innerText = `$${prod.precio.toLocaleString()}`
        // card stock
        let stock = document.createElement('p')
        stock.classList.add('card-text','cardStock')
        stock.innerText = `Stock: ${prod.stock}`
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
        if (prod.stock <= 0) {
            button.disabled = true
            button.innerText = 'Sin stock'
        }

        footer.append(button)
        cardBody.append(title)
        cardBody.append(text)
        cardBody.append(precio)
        cardBody.append(stock)
        margen.append(imagen)
        margen.append(cardBody)
        margen.append(footer)
        container.append(margen)
        catalog.append(container)
    })
}
//ACTUALIZAR LISTA DE PRODUCTOS
function refreshListaProductos(){
    renderListaProductos(listaProductosFiltrada)
}
// MANEJADOR DE EVENTO BOTON COMPRAR Y GUARDADO EN STORAGE

function addItem(event) {
    let productId = event.target.getAttribute('productid')
    let product = getProduct(productId)
    if (restarStock(productId)) {
        cartList.push(productId)
        renderCart()
        refreshListaProductos()
        saveCartToStorage()

        Toastify({
            text: `Añadiste ${product.nombre} al carrito`,
            avatar: `${product.img}`, // Image/icon to be shown before text
            duration: 1000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    }else{
        Swal.fire({
            title: 'Error',
            text: `No hay stock de  ${product.nombre}`,
            icon: "error"})

    }
}


// ACTUALIZAR CARRITO

function renderCart() {
    cart.innerHTML = ''

    let cartElementIdList = [...new Set(cartList)] // NUEVO ARRAY SIN PRODUCTOS REPETIDOS

    cartElementIdList = cartElementIdList.sort((a, b) => a - b) //Ordenar elementos segun ID

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
        text.innerText = `$${(item[0].precio * cantidad).toLocaleString()}`

        //Button frame 1
        let buttonFrame = document.createElement('div')
        buttonFrame.classList.add('col-md-4')

        //Button
        let button = document.createElement('button')
        button.classList.add('btn', 'btn-danger', 'btn-sm')
        button.innerText = 'Eliminar Todo'
        button.type = 'button'
        button.dataset.id = item[0].id
        button.addEventListener('click', eliminarTodos)
        buttonFrame.append(button)

        //Button frame 2
        let buttonFrame2 = document.createElement('div')
        buttonFrame2.classList.add('col-md-4')

        //Button2
        let button2 = document.createElement('button')
        button2.classList.add('btn', 'btn-danger', 'btn-sm')
        button2.innerText = 'Remover'
        button2.type = 'button'
        button2.dataset.id = item[0].id
        button2.addEventListener('click', removerElemento)
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

// MANEJADOR DE EVENTO PARA ELIMINAR TODOS LOS ELEMENTOS DE UN PRODUCTO

function eliminarTodos(event) {
let product = getProduct(event.target.dataset.id)
    Swal.fire({
        title: `Estas seguro que quieres eliminar todos los ${product.nombre}`,
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {

            let cantidad = cartList.reduce((total, id) => {
                return id ==  product.id ? total += 1 : total
            }, 0)

            cartList = cartList.filter((item) => {
                return item != product.id.toString()
            })
            renderCart()
            saveCartToStorage()
            restaurarStock(product.id,cantidad)
            refreshListaProductos()
            Swal.fire({
                title: 'Eliminado',
                text: `Removiste ${product.nombre}`,
                timer: 1200,
                icon: "success",
                showConfirmButton: false})
        }
      })


}

// MANEJADOR DE EVENTO PARA ELIMINAR 1 UNIDAD DE PRODUCTO

function removerElemento(event) {
    let product = getProduct(event.target.dataset.id)
    Swal.fire({
        title: `Estas seguro que quieres eliminar ${product.nombre}`,
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            cartList.splice(cartList.indexOf(product.id.toString()), 1)
            renderCart()
            saveCartToStorage()
            agregarStock(product.id)
            refreshListaProductos()
            Swal.fire({
                title: 'Eliminado',
                text: `Removiste ${product.nombre}`,
                timer: 1200,
                icon: "success",
                showConfirmButton: false})
        }
      })
}

// CALCULO DE PRECIO TOTAL DE COMPRA

function calcularTotal() {
    return cartList.reduce((total, id) => {
        let item = listaProductos.filter((producto) => {
            return producto.id === parseInt(id)
        })
        return total + item[0].precio
    }, 0)
}

// JSON Y STORAGE

function saveCartToStorage() {
    localStorage.setItem('cartList', JSON.stringify(cartList))
}

function loadCartFromStorage() {
    if (localStorage.getItem('cartList') !== null) {
        cartList = JSON.parse(localStorage.getItem('cartList'))
    }
}