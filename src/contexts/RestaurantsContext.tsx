import { FC, PropsWithChildren, createContext, useCallback, useState, Dispatch, SetStateAction, useMemo } from 'react';
import { Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { options, types } from '../pages/Restaurants/MockRestaurantsList';
import { LngLatBounds } from '@yandex/ymaps3-types';
import { useRestaurants } from '../utils/hooks/useRestaurants/useRestaurants';

export type Option = {
    /**
     * Option's id. Option may be either a meal's name or a venue's name
     */
    id: number;
    /**
     * Option's name
     */
    name: string;
};

export type VenueType = {
    /**
     * Type's id.
     */
    id: number;
    /**
     * Type of venue. Not to be confused with venue's name
     */
    name: string;
};

export type RestaurantsContext = {
    /**
     * Reload data restaurants
     */
    refetch: () => void;
    /**
     * Sets clicked restaurant page
     */
    setActiveRestaurant: (id: number) => void;
    /**
     * Restaurant which is clicked in a list
     */
    inView?: number;
    /**
     * List of restaurants currently on map
     */
    restaurantsOnMap: Restaurant[];
    /**
     * List of restaurants filtered with user selected options
     */
    restaurantsFiltered: Restaurant[];
    /**
     * Indicates whether restaurants are loading
     */
    isLoading: boolean;
    /**
     * Indicates whether query encountered an error
     */
    isError: boolean;
    /**
     * Sets restaurant which is clicked in a list
     */
    setInView: (id: number) => void;
    /**
     * Restaurant which is last clicked in a list
     */
    lastClickedRestaurantId: number | null;
    /**
     * Sets restaurant which is last clicked in a list
     */
    setLastClickedRestaurantId: (id: number | null) => void;
    /**
     * Options' states and controls. Options come from user's input
     */
    options: {
        /**
         * List of all options available
         */
        all: Option[];
        /**
         * List of options selected by user
         */
        selectedOptions: Option[];
        /**
         * Add option to the list of selected options
         */
        addOption: (option: Option) => void;
        /**
         * Remove option from the list of selected options
         */
        deleteOption: (option: Option) => void;
    };
    /**
     * Types of venues states and control
     */
    venueTypes: {
        /**
         * All types of venues found on map
         */
        all: VenueType[];
        /**
         * List of venue types selected by user
         */
        selectedVenueTypes: VenueType[];
        /**
         * Add venue type to the list of selected venue types
         */
        addVenueType: (type: VenueType) => void;
        /**
         * Remove venue type from the list of selected venue types
         */
        deleteVenueType: (type: VenueType) => void;
    };
    /**
     * Sets Yandex map's bounds
     */
    setBounds: Dispatch<SetStateAction<LngLatBounds | never[]>>;
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    setActiveRestaurant: () => {},
    restaurantsOnMap: [],
    restaurantsFiltered: [],
    isLoading: false,
    isError: false,
    refetch: () => {},
    setInView: () => {},
    lastClickedRestaurantId: null,
    setLastClickedRestaurantId: () => {},
    options: {
        all: [],
        selectedOptions: [],
        addOption: () => {},
        deleteOption: () => {},
    },
    venueTypes: {
        all: [],
        selectedVenueTypes: [],
        addVenueType: () => {},
        deleteVenueType: () => {},
    },
    setBounds: () => {},
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [inView, setInView] = useState<number | undefined>(undefined);
    const [lastClickedRestaurantId, setLastClickedRestaurantId] = useState<number | null>(null);
    const [bounds, setBounds] = useState<LngLatBounds | never[]>([]);
    const { isLoading, isError, isSuccess, data, refetch } = useRestaurants(bounds);
    const restaurantsOnMap: Restaurant[] = useMemo(() => getRestaurantsOnMap(isSuccess, data?.data as Restaurant[]), [isSuccess, data]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<VenueType[]>([]);
    const restaurantsFiltered: Restaurant[] = useMemo(() => filterRestaurants(selectedOptions, selectedVenueTypes, restaurantsOnMap), [selectedOptions, selectedVenueTypes, restaurantsOnMap]);
    const setActiveRestaurant = useCallback((id: number) => {
        setInView(id);
    }, []);
    const addOption = useCallback(
        (option: Option) => {
            if (!selectedOptions.find((opt: Option) => opt.id === option.id)) {
                setSelectedOptions([...selectedOptions, option]);
            }
        },
        [selectedOptions]
    );
    const deleteOption = useCallback(
        (option: Option) => {
            setSelectedOptions(selectedOptions.filter((opt: Option) => opt.id !== option.id));
        },
        [selectedOptions]
    );
    const addVenueType = useCallback(
        (venueType: VenueType) => {
            if (!selectedVenueTypes.find((type: VenueType) => type.id === venueType.id)) {
                setSelectedVenueTypes([...selectedVenueTypes, venueType]);
            }
        },
        [selectedVenueTypes]
    );
    const deleteVenueType = useCallback(
        (venueType: VenueType) => {
            setSelectedVenueTypes(selectedVenueTypes.filter((type: VenueType) => type.id !== venueType.id));
        },
        [selectedVenueTypes]
    );

    const contextValue = useMemo(
        () => ({
            isLoading,
            isError,
            setActiveRestaurant,
            restaurantsFiltered,
            refetch: refetch,
            restaurantsOnMap,
            inView,
            setInView,
            lastClickedRestaurantId,
            setLastClickedRestaurantId,
            options: {
                all: options,
                selectedOptions,
                addOption,
                deleteOption,
            },
            venueTypes: {
                all: types,
                selectedVenueTypes,
                addVenueType,
                deleteVenueType,
            },
            setBounds,
        }),
        [isLoading, isError, setActiveRestaurant, restaurantsFiltered, refetch, restaurantsOnMap, inView, setInView, lastClickedRestaurantId, setLastClickedRestaurantId, selectedOptions, addOption, deleteOption, selectedVenueTypes, addVenueType, deleteVenueType, setBounds]
    );

    return <RestaurantsContext.Provider value={contextValue}>{children}</RestaurantsContext.Provider>;
};

function filterRestaurants(options: Option[], types: VenueType[], restaurants: Restaurant[]) {
    if (options.length === 0 && types.length === 0) {
        return restaurants;
    } else {
        return restaurants.filter((restaurant) => {
            const optionNames = options.map((option) => option.name.toLowerCase());
            const typeNames = types.map((type) => type.name.toLowerCase());
            return optionNames.includes(restaurant.name.toLowerCase()) || typeNames.includes(restaurant.type.toLowerCase());
        });
    }
}

function getRestaurantsOnMap(loaded: boolean, data: Restaurant[]) {
    if (loaded) {
        return data;
    } else return [];
}
