
(function () {
    'use strict';
    let itemsParaFactura = [];
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
    }

    var init = () => {
       obtenerInformacionDeConfirmacion();
        previoAFacturar();
    }

    init();

})()
