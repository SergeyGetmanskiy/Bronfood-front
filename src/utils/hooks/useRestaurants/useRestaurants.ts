import { useQuery, skipToken } from '@tanstack/react-query';
import { restaurantsService, SearchSuggestion } from '../../api/restaurantsService/restaurantsService';
import { LngLat, LngLatBounds } from '@yandex/ymaps3-types';
import { uniq } from 'lodash';
import { VenueType } from '../../../contexts/RestaurantsContext';

export const useRestaurants = (bounds: LngLatBounds, userLocation: LngLat, selectedOptions: SearchSuggestion[], selectedVenueTypes: VenueType[]) => {
    const ids = uniq(selectedOptions.map((item) => item.restaurant_ids).flat());
    const types = selectedVenueTypes.map((item) => item.name);
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants', bounds, userLocation, ids, types],
        queryFn: bounds.length > 0 ? () => restaurantsService.getRestaurants(bounds as LngLatBounds, userLocation as LngLat, ids, types) : skipToken,
    });
    return {
        isLoading,
        isError,
        restaurantsOnMap: isSuccess ? data.data : [],
        refetch,
    };
};
