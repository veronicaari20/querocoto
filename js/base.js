// Mapa Leaflet
var mapa2 = L.map('mapid').setView([-6.245234,-78.873381],8);

// Definición de capas base de tesela
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa2);	

// Otra capa base de tesela
var CartoDB_Voyager = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		subdomains: 'abcd',
		maxZoom: 19
	}
).addTo(mapa2);


// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "CartoDB Voyager": CartoDB_Voyager
};	    

// distrito----------------------------------------------------------------------------------------

function Infodist(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>Distrito</h1>"
		+"<b>Departamento: </b>"+feature.properties.NOMB_DEP+"</b><br>"
		+"<b>Provincia: </b>"+feature.properties.NOMB_PROV+"</b><br>"
		+"<b>Distrito: </b>"+feature.properties.NOMB_DIST+"</b><br>");
	}
  }

  // show
var distrito = L.geoJson(distrito, {
	className: 'poly2',
	onEachFeature: Infodist,
  }).addTo(mapa2);


// provincia----------------------------------------------------------------------------------------

function Infoprov(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>Provincia</h1>"
		+"<b>Codigo: </b>"+feature.properties.CODIGO_DEP+"</b><br>"
		+"<b>Departamento: </b>"+feature.properties.NOMB_DEP+"</b><br>"
		+"<b>Provincia: </b>"+feature.properties.NOMB_PROV+"</b><br>");
	}
  }
  
  // show
var provincia = L.geoJson(provincia, {
	className: 'poly1',
	onEachFeature: Infoprov,
  }).addTo(mapa2);



  
  // var estilocanchis = {
  //   'color': '#f60707', 
  //   'stroke-width': 3,  
  //   'weight': 0
   
  // }
   
  
var po_cajamarca = L.geoJson(po_cajamarca, {
	className: 'poly' 
  }).addTo(mapa2);
  

  // layers--------------------------------------------------------------------------------------------------------vias_cajamrc
  
var overlayMaps = {
	  'PROV': provincia,
	  'DIST': distrito,
	  'GRC': po_cajamarca,
  };

var control = L.control.layers(capas_base, overlayMaps, {
	collapsed: true,
	autoZIndex: true,
  }).addTo(mapa2);
  
L.control.scale({position: "topright", imperial: false}).addTo(mapa2);