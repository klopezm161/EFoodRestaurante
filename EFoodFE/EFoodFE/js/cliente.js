
window.onload = function () {
    clienteRegistrado();
    var btnSalir = document.getElementById('formaPago');
    btnSalir.onclick = comprar;
};

function clienteRegistrado()
{
    let nombreV = document.getElementById('nombre');
    let apellidosV = document.getElementById('apellidos');
    let direccionV = document.getElementById('direccion');
    let telefonoV = document.getElementById('telefono');  
    let cliente = localStorage.getItem("usuario");   
    let descuentoLS = localStorage.getItem("descuentoElegido");
    console.log("Imprimiendo descuento de local storage " + descuentoLS);
    let descuentoV = document.getElementById('descuento');  
    if (cliente != null)
    {
        console.log("imprimiendo clientes");
        cliente = JSON.parse(cliente);
        console.log("imprimiendo clientes");
        console.log(cliente);
        console.log(cliente[0].name);
        nombreV.setAttribute('readonly', true);
        apellidosV.setAttribute('readonly', true);
        direccionV.setAttribute('readonly', true);
        telefonoV.setAttribute('readonly', true);
        $('#nombre').val(cliente[0].name); 
        $('#apellidos').val(cliente[0].lastName);   
        $('#direccion').val(cliente[0].phone);   
        $('#telefono').val(cliente[0].address);   
    }
    if (descuentoLS != null) {
        console.log(descuento);
        descuentoV.setAttribute('readonly', true);
        $('#descuento').val(descuentoLS);
      
    }

}
const uri = "https://localhost:44308/api/RestauranteCliente";
var usuario = [];
function comprar() {
    event.preventDefault();
    let nombreV = document.getElementById('nombre');
    let apellidosV = document.getElementById('apellidos');
    let direccionV = document.getElementById('direccion');
    let telefonoV = document.getElementById('telefono');
    let descuentoVa = document.getElementById('descuento');
    let cartItems = localStorage.getItem("cartNumbers");   
    let cliente = localStorage.getItem("usuario");   
    if (cartItems == null) {
        alert("No tiene productos en el carrito, favor seleccionar productos antes de continuar");
    } else if (cliente!=null)
    {
        console.log("Navega a siguiente pagina, poner datos en read only");
        var url = $("#RedirectToPayment").val();
        location.href = url;
        
    } else {

        console.log("dentro de agregar")
        var verificar = true;       
        var expRegPhone = /^\d{8}$/; //validar una cuenta de correo
        if (!nombreV.value) {
            console.log('Espacio de nombre requerido');
            nombreV.focus();
            verificar = false;
        }
        else if (!direccionV.value) {
            console.log('Espacio de direccion requerido');
            direccionV.focus();
            verificar = false;
        }
        else if (!telefonoV.value) {
            console.log('Espacio de telefono requerido');
            telefonoV.focus();
            verificar = false;
        }
         else if (telefonoV.value.length != 8) {
            alert('Formato de teléfono incorrecto, deben ser 8 dígitos');
            telefonoV.focus();
            verificar = false;
        } else if (!expRegPhone.exec(telefonoV.value)) {
            alert('Formato de teléfono incorrecto, solo se aceptan números');
            telefonoV.focus();
            verificar = false;
        }
        if (descuentoVa.value)
        {           
            localStorage.setItem('descuentoElegido', descuentoVa.value );
        }
    
        if (verificar) {
            const item = {
                name: nombreV.value,
                lastName: apellidosV.value,
                phone: telefonoV.value,
                address: direccionV.value
            };

            fetch(uri, {
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
                    if (text == '"Se guardó con éxito el cliente"') {
                        console.log("si guardo bien");
                        usuario = [{
                            name: nombreV.value,
                            lastName: apellidosV.value,
                            phone: direccionV.value,
                            address: telefonoV.value,
                        }];
                        console.log(usuario);
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                        nombreV.setAttribute('readonly', true); 
                        apellidosV.setAttribute('readonly', true); 
                        direccionV.setAttribute('readonly', true); 
                        telefonoV.setAttribute('readonly', true);
                        var url = $("#RedirectToPayment").val();
                        location.href = url;
                    } else
                    {
                       alert("Error al ingresar los datos, favor inténtelo de nuevo");
                    }  
                })   
                .catch(err => console.log('error', err));
            //   $('#formulario').trigger("reset");
        }
    }
}

