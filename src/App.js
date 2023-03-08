import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Tabs from './components/tabs'
import Select from "react-select";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { LayersControl } from 'react-leaflet/LayersControl'
import { LayerGroup } from 'react-leaflet/LayerGroup'
import 'leaflet/dist/leaflet.css';
import {useEffect, useState, useRef} from 'react';
import green from './images/green.png'
import red from './images/red.png'
import orange from './images/orange2.png'
import data from './commun.json';


function App() {
  const mapRef = useRef();
  const L = require("leaflet");
  useEffect(() => {
    

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const LeafIcon = L.Icon.extend({
    options: {}
    
  });

  const greenIcon = new LeafIcon({
    iconUrl: green,
    iconSize:     [38, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -46]
      
  }),
  redIcon = new LeafIcon({
    iconUrl:red,
    iconSize:     [38, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -46]
  }),
  orangeIcon = new LeafIcon({
    iconUrl:orange,
    iconSize:     [28, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -46]
  });
  const [wilaya, setWilaya] = useState()
  const [commun_list_data, setCommun_list_data] = useState()
  const [commun_list_name, setCommun_list_name] = useState()
  const [commun, setCommun] = useState()
  const algeria_wilaya = data.wilaya.map((obj)=>
  ({value:obj.name, label:obj.name}));

  const handleWilayaChange = (selected)=>{
    const { current :map } = mapRef;
    const wilaya_data = data.wilaya.find(obj => obj.name === selected.value)

    map.flyTo([wilaya_data.longitude,wilaya_data.latitude], 10, {
      duration: 2
    });

    setWilaya(selected.value);
    const commun_data = data.Commun.filter(obj => obj.wilaya_id === wilaya_data.id)
    setCommun_list_data(commun_data)
    setCommun_list_name(commun_data.map((obj)=>
    ({value:obj.name, label:obj.name})))
    
  }

  const handleCommunChange = (selected)=>{
    const { current :map } = mapRef;
    const commun_data = commun_list_data.find(obj => obj.name === selected.value)

    map.flyTo([commun_data.longitude,commun_data.latitude], 15, {
      duration: 2
    });
    setCommun(selected.value);
  }
  
  const handleReset = ()=>{
    const { current :map } = mapRef;
    map.flyTo([29.2080, 2.9475], 5, {
      duration: 2
    });
    setCommun();
  }
  return (
    <div className="App">
      
      <div className="search">
        <div className='search'>
          <span className='filter-label-name'>Wilaya</span>
          <Select options={algeria_wilaya}
          onChange={handleWilayaChange}
          className='select'/>
        </div>

        <div className='search'>
          <span className='filter-label-name'>Commun</span>
          <Select options={commun_list_name}
          onChange={handleCommunChange}
          className='select'/>
        </div>

        <div className='search'>
          <span className='filter-label-name'>Dayra</span>
          <Select options={wilaya} className='select'/>
        </div>

        <button className="btn btn-primary fs-5 " onClick={handleReset} 
                            type="button">Reset</button>
      
      </div>
      <div className='search'>
      <MapContainer className='map' ref={mapRef} center={[29.2080, 2.9475]} minZoom={5} maxZoom={19} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Normal">
            <LayerGroup>
              <Marker position={[36.7333, 	3.1097]} icon= {greenIcon} 
              eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e)
              }}}>
                <Popup>
                  Magharia. <br /> Easily customizable.
                </Popup>
              </Marker>

              <Marker position={[35.6939, -0.6540]} icon= {greenIcon}>
                <Popup>
                  Oran. <br /> Easily customizable.
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Problems">
            <LayerGroup>
              <Marker position={[36.7664, 	3.0525]} icon= {redIcon}>
                <Popup>
                  AGHA. <br /> Easily customizable.
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="maintenance">
            <LayerGroup>
              <Marker position={[36.6021, 	2.3173]}  icon= {orangeIcon}>
                <Popup>
                  Tipaza. <br /> Easily customizable.
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        

        

        

      </MapContainer>





      <Tabs />




            </div>
      
      
      
    </div>
  );
}

export default App;
