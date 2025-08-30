import { createContext } from 'react';
import { ComponentType } from 'react';
import { YMapProps, YMapMarkerProps } from '../../lib/ymapsTypes';
import { YMapListenerProps } from '@yandex/ymaps3-types';

export interface YmapsComponents {
    YMap: ComponentType<YMapProps>;
    YMapDefaultSchemeLayer: ComponentType;
    YMapDefaultFeaturesLayer: ComponentType;
    YMapMarker: ComponentType<YMapMarkerProps>;
    YMapListener: ComponentType<YMapListenerProps>;
}

export type YmapsContextType = {
    components: YmapsComponents | null;
    isLoading: boolean;
    error: string | null;
};

export const YmapsContext = createContext<YmapsContextType>({
    components: null,
    isLoading: true,
    error: null,
});
