let prodDetail = document.querySelector(".prodDetail");
if (prodDetail) {
    let carts = document.querySelectorAll(".add-cart");
    let cartCost = localStorage.getItem("totalCost");
    console.log("My cart cost is ", cartCost);
    if (cartCost != null) {
        let tot = document.getElementById("totalCarro");
        tot.textContent = localStorage.getItem("totalCost");
        let tot2 = document.getElementById("totalMenuSecundario");
        tot2.textContent = localStorage.getItem("totalCost");

    }

    /*This for is attached to event listener */
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener("click", () => {
            //
            if (!document.querySelector('input[name = "optradio"]:checked')) {
                alert("Recuerde seleccionar un precio");
            } else {
                let precio = document.querySelector('input[name = "optradio"]:checked').value;
                let codigo = document.getElementById("codigo");
                let descripcion = document.getElementById("descripcion2");

                console.log("previo a imprimir precio");

                console.log(precio);
                let products = [
                    {
                        name: codigo.value,
                        tag: descripcion.value,
                        price: precio,
                        inCart: 0,
                    }

                ];

                cartNumbers(products[i]);
                totalCost(products[i]);
            } alert("Producto agregado");
        });
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    console.log("Productos en el carrito");
    console.log(productNumbers);
    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    console.log("Desde cart Numbers");
    console.log("Imprimiendo el producto");
    console.log(product);
    if (productNumbers) {
        console.log(productNumbers);
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("Producto que le llega a setItems");
    console.log(product);

    if (cartItems) {
        if (cartItems[product.name + product.price] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name + product.price]: product,
            };
        }
        cartItems[product.name + product.price].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name + product.price]: product,
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    console.log("My cart cost is ", cartCost);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + parseInt(product.price));
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    let tot = document.getElementById("totalCarro");
    tot.textContent = localStorage.getItem("totalCost")
    let tot2 = document.getElementById("totalMenuSecundario");
    tot2.textContent = localStorage.getItem("totalCost");
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    console.log("Imprimiendo cartItems desde display cart")
    console.log(cartItems);
    let productContainer = document.querySelector(".products");
    var cont = 0;
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map((item) => {
            productContainer.innerHTML += `
        <div class="product2">          
         ${item.name}- ${item.tag}        
        </div>
      
        <div class="price">$${item.price},00</div>
        <div class="quantity">            
                 <input id="numeroItems${item.name}${item.price}" type="number" min=1 max=10 style="width:6rem; margin-right:1.5px" value=${item.inCart} ></input>
             <button  id="${item.name}${item.price}" > Actualizar</button>
        </div>
        <div class="total">¢${item.inCart * item.price},00
            
        </div>
        <div class="total">
             <a  id="${item.name}${item.price}" style="color: dimgrey;" href="#"><ion-icon name="close-circle"></ion-icon></a>    
        </div>
      `
            cont = cont + 1;;
        });
        productContainer.innerHTML += `
      <div class="basketTotalContainer"> 
        <h4 class="basketTotalTile">Basket Total </h4>
        <h4 class="basketTotal">¢${cartCost},00 </h4>
      </div>
     `

        let tot = document.getElementById("totalCarro");
        tot.textContent = cartCost;
        let tot2 = document.getElementById("totalMenuSecundario");
        tot2.textContent = localStorage.getItem("totalCost");

    }
}
$(".products").on('click', 'a', function () {
    var id = $(this).attr('id');
    let productNumbers = localStorage.getItem("cartNumbers");
    let cartItems = localStorage.getItem("productsInCart");
    let cost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    // var confirmacion = confirm('¿Seguro que desea eliminar el producto?');

    localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[id].inCart
    );
    localStorage.setItem(
        "totalCost",
        cost - cartItems[id].price * cartItems[id].inCart
    );
    delete cartItems[id];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
    onLoadCartNumbers();
});

$(".products").on('click', 'button', function () {
    var id = $(this).attr('id');
    let numeroNuevo = parseInt(document.getElementById("numeroItems" + id).value);
    let productNumbers = parseInt(localStorage.getItem("cartNumbers"));

    let cartItems = localStorage.getItem("productsInCart");
    let cost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    let numeroAnterior = parseInt(cartItems[id].inCart);
    let costoProducto = parseInt(cartItems[id].price);


    if (numeroNuevo > numeroAnterior) {
        localStorage.setItem(
            "cartNumbers",
            productNumbers - numeroAnterior + numeroNuevo
        );
        localStorage.setItem(
            "totalCost",
            cost - (numeroAnterior * costoProducto) + (numeroNuevo * costoProducto)
        );

    } else if (numeroNuevo < numeroAnterior) {
        localStorage.setItem(
            "cartNumbers",
            productNumbers - (numeroAnterior - numeroNuevo)
        );
        localStorage.setItem(
            "totalCost",
            cost - (numeroAnterior * costoProducto) + (numeroNuevo * costoProducto)
        );

    }

    cartItems[id].inCart = numeroNuevo;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
    onLoadCartNumbers();

});



onLoadCartNumbers();
displayCart();
/*Referencias
 * Sampaio, T. (2020). JavaScript Shopping Cart Tutorial. Recuperado de: https://www.youtube.com/watch?v=B20Getj_Zk4

*/
