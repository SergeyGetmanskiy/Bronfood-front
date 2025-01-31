import { Dispatch, SetStateAction, useEffect, useState, useMemo, useCallback } from 'react';
import { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapListener } from '../../lib/ymaps';
import type { MapEventUpdateHandler, BehaviorMapEventHandler } from '@yandex/ymaps3-types';
import styles from './YandexMap.module.scss';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useNavigate } from 'react-router-dom';
import marker from '../../vendor/images/icons/navigation.svg';
import markerActive from '../../vendor/images/icons/navigation_active.svg';
import userMarker from '../../vendor/images/icons/navigation_grey.svg';

export default function YandexMap({ setCity }: { setCity: Dispatch<SetStateAction<string>> }) {
    const [initialRender, setInitialRender] = useState(true);
    const [center, setCenter] = useState([76.921552, 43.246345]);
    const [zoom, setZoom] = useState(12);
    const [userLocation, setUserLocation] = useState([]);
    const [activePlaceId, setActivePlaceId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { restaurantsFiltered, inView, setLastClickedRestaurantId, setBounds } = useRestaurants();

    const handleMapUpdate: MapEventUpdateHandler = useCallback(
        (object) => {
            const boundsCoords = object.location.bounds;
            setInitialRender(false);
            setBounds(boundsCoords);
        },
        [setBounds]
    );

    const createBehaviorEventHandler = useCallback((): BehaviorMapEventHandler => {
        return function (object) {
            if (object.type === 'dblClick') return;
            const boundsCoords = object.location.bounds;
            setCenter(object.location.center);
            setZoom(object.location.zoom);
            setBounds(boundsCoords);
        };
    }, [setBounds]);

    const handlePlacemarkClick = (placeId: number, longitude: number, latitude: number) => {
        setLastClickedRestaurantId(placeId);
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
        if (inView && activePlaceId !== inView) {
            setActivePlaceId(inView);
            const place = restaurantsFiltered.find((place) => place.id === inView);
            if (place) {
                setCenter([place.coordinates.longitude, place.coordinates.latitude]);
            }
        }
    }, [inView, restaurantsFiltered, activePlaceId]);

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
            <YMap location={{ center: center, zoom: zoom }} margin={[0, 0, 360, 0]}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapListener onActionEnd={useMemo(() => createBehaviorEventHandler(), [createBehaviorEventHandler])} onUpdate={initialRender && handleMapUpdate} />
                {restaurantsFiltered.map((place) => {
                    const active = activePlaceId === place.id;
                    return (
                        <YMapMarker key={place.id} coordinates={[place.coordinates.longitude, place.coordinates.latitude]} draggable={false} onClick={() => handlePlacemarkClick(place.id, place.coordinates.longitude, place.coordinates.latitude)}>
                            <img className={`${styles.yamap.marker} ${active ? styles.yamap.marker_active : ''}`} src={active ? markerActive : marker}></img>
                        </YMapMarker>
                    );
                })}
                {userLocation && (
                    <YMapMarker key={userLocation[0]} coordinates={userLocation} draggable={false}>
                        <img className={styles.yamap.marker} src={userMarker} />
                    </YMapMarker>
                )}
            </YMap>
        </div>
    );
}
