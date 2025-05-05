import { camelCase } from 'lodash';
import i18next from 'i18next';

export const getErrorMessage = (error: Error, path: string) => {
    if (error.message !== 'Validation Error') {
        return i18next.t(`${path}${camelCase(error.message)}`);
    } else {
        const cause = error.cause as Record<string, string | string[]>;
        let errorMessage: string = '';
        for (const key in cause) {
            if (!Array.isArray(cause[key])) {
                errorMessage = errorMessage.concat('\n', i18next.t(`${path}${camelCase(key + ' ' + cause[key][0])}`));
            } else {
                cause[key].forEach((cause) => {
                    errorMessage = errorMessage.concat('\n', i18next.t(`${path}${camelCase(key + ' ' + cause)}`));
                });
            }
        }
        return errorMessage;
    }
};
