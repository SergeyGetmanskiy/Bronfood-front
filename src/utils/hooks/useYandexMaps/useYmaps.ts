import { useState, useEffect } from 'react';
import { YMaps3 } from '../../../lib/ymapsTypes';

let isScriptLoading = false;
let scriptLoadPromise: Promise<YMaps3> | null = null;

const loadYandexMaps = (): Promise<YMaps3> => {
    if (window.ymaps3) {
        return Promise.resolve(window.ymaps3 as YMaps3);
    }

    if (isScriptLoading && scriptLoadPromise) {
        return scriptLoadPromise;
    }

    isScriptLoading = true;

    scriptLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const apiKey = import.meta.env.VITE_YNDX_API_KEY;

        if (!apiKey) {
            isScriptLoading = false;
            scriptLoadPromise = null;
            reject(new Error('API ключ Яндекс карт не найден'));
            return;
        }

        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            isScriptLoading = false;
            resolve(window.ymaps3 as YMaps3);
        };

        script.onerror = () => {
            isScriptLoading = false;
            scriptLoadPromise = null;
            reject(new Error('Ошибка при загрузке Яндекс карт'));
        };

        document.head.appendChild(script);
    });

    return scriptLoadPromise;
};

export const useYmaps = () => {
    const [ymaps3, setYmaps3] = useState<YMaps3 | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadYandexMaps()
            .then((maps) => {
                setYmaps3(maps);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return { ymaps3, isLoading, error };
};
