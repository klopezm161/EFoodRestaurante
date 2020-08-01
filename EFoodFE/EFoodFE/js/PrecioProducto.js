(function () {
    let ArrPP = [];
    var arregloLC = [];
    const uriLC = "https://localhost:44308/api/TipoPrecio";

    async function list(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log("dentro de llamado")
            console.log(objetoList);
            generarTabla(objetoList);
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
        var contenido = document.querySelector('#contenido');
        console.log('Dentro de generar tabla');
        console.log(datos);
        contenido.innerHTML = ''
        var cont = 0;//se utiliza para obtener indice por editar
        for (let valor of JSON.parse(datos)) {
            contenido.innerHTML +=
                `
        <tr>
                        <td>${valor.descripcion}</td>
                        <td>${valor.precio}</td>                                        
                        <td><button  id="${cont}" style="color: dimgrey;" >Eliminar</button></td>
                      </tr>
        `
            cont = cont + 1;
            ArrPP.push(valor);

        }
        console.log("Imprimiendo el array");
        console.log(ArrPP)
        console.log("Imprimiendo índice de array");
        console.log(ArrPP[0])
    }

    $("#contenido").on('click', 'button', function () {
        var id = $(this).attr('id');
        var tipoPrecio = ArrPP[id].codigoTP;
        var producto = ArrPP[id].codigoProd;
        var confirmacion = confirm('¿Seguro que desea eliminar el tipo de precio?');
        if (confirmacion == true) {
            console.log("se eligio eliminar");
            eliminar(tipoPrecio, producto)
        } else {

        }
        //  load();

    });

    function eliminar(tipoPrecio, producto) {
        var data = {
            codigoProd: producto,
            codigoTP: tipoPrecio,
            usuario: "karla"
        };
        var url = 'https://localhost:44308/api/PrecioProducto?idCod=1';
        console.log(url);

        fetch(url, {
            method: 'DELETE', // or 'PUT',
            //mode: 'no-cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin':'http://127.0.0.1:5500'
                'Access-Control-Allow-Origin': 'https://localhost'
            }
        }).then(response => response.text())
            .then(text => alert(text))
            .then(() => {
                const URLGet = "https://localhost:44308/api/PrecioProducto/" + producto;
                list(URLGet).catch((e) => console.error(e));
            })
            .catch(err => console.log('error', err));

    }

    function obtenerLineas() {
        fetch(uriLC)
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                console.log('dentro de obtenner');
                arregloLC = json_data;
                mostrarLC(arregloLC);
            })
            .catch(err => console.log('error', err))
    }

    function mostrarLC(array) {
        console.log('dentro de mostrar');
        var lineas = document.getElementById('tipoPrecio');
        for (let value of array) {
            var option = document.createElement("option");
            option.innerText = value.descripcion;
            lineas.appendChild(option);
        }
    }
    const urlProd = 'https://localhost:44308/api/PrecioProducto';
    function addItem() {
        // event.preventDefault();       
        console.log("dentro de agregar")
        var verificar = true;
        let tipoPrecio = document.getElementById('tipoPrecio');
        let precio = document.getElementById('precio');
        let producto = codTest;
        let user = localStorage['user'];
        if (!tipoPrecio.value) {
            console.log('Espacio de descripción requerido');
            tipoPrecio.focus();
            verificar = false;
        }
        else if (!precio.value) {
            console.log('Espacio de linea de comida requerido');
            precio.focus();
            verificar = false;
        } else if (precio.value < 0) {
            console.log('dato invalido');
            precio.focus();
            verificar = false;
        }
        console.log('variables');
        console.log(tipoPrecio.value);
        console.log(precio.value);
        console.log(producto);
        if (verificar) {
            const item = {
                codigoProd: producto,
                codigoTP: tipoPrecio.value,
                precio: precio.value,
                usuario: user
            };

            fetch(urlProd, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => alert(text))
                .then(() => {
                    const URLGet = "https://localhost:44308/api/PrecioProducto/" + producto;
                    list(URLGet).catch((e) => console.error(e));
                })
                .catch(err => console.log('error', err));
            $('#formulario').trigger("reset");
            console.log('revisando producto');
            console.log(producto);
        };

    }

    const urlProdMod = 'https://localhost:44308/api/PrecioProducto/1';
    function actalizar() {
        // event.preventDefault();       
        console.log("dentro de agregar")
        var verificar = true;
        let tipoPrecio = document.getElementById('tipoPrecio');
        let precio = document.getElementById('precio');
        let producto = codTest;
        let user = localStorage['user'];
        if (!tipoPrecio.value) {
            console.log('Espacio de descripción requerido');
            tipoPrecio.focus();
            verificar = false;
        }
        else if (!precio.value) {
            console.log('Espacio de linea de comida requerido');
            precio.focus();
            verificar = false;
        } else if (precio.value < 0) {
            console.log('dato invalido');
            precio.focus();
            verificar = false;
        }
        console.log('variables');
        console.log(tipoPrecio.value);
        console.log(precio.value);
        console.log(producto);
        if (verificar) {
            const item = {
                codigoProd: producto,
                codigoTP: tipoPrecio.value,
                precio: precio.value,
                usuario: user
            };

            fetch(urlProdMod, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => alert(text))
                .then(() => {
                    const URLGet = "https://localhost:44308/api/PrecioProducto/" + producto;
                    list(URLGet).catch((e) => console.error(e));
                })
                .catch(err => console.log('error', err));
            $('#precio').value = '';
        }
    }
    function salir() {

        var confirmacion = confirm('¿Seguro que desea cerrar sesión?');
        if (confirmacion == true) {
            localStorage.removeItem('user');
            localStorage.removeItem('rolesUsuario');
            console.log("se eligio eliminar");
            var url = $("#RedirectToIndex").val();
            location.href = url;
        }
    }

    var codTest = '';
    var init = () => {

        var index = localStorage['idIndexProducto'];
        localStorage.removeItem('idIndexProducto'); // Clear the localStorage        
        var arreglo = [];
        arreglo = localStorage.getItem('producto');
        arreglo = JSON.parse(arreglo);
        if (arreglo == undefined) {
            alert("Error no se encuentra dentro de un producto, favor regresar al menú de productos y repetir el proceso ");

        } else {
            console.log("Lo que viene de arreglo");
            console.log(arreglo[index]);
            localStorage.removeItem('producto'); // Clear the localStorage   
            let titulo = document.getElementById("titulo");
            titulo.textContent = 'Lista de Precios: ' + arreglo[index].descripcion;
            const URLGet = "https://localhost:44308/api/PrecioProducto/" + arreglo[index].codigo;
            list(URLGet).catch((e) => console.error(e));
            obtenerLineas();
            codTest = arreglo[index].codigo;
            const reposBtn = document.getElementById("crear");
            reposBtn.onclick = addItem;
            const refrescarBtn = document.getElementById("actualizar");
            refrescarBtn.onclick = actalizar;

        }
        var btnSalir = document.getElementById('salir');
        btnSalir.onclick = salir;
    };

    init();
})()