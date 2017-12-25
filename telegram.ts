import * as request from "request-promise";
import * as Promise from "bluebird";
const config =  require("./config.json");

export function sendMessage(chatId, text, form = {}) {
    return _request('sendMessage', {
        body: {
            chat_id: chatId,
            text,
        }
    })
}

function _request(_path: string, options: request.RequestPromiseOptions = {}) {
    if (!config.token) {
        return Promise.reject(new Error('Telegram Bot Token is not provided!'));
    }
    options.method = 'POST';
    options.simple = false;
    options.resolveWithFullResponse = true;
    options.forever = true;
    options.json = true;

    return request(_buildURL(_path), options)
        .then(response => {
            const data = response.body;

            if (data.ok) {
                return data.result;
            }

            throw new Error(`${data.error_code} ${data.description} ${response}`);
        }).catch(error => {
            if (error.response) throw error;
            throw new Error(error);
        });
}

function _buildURL(_path) {
    return `https://api.telegram.org/bot${config.token}/${_path}`;
}