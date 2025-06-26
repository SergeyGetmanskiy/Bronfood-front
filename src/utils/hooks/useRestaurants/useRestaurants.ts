import { useQuery, skipToken } from '@tanstack/react-query';
import { restaurantsService, SearchSuggestion } from '../../api/restaurantsService/restaurantsService';
import { LngLatBounds } from '@yandex/ymaps3-types';
import { uniq } from 'lodash';
import { VenueType } from '../../../contexts/RestaurantsContext';

export const useRestaurants = (bounds: LngLatBounds, selectedOptions: SearchSuggestion[], selectedVenueTypes: VenueType[]) => {
    const ids = uniq(selectedOptions.map((item) => item.restaurant_ids).flat());
    const types = selectedVenueTypes.map((item) => item.name);
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants', bounds, ids, types],
        queryFn: bounds.length > 0 ? () => restaurantsService.getRestaurants(bounds as LngLatBounds, ids, types) : skipToken,
    });
    return {
        isLoading,
        isError,
        restaurantsOnMap: isSuccess ? data.data : [],
        refetch,
    };
};
