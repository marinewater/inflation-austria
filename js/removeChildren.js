/**
 * removes all child nodes from an html element
 * @param {HTMLElement} element
 */
export function remove_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
