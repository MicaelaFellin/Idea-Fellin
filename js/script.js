// Productos - Precios - Stock

const listaProductos =
    [
        {
            "id": 1,
            "nombre": "Elemento1",
            "img": "media/regulable-blanco.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 2,
            "nombre": "Elemento2",
            "img": "media/Escritorio-paraiso.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 3,
            "nombre": "Elemento3",
            "img": "media/escritorio negro.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 4,
            "nombre": "Elemento4",
            "img": "media/escritorio-gris.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 5,
            "nombre": "Elemento5",
            "img": "media/escritorio blanco.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },
        {
            "id": 6,
            "nombre": "Elemento6",
            "img": "media/regulable-madera.jpg",
            "desc": "Realizado en hierro blanco y madera.",
            "precio": 1,
            "stock": 1
        },

    ]



console.log(listaProductos)
let catalog = document.getElementById('itemList')
let cart = document.getElementById('cart')
let cartList = []

listaProductos.forEach((prod) => {

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
    // footer
    let footer = document.createElement('div')
    footer.classList.add('card-footer', 'text-center')

    //Button
    let button = document.createElement('button')
    button.classList.add('btn', 'btn-primary', 'btn-sm')
    button.innerText = 'Comprar'
    button.type = 'button'
    button.setAttribute('mark', prod.id)
    button.addEventListener('click', addItem)

    footer.append(button)

    cardBody.append(title)
    cardBody.append(text)

    margen.append(imagen)
    margen.append(cardBody)
    margen.append(footer)
    container.append(margen)
    catalog.append(container)
})

function addItem(event) {
    cartList.push(event.target.getAttribute('mark'))
    renderCart()

}

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
        console.log(item)

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
        text.innerText = item[0].desc

        //Button frame
        let buttonFrame = document.createElement('div')
        buttonFrame.classList.add('col-md-4')

        //Button
        let button = document.createElement('button')
        button.classList.add('btn', 'btn-primary', 'btn-sm')
        button.innerText = 'Comprar'
        button.type = 'button'
        button.setAttribute('mark', item[0].id)

        buttonFrame.append(button)

        cardBody.append(title)
        cardBody.append(text)

        imageFrame.append(imagen)
        bodyFrame.append(cardBody)
        container.append(imageFrame)
        container.append(bodyFrame)
        container.append(buttonFrame)
        cart.append(container)

    })

}


let listaProductosConStock = listaProductos.filter((prod) => prod.stock > 0) //En nuestro caso los stocks son mayores a cero, por lo tanto se muestran en el prompt.

let listaNombres = listaProductosConStock.map((prod) => prod.nombre)

let existe = listaProductos.some(producto => producto.nombre === "Escritorio blanco")

console.log(existe) // Como en nuestro inventario no tenemos disponible escritorio blanco, en consola nos devuelve false.

let precioTotal = 0


function precio(cantidad, precio) {
    precioTotal += (cantidad * precio)
}



