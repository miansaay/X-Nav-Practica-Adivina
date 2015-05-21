//Miguel Ángel Sainz Ayuso.

var fotos = [];
var fotosRecibidas = [];
var numfotos = 0;
var fotosvistas = 0;
var latitudjuego;
var longitudjuego;
var latitudjugador;
var longitudjugador;
var Puntuacion;
var Respuesta;
var JuegoElegido;
var map;
var numero;
//Variable de la función SetInterval
var fotosviews;
//
var dificultad;
var intervalo = 14400;
var puntuacion;
var Newnumero;
var NombreJuego;
var puntcTotal;
var HoraTerm;
var HoraTermJ;
$(document).ready(function() {

    
    // create a map in the "map" div, set the view to a given place and zoom
    map = L.map('map');
    map.setView([40.2838, -3.8215], 1);
    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add a marker in the given location, attach some popup content to it and open the popup
    //L.marker([40.2838, -3.8215]).addTo(map).bindPopup('Aulario III<br>Urjc').openPopup();
    var popup = L.popup();
    $.getJSON("/history", function(data) {
       entradas = "<ul>"
       for (var i = 0; i < data.length; i++) {
                  entradas  = entradas + "Nombre del Juego: " + data[i].nombre + "Hora: " 
                               + data[i].hora + "Puntuación: " + data[i].puntuacion + "<br>"
                  //imagenes = imagenes + '<img src=' + data.items[i].media.m + '/>';
                 //$("#fotosnews").html(imagenes);
        }
        entradas = entradas + "</ul>"
        $("#historial").html(entradas);
    });
    window.onpopstate = function(event) {
        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
    //history.go(-1);
    
    function onMapClick(e) {
         //popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
         popup.setLatLng(e.latlng).setContent("Has seleccionado en el mapa las coordenadas: " + "<br>" + "Latidud: " + e.latlng.lat 
         + "." + "<br>" + "Longitud: " + e.latlng.lng + ".").openOn(map);
         console.log(e.latlng.lat);
         console.log(e.latlng.lng);
         latitudjugador = e.latlng.lat;
         longitudjugador = e.latlng.lng;
         $("#juego").html("<h2>Era... " + Respuesta + "</h2>");
         console.log("LatitudJug: " + latitudjugador);
         console.log("LongitudJug: " + longitudjugador);
         var distancia = Distancia(latitudjuego, latitudjugador, longitudjuego, longitudjugador);
         if (puntuacion != undefined) {
              puntcTotal =  puntcTotal + Math.trunc(distancia/(distancia*fotosvistas)) + 9;
         } else {
              puntuacion = Math.trunc(distancia/(distancia*fotosvistas)) + 9;
              puntcTotal = puntuacion;
         }
         
         HoraTerm = new Date();
         HoraTermJ = HoraTerm.toString();
         console.log(HoraTermJ);
         $("#puntuacion").html("<h2>Puntuación: " + puntcTotal + "</h2>");
         //Con ClearInterval paramos las fotos a elegir.
         clearInterval(fotosviews); 
         console.log("Distancia: " + distancia);
         console.log("Puntuación: " + (Math.trunc((distancia*fotosvistas)/distancia)));
 
        //Reset Map
        map.setView([40.2838, -3.8215], 1);
        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        fotosvistas = 0;
        intervalo = 14400;
        //$("#puntuacion").html() = "";
               
    }
    map.on('click', onMapClick);

    

    $("#capitales").click(function() {
         if (puntcTotal != undefined) {
             history.pushState(
             {nombre:NombreJuego, hora:HoraTermJ, puntuacion:puntcTotal}, 
              "Adivinanzas", "/history");   
         }
         JuegoElegido = "juegos/capitales.json";
         NombreJuego = $(this).html();
         console.log(NombreJuego);
         IniciarJuego();     
    });
    
     $("#islas").click(function() {
         if (puntcTotal != undefined) {
             history.pushState(
             {nombre:NombreJuego, hora:HoraTermJ, puntuacion:puntcTotal},
              "Adivinanzas", "/history");   
         }
         JuegoElegido = "juegos/islas.json";
         NombreJuego = $(this).html();
         console.log(NombreJuego);
         IniciarJuego();    
    });
  
    $("#level1").click(function() {
        dificultad = 1;
        console.log(dificultad);
        intervalo = intervalo/dificultad;
    });

    $("#level5").click(function() {
        dificultad = 5;
        console.log(dificultad);
        intervalo = intervalo/dificultad;
    });

    $("#level10").click(function() {
        dificultad = 10;
        console.log(dificultad);
        intervalo = intervalo/dificultad;
    });

    $("#resetjuego").click(ResetGame = function() {
       clearInterval(fotosviews);
       fotosvistas = 0;
       Newnumero = Math.floor((Math.random() * 10) + 1) - 1;
       console.log(Newnumero);
       if(Newnumero != numero){
         $.getJSON(JuegoElegido, function(data) {
           console.log(data.features[Newnumero].properties.Name);
           Respuesta = data.features[Newnumero].properties.Name;
           //$("#juego").html("<h3>" + "</h3>");
           console.log("Longitud: " + data.features[Newnumero].geometry.coordinates[0]);
           console.log("Latitud: " + data.features[Newnumero].geometry.coordinates[1]);
           latitudjuego = data.features[Newnumero].geometry.coordinates[1];
           longitudjuego = data.features[Newnumero].geometry.coordinates[0];
           var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=?";
           $.getJSON(flickerAPI, {
               tags: numero,
               tagmode: "any",
               format: "json"
           })
           .done(function(data) {
               //Checkeo de las imagenes de Flirck
              //imagenes = "";
              for (var i = 0; i < data.items.length; i++) {
                  fotosRecibidas[i] = data.items[i].media.m;
                  //imagenes = imagenes + '<img src=' + data.items[i].media.m + '/>';
                 //$("#fotosnews").html(imagenes);
              }
           });
           fotos = fotosRecibidas;
         });
         numero = Newnumero; 
       } else {
          ResetGame();
       }
       fotosviews = setInterval(function(){Mostrarfotos()}, intervalo);
    });

  function IniciarJuego(){
    if ($("#juego").html() != "") {
       $("#juego").html("");
    }
    $.getJSON(JuegoElegido, function(data) {
      //L.geoJson(data).addTo(map).bindPopup('Coordenas GeoJSON').openPopup();
      numero = Math.floor((Math.random() * 10) + 1) - 1;
      console.log(numero);
      console.log(data.features[numero].properties.Name);
      Respuesta = data.features[numero].properties.Name;
      //$("#juego").html("<h3>" + "</h3>");
      console.log("Longitud: " + data.features[numero].geometry.coordinates[0]);
      console.log("Latitud: " + data.features[numero].geometry.coordinates[1]);
      latitudjuego = data.features[numero].geometry.coordinates[1];
      longitudjuego = data.features[numero].geometry.coordinates[0];
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=?";
      $.getJSON(flickerAPI, {
          tags: numero,
          tagmode: "any",
          format: "json"
      })
      .done(function(data) {
          //Checkeo de las imagenes de Flirck
         //imagenes = "";
         for (var i = 0; i < data.items.length; i++) {
             fotosRecibidas[i] = data.items[i].media.m;
             //imagenes = imagenes + '<img src=' + data.items[i].media.m + '/>';
            //$("#fotosnews").html(imagenes);
         }
      });
      fotos = fotosRecibidas;
      
    });
    fotosviews = setInterval(function(){Mostrarfotos()}, intervalo);
  } 
  
   function Mostrarfotos() {
      //console.log("Una nueva foto");
      $("#imagenes").html('<img src=' + fotos[numfotos] + '/>');
      numfotos ++;
      fotosvistas++;
      console.log(fotosvistas);
   }


      function Distancia(latitud1, longitud1, latitud2, longitud2){
       //R es el diámetro de la tierra en kilometros.
       var R = 6378.137; 
       var toRad = function(num) {
           return num * Math.PI / 180
       }
       var Distlat = toRad(latitud1 - latitud2);
       var Distlong = toRad(longitud1 - longitud2);
       var paramA = Math.sin(Distlat/2) * Math.sin(Distlat/2) + 
               Math.sin(Distlong/2) * Math.sin(Distlong/2) * Math.cos(toRad(latitud1)) * Math.cos(toRad(latitud2));
       var paramC =  2 * Math.atan2(Math.sqrt(paramA), Math.sqrt(1 - paramA));
       var dist = R*paramC;
       return dist.toFixed(3);
    }

    
    


   
     
    

    //$.getJSON("juegos/islas.json", function(data) {
      //.geoJson(data).addTo(map).bindPopup('Coordenas GeoJSON').openPopup();
    
    //});

     //Gestión de las imágenes de Flirck
  //$("#button").click(function(){
   //console.log($("input").val());
   //var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=?";
   //$.getJSON(flickerAPI, {
     //tags: $("input").val(),
     //tagmode: "any",
     //format: "json"
   //})
   //.done(function(data) {
    //imagenes = "";
    //for (var i = 0; i < 5; i++) {
        //imagenes = imagenes + '<img src=' + data.items[i].media.m + '/>';
    //}
    //$("#imagenes").html(imagenes);
   //});
  //});
});
