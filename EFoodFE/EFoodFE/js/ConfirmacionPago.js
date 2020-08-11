
(function () {
    'use strict';
    let itemsParaFactura = [];
    let final;
    function obtenerInformacionDeConfirmacion()
    {
        let userInfo = localStorage.getItem('usuario');
        userInfo = JSON.parse(userInfo);
        let tipoPago = localStorage.getItem('eleccionTipoPago');     
        let infoPagoCheque = localStorage.getItem('infoCheque');  
        let totalSiHayDescuento = localStorage.getItem('totalCostConDescuento');
        let totalSiNoHayDescuento = localStorage.getItem('totalCost');
        let nombre = document.getElementById("nombreCliente");
        nombre.textContent = userInfo[0].name + ' ' + userInfo[0].lastName ;
        let direccion = document.getElementById("direccion");
        direccion.textContent = userInfo[0].phone;
        let telefono = document.getElementById("telefono");
        telefono.textContent = userInfo[0].address;
        let tipoPagoCampo = document.getElementById("medio");
        tipoPagoCampo.textContent = tipoPago;
        let tipoTarjeta = document.getElementById("tipoTarjeta");
        let numTarjeta = document.getElementById("numTarjeta");
        let nuCheque = document.getElementById("numCheque");
        let cCheque = document.getElementById("numCuentaCheque");
        let totalFinal = document.getElementById("totalFactura");
        if (tipoPago == 'Efectivo' || tipoPago == 'efectivo' ) {
            
            tipoTarjeta.textContent = "NA";
            numTarjeta.textContent = "NA";
            nuCheque.textContent = "NA";
            cCheque.textContent = "NA";

        } else if (tipoPago == 'Cheque')
        {
            console.log("dentro de pago cheque");

            if (infoPagoCheque == null) {
                tipoTarjeta.textContent = "NA";
                numTarjeta.textContent = "NA";
                nuCheque.textContent = "Cheque invalido";
                cCheque.textContent = "Cheque invalido";
            } else
            {
                infoPagoCheque = JSON.parse(infoPagoCheque);
                tipoTarjeta.textContent = "NA";
                numTarjeta.textContent = "NA";
                console.log("dentro de confirmacion cuando es cheque");
                console.log(infoPagoCheque);
                console.log(infoPagoCheque[0].cheque);
                nuCheque.textContent = infoPagoCheque[0].cheque;
                var numCuentaChe = infoPagoCheque[0].cuenta;
                var lastFive = numCuentaChe.substr(numCuentaChe.length - 5);
                console.log();
                cCheque.textContent = "******" + lastFive ;
            }
            
        } else if (tipoPago == 'Tarjeta de Credito o Debito') {
            tipoTarjeta.textContent = "Tipo tarjeta";
            numTarjeta.textContent = "Num cuenta tarjeta";
            nuCheque.textContent = "NA";
            cCheque.textContent = "NA";
        } if (totalSiHayDescuento != null) {
            totalFinal.textContent = totalSiHayDescuento;
        } else
        {
            totalFinal.textContent = totalSiNoHayDescuento;
        }

        final = totalFinal;
       
    }

  

    function previoAFacturar()
    {
        let itemsInCart = localStorage.getItem('productsInCart');
        itemsInCart = JSON.parse(itemsInCart);
        console.log(itemsInCart);
        console.log(itemsInCart.length);
        for (let valor of itemsInCart)
        {

            itemsParaFactura.push(valor);
        }
        console.log("Imprimiendo el array");
        console.log(itemsParaFactura)
        console.log(parseFloat(final.textContent));

    }

    function agregarProd() {
//Agregar productos del carrito a la factura
        for (let x in itemsParaFactura) {
            let name = itemsParaFactura[x].name;
            let price = itemsParaFactura[x].price

            const uri2 = "https://localhost:44308/api/DetalleProd";
            const item = {
                codigo_producto: name,
                precio: price

            };

            fetch(uri2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => {
                    alert(text)
                    console.log(text);
                })
                .catch(err => console.log('error', err));

        }

    }

function agregarItems() {
        //facturar

    let estado1 = "En Proceso";
    let monto = parseFloat(final.textContent);

        const uri1 = "https://localhost:44308/api/Detalle";
        const item = {
            monto: monto,
            estado: estado1

        };

        fetch(uri1, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => response.text())
            .then(text => {
                alert(text)
                console.log(text);
            })
        .catch(err => console.log('error', err));



    console.log("Inicia agregarProd");
    setTimeout(function () {
        console.log("Iniciado");
        agregarProd();
    }, 4000);



    localStorage.clear('productsInCart');
    localStorage.clear('totalCost');
    localStorage.clear('cartNumbers');
    localStorage.clear('eleccionTipoPago');
    localStorage.clear('totalCostConDescuento');

    var contenido = document.querySelector('#contenido');
    var botones = document.getElementById('botones');
    var pregunta = document.querySelector('#pregunta');
    while (botones.firstChild) {
        botones.removeChild(botones.firstChild)
    }
    pregunta.innerHTML = "¿Quieres ver tu factura?";
    contenido.innerHTML = `<a style="background-color: red;" class="primary-btn" href='/Menu/VerFactura'>Ver Factura</a>` 

    };

    var init = () => {
       obtenerInformacionDeConfirmacion();
        previoAFacturar();

        document.getElementById("facturar").addEventListener("click", agregarItems );
        
    }

    init();

})()
