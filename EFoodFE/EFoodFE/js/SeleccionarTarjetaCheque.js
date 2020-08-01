
(function () {
  
    //var ligadas;
    let chequeArray = [];
    //var tarjetas = [];
const uriCheque = "https://localhost:44335/api/Cheque/1";

function cheque() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;   
    let chequeV = document.getElementById('numCheque');
    let cuentaV = document.getElementById('numCuenta');  
    let cartCost;
    let totalSiHayDescuento = localStorage.getItem('totalCostConDescuento');
    let totalSiNoHayDescuento = localStorage.getItem('totalCost');

    if (!chequeV.value) {
        console.log('Espacio de chequeV requerido');
        chequeV.focus();
        verificar = false;
    }
    else if (!cuentaV.value) {
        console.log('Espacio de cuentaV requerido');
        cuentaV.focus();
        verificar = false;
    } if (totalSiHayDescuento) {
        cartCost = totalSiHayDescuento;

    } else
    {
        cartCost = totalSiNoHayDescuento;
    }
    console.log("Imprimiendo variables previos a enviar a cheque");
    console.log(chequeV.value);
    console.log(cuentaV.value);
    console.log(cartCost);  
    if (verificar) {
        const item = {
            cheque: chequeV.value,
            cuenta: cuentaV.value,
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
                alert(text);
                if (text == '"Cheque aceptado"') {
                    console.log("si aceptó el cheque");
                    chequeArray = [
                        {
                            cheque: chequeV.value,
                            cuenta: cuentaV.value

                        }]
                    localStorage.setItem('infoCheque', JSON.stringify(chequeArray));
                    var url = $("#RedirectToConfirmation").val();
                    location.href = url;
                }
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
}
init();


}) ();