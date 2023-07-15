
function split_array_two_dim(col, list) {
    size = list.length;
    newlist = [];
    for (i = 0; i < size; i += col) {
        newlist.push(list.slice(i, i + col));
    }
    return newlist;
}

var list_of_elements;
var columns;
var array;

document.addEventListener('DOMContentLoaded', function () {
    list_of_elements = Array.from(document.getElementsByClassName('point-array'));
    columns = 100;
    array = split_array_two_dim(columns, list_of_elements);
    for (const x of array) {
        console.log(x);
    };






}, false);










