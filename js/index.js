import { addListeners } from "./listeners";
import { get_data } from './inflation';
function main() {
    addListeners();
    get_data();
}
main();
