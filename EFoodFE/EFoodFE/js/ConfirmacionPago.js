
(function () {
    'use strict';
    let itemsParaFactura = [];
    let final;
    const uriCheque = "https://localhost:44335/api/ActualizarCheque/1";
    const uriTarjeta = "https://localhost:44335/api/ActualizarTarjeta/1";
    let chequeValido = 0;
    let tarjetaValido = 0;
    function obtenerInformacionDeConfirmacion() {
        let userInfo = localStorage.getItem('usuario');
        userInfo = JSON.parse(userInfo);
        let tipoPago = localStorage.getItem('eleccionTipoPago');
        let infoPagoCheque = localStorage.getItem('infoCheque');
        let infoPagoTarjeta = localStorage.getItem('infoTarjeta');
        let totalSiHayDescuento = localStorage.getItem('totalCostConDescuento');
        let totalSiNoHayDescuento = localStorage.getItem('totalCost');
        let nombre = document.getElementById("nombreCliente");
        nombre.textContent = userInfo[0].name + ' ' + userInfo[0].lastName;
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
        if (tipoPago == 'Efectivo' || tipoPago == 'efectivo') {

            tipoTarjeta.textContent = "NA";
            numTarjeta.textContent = "NA";
            nuCheque.textContent = "NA";
            cCheque.textContent = "NA";

        } else if (tipoPago == 'Cheque') {
            console.log("dentro de pago cheque");

            if (infoPagoCheque == null) {
                tipoTarjeta.textContent = "NA";
                numTarjeta.textContent = "NA";
                nuCheque.textContent = "Cheque invalido";
                cCheque.textContent = "Cheque invalido";
            } else {
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
                cCheque.textContent = "******" + lastFive;
            }

        } else if (tipoPago == 'Tarjeta de Credito o Debito') {
            if (infoPagoTarjeta == null) {
                tipoTarjeta.textContent = "Tarjeta invalida";
                numTarjeta.textContent = "Número tarjeta invalido";
                nuCheque.textContent = "NA";
                cCheque.textContent = "NA";
            } else {

                infoPagoTarjeta = JSON.parse(infoPagoTarjeta);
                tipoTarjeta.textContent = infoPagoTarjeta[0].tipoTarjeta;

                var numCuentaTarj = infoPagoTarjeta[0].numTarjeta;
                var lastFive = numCuentaTarj.substr(numCuentaTarj.length - 5);
                numTarjeta.textContent = "******" + lastFive;
                nuCheque.textContent = "NA";
                cCheque.textContent = "NA";
            }
        } if (totalSiHayDescuento != null) {
            totalFinal.textContent = totalSiHayDescuento;
        } else {
            totalFinal.textContent = totalSiNoHayDescuento;
        }

        final = totalFinal;

    }

    function previoAFacturar() {
        let itemsInCart = localStorage.getItem('productsInCart');
        itemsInCart = JSON.parse(itemsInCart);
        console.log(itemsInCart);
        console.log(itemsInCart.length);
        for (let valor of itemsInCart) {

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
                    //   alert(text)
                    console.log(text);
                })
                .catch(err => console.log('error', err));

        }

    }

    function validarPagoCheque(monto) {
        let infoCheque = localStorage.getItem('infoCheque');
        infoCheque = JSON.parse(infoCheque);
        console.log('Dentro de validarPagoCheque');
        let chequeV;
        let cuentaV;
        console.log(infoCheque);
        for (let value of infoCheque) {
            chequeV = value.cheque;
            cuentaV = value.cuenta;
        }
        var verificar = true;

        let cartCost = monto;
        console.log("Imprimiendo variables previos a enviar a cheque");
        console.log(chequeV);
        console.log(cuentaV);
        console.log(cartCost);
        if (verificar) {
            const item = {
                cheque: chequeV,
                cuenta: cuentaV,
                monto: cartCost

            };

            fetch(uriCheque, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => {
                    //alert(text);
                    if (text == '"Cheque aceptado"') {
                        console.log("si aceptó el cheque");

                    } else {
                        localStorage.setItem('pagoValidado', 1);
                    }
                })
                .catch(err => console.log('error', err));
            //  $('#formulario').trigger("reset");
        }
    }

    function validarPagoTarjeta(monto) {
        let infoTarjeta = localStorage.getItem('infoTarjeta');
        let pagoValido = localStorage.getItem('pagoValidado');
        infoTarjeta = JSON.parse(infoTarjeta);
        console.log('Dentro de validarPagoCheque');
        console.log(infoTarjeta);
        let numTarjetaV;
        let mesV;
        let anioV;
        let cvvV;
        let tipoV;
        let creditoDebitoV;
        for (let value of infoTarjeta) {
            numTarjetaV = value.numTarjeta;
            mesV = value.mes;
            anioV = value.anio;
            cvvV = value.cvv;
            tipoV = value.tipoTarjeta;
            creditoDebitoV = value.creditoDebito;
        }
        var verificar = true;

        let cartCost = monto;
        console.log("Imprimiendo variables previos a enviar a cheque");
        console.log(numTarjetaV);
        console.log(mesV);
        console.log(anioV);
        console.log(cvvV);
        console.log(tipoV);
        console.log(creditoDebitoV);
        console.log(cartCost);

        if (verificar) {
            const item = {
                numTarjeta: numTarjetaV,
                mes: mesV,
                anio: anioV,
                cvv: cvvV,
                tipoTarjeta: tipoV,
                creditoDebito: creditoDebitoV,
                monto: cartCost
            };

            fetch(uriTarjeta, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => {
                    console.log(text);
                    if (text == '"Tarjeta aceptada"') {
                        console.log("si aceptó el tarjeta");
                    } else {
                        localStorage.setItem('pagoValidado', 1);
                    }
                })
                .catch(err => console.log('error', err));
            //  $('#formulario').trigger("reset");
        }
    }
    const uriDescuento = "https://localhost:44308/api/TiqueteDescuento//1";
    function actualizarDescuento(array) {
        let infoDescuento = localStorage.getItem('arrTodoDescuento');
        infoDescuento = JSON.parse(infoDescuento);
        console.log("printing array desde actualizar descuento ");
        console.log(infoDescuento);
       
        console.log(infoDescuento[0].codigo);
      //  console.log(array);
        var verificar = true;
        let codigo = infoDescuento[0].codigo ;
        let descripcion = infoDescuento[0].descripcion;
        let disponibleV = infoDescuento[0].disponible - 1;
        let descuentoV = infoDescuento[0].descuento;
        console.log(codigo);
        console.log(descripcion);
        console.log(disponibleV);
        console.log(descuentoV);      
        let user = 'karla';
        if (verificar) {
            const item = {
                codigo: codigo,
                descripcion: descripcion,
                disponible: disponibleV,
                descuento: descuentoV,
                usuario: user
            };

            fetch(uriDescuento, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => console.log(text))
                .catch(err => console.log('error', err));
        }
    }

    function agregarItems() {
        let estado1 = "En Proceso";
        let monto = parseFloat(final.textContent);
        //previo a facturar actualizamos cuentas del cliente
        let formaPagoValido = true;
        let tipoPago = localStorage.getItem('eleccionTipoPago');
        let infoTarjeta = localStorage.getItem('infoTarjeta');
        let infoDescuento = localStorage.getItem('arrTodoDescuento');
        infoTarjeta = JSON.parse(infoTarjeta);     
        if (tipoPago == 'Cheque') {
            validarPagoCheque(monto);
            console.log(chequeValido);
            setTimeout(function () {
                console.log("Iniciado");
                let chequeValido = localStorage.getItem('pagoValidado');
                console.log(chequeValido)
                if (chequeValido == 1) {
                    formaPagoValido = false;
                    console.log("imprimiendo cheque no valido");
                    alert("Cheque no válido, verifique la forma de pago");
                    localStorage.removeItem('pagoValidado');
                }
            }, 1500);
           
        } else if (tipoPago == 'Tarjeta de Credito o Debito' && infoTarjeta[0].creditoDebito == 'debito') {
            console.log("dentro de debito");
            validarPagoTarjeta(monto);
            setTimeout(function () {
                console.log("Iniciado");
                let tarjetaValido = localStorage.getItem('pagoValidado');
                console.log(tarjetaValido)
                if (tarjetaValido == 1) {
                    formaPagoValido = false;
                    console.log("imprimiendo tarjeta no valida");
                    alert("Tarjeta no válida, verifique la forma de pago");
                    localStorage.removeItem('pagoValidado');
                }
            }, 1500);
        }
        if (infoDescuento != null) {              
            actualizarDescuento();

        }
        if (formaPagoValido) {

            //facturar

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
            }, 2000);

            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalCost');
            localStorage.removeItem('cartNumbers');
            localStorage.removeItem('eleccionTipoPago');
            localStorage.removeItem('totalCostConDescuento');

            var contenido = document.querySelector('#contenido');
            var botones = document.getElementById('botones');
            var pregunta = document.querySelector('#pregunta');
            while (botones.firstChild) {
                botones.removeChild(botones.firstChild)
            }
            pregunta.innerHTML = "¿Quieres ver tu factura?";
            contenido.innerHTML = `<a style="background-color: red;" class="primary-btn" href='/Menu/VerFactura'>Ver Factura</a>` 
        }
        localStorage.removeItem('porcentajeDesc');
        localStorage.removeItem('descuentoElegido');
        localStorage.removeItem('precioViejo');
        localStorage.removeItem('usuario');
        localStorage.removeItem('totalWasUpdated');
        localStorage.removeItem('arrTodoDescuento');
        localStorage.removeItem('infoTarjeta');
        localStorage.removeItem('infoCheque');
        localStorage.removeItem('arrTarjeta');
    };

    function cancelar() {
        event.preventDefault();
        localStorage.removeItem('productsInCart');
        localStorage.removeItem('totalCost');
        localStorage.removeItem('cartNumbers');
        localStorage.removeItem('eleccionTipoPago');
        localStorage.removeItem('totalCostConDescuento');
        localStorage.removeItem('porcentajeDesc');
        localStorage.removeItem('descuentoElegido');
        localStorage.removeItem('precioViejo');
        localStorage.removeItem('usuario');
        localStorage.removeItem('totalWasUpdated');
        localStorage.removeItem('arrTodoDescuento');
        localStorage.removeItem('infoTarjeta');
        localStorage.removeItem('infoCheque');
        localStorage.removeItem('arrTarjeta');

        var url = $("#RedirectToCreditCard").val();
         location.href = url;
           
     
      

    }
    var init = () => {
        obtenerInformacionDeConfirmacion();
        previoAFacturar();

        document.getElementById("facturar").addEventListener("click", agregarItems);
        var btnPut = document.getElementById('cancelar');
        btnPut.onclick = cancelar;

    }

    init();

})()

