"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * removes all child nodes from an html element
 * @param {HTMLElement} element
 */
function remove_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
exports.remove_children = remove_children;
