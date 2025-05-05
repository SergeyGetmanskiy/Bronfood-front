import { camelCase } from 'lodash';
import i18next from 'i18next';

export const getErrorMessage = (error: Error, path: string) => {
    if (error.message !== 'Validation Error') {
        return i18next.t(`${path}${camelCase(error.message)}`);
    } else {
        let errorMessage: string = '';
        for (const key in error.cause) {
            if (error.cause[key].length === 1) {
                errorMessage = errorMessage.concat('\n', i18next.t(`${path}${camelCase(key + ' ' + error.cause[key][0])}`));
            } else {
                const messages: string[] = error.cause[key];
                messages.forEach((cause) => {
                    errorMessage = errorMessage.concat('\n', i18next.t(`${path}${camelCase(key + ' ' + cause)}`));
                });
            }
        }
        return errorMessage;
    }
};
