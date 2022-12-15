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
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");
let contador=0;
let totalEnProductos=0;
let costoTotal=0;
let precio=0;
let cantidad=0;
let idTimeout;
let datos=[];//new Array();
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear")

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
   lista += "</ul>";
   alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
   alertValidaciones.style.display = "block";
   idTimeout = setTimeout (function (){
    alertValidaciones.style.display = "none";
   }, 5000)
   return false;

 }//if validaciones

 txtNombre.style.border ="";
 txtNumber.style.border ="";
 alertValidaciones.style.display = "none";
 contador++;
 contadorProductos.innerHTML = contador;
  cantidad = parseFloat(txtNumber.value);
  totalEnProductos += cantidad;
  productosTotal.innerHTML= totalEnProductos;
  precio = getPrecio();
  costoTotal += precio * cantidad;
  precioTotal.innerHTML = "$" + costoTotal.toFixed(2);
  
   localStorage.setItem("contadorProductos", contador);
   localStorage.setItem("totalEnProductos",totalEnProductos)
   localStorage.setItem("costoTotal", costoTotal)


  let row = `<tr> 
        <td>${contador} </td> 
        <td>${txtNombre.value} </td> 
        <td>${txtNumber.value} </td>
        <td>${precio} </td> 
  </tr>`;

   cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
   
   let elemento = `{ 
        "id" : ${contador}, 
        "nombre" : "${txtNombre.value}",
        "cantidad" : "${txtNumber.value}",
        "precio" : "${precio}"
    }`;

    datos.push(JSON.parse(elemento));
    //console.log(datos);
    localStorage.setItem("datos", JSON.stringify(datos) );

   txtNombre.value="";
   txtNumber.value="";
   txtNombre.focus();


});

txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
//txtNombre.value = txtNombre.value.trim();
event.target.value = event.target.value.trim();


})

txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim();


})

window.addEventListener("load", function(event){
    let tmp =localStorage.getItem("contadorProductos");
    if (tmp!=null){
        contador=parseInt(tmp);
        contadorProductos.innerHTML=contador;
    }//if

    tmp =localStorage.getItem("totalEnProductos");
    if (tmp!=null){
      totalEnProductos=parseInt(tmp);
      productosTotal.innerHTML= totalEnProductos;
    }//if

    tmp =localStorage.getItem("costoTotal");
    if (tmp!=null){
      costoTotal=parseFloat(tmp);
      precioTotal.innerHTML = "$" + costoTotal.toFixed(2);
    }//if

    tmp = localStorage.getItem("datos");
    if (tmp!=null){
         datos = JSON.parse(tmp);
         datos.forEach(element => {
            cuerpoTabla[0].innerHTML += `<tr> 
            <th>${element.id} </th> 
            <td>${element.nombre} </td> 
            <td>${element.cantidad} </td>
            <td>${element.precio} </td> 
      </tr>`;
         });
    }//if

});

btnClear.addEventListener ("click", function(event){
    contador=0;
    contadorProductos.innerHTML=contador;
    totalEnProductos=0;
    productosTotal.innerHTML=totalEnProductos;
    costoTotal=0;
    precioTotal.innerHTML="$"+costoTotal.toFixed(2);
    cuerpoTabla[0].innerHTML="";

    localStorage.clear();

})
