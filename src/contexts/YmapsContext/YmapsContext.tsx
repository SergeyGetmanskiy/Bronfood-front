import { useEffect, FC, useState, PropsWithChildren } from 'react';
import { useYmaps } from '../../utils/hooks/useYandexMaps/useYmaps';
import { createYmapsReactComponents } from '../../lib/ymaps';
import { YmapsContext, YmapsComponents } from './YmapsContextType';

export const YmapsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { ymaps3, isLoading, error } = useYmaps();
    const [components, setComponents] = useState<YmapsComponents | null>(null);
    const [componentsLoading, setComponentsLoading] = useState(true);
    const [componentsError, setComponentsError] = useState<string | null>(null);

    useEffect(() => {
        if (ymaps3 && !components && !error) {
            createYmapsReactComponents(ymaps3)
                .then((ymapsComponents) => {
                    setComponents(ymapsComponents as YmapsComponents);
                    setComponentsLoading(false);
                })
                .catch((err) => {
                    setComponentsError(err.message);
                    setComponentsLoading(false);
                });
        }
    }, [ymaps3, components, error]);

    return (
        <YmapsContext.Provider
            value={{
                components,
                isLoading: isLoading || componentsLoading,
                error: error || componentsError,
            }}
        >
            {children}
        </YmapsContext.Provider>
    );
};
