// Campo producto - Name
// Campo cantidad - Number
// Botón agregar - btnAgregar
// alertValidaciones
// alertValidacionesTexto
// contadorProductos
// productosTotal
// precioTotal

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("precioTotal");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let idTimeout;
let btnAgregar = document.getElementById("btnAgregar");

//Genera un precio al azar
    function getPrecio(){
        return Math.floor(Math.random() * 50 * 100) / 100;
    }//getPrecio

    function validarNombre() {
        return (txtNombre.value.length>2)?true:false
    }//validar nombre

    function validarCantidad() {
       if (txtNumber.value.length==0){
       return false;
       }//if
       if (isNaN(txtNumber.value)){
       return false;
       }//if
       if (parseFloat(txtNumber.value)<=0){
       return false;
       }//if
       return true;
    
    }//validar cantidad

btnAgregar.addEventListener ("click", function(event){
    event.preventDefault();
    clearTimeout(idTimeout)
    alertValidacionesTexto.innerHTML="";
   if ((!validarNombre()) || (!validarCantidad()) ){
      let lista ="";

    if (!validarNombre()) {
    txtNombre.style.border = "red thin solid";
    lista += "<li>Se debe escribir un nombre válido</li>"
   }

    if (!validarCantidad()) {
    txtNumber.style.border = "red thin solid";
    lista += "<li>Se debe escribir una cantidad válida</li>"
   }
   
   alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
   alertValidaciones.style.display = "block";
   idTimeout = setTimeout (function (){
    alertValidaciones.style.display = "none";
   }, 5000)

   }//if validaciones

});