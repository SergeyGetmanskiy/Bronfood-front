import React from 'react';
import ReactDom from 'react-dom';
import { YMaps3, YMaps3ReactifyModule } from './ymapsTypes';

export const createYmapsReactComponents = async (ymaps3: YMaps3) => {
    const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify') as Promise<YMaps3ReactifyModule>, ymaps3.ready]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
    const components = reactify.module(ymaps3);

    return components;
};
