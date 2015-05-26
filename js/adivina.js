//Miguel Ángel Sainz Ayuso.

var fotos = [];
var fotosRecibidas = [];
var numfotos = 0;
var fotosvistas = 0;
var latitudjuego;
var longitudjuego;
//var latitudjugador;
//var longitudjugador;
var Respuesta;
var JuegoElegido;
var map;
var numero;
//Variable de la función SetInterval
var fotosviews;
//
//var dificultad;
var intervalo = 14400;
var puntuacion;
//var Newnumero;
var NombreJuego;
var AntJuego;
var puntTotal;
var HoraTermJ;
var longJSON;
var ListaJuegos = [];
var PuntCapitales = 0;
var PuntIslas = 0;
var PuntMonumentos = 0;
var index1 = 1, index2= 1,index3 = 1;

$(document).ready(function() {

    // create a map in the "map" div, set the view to a given place and zoom
    map = L.map('map');
    map.setView([40.2838, -3.8215], 1);
    // add an OpenStreetMap tile layer
    //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo(map);

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
    }).addTo(map);

    // add a marker in the given location, attach some popup content to it and open the popup
    //L.marker([40.2838, -3.8215]).addTo(map).bindPopup('Aulario III<br>Urjc').openPopup();
    var popup = L.popup();

      
    function onMapClick(e) {
         //popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
         //popup.setLatLng(e.latlng).setContent("Has seleccionado en el mapa las coordenadas: " + "<br>" + "Latidud: " + e.latlng.lat 
         //+ "." + "<br>" + "Longitud: " + e.latlng.lng + ".").openOn(map);
         //console.log(e.latlng.lat);
         //console.log(e.latlng.lng);
         var latitudjugador = e.latlng.lat;
         var longitudjugador = e.latlng.lng;
         $("#juego").html("<h2>Era... " + Respuesta + "</h2>");
         //console.log("LatitudJug: " + latitudjugador);
         //console.log("LongitudJug: " + longitudjugador);
         var distancia = Distancia(latitudjuego, latitudjugador, longitudjuego, longitudjugador);
         puntuacion = Math.trunc(100000/(distancia*fotosvistas));
         //PuntCapitales = puntuacion;
         //PuntIslas = puntuacion;
         //PuntMonumentos = puntuacion;

         //if (puntuacion != undefined) {
              //puntuacion = Math.trunc(100000/(distancia*fotosvistas));
              //puntTotal =  puntTotal + puntuacion;
         //} else {
              //puntuacion = Math.trunc(100000/(distancia*fotosvistas));
              //puntTotal = puntuacion;
         //}
         
         var HoraTerm = new Date();
         HoraTermJ = HoraTerm.toString();
         //console.log(HoraTermJ);
         $("#puntuacion").html("<h2>Puntuación: " + puntuacion + "</h2>");
         //Con ClearInterval paramos las fotos a elegir.
         clearInterval(fotosviews); 
         //console.log("Distancia: " + distancia);
         //console.log("Puntuación: " + (Math.trunc((distancia*fotosvistas)/distancia)));
         //console.log("Puntuación 2: " + Math.trunc(100000/(distancia*fotosvistas)));
        //Reset Map
        map.setView([40.2838, -3.8215], 1);
        // add an OpenStreetMap tile layer
        //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //}).addTo(map);
        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
       }).addTo(map);

       fotosvistas = 0;
       intervalo = 14400;
       var i;
       if (puntuacion != undefined) {
         
         ListaJuegos.push(NombreJuego);
         //console.log(ListaJuegos.length);
         //console.log(ListaJuegos.indexOf(NombreJuego));
         var state = -ListaJuegos.length + ListaJuegos.indexOf(NombreJuego);
        if(NombreJuego == "Capitales"){
               i = index1;
        } else if (NombreJuego == "Islas") {
               i = index2;
        } else if (NombreJuego == "Monumentos") {
               i = index3;
        }
         
         history.pushState(
          {nombre:NombreJuego, hora:HoraTermJ, puntuacion:puntuacion}, 
          "Adivinanzas", "/" + NombreJuego + i );
          //console.log("El valor de go es:" + state);
          var enlace = '<a id='+ NombreJuego + i +' href="javascript:history.go('+ state +')">Nombre del Juego: ' + NombreJuego 
           + ', ' +'Hora: ' + HoraTermJ + ', ' + 'Puntuación: ' + puntuacion + '<a><br>';
          $("#history").prepend(enlace);
           if(NombreJuego == "Capitales"){
               index1++;
           } else if (NombreJuego == "Islas") {
               index2++;
           } else if (NombreJuego == "Monumentos") {
               index3++;
           } 
       }
       
               
    }
    map.on('click', onMapClick);

    

    $("#capitales").click(function() {
        //index1 = 1;
        AntJuego  = NombreJuego;
        if (puntuacion != undefined) {
          //ListaJuegos.push(AntJuego);
          //var state = - ListaJuegos.length + ListaJuegos.indexOf("AntJuego");
          PuntCapitales = puntuacion + PuntCapitales;
          //console.log("Puntuacion de Capitales:" + PuntCapitales);
          //history.pushState(
          //{nombre:AntJuego, hora:HoraTermJ, puntuacion:puntuacion}, 
          //"Adivinanzas", "/" + AntJuego + i );
          //console.log("El valor de go es:" + state);
          //$("#history").after("<a href='javascript:history.go(" + state + ")>'Nombre del Juego: " + AntJuego + ", " + "Hora: " 
                    //+ HoraTermJ + ", " + "Puntuación: " + puntuacion + "<a><br>");   
        }
        //i++;
        
        JuegoElegido = "juegos/capitales.json";
        NombreJuego = $(this).html();
        //console.log(NombreJuego);
        IniciarJuego();     
    });
    
     $("#islas").click(function() {
         //index2 = 1;
         AntJuego  = NombreJuego;
         if (puntuacion != undefined) {
             //ListaJuegos.push(AntJuego);
             //var state = - ListaJuegos.length + ListaJuegos.indexOf("AntJuego");
             PuntIslas = puntuacion + PuntIslas;
             //history.pushState(
             //{nombre:AntJuego, hora:HoraTermJ, puntuacion:puntuacion},
             // "Adivinanzas", "/" + AntJuego + i);
             //console.log("El valor de go es:" + state);
             //$("#history").after("<a href='javascript:history.go(" + state + ")'>Nombre del Juego: " + AntJuego + ", " + "Hora: " 
                    //+ HoraTermJ + ", " + "Puntuación: " + puntuacion + "<br></a>");   
         }
         //i++;
         JuegoElegido = "juegos/islas.json";
         NombreJuego = $(this).html();
         //console.log(NombreJuego);
         IniciarJuego();    
    });


    $("#monumentos").click(function() {
         //index3 = 1;
         AntJuego  = NombreJuego;
         if (puntuacion != undefined) {
             //ListaJuegos.push(AntJuego);
             //var state = - ListaJuegos.length + ListaJuegos.indexOf("AntJuego");
             PuntMonumentos = puntuacion + PuntMonumentos;
             //history.pushState(
             //{nombre:AntJuego, hora:HoraTermJ, puntuacion:puntuacion},
              //"Adivinanzas", "/" + AntJuego + i);
             //console.log("El valor de go es:" + state);
             //$("#history").after("<a href='javascript:history.go(" + state + ")'>Nombre del Juego: " + AntJuego + ", " + "Hora: " 
                    //+ HoraTermJ + ", " + "Puntuación: " + puntuacion + "<br></a>");   
         }
         //i++;
         JuegoElegido = "juegos/monumentos.json";
         NombreJuego = $(this).html();
         //console.log(NombreJuego);
         IniciarJuego();    
    });
  
    $("#level1").click(function() {
        var dificultad = 1;
        //console.log(dificultad);
        intervalo = intervalo/dificultad;
    });

    $("#level5").click(function() {
        var dificultad = 5;
        //console.log(dificultad);
        intervalo = intervalo/dificultad;
    });

    $("#level10").click(function() {
        var dificultad = 10;
        //console.log(dificultad);
        intervalo = intervalo/dificultad;
    });
 
   window.onpopstate = function(event) {
      //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
       //console.log("El juego era:" + event.state.nombre);
          
       if(event.state.nombre == "Capitales"){
           JuegoElegido = "juegos/capitales.json";
           NombreJuego = event.state.nombre;
           IniciarJuego();    
               
        } else if (event.state.nombre == "Islas") {
          JuegoElegido = "juegos/islas.json";
          NombreJuego = event.state.nombre;
          IniciarJuego();
               
        } else if (event.state.nombre == "Monumentos") {
          JuegoElegido = "juegos/monumentos.json";
          NombreJuego = event.state.nombre;
          IniciarJuego();
               
        }
          

    };       
     

    $("#resetjuego").click(ResetGame = function() {
       clearInterval(fotosviews);
       fotosvistas = 0;
       var Newnumero = Math.floor((Math.random() * longJSON) + 1) - 1;
       //console.log(Newnumero);
       if(Newnumero != numero){
         $.getJSON(JuegoElegido, function(data) {
           //console.log("Buscamos fotos de: " + data.features[Newnumero].properties.Name);
           Respuesta = data.features[Newnumero].properties.Name;
           //$("#juego").html("<h3>" + "</h3>");
           //console.log("Longitud: " + data.features[Newnumero].geometry.coordinates[0]);
           //console.log("Latitud: " + data.features[Newnumero].geometry.coordinates[1]);
           latitudjuego = data.features[Newnumero].geometry.coordinates[1];
           longitudjuego = data.features[Newnumero].geometry.coordinates[0];
           var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=?";
           $.getJSON(flickerAPI, {
               tags: Respuesta,
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
       $("#puntuacion").html("");
    }
    $.getJSON(JuegoElegido, function(data) {
      //L.geoJson(data).addTo(map).bindPopup('Coordenas GeoJSON').openPopup();
      //data.features.length;
      //console.log("Longitud JSON: " + data.features.length);
      longJSON = data.features.length;
      numero = Math.floor((Math.random() * longJSON) + 1) - 1;
      //console.log(numero);
      //console.log("Buscamos fotos de: " + data.features[numero].properties.Name);
      Respuesta = data.features[numero].properties.Name;
      //$("#juego").html("<h3>" + "</h3>");
      //console.log("Longitud: " + data.features[numero].geometry.coordinates[0]);
      //console.log("Latitud: " + data.features[numero].geometry.coordinates[1]);
      latitudjuego = data.features[numero].geometry.coordinates[1];
      longitudjuego = data.features[numero].geometry.coordinates[0];
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=?";
      $.getJSON(flickerAPI, {
          tags: Respuesta,
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
      $("#imagenes").html('<img class="img-responsive" src=' + fotos[numfotos] + '/>');
      numfotos ++;
      fotosvistas++;
      //console.log(fotosvistas);
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

});
