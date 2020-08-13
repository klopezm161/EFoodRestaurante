
(function () {
    'use strict';
    let ArrMedios = [];
    let ArrTiquetDescuento = [];
    let ArrTodoDescuento = [];

    function totalCost(arregloTiquetes) {
        console.log(arregloTiquetes);
        console.log("imprime");
        //  let newTotal = 0;
        let cartCost = localStorage.getItem("totalCost");
        cartCost = parseFloat(cartCost);
        let descuento = localStorage.getItem("descuentoElegido");
        let totalWasUpdatedDiscount = localStorage.getItem("totalWasUpdated");
        let precioViejo = localStorage.getItem("precioViejo");
        console.log("Total fue actualizado");
        console.log(totalWasUpdatedDiscount);
        if (descuento != null && totalWasUpdatedDiscount == null) {

            for (let valor of arregloTiquetes) {

                if (valor.codigo == descuento) {
                    if (valor.disponible > 0) {
                        console.log("Existe Descuento");
                        let descuentoPrecio = (cartCost * valor.descuento) / 100;
                        let newTotal = cartCost - descuentoPrecio;
                        console.log("Nuevo total primer descuento " + newTotal);
                        localStorage.setItem('precioViejo', cartCost);
                        localStorage.setItem('totalCostConDescuento', newTotal);
                        localStorage.setItem('totalWasUpdated', descuentoPrecio);
                        localStorage.setItem('porcentajeDesc', valor.descuento);
                        console.log("Imprimiendo todo el array de descuento");
                        console.log(valor);
                        ArrTodoDescuento.push(valor);
                        localStorage.setItem('arrTodoDescuento', JSON.stringify(ArrTodoDescuento));

                    }
                }

            }
        }
        if (descuento != null && totalWasUpdatedDiscount != null) {
            if (cartCost != precioViejo) {
                let porcentajeDescuento = localStorage.getItem("porcentajeDesc");
                let descuentoPrecio = (cartCost * parseInt(porcentajeDescuento)) / 100;
                let newTotal = cartCost - descuentoPrecio;
                console.log("Nuevo total con descuento actualizado after change in carrito " + newTotal);
                localStorage.setItem('precioViejo', cartCost);
                localStorage.setItem('totalCostConDescuento', newTotal);
                localStorage.setItem('totalWasUpdated', descuentoPrecio);              
            }

        }

        let cartCostNew = localStorage.getItem("totalCostConDescuento");
        let descuentoNew = localStorage.getItem("totalWasUpdated");
        let oldCartCost = localStorage.getItem("precioViejo");
        console.log(descuentoNew);
        if (cartCost != null && descuentoNew != null) {
            console.log(cartCost);
            let total = document.getElementById("totalCon");
            total.textContent = oldCartCost;
            let totalD = document.getElementById("totalDescuento");
            totalD.textContent = descuentoNew;
            let tot2 = document.getElementById("totalConDescuento");
            tot2.textContent = cartCostNew;
            //let totArriba = document.getElementById("totalCarro");
            //totArriba.textContent = cartCostNew;

        } else if (cartCost != null && descuentoNew == null) {

            console.log(cartCost);
            let total = document.getElementById("totalCon");
            total.textContent = cartCost;
            let totalD = document.getElementById("totalDescuento");
            totalD.textContent = "NA";
            let tot2 = document.getElementById("totalConDescuento");
            tot2.textContent = cartCost;
            //let totArriba = document.getElementById("totalCarro");
            //totArriba.textContent = cartCostNew;
        }

    }

    function pagar() {
        event.preventDefault();
        let eleccion = document.getElementById("medioPago");
        localStorage.setItem('eleccionTipoPago', eleccion.value);
        console.log("Se eligió para pagar ... " + eleccion.value);
        if (eleccion.value == "Efectivo") {
            console.log("Se elegió efectivo");
            var url = $("#RedirectToConfirmation").val();
            location.href = url;
        }
        else if (eleccion.value == "Tarjeta de Credito o Debito") {
            console.log("Se elegió tarjeta");

            var url = $("#RedirectToCreditCard").val();
            location.href = url;
        }
        else if (eleccion.value == "Cheque") {
            console.log("Se elegió cheque");
            var url = $("#RedirectToCreditCard").val();
            location.href = url;
        }
        
    }

    function tieneDescuento() {
        const URLGet = "https://localhost:44308/api/TiqueteDescuento";
        list(URLGet).catch((e) => console.error(e));
    }

    async function list(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log("dentro de llamado a tiquetes descuento")
            console.log(objetoList);
            generarTabla(objetoList);
        } catch (err) {
            console.log('Error: ' + err);
        }

    }
    async function list2(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log("dentro de llamado a lista 2 para ver medios de pago")
            console.log(objetoList);
            generarMedios(objetoList);
        } catch (err) {
            console.log('Error: ' + err);
        }

    }

    function request(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }
                }
            };
            xhr.ontimeout = function () {
                reject("timeout");
            };
            xhr.open("get", url, true);
            xhr.send();
        });
    }

    function generarTabla(datos) {

        var cont = 0;//se utiliza para obtener indice por editar
        for (let valor of JSON.parse(datos)) {

            ArrTiquetDescuento.push(valor);

        }
        console.log("Imprimiendo el array");
        console.log(ArrTiquetDescuento)
        console.log("Imprimiendo índice de array");
        console.log(ArrTiquetDescuento[0]);
        totalCost(ArrTiquetDescuento);
    }

    function obtenerMediosPago()
    {
        const URLGet = "https://localhost:44308/api/Procesador";
        list2(URLGet).catch((e) => console.error(e));
    }

   
    function generarMedios(arrMedios)
    {
        for (let valor of JSON.parse(arrMedios)) {

            if (valor.estado=="activo")
            {
                ArrMedios.push(valor);
                if (valor.tipo == "Tarjeta de Credito o Debito")
                {
                    localStorage.setItem('arrTarjeta', valor.codigo);
                }
            }           

        }
        console.log("Imprimiendo el array con solo medios activos");
        console.log(ArrMedios)
        console.log("Imprimiendo índice de array medio activo posicion 0");
        imprimirMediosPago(ArrMedios);
       
       
    }

    function imprimirMediosPago(array) {
        console.log("Imprimiendo array a mandar a options");
        console.log(array);
        var lineas = document.getElementById('medioPago');
        for (let value of array) {
            var option = document.createElement("option");
            option.innerText = value.tipo;
            lineas.appendChild(option);
        }
    }

    var init = () => {
       // mediosPago();
        //totalCost();
        obtenerMediosPago();
        tieneDescuento();
        var btnPut = document.getElementById('formaPagar');
        btnPut.onclick = pagar;

    }

    init();

})()
