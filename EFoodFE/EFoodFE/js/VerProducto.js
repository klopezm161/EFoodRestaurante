(function () {
    'use strict';
    //Obtengo el id que voy a modificar y lo muestro en el placeholder

    //arreglo = localstorage.getitem('producto');
    //arreglo = JSON.parse(arreglo);
    //localStorage.removeItem('producto'); // Clear the localStorage   
    var arregloLC = [];
    const uriLC = "https://localhost:44308/api/LineaComida";
    var arregloProductos = [];
    let ArrProducto = [];



    const uri = "https://localhost:44308/api/producto/1";

    function generarTabla(arreglo) {

        //  
        var contenido = document.querySelector('#contenido');
        console.log('Dentro de generar tabla');
        console.log(arreglo);
        console.log('Despues de imprimir datos de tabla dentro de generar');
        contenido.innerHTML = ''
        var cont = 0;//se utiliza para obtener indice por editar
        for (let valor of arreglo) {
            contenido.innerHTML +=
                `
        <tr>
                        <td>${valor.descripcion}</td>
                        <td>${valor.contenido}</td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='/Menu/ShopDetails'>Ver Producto</a></td>                           
                       
                      </tr>
        `
            cont = cont + 1;
            ArrProducto.push(valor);

        }
        //console.log("Imprimiendo el array");
        //console.log(ArrProducto)
        //console.log("Imprimiendo índice de array");
        //console.log(ArrProducto[0])
    }

    $("#contenido").on('click', 'a', function () {
        var id = $(this).attr('id');
        localStorage.setItem('idIndexProducto', id);//Indice seleccionado que se va a editar
        localStorage.setItem('producto', JSON.stringify(ArrProducto));//ese guarda el arreglo de consecutivos para poder usarlo en otro JS.

    });


    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        var arreglo = [];
        arreglo = localStorage.getItem('busquedaProductos');
        arreglo = JSON.parse(arreglo);
        //  localstorage.removeitem('busquedaProductos'); // clear the localstorage  
        console.log('Dentro de buscar producto lo que viene en arreglo:');
        console.log(arreglo);

        generarTabla(arreglo);
        var btnPut = document.getElementById('buscar');
        // btnPut.onclick = editar;
        //var btnSalir = document.getElementById('salir');
        //btnSalir.onclick = salir;
    }

    init();

})()