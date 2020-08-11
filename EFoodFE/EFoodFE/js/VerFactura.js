

window.onload = function () {
    console.log("Entró al onload");

    const URLGet = "https://localhost:44308/api/Detalle";

    list(URLGet).catch((e) => console.error(e));

};



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

    var fecha = document.getElementById('fecha');
    var cliente = document.getElementById('nombre_cliente');
    var total = document.getElementById('total_factura');
    var cod = document.getElementById('cod');

    var cont = 0;//se utiliza para obtener indice por editar
    for (let valor of JSON.parse(datos)) {
        cod.innerHTML = `${valor.codigo_det}`;
        fecha.innerHTML = `${valor.fecha}`;
        cliente.innerHTML = `${valor.nombre}` +' '+ `${valor.apellido}`;
        total.innerHTML = '₡ '+ `${valor.monto}`;
        contenido.innerHTML +=
            `
        <tr>
                       <td>${valor.contenido}</td>
                        <td>${valor.precio_unitario}</td>

                      </tr>
        `
        cont = cont + 1;

    }

}


