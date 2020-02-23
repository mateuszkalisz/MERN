import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import jsonData from '../../../credentials/mapbox.json';


import './Map.css';


const Map = props =>{

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const {center, zoom} = props;


    // console.log(center);
  
    useEffect(() => {
      mapboxgl.accessToken = jsonData[0].key;
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [center.lot, center.lat],
          zoom: zoom
        });
  
        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      };
  
      if (!map) initializeMap({ setMap, mapContainer });
    }, [center, zoom, map]);
  
    return <div ref={el => (mapContainer.current = el)} className={`map ${props.className}`} style={props.style} />;
  };

export default Map;