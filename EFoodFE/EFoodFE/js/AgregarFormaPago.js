
(function () {

    //var ligadas;
    let chequeArray = [];
    //var tarjetas = [];
    const uriCheque = "https://localhost:44335/api/Cheque";
    const uriTarjeta = "https://localhost:44335/api/Tarjeta";

    function cheque() {
        event.preventDefault();
        console.log("dentro de agregar")
        var verificar = true;
        let chequeV = document.getElementById('numCheque');
        let cuentaV = document.getElementById('numCuenta');       
        if (!chequeV.value) {
            console.log('Espacio de chequeV requerido');
            chequeV.focus();
            verificar = false;
        }
        else if (!cuentaV.value) {
            console.log('Espacio de cuentaV requerido');
            cuentaV.focus();
            verificar = false;
        } 
        
        console.log("Imprimiendo variables previos a enviar a cheque");
        console.log(chequeV.value);
        console.log(cuentaV.value);
       
        if (verificar) {
            const item = {
                cheque: chequeV.value,
                cuenta: cuentaV.value               

            };

            fetch(uriCheque, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => {
                    alert(text);               
                })
                .catch(err => console.log('error', err));
            //  $('#formulario').trigger("reset");
        }
    }
    function tarjeta() {
        event.preventDefault();
        console.log("dentro de agregar tarjeta")
        var verificar = true;
        let numTarjetaV = document.getElementById('numeroTarjeta');
        let mesV = document.getElementById('mes');
        let anioV = document.getElementById('anio');
        let cvvV = document.getElementById('cvv');
        let tipoV = document.getElementById('tarjetasAsignadas');
        let creditoDebitoV = document.getElementById('creditoDebito');
        if (!numTarjetaV.value) {
            console.log('Espacio de chequeV requerido');
            numTarjetaV.focus();
            verificar = false;
        }
        else if (!mesV.value) {
            console.log('Espacio de cuentaV requerido');
            mesV.focus();
            verificar = false;
        } if (!anioV.value) {
            console.log('Espacio de chequeV requerido');
            anioV.focus();
            verificar = false;
        }
        else if (!cvvV.value) {
            console.log('Espacio de cuentaV requerido');
            cvvV.focus();
            verificar = false;
        }

        console.log("Imprimiendo variables previos a enviar a cheque");
        console.log(numTarjetaV.value);
        console.log(mesV.value);
        console.log(anioV.value);
        console.log(cvvV.value);
        console.log(tipoV.value);
        console.log(creditoDebitoV.value);
    

        if (verificar) {
            const item = {
                numTarjeta: numTarjetaV.value,
                mes: mesV.value,
                anio: anioV.value,
                cvv: cvvV.value,
                tipoTarjeta: tipoV.value,
                creditoDebito: creditoDebitoV.value

            };

            fetch(uriTarjeta, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => {
                    alert(text);
                })
                .catch(err => console.log('error', err));
            //  $('#formulario').trigger("reset");
        }
    }


    async function list(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log('lo que vino dentro del llamadoa  ligadas');
            ligadas = objetoList;
            console.log('dentro de asignadas');
            console.log(ligadas)
            asignadas(ligadas);
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

    function asignadas(array) {
        const parseado = JSON.parse(array);
        var tarjetasAsignadas = document.getElementById('tarjetasAsignadas');
        for (let value of parseado) {
            var option = document.createElement("option");
            option.innerText = value.descripcion;
            console.log('asignando a ligadas');
            console.log(value);
            tarjetasAsignadas.appendChild(option);
        }
        // cargar();
    }
    var init = () => {
        var tarjetaID = localStorage.getItem('arrTarjeta');
        console.log("Imprimiendo codigo tarjeta" + tarjetaID);
        const URLGet = 'https://localhost:44308/Api/ProcesadorTarjeta/' + tarjetaID;
        list(URLGet).catch((e) => console.error(e));
        var btnCheque = document.getElementById('cheque');
        btnCheque.onclick = cheque;
        var btnCheque = document.getElementById('agregarTarjeta');
        btnCheque.onclick = tarjeta;
    }
    init();


})();