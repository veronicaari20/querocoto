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


// comunidad campesina----------------------------------------------------------------------------------------

function Infocc(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>Comunidad Campesina</h1>"
		+"<b>Descripcion: </b>"+feature.properties.Nombre+"</b><br>"
		+"<b>Condicion: </b>"+feature.properties.Condicion+"</b><br>"
		+"<b>Resolucion: </b>"+feature.properties.Resolucion+"</b><br>"
		+"<b>Area_ha: </b>"+feature.properties.Area_ha+"</b><br>"
		+"<b>Perimetro_m: </b>"+feature.properties.Shape_Leng+"</b><br>");
	}
  }
  
  // show
var c_campesina = L.geoJson(c_campesina, {
	className: 'CC',
	onEachFeature: Infocc,
  }).addTo(mapa2);
  
  
// Comun_Nativa----------------------------------------------------------------------------------------
  
function Infocn(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>Comunidad Nativa</h1>"
		+"<b>Descripcion: </b>"+feature.properties.NOMBRE+"</b><br>"
		+"<b>Etenia: </b>"+feature.properties.ETNIA1+"</b><br>"
		+"<b>Poblacion: </b>"+feature.properties.POBLACION+"</b><br>"
		+"<b>Familias: </b>"+feature.properties.FAMILIAS+"</b><br>"
		+"<b>Areas: </b>"+feature.properties.AREA_TITUL+"</b><br>"
		+"<b>Area_uso: </b>"+feature.properties.AREA_USO+"</b><br>"
		+"<b>Resolucion: </b>"+feature.properties.NRORESOLRE+"</b><br>");
	}
  }
  
  // show
var c_nativa = L.geoJson(c_nativa, {
	className: 'CN',
	onEachFeature: Infocn,
  }).addTo(mapa2);
  
  // var estilocanchis = {
  //   'color': '#f60707', 
  //   'stroke-width': 3,  
  //   'weight': 0
   
  // }

  var ZA = L.geoJson(ZA, {
	className: 'ZA' 
  }).addTo(mapa2);
   
// anp---------------------------------------------------------------------------------------
  
function Infanp(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>Area Natural Protegida</h1>"
		+"<b>Descripcion: </b>"+feature.properties.anp_cate+"</b><br>"
		+"<b>Departamento: </b>"+feature.properties.anp_ubpo+"</b><br>"
		+"<b>Coservacion: </b>"+feature.properties.anp_uicn+"</b><br>"
		+"<b>Sector: </b>"+feature.properties.anp_sect+"</b><br>");
	}
  }
  
  // show
var ANP = L.geoJson(ANP, {
	className: 'ANP',
	onEachFeature: Infanp,
  }).addTo(mapa2);


// catastro_Minero1---------------------------------------------------------------------------------------
function Infocmr(feature, layer) {
	if (feature.properties && feature.properties) {
		layer.bindPopup("<h1>catastro_Minero</h1>"
		+"<b>Codigo: </b>"+feature.properties.CODIGOU+"</b><br>"
		+"<b>Descripcion: </b>"+feature.properties.CONCESION+"</b><br>"
		+"<b>Estado: </b>"+feature.properties.D_ESTADO+"</b><br>"
		+"<b>Departamento: </b>"+feature.properties.DEPA+"</b><br>"
		+"<b>Provincia: </b>"+feature.properties.PROV+"</b><br>"
		+"<b>Distrito: </b>"+feature.properties.DIST+"</b><br>");
	}
  }
  
  // show
var catastro_minero = L.geoJson(catastro_minero, {
	className: 'poly',
	onEachFeature: Infocmr,
  }).addTo(mapa2);

// -------------------------------------------------------------------------------------- 
var po_cajamarca = L.geoJson(po_cajamarca, {
	className: 'poly' 
  }).addTo(mapa2);


  
// var vias_cajamrc = L.geoJson(vias_cajamrc, {
// 	className: 'line' 
//   }).addTo(mapa2);
  
  
  // layers--------------------------------------------------------------------------------------------------------vias_cajamrc
  
var overlayMaps = {
	  'CC': c_campesina,
	  'CN': c_nativa,
	  'ANP': ANP,
	  'ZA': ZA,
	  'CM': catastro_minero,	  
	  'GRC': po_cajamarca,
  };

var control = L.control.layers(capas_base, overlayMaps, {
	collapsed: true,
	autoZIndex: true,
  }).addTo(mapa2);
  

// Control de escala
L.control.scale({position: "topright", imperial: false}).addTo(mapa2);

// Locate-----------------------------------------------------------------------------------------------------------
L.control.locate({
	icon: 'fas fa-street-view',
	position: 'topleft', 
  }).addTo(mapa2);
  
  
  