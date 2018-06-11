import { language_getter } from './html';

interface Translations {
    [language: string]: {
        month: {
            [month: string]: string
        }
    }
}

const translations: Translations = {
    de: {
        month: {
            'Jänner': 'Jänner',
            'Februar': 'Februar',
            'März': 'März',
            'April': 'April',
            'Mai': 'Mai',
            'Juni': 'Juni',
            'Juli': 'Juli',
            'August': 'August',
            'September': 'September',
            'Oktober': 'Oktober',
            'November': 'November',
            'Dezember': 'Dezember',
            'Ø': 'Ø'
        }
    },
    en: {
        month: {
            'Jänner': 'January',
            'Februar': 'February',
            'März': 'March',
            'April': 'April',
            'Mai': 'May',
            'Juni': 'June',
            'Juli': 'July',
            'August': 'August',
            'September': 'September',
            'Oktober': 'October',
            'November': 'November',
            'Dezember': 'December',
            'Ø': 'Ø'
        }
    }
};

const language = language_getter();

/**
 * returns a translation for the month name in the current language
 * @param {string} month
 * @returns {string}
 */
export function translate_month( month: string ): string {

    return translations[ language ].month[ month ];

}