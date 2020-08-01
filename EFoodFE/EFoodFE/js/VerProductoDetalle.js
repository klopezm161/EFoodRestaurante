(function () {
    'use strict';
    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idIndexProducto'];
    localStorage.removeItem('idIndexProducto'); // Clear the localStorage  
    var arreglo = [];
    arreglo = localStorage.getItem('producto');
    arreglo = JSON.parse(arreglo);
    localStorage.removeItem('producto'); // Clear the localStorage   
    var arregloLC = [];
    const uriLC = "https://localhost:44308/api/LineaComida";


    function obtenerPrecio() {
        const URLGet = "https://localhost:44308/api/PrecioProducto/" + arreglo[index].codigo;
        fetch(URLGet)
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                console.log('dentro de obtener precios producto');
                arregloLC = json_data;
                mostrarLC(arregloLC);
            })
            .catch(err => console.log('error', err))
    }

    function mostrarLC(datos) {
        var contenido = document.querySelector('#tipoPrecio');
        console.log('Dentro de generar tabla');
        console.log(datos);
        contenido.innerHTML = ''
        var cont = 0;//se utiliza para obtener indice por editar
        for (let valor of datos) {
            contenido.innerHTML +=
                `
        <tr>
                          
                            <td><input type="radio" name="optradio" value=${valor.precio} >${valor.precio}
                             <td>                   
                            </td>
                            <td>-${valor.descripcion}</td>  
                      </tr>
        `
            cont = cont + 1;
        //    ArrPP.push(valor);

        }
        console.log("Imprimiendo el array");
        //console.log(ArrPP)
        console.log("Imprimiendo índice de array");
      //  console.log(ArrPP[0])
    }

    var modificar = () => {
        console.log("Dentro de modificar");
        if (arreglo == null) {
            console.log("vacio");
        } else {
            console.log(arreglo[index]);
            $('#codigo').val(arreglo[index].codigo);
         //   $('#descripcion').val(arreglo[index].descripcion);
            $('#descripcion2').val(arreglo[index].descripcion);
            $('#contenido').val(arreglo[index].contenido);
            $('#foto').val(arreglo[index].foto);
            document.getElementById("imagenComida").src = (arreglo[index].foto);
            console.log("La descripcion del producto es");
            console.log(arreglo[index].descripcion);
            //$('#combos').val(arreglo[index].lineaComida);
            //$('#contenido').val(arreglo[index].contenido);
            //$('#foto').val(arreglo[index].foto);
            //document.getElementById("imagenComida").src = (arreglo[index].foto);
            //console.log("dentro de modificar");
            //console.log((arreglo[index].foto));
        }
    }
    const uri = "https://localhost:44308/api/Producto/1";
    var editar = () => {
        event.preventDefault();
        console.log("dentro de agregar")
        var verificar = true;
        let codigo = document.getElementById('codigo');
        let descripcion = document.getElementById('descripcion');
        let lineaComidaElegida = document.getElementById('combos');
        let contenido = document.getElementById('contenido');
        let user = localStorage['user'];
        let fotoV = document.getElementById('foto');
        if (!codigo.value) {
            alert('campo codigo requerido');
            codigo.focus();
            verificar = false;
        }
        else if (!descripcion.value) {
            console.log('Espacio de descripción requerido');
            descripcion.focus();
            verificar = false;
        }
        else if (!lineaComidaElegida.value) {
            console.log('Espacio de linea de comida requerido');
            lineaComidaElegida.focus();
            verificar = false;
        } else if (!contenido.value) {
            console.log('Espacio de contenido requerido');
            contenido.focus();
            verificar = false;
        } else if (!fotoV.value) {
            console.log('Espacio de foto requerido');
            fotoV.focus();
            verificar = false;

        }
        console.log(descripcion.value);
        console.log(lineaComidaElegida.value);
        console.log(contenido.value);
        console.log(descripcion.value);
        console.log(fotoV.value);
        if (verificar) {
            const item = {
                cod_prod: codigo.value,
                descripcion: descripcion.value,
                contenido: contenido.value,
                linea_comida: lineaComidaElegida.value,
                usuario: user,
                foto: fotoV.value.toString()
            };

            fetch(uri, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => alert(text))
                .catch(err => console.log('error', err));
            $('#formulario').trigger("reset");
            $('#imagenComida').src = "";
        }
    }


    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
       // obtenerLineas();
        modificar();
        obtenerPrecio();
        //var btnPut = document.getElementById('guardar');
        //btnPut.onclick = editar;
        //var btnSalir = document.getElementById('salir');
        //btnSalir.onclick = salir;
    }

    init();

})()