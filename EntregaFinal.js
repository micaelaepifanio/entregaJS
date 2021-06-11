let chico = 500;
let mediano = 1000;
let grande = 1500;
let totalCuadros = 0;
let totalDinero = 0;
let nuevoCuadro = "si";

function Compra(precioTotal, cantidad, cuadros, precios) {
    this.cuadros = cuadros;
    this.precios = precios;
    this.precioTotal = precioTotal;
    this.cantidad  = cantidad;
    this.sumarCuadro = function(tamaño, precio){
         this.cuadros.push ("cuadro " + tamaño);
         this.precios.push(precio)
         this.precioTotal = this.precioTotal + precio;
         this.cantidad = this.cantidad +1;
        }
}

let compra = new Compra(0, 0, [], [])

function comprarCuadro (tamano){
    switch (tamano) {
    
        case "chico":
            compra.sumarCuadro ("chico", 500);
            break;
        case "mediano":
            compra.sumarCuadro ("mediano", 1000);
            break;
        case "grande":
            compra.sumarCuadro ("grande", 1500);
            break;
    }

    let itemLista = document.createElement("div")
    let textContainer = document.createElement("div")
    let imgContainer = document.createElement("div")
    let clear = document.createElement("div")
    let clear2 = document.createElement("div")
    $(itemLista).addClass ("item-lista row")
    $(clear).addClass ("col-md-4")
    $(textContainer).addClass ("col-md-2 lightColor")
    $(imgContainer).addClass ("col-md-2 lightColor")
    

    
    itemLista.append (clear)
    
    let imagen = document.createElement("img")
    let priceText = document.createElement ("p")
    
    if (tamano == "chico"){
        $(imagen).attr ("src", "./imagenes/cuadrochico.jpg")
        $(priceText).text ("$500")
    }else if (tamano == "mediano"){
            $(imagen).attr ("src", "./imagenes/cuadromediano.jpg")
            $(priceText).text ("$1000")
    } else {
        $(imagen).attr ("src", "./imagenes/cuadrogrande.jpg")
        $(priceText).text ("$1500" )
    }
    imgContainer.append (imagen)
    itemLista.append (imgContainer)
    let text = document.createElement ("p")
    $(text).text ("un cuadro " + tamano)
    textContainer.append (text)
    
    textContainer.append (priceText)
    itemLista.append (textContainer)
    itemLista.append (clear2)
    $("#listita").append(itemLista)

    $("#total").text ("El total es: $" + compra.precioTotal)
}

const formulario = $("#form")
const select = $("#seleccion")

formulario.submit("submit", (event) => {
    event.preventDefault ()

    let tamano = select.val()
    comprarCuadro (tamano)

    localStorage.setItem ("carrito", JSON.stringify (compra))

} )

function chequeo () {

    let carritoLs = localStorage.getItem ("carrito")
    if (carritoLs) {
        let carritoParseado = JSON.parse (carritoLs)
        compra = new Compra(carritoParseado.precioTotal, carritoParseado.cantidad, carritoParseado.cuadros, carritoParseado.precios)
        $("#total").text ("El total es: $" + compra.precioTotal)

        for(let i = 0; i < compra.cuadros.length; i++){
            let itemLista = document.createElement("div")
            let textContainer = document.createElement("div")
            let imgContainer = document.createElement("div")
            let clear = document.createElement("div")
            let clear2 = document.createElement("div")
            $(itemLista).addClass ("item-lista row")
            $(clear).addClass ("col-md-4")
            $(textContainer).addClass ("col-md-2 lightColor")
            $(imgContainer).addClass ("col-md-2 lightColor")
           

           
            itemLista.append (clear)
            
            let imagen = document.createElement("img")
            if (compra.cuadros [i].includes ("chico")){
                $(imagen).attr ("src", "./imagenes/cuadrochico.jpg")
            } else if (compra.cuadros [i].includes ("mediano")){
                $(imagen).attr ("src", "./imagenes/cuadromediano.jpg")
            } else {
                $(imagen).attr ("src", "./imagenes/cuadrogrande.jpg")
            }
            imgContainer.append (imagen)
            itemLista.append (imgContainer)
            let text = document.createElement ("p")
            $(text).text (compra.cuadros [i])
            textContainer.append (text)
            let priceText = document.createElement ("p")
            $(priceText).text ("$ " + compra.precios [i])
            textContainer.append (priceText)
            itemLista.append (textContainer)
            itemLista.append (clear2)

            $("#listita").append(itemLista)
        }
    }
}

chequeo ()
const URLGET = "http://r947l.mocklab.io/getdollarvalue"

$('#dolares').click (function (){
    $.get(URLGET, function (respuesta, estado) {
          if(estado === "success"){
            console.log (respuesta)
            if ($('#dolares').text() == "Pagar en pesos") { 
                $('#dolares').text("Pagar en dólares"); 
                $("#total").text ("El total es: $" +  Math.round(compra.precioTotal))

            } else { 
                $('#dolares').text("Pagar en pesos"); 
                $("#total").text ("El total es: US$" +  Math.round(compra.precioTotal / respuesta.value))
            };
          }
    });
    })

$('#vaciar-carrito').click (function (){
    $("#listita").empty()
    $("#total").text ("El total es: $0")
    compra = new Compra(0, 0, [], [])
    localStorage.setItem ("carrito", JSON.stringify (compra))
    })    


$(document).ready (function (){
    $('#form').show ("slow")
})

