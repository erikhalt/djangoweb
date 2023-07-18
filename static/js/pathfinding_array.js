var list_of_elements;
var columns;
var array;
var color = 'white'

document.addEventListener('DOMContentLoaded', function () {
    list_of_elements = Array.from(document.getElementsByClassName('point-array'));
    columns = list_of_elements.length ** 0.5;
    array = split_array_two_dim(columns, list_of_elements);
    generate_board();
}, false);


function split_array_two_dim(col, list) {
    size = list.length;
    newlist = [];
    for (i = 0; i < size; i += col) {
        newlist.push(list.slice(i, i + col));
    }
    return newlist;
}


function generate_board() {
    for (i = 0; i < columns; i++) {
        for (j = 0; j < columns; j++) {
            array[i][j].style.height = (100 / columns) + '%'
            array[i][j].style.width = (100 / columns) + '%'
            array[i][j].style.left = j * (100 / columns) + '%'
            array[i][j].style.top = i * (100 / columns) + '%'
            array[i][j].style.backgroundColor = 'white'
            console.log('test')
        }
    }
};

function change_color(new_color) {
    color = new_color;
}

function change_color_of_point(id) {
    element = document.getElementById(id)
    element.style.backgroundColor = color
}

function choosen_algorithm() {
    algo = document.getElementById('algodropdown').value
    if (algo == " ") {
        return
    }
    else if (algo != " ") {
        console.log(algo)
    }
}






