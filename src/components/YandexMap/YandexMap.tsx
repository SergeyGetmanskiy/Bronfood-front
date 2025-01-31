import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapListener } from '../../lib/ymaps';
import styles from './YandexMap.module.scss';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useNavigate } from 'react-router-dom';
import marker from '../../vendor/images/map-marker.png';

export default function YandexMap({ setCity }: { setCity: Dispatch<SetStateAction<string>> }) {
    /* const [bounds, setBounds] = useState([]); */
    const [center, setCenter] = useState([76.921552, 43.246345]);
    const [zoom, setZoom] = useState(12);
    const [userLocation, setUserLocation] = useState([]);
    const [activePlaceId, setActivePlaceId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { restaurantsFiltered, inView } = useRestaurants();
    console.log(center);

    const handleActionEnd = (e) => {
        const boundsCoords = e.location.bounds;
        setCenter(e.location.center);
        setZoom(e.location.zoom);
        setBounds(boundsCoords);
    };

    const handlePlacemarkClick = (placeId: number, longitude: number, latitude: number) => {
        setCenter([longitude, latitude]);
        navigate(`/restaurants/${placeId}`);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.longitude, position.coords.latitude]);
                setCenter([position.coords.longitude, position.coords.latitude]);
            });
        }
    }, []);

    useEffect(() => {
        if (inView) {
            setActivePlaceId(inView);
            const place = restaurantsFiltered.find((place) => place.id === inView);
            if (place) {
                setCenter([place.coordinates.longitude, place.coordinates.latitude]);
            }
        }
    }, [inView, restaurantsFiltered]);

    useEffect(() => {
        async function fetchLocality() {
            setCity('');
            const res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_YNDX_API_KEY}&geocode=${userLocation}&format=json`);
            if (res.ok) {
                const result = await res.json();
                if (!ignore) {
                    const locality = result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter((c) => c.kind === 'locality')[0].name;
                    setCity(locality);
                }
            }
        }
        let ignore = false;
        if (userLocation.length > 0) {
            fetchLocality();
        }
        return () => {
            ignore = true;
        };
    }, [userLocation, setCity]);

    return (
        <div className={styles.yamap}>
            <YMap location={{ center: center, zoom: zoom }}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapListener onActionEnd={handleActionEnd} />
                {restaurantsFiltered.map((place) => {
                    const marked = activePlaceId === place.id;
                    return (
                        <YMapMarker key={place.id} coordinates={[place.coordinates.longitude, place.coordinates.latitude]} draggable={false} onClick={() => handlePlacemarkClick(place.id, place.coordinates.longitude, place.coordinates.latitude)}>
                            <img className={`${styles['yamap__restaurant-marker']} ${marked ? styles['yamap__restaurant-marker_marked'] : ''} `} src={place.photo}></img>
                        </YMapMarker>
                    );
                })}
                {userLocation && (
                    <YMapMarker key={userLocation[0]} coordinates={userLocation} draggable={false}>
                        <img className={`${styles['yamap__user-marker']} `} src={marker} />
                    </YMapMarker>
                )}
            </YMap>
        </div>
    );
}
