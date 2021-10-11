import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { HttpClient } from "@angular/common/http";
import Geocoder from "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
const iconRetinaUrl = "assets/marker-icon-2x.png";
import 'leaflet.BounceMarker'

// import 'leaflet.smooth_marker_bouncing/leaflet.smoothmarkerbouncing.js';


@Component({
  selector: "app-leaflet-map",
  templateUrl: "./leaflet-map.component.html",
  styleUrls: ["./leaflet-map.component.scss"],
})
export class LeafletMapComponent implements OnInit {
  constructor(private http: HttpClient) { }

  //First map options
  options1 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "...",
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };

  layersControl = {
    baseLayers: {
      "Open Street Map": L.tileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { maxZoom: 18, attribution: "..." }
      ),
      "Open Cycle Map": L.tileLayer(
        "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        { maxZoom: 18, attribution: "..." }
      ),
    },
    overlays: {
      "Big Circle": L.circle([46.95, -122], { radius: 5000 }),
      "Big Square": L.polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };

  //Second map
  options2 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 50,
        attribution: "...",
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };

  //Third map
  map: L.Map;
  json;
  options3 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "",
      }),
    ],
    zoom: 7,
    center: L.latLng(47.482019, -1),
  };
  onMapReady(map: L.Map) {
    this.http.get("assets/data/map/polygon.json").subscribe((json: any) => {
      this.json = json;
      L.geoJSON(this.json).addTo(map);
    });
  }

  //Forth map
  map2: L.Map;
  map4;
  homeCoords = {
    lat: 4.641261,
    lon: -74.071352,
  };

  popupText = "Some popup text";
  API_KEY = "pk.5383e9fb4b08c7783919c3ca31d504f1";

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/marker-icon.png",
      shadowUrl: "assets/images/marker-shadow.png",
    }),
  };

  options4 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "",
      }),
    ],
    zoom: 14,
    center: L.latLng(4.641261, -74.071352),
    scrollWheelZoom: true,
    zoomControl: false,
    attributionControl: false,
  };
  initMarkers() {

    const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;
    const markerLocate = L.marker([4.641261, -74.071352], this.markerIcon)
      .addTo(this.map4)
      .bindPopup(popupInfo);
    markerLocate.dragging.enable();
    const marker = L.marker([4.641261, -74.071352]).addTo(this.map4);
   // markerLocate.bounce();
    markerLocate.on("dragend", function (e) {
      console.log(
        "Locate, Latitud: " +
        markerLocate.getLatLng().lat +
        ", Longitud: " +
        markerLocate.getLatLng().lng
      );
    });
  }
  borrarPin(map, evento) {
    if (evento != "Inicial") {
      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    }
  }
  onMapReady4(map: L.Map) {
    L.Icon.Default.prototype.options = {
      iconUrl: "assets/images/marker-icon.png",
      iconSize: [20, 70],
      iconAnchor: [10, 70],
  }
    const markerIcon = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl: "assets/images/marker-icon.png",
        shadowUrl: "assets/images/marker-shadow.png",
      }),
    };
    this.map4 = map;
    var basemaps = {
      Calles: L.tileLayer(
        `https://{s}-tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=${this.API_KEY}`
      ),
      Relieve: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ),
    };
    L.control.layers(basemaps).addTo(map);
    basemaps.Calles.addTo(map);
    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(map);
    GeocoderControl.on("markgeocode", function (e) {
      const markerLocate = L.marker(
        [e.geocode.center.lat, e.geocode.center.lng],
        markerIcon
      ).addTo(map);
      markerLocate.dragging.enable();
      var markerGeocode = L.marker(
        [e.geocode.center.lat, e.geocode.center.lng],
        markerIcon
      ).addTo(map);

      if (markerGeocode !== null) {
        map.removeLayer(markerGeocode);
      }
      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          if (map.getBounds().contains(layer.getLatLng())) {
            map.removeLayer(layer);
          }
        }
      });
      var markerGeocode = L.marker(
        [e.geocode.center.lat, e.geocode.center.lng],
        markerIcon
      ).addTo(map);
      markerGeocode.dragging.enable();
      markerGeocode.on("dragend", function (e) {
        this.longitud = markerGeocode.getLatLng().lng;
        console.log(this.longitud, 333);
        
      });
    });
    //Agregando el botón de zoom
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);
    //Agregando el botón de escala
    L.control.scale().addTo(map);
      map.locate({ setView: true, maxZoom: 20 });
      map.on('locationfound', function (e) {    
        const markerLocate = L.marker([e.latlng.lat, e.latlng.lng],
          {
            draggable: true,
            bounceOnAdd: true,
            bounceOnAddOptions: {duration: 500, height: 100, loop: 2},
            bounceOnAddCallback: function() {console.log("done");}
          }).addTo(map);      
          markerLocate.on("dragend", function (e) {          
          this.longitud = markerLocate.getLatLng().lng;
          console.log(this.longitud, 222);
        });  
      });           
    this.initMarkers();
  }
  onLocationFound(e) { }
  ngOnInit() { }
}
