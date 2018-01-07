"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Do an XHR via GET
 * @param {string} url url the request is sent to
 * @param {(err: (string | null), result?: string) => void} callback function called after request is done
 */
function request(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, xhr.responseText);
        }
        else {
            callback("Request failed.  Returned status of " + xhr.status);
        }
    };
    xhr.send();
}
exports.request = request;
