import { YMapProps as BaseYMapProps, YMapMarkerProps as BaseYMapMarkerProps, YMapListenerProps } from '@yandex/ymaps3-types';
import { ComponentType, ReactNode } from 'react';

export interface YMapProps extends BaseYMapProps {
    children?: ReactNode;
}

export interface YMapMarkerProps extends BaseYMapMarkerProps {
    children?: ReactNode;
    onClick?: () => void;
}

export interface YMaps3 {
    ready: Promise<void>;
    import: (module: string) => Promise<unknown>;
    YMap: new (element: HTMLElement, props: BaseYMapProps) => unknown;
}

export interface YMaps3ReactifyModule {
    reactify: {
        bindTo: (
            React: typeof import('react'),
            ReactDOM: typeof import('react-dom')
        ) => {
            module: (ymaps: YMaps3) => {
                YMap: ComponentType<YMapProps>;
                YMapDefaultSchemeLayer: ComponentType;
                YMapDefaultFeaturesLayer: ComponentType;
                YMapMarker: ComponentType<YMapMarkerProps>;
                YMapListener: ComponentType<YMapListenerProps>;
            };
        };
    };
}

declare global {
    interface Window {
        ymaps3: YMaps3;
    }
}
