(function () {
    'use strict';  
    var arregloLC = [];
    const uriLC = "https://localhost:44308/api/LineaComida";
    var arregloProductos = [];
    let ArrProducto = [];

    function obtenerLineas() {
        fetch(uriLC)
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                arregloLC = json_data;
                mostrarLC(arregloLC);
            }).then(() => {
                //  modificar();
            })
            .catch(err => console.log('error', err))
    }

    function mostrarLC(array) {
        var lineas = document.getElementById('combo');
        for (let value of array) {
            var option = document.createElement("option");
            console.log(option);
            option.innerText = value.descripcion;
            lineas.appendChild(option);
        }
    }

    const uri = "https://localhost:44308/api/producto/1";
    var editar = () => {

        let producto = document.getElementById('productoSeleccionado');
        let linea = document.getElementById('combo')
        console.log('dentro del click, imprimiendo linea');
        console.log(linea.value);
        console.log('dentro del click, imprimiendo producto');
        console.log(producto.value);
        if (!producto.value) {
            const uriProducto = "https://localhost:44308/api/RestauranteProducto?linea=" + linea.value + "&producto=";

            console.log('sin producto');
            fetch(uriProducto)
                .then(res => res.json())
                .then(data => {
                    const json_data = JSON.parse(data);
                    arregloProductos = json_data;
                    console.log('Imprimiendo arreglo');
                    console.log(arregloProductos);
                   
                    generarTabla(arregloProductos);
                }).then(() => {
                    var url = $("#RedirectTo").val();
                    location.href = url;
                })
                .catch(err => console.log('error', err))
        }
        else {
            console.log('con producto');
            const uriProducto = "https://localhost:44308/api/RestauranteProducto?linea=" + linea.value + "&producto=" + producto.value;

            fetch(uriProducto)
                .then(res => res.json())
                .then(data => {
                    const json_data = JSON.parse(data);
                    arregloProductos = json_data;
                    console.log('Imprimiendo arreglo');
                    console.log(arregloProductos);
                   
                    generarTabla(arregloProductos);
                }).then(() => {
                    var url = $("#RedirectTo").val();
                    location.href = url;
                })
                .catch(err => console.log('error', err))
        }
    }

    function generarTabla(datos) {               
        for (let valor of datos) {       
            ArrProducto.push(valor);
        }
        localStorage.setItem('busquedaProductos', JSON.stringify(ArrProducto));       
    }
    //function totalCost() {
    //    // console.log("Product Price");
    //    // console.log(product.price);
    //    let cartCost = localStorage.getItem("totalCost");
    //    console.log("My cart cost is ", cartCost);
    //    if (cartCost != null) {
    //        let tot = document.getElementById("totalCarro");
    //        tot.textContent = localStorage.getItem("totalCost");
    //    } else {            
           
    //        console.log("carro vacio");
    //    }
       
    //}
  


    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        obtenerLineas();
        //totalCost();
        var btnPut = document.getElementById('buscar');
        btnPut.onclick = editar;
        
    }

    init();

})()