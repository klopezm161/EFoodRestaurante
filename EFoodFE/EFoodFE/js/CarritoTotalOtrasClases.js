    function totalCost() {      
        let cartCost = localStorage.getItem("totalCost");
        console.log("My cart cost is ", cartCost);
        if (cartCost != null) {
            let tot = document.getElementById("totalCarro");
            tot.textContent = localStorage.getItem("totalCost");
            let tot2 = document.getElementById("totalMenuSecundario");
            tot2.textContent = localStorage.getItem("totalCost");

        } else {            

            console.log("carro vacio");
        }

}

function totalItems() {
   
    let cartItems = localStorage.getItem("cartNumbers");
    console.log("My cart cost is ", cartItems);
    if (cartItems != null) {
        document.querySelector(".cart span").textContent = cartItems;
    } else {

        console.log("carro vacio");
    }

}

totalItems();
totalCost();