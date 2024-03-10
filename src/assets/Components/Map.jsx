import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import pinIcon from '../../../public/Pin-Icon.svg';

function MapComponent() {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const projection = useGeographic();

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        const mapInstance = new Map({
                            target: mapRef.current,
                            layers: [
                                new TileLayer({
                                    source: new OSM(),
                                }),
                            ],
                            view: new View({
                                center: [position.coords.longitude, position.coords.latitude],
                                zoom: 10,
                                projection: projection,
                            }),
                        });


                        const marker = new Feature({
                            geometry: new Point([position.coords.longitude, position.coords.latitude]),
                        });

                        marker.setStyle(new Style({
                            image: new Icon({
                                src: pinIcon,
                                anchor: [0.5, 1],
                                scale: 0.1,
                            }),
                        }));

                        const vectorLayer = new VectorLayer({
                            source: new VectorSource({
                                features: [marker],
                            }),
                        });

                        mapInstance.addLayer(vectorLayer);

                        const popup = new Overlay({
                            element: markerRef.current,
                            positioning: 'bottom-center',
                            stopEvent: false,
                            offset: [0, -50],
                        });

                        mapInstance.addOverlay(popup);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, [projection]);


    return (
        <div>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
            <div ref={markerRef} className="marker-popup">
            </div>
        </div>
    );
}

export default MapComponent;
