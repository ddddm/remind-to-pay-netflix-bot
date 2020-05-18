import Polyglot = require('node-polyglot');
import translations from './ru';

const instance = new Polyglot({
    phrases: translations
});

export function t(key: string, values?: Polyglot.InterpolationOptions) {
    return instance.t(key, values || {} );
}
