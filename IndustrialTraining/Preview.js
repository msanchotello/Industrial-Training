let container = document.getElementById("product_container");
let selection = document.getElementById("selection");
let imgSelection = document.getElementById("img");
let itemSelection = document.getElementById("item");
let priceSelection= document.getElementById("prices");



function cargar(product){
    selection.style.visibility ="visible"
    container.style.width = "100%";
    container.style.opacity = "0.3"
    selection.style.width = "35%";
    selection.style.top = "23%";
    selection.style.left = "32.5%";
   


    imgSelection.src = product.getElementsByTagName("img")[0].src;

    itemSelection.innerHTML = product.getElementsByTagName("h1")[0].innerHTML;

    priceSelection.innerHTML =  product.getElementsByTagName("span")[0].innerHTML;


}

function cerrar(){
    container.style.width = "100%";
    selection.style.width = "0%";
    selection.style.visibility = "hidden";
    container.style.opacity = "1";
}
