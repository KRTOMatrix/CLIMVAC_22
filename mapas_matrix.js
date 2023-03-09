///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -1],
		zoom: 7,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});


///////////Funcionalidades estructura del visor///////////

//Layers on top

map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';



//Barra de interacción de capas	tantaas sildebar como grupos de capas

var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador

var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);

///////////Diseño caracteriticas basicas del visor///////////

//Título

var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<br><h3>CLIMVAC: Cambio climático<br> y olas de calor</em><h4><h3>';
	 return div;

	};
	title2.addTo(map);


//Logo Matrix	

var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/logmaatrix.png" width="100px" height="55px"></img></a>'; 
	 return div;
	};
	title1.addTo(map);

//Logo proyecto

var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/climvac.png" width="100px" height="70px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 

//Logo mayorsig

/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2023 <a href="https://www.fundacionmatrix.es"><strong>©Fundación Matrix 2023</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/ {z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});


//Límites
/*var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
		attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/

///////////Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -1], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////


//capas de limites

//prov_limit.js

function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 1.3,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};


/*
function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 0.3,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var prov = L.geoJson(prov_limit,{
	style: styleprov,
	
}).addTo(map);
*/




function getColor1(a) {
	return a <= -0.2 ? '#878686' :
	a <= 0 ? '#bfbdbd' : 
	a <= 0.2 ? '#ededce' :
	a <= 0.4 ? '#e8d0a2' :
	a <= 0.6 ? '#edbc93' :
	a <= 0.8 ? '#f2a25e' :
	a <= 1 ? '#e34944' :
	a <= 1.2 ? '#ba433f' :
	a <= 1.4 ? '#853d3a' :	
		'YELLOW';
};

function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.dif_dur_me), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup1(feature, layer) {

	if (feature.properties && feature.properties.dif_dur_me) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Cambio de duración: </strong>"+feature.properties.dif_dur_me.toFixed(1).toLocaleString().replace(".",",")+"",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(desempleo,{
	style: style1,
	onEachFeature: popup1
});


//
function getColor2(a) {
	return a <= 0 ? '#Fffef2' :
	a <= 4 ? '#fcfcc2' :
	a <= 8 ? '#fafa7f' : 
	a <= 12 ? '#fcfc21' :
	a <= 16 ? '#f5cf47' :
	a <= 20 ? '#fab54d' :
	a <= 24 ? '#fa984d' :
	a <= 28 ? '#f50f0f' :
	a <= 32 ? '#b50505' :
	a <= 36 ? '#7a0505' :
	a <= 40 ? '#423030' :
	a <= 44 ? '#0d0a0a' :	
		'YELLOW';
};

function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.olacambio), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup2(feature, layer) {

	if (feature.properties && feature.properties.olacambio) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Cambio de eventos: </strong>"+feature.properties.olacambio.toFixed(1).toLocaleString().replace(".",",")+"",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson2 = L.geoJson(desempleo,{
	style: style2,
	onEachFeature: popup2
});

function getColor3(a) {
	return a <= 5 ? '#f5f4d0' :
	a <= 10 ? '#ffe3c5' : 
	a <= 15 ? '#ffc4a2' :
	a <= 20 ? '#ffaf94' :
	a <= 25 ? '#ff9794' :
	a <= 30 ? '#f35749' :
	a <= 35 ? '#e32726' :
	a <= 40 ? '#bc2627' :
	a <= 45 ? '#862627' :
	a <= 80 ? '#bd35a6' :
		'YELLOW';
};

function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.eventos1), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup3(feature, layer) {

	if (feature.properties && feature.properties.eventos1) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Eventos: </strong>"+feature.properties.eventos1.toFixed(1).toLocaleString().replace(".",",")+"",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(desempleo,{
	style: style3,
	onEachFeature: popup3
});

function getColor4(a) {
	return a <= 5 ? '#f5f4d0' :
	a <= 10 ? '#ffe3c5' : 
	a <= 15 ? '#ffc4a2' :
	a <= 20 ? '#ffaf94' :
	a <= 25 ? '#ff9794' :
	a <= 30 ? '#f35749' :
	a <= 35 ? '#e32726' :
	a <= 40 ? '#bc2627' :
	a <= 45 ? '#862627' :
	a <= 80 ? '#bd35a6' :
		'YELLOW';
};

function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.eventos2), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup4(feature, layer) {

	if (feature.properties && feature.properties.eventos2) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Eventos: </strong>"+feature.properties.eventos2.toFixed(1).toLocaleString().replace(".",",")+"",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson4 = L.geoJson(desempleo,{
	style: style4,
	onEachFeature: popup4
});

function getColor5(a) {
	return a <= 3.3 ? '#fcf5bb' :
	a <= 3.5 ? '#faddac' :
	a <= 3.7 ? '#ffbd7a' : 
	a <= 3.9 ? '#fa9228' :
	a <= 4.1 ? '#bf4e11' : 
	a <= 4.3 ? '#990b25' :
	a <= 4.5 ? '#6b0d9c' :
	a <= 4.6 ? '#440863' :

		'#440863';
};





function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.dur_media), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup5(feature, layer) {

	if (feature.properties && feature.properties.dur_media) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Duración: </strong>"+feature.properties.dur_media.toFixed(1).toLocaleString().replace(".",",")+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson5 = L.geoJson(desempleo,{
	style: style5,
	onEachFeature: popup5
});



function getColor6(a) {
		return a <= 3.3 ? '#fcf5bb' :
	a <= 3.5 ? '#faddac' :
	a <= 3.7 ? '#ffbd7a' : 
	a <= 3.9 ? '#fa9228' :
	a <= 4.1 ? '#bf4e11' : 
	a <= 4.3 ? '#990b25' :
	a <= 4.5 ? '#6b0d9c' :
	a <= 4.6 ? '#440863' :

		'#440863';
};

function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.dur_media1), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup6(feature, layer) {

	if (feature.properties && feature.properties.dur_media1) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Duración: </strong>"+feature.properties.dur_media1.toFixed(1).toLocaleString().replace(".",",")+"",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson6 = L.geoJson(desempleo,{
	style: style6,
	onEachFeature: popup6
});


function getColor8(a) {
	return a <= 25 ? '#f4f5d0' :
	a <= 26 ? '#f6f7bc' : 
	a <= 27 ? '#f4f5ab' :
	a <= 28 ? '#f8fa89' :
	a <= 29 ? '#fafc58' :
	a <= 30 ? '#f7fa2f' :
	a <= 31 ? '#fad852' :
	a <= 32 ? '#fad234' :
	a <= 33 ? '#fabf34' :
	a <= 34 ? '#fcb50d' :
	a <= 35 ? '#fc8d17' :
	a <= 36 ? '#fa803e' :
	a <= 37 ? '#fc5c30' :
	a <= 38 ? '#fa0707' :
	a <= 39 ? '#b80404' :
	a <= 40 ? '#870303' :
	a <= 41 ? '#610101' :
	a <= 42 ? '#3d0101' :	
		'YELLOW';
};

function style8(feature) {
	return {
		fillColor: getColor8(feature.properties.percentil), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup8(feature, layer) {

	if (feature.properties && feature.properties.percentil) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Temperatura: </strong>"+feature.properties.percentil.toFixed(1).toLocaleString().replace(".",",")+"°C",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson8 = L.geoJson(desempleo,{
	style: style8,
	onEachFeature: popup8
});


//capas de limites. La última capa en declarar se ubica siempre encima de las demás.

// rios.js

/*
function stylerios(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 3,
		opacity: 1,
		color: '#42f5ef',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var rios = L.geoJson(rios,{
	style: stylerios,
	
}).addTo(map);

//Buscador de ríos
var searchControl = new L.Control.Search({
       layer: rios,
       propertyName: 'NOM_RIO',
       marker: false,
		moveToLocation: function(latlng) {
			console.log(latlng +" Coordinates");
  			map.setView(latlng, 10); // set the zoom
		}
});

map.addControl(searchControl);
*/

//Renombrado y ordenado de capas mapas geojson

var prov = L.geoJson(prov_limit,{
	style: styleprov
});

var mapa1 = L.layerGroup([geojson1,prov])
var mapa2 = L.layerGroup([geojson2,prov])
var mapa3 = L.layerGroup([geojson3,prov])
var mapa4 = L.layerGroup([geojson4,prov]).addTo(map);
var mapa5 = L.layerGroup([geojson5,prov])
var mapa6 = L.layerGroup([geojson6,prov])
var mapa8 = L.layerGroup([geojson8,prov])

/*var mapa6 = L.layerGroup([geojson6]);
*/


// LISTA DESPLEGABLE

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Cambio en el número y duración de los eventos de ola de calor en España por municipios.',
	children: [
	
			{ label: "Temperatura umbral de ola de calor",layer: mapa8},
			{ label: "Número total de eventos de ola de calor. Período 1991-2020",layer: mapa4},
			{ label: "Número total de eventos de ola de calor. Período 1961-1990",layer: mapa3},
			  	
	    	{ label: "Duración media de los eventos de ola de calor. Período 1991-2020",layer: mapa5},
	    	{ label: "Duración media de los eventos de ola de calor. Período 1961-1990",layer: mapa6}, 
			{ label: "Cambio en el número de eventos de ola de calor entre los períodos 1961-1990 y 1991-2020",layer: mapa2},
	    	{ label: "Cambio en la duración media de eventos de ola de calor entre los períodos 1961-1990 y 1991-2020",layer: mapa1},
	    	
	    	
	    	
		/*{ label: "Proporción de pesonas centenarias",layer: mapa6}
		*/
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		]
};	




var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Cambio en la duración media de los eventos de ola de calor entre 1961-1990 y 1991-2020'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h4>"+  '<br>Diferencia entre períodos<br><br> Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Número de días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-0,4 ‒ -0,2'+"</strong><\h15>",html: '',style: {'background-color': '#878686','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-0,2 ‒ 0,0'+"</strong><\h15>",html: '',style: {'background-color': '#bfbdbd','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,0 ‒ 0,2'+"</strong><\h15>",html: '',style: {'background-color': '#ededce','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,2 ‒ 0,4'+"</strong><\h15>",html: '',style: {'background-color': '#e8d0a2','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,4 ‒ 0,6'+"</strong><\h15>",html: '',style: {'background-color': '#edbc93','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,6 ‒ 0,8'+"</strong><\h15>",html: '',style: {'background-color': '#f2a25e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				label:"<strong><h3>"+  '0,8 ‒ 1,0'+"</strong><\h15>",html: '',style: {'background-color': '#e34944','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '1,0 ‒ 1,2'+"</strong><\h15>",html: '',style: {'background-color': '#ba433f','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '1,2 ‒ 1,4'+"</strong><\h15>",html: '',style: {'background-color': '#853d3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Cambio en el número de eventos de ola de calor entre los períodos 1961-1990 y 1991-2020'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{


				label:"<h4>"+  '<br>Diferencia entre períodos<br><br> Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Número de eventos'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '< 0'+"</strong><\h15>",html: '',style: {'background-color': '#Fffef2','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0 ‒ 4'+"</strong><\h15>",html: '',style: {'background-color': '#fcfcc2','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4 ‒ 8'+"</strong><\h15>",html: '',style: {'background-color': '#fafa7f','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8 ‒ 12'+"</strong><\h15>",html: '',style: {'background-color': '#fcfc21','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '12 ‒ 16'+"</strong><\h15>",html: '',style: {'background-color': '#f5cf47','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '16 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#fab54d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 24'+"</strong><\h15>",html: '',style: {'background-color': '#fa984d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '24 ‒ 28'+"</strong><\h15>",html: '',style: {'background-color': '#f50f0f','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '28 ‒ 32'+"</strong><\h15>",html: '',style: {'background-color': '#b50505','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '32 ‒ 36'+"</strong><\h15>",html: '',style: {'background-color': '#7a0505','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '36 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#423030','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				label:"<strong><h3>"+  '40 ‒ 44'+"</strong><\h15>",html: '',style: {'background-color': '#0d0a0a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Número total de eventos de ola de calor. Período 1961-1990'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h4>"+  '<br>Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Número de eventos'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '3 ‒ 5'+"</strong><\h15>",html: '',style: {'background-color': '#f5f4d0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#ffe3c5','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '10 ‒ 15'+"</strong><\h15>",html: '',style: {'background-color': '#ffc4a2','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '15 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffaf94','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '20 ‒ 25'+"</strong><\h15>",html: '',style: {'background-color': '#ff9794','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '25 ‒ 30'+"</strong><\h15>",html: '',style: {'background-color': '#f35749','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '30 ‒ 35'+"</strong><\h15>",html: '',style: {'background-color': '#e32726','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '35 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#bc2627','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 45'+"</strong><\h15>",html: '',style: {'background-color': '#862627','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				label:"<strong><h3>"+  '45 ‒ 50'+"</strong><\h15>",html: '',style: {'background-color': '#bd35a6','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);

/*
return a <= -20 ? '#002573' :
	a <= -15 ? '#0344a0' : 
	a <= -10 ? '#0263ee' :
	a <= -5 ? '#5c92ff': 
	a <= -0.0000001  ? '#feede6' :
	a <= 0.0000001 ? '#ffeea9' :
	a <= 5 ? '#fee2b3' : 
	a <= 10  ? '#fec495' :
	a <= 15  ? '#f6946f' :
	a <= 20  ? '#cf4530' :	
	a <= 100  ? '#a80000' :	
		'YELLOW';
*/
var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Número total de eventos de ola de calor. Período 1991-2020'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{

				label:"<h4>"+  '<br>Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Número de eventos'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '3 ‒ 5'+"</strong><\h15>",html: '',style: {'background-color': '#f5f4d0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#ffe3c5','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '10 ‒ 15'+"</strong><\h15>",html: '',style: {'background-color': '#ffc4a2','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '15 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffaf94','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '20 ‒ 25'+"</strong><\h15>",html: '',style: {'background-color': '#ff9794','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '25 ‒ 30'+"</strong><\h15>",html: '',style: {'background-color': '#f35749','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '30 ‒ 35'+"</strong><\h15>",html: '',style: {'background-color': '#e32726','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '35 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#bc2627','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 45'+"</strong><\h15>",html: '',style: {'background-color': '#862627','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				label:"<strong><h3>"+  '45 ‒ 50'+"</strong><\h15>",html: '',style: {'background-color': '#bd35a6','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);
/*
return a <= 100 ? '#fffecb' :
	a <= 500 ? '#d7eeaa' : 
	a <= 1000 ? '#a8db8e' :
	a <= 5000 ? '#78c67a': 
	a <= 10000  ? '#48af60' :
	a <= 30000 ? '#218e4a' :
	a <= 1000000 ? '#006837' :
*/
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Duración media de los eventos de ola de calor. Período 1991-2020'+"<\h2>",
			style: style5,
			layer: geojson5,
			elements: [{


				label:"<h4>"+  '<br>Promedio del período 1991-2020<br><br>Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Número de días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '3,2 ‒ 3,4'+"</strong><\h15>",html: '',style: {'background-color': '#fcf5bb','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,4 ‒ 3,6'+"</strong><\h15>",html: '',style: {'background-color': '#faddac','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,6 ‒ 3,8'+"</strong><\h15>",html: '',style: {'background-color': '#ffbd7a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,8 ‒ 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#fa9228','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4,0 ‒ 4,2'+"</strong><\h15>",html: '',style: {'background-color': '#bf4e11','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '4,2 ‒ 4,4'+"</strong><\h15>",html: '',style: {'background-color': '#990b25','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '4,4 ‒ 4,6'+"</strong><\h15>",html: '',style: {'background-color': '#6b0d9c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '> 4,6'+"</strong><\h15>",html: '',style: {'background-color': '#440863','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);


var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Duración media de los eventos de ola de calor. Período 1961-1990'+"<\h2>",
			style: style6,
			layer: geojson6,
			elements: [{


				label:"<h4>"+  '<br>Promedio del período 1961-1990<br><br>Ola de calor: tres días consecutivos en los que se supera el percentil 95 de la temperatura máxima diaria de los meses de julio y agosto del período de referencia 1971-2000<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Número de días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '3,2 ‒ 3,4'+"</strong><\h15>",html: '',style: {'background-color': '#fcf5bb','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,4 ‒ 3,6'+"</strong><\h15>",html: '',style: {'background-color': '#faddac','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,6 ‒ 3,8'+"</strong><\h15>",html: '',style: {'background-color': '#ffbd7a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3,8 ‒ 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#fa9228','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4,0 ‒ 4,2'+"</strong><\h15>",html: '',style: {'background-color': '#bf4e11','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '4,2 ‒ 4,4'+"</strong><\h15>",html: '',style: {'background-color': '#990b25','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '4,4 ‒ 4,6'+"</strong><\h15>",html: '',style: {'background-color': '#6b0d9c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '> 4,6'+"</strong><\h15>",html: '',style: {'background-color': '#440863','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);

var htmlLegend8 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Temperatura umbral de ola de calor por municipios'+"<\h2>",
			style: style8,
			layer: geojson8,
			elements: [{


				label:"<h4>"+  '<br>Percentil 95 de las temperaturas máximas diarias de los meses de julio y agosto del período de referencia 1971-2000.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp °C'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '24 ‒ 25'+"</strong><\h15>",html: '',style: {'background-color': '#f4f5d0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '25 ‒ 26'+"</strong><\h15>",html: '',style: {'background-color': '#f6f7bc','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '26 ‒ 27'+"</strong><\h15>",html: '',style: {'background-color': '#f4f5ab','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '27 ‒ 28'+"</strong><\h15>",html: '',style: {'background-color': '#f8fa89','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '28 ‒ 29'+"</strong><\h15>",html: '',style: {'background-color': '#fafc58','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '29 ‒ 30'+"</strong><\h15>",html: '',style: {'background-color': '#f7fa2f','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '30 ‒ 31'+"</strong><\h15>",html: '',style: {'background-color': '#fad852','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '31 ‒ 32'+"</strong><\h15>",html: '',style: {'background-color': '#fad234','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '32 ‒ 33'+"</strong><\h15>",html: '',style: {'background-color': '#fabf34','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '33 ‒ 34'+"</strong><\h15>",html: '',style: {'background-color': '#fcb50d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '34 ‒ 35'+"</strong><\h15>",html: '',style: {'background-color': '#fc8d17','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '35 ‒ 36'+"</strong><\h15>",html: '',style: {'background-color': '#fa803e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '36 ‒ 37'+"</strong><\h15>",html: '',style: {'background-color': '#fc5c30','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '37 ‒ 38'+"</strong><\h15>",html: '',style: {'background-color': '#fa0707','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '38 ‒ 39'+"</strong><\h15>",html: '',style: {'background-color': '#b80404','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '39 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#870303','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '40 ‒ 41'+"</strong><\h15>",html: '',style: {'background-color': '#610101','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '41 ‒ 42'+"</strong><\h15>",html: '',style: {'background-color': '#3d0101','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2022)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend8);	

//Visualizar capas

// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 

var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});