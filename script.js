function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.error(`Elemento con ID "${id}" no encontrado.`);
    }
}
    
    const carroItems = {};

   function addCarrito(idItem) {
        const productoInfo = document.getElementById(idItem);
        const productoNombre = productoInfo.querySelector('h6').innerText;
        const productoPrecio = parseFloat(productoInfo.querySelector('p').innerText.replace('$ ', ''));

        if (carroItems[idItem]){
            //Si producto ya esta en el carrito lo lo suma en vez de agregar otra linea igual
            carroItems[idItem].cantidad +=1;    
        } else {
            //Agrega la linea producto
            carroItems[idItem] = {nombre: productoNombre, precio: productoPrecio, cantidad: 1};
        } 
        actualizarCarro();
    }

    function actualizarCarro(){
        const contenedorCarrito = document.querySelector('.items-carrito');
        contenedorCarrito.innerHTML = ''; // Me agrega solo esta nueva linea
        let total = 0;

        Object.keys(carroItems).forEach(id => {
            const {nombre, precio, cantidad} = carroItems[id];
            const totalItem = precio * cantidad;
            total += totalItem;

            const itemHTML = `
                <div class="item">
                    <div class="info-producto">
                        <p>${nombre}</p>
                        <span class="precio">$${totalItem.toFixed(2)}</span>
                    </div>
                    <div class="boton-cantidad">
                        <button onclick="removerCarrito('${id}')">-</button>
                        <span>${cantidad}</span>
                        <button onclick="addCarrito('${id}')">+</button>
                    </div>
                </div>   
            `;
            contenedorCarrito.innerHTML += itemHTML; // Agregar producto al carrito
        });
        // Actualizar resumen de la orden
        document.querySelector('.carrito-resumen .carrito-detalles').innerHTML = `
            <p>Subtotal: <span>$${total.toFixed(2)}</span></p>
            <p>Descuento (-20%): <span>$${(total * 0.2).toFixed(2)}</span></p>
            <p>Envío: <span>$0.00</span></p>
            <h4>Total: <span>$${(total * 0.8).toFixed(2)}</span></h4>
        `;    
    }

    function removerCarrito(idItem) {
        if (carroItems[idItem]) {
            if (carroItems[idItem].cantidad > 1) {
                carroItems[idItem].cantidad -= 1; // Disminuir cantidad
            } else {
                delete carroItems[idItem]; // Eliminar producto del carrito
            }
        }
        actualizarCarro(); // Actualizar interfaz
    }


  


