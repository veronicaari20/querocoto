
// Mapa Leaflet
var mapa2 = L.map('mapid').setView([ -6.219900,-79.059634],12);

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
	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
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



// Capas vectoriales en formato GeoJSON

function Infoerp(feature, layer) {
  if (feature.properties && feature.properties) {
      layer.bindPopup("<h1>Informacion del Rural</h1>"
      +"<b>ID_LOTE: </b>"+feature.properties.UC_PR+"</b><br>"
      +"<b>CUC: </b>"+feature.properties.ID_PRY+"</b><br>"
      +"<b>Sector: </b>"+feature.properties.Condicion+"</b><br>"
      +"<b>Manzana: </b>"+feature.properties.NOMB_PR+"</b><br>"
      +"<b>Lote: </b>"+feature.properties.AREA_PR+"</b><br>"
      +"<b>Area_m2: </b>"+feature.properties.PERI_PR+"</b><br>"
      );
  }
}

// show
var predio_rural = L.geoJson(predio_rural, {
  className: 'rural',
  
  onEachFeature: Infoerp,
}).addTo(mapa2)



// layers///-----------------------------------------------------------------


var searchControl = new L.control.search({
  layer: predio_rural,
  initial: false,
  propertyName: 'UC_PR',
  zoom: 21,
  buildTip: function(text, val) {
    var type = val.layer.feature.properties.amenity;
    return '<a href="#" class="'+type+'">'+text+'<b>'+' UC_PR | ID_PRY '+'</b></a>';
  }
})
mapa2.addControl(searchControl);


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
	className: 'dist',
	onEachFeature: Infodist,
  }).addTo(mapa2);

var ccpp = L.geoJson(ccpp, {
	className: 'poly' 
  }).addTo(mapa2);

var vias_cajamrc = L.geoJson(vias_cajamrc, {
	className: 'line' 
  }).addTo(mapa2);
    
var po_cajamarca = L.geoJson(po_cajamarca, {
	className: 'poly' 
  }).addTo(mapa2);


var overlayMaps = {
  "RURAL": predio_rural,
  'GRC': po_cajamarca,
  'VIAS': vias_cajamrc,
  'DIST': distrito,
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



