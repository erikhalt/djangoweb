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
    else if (algo == "djikstra") {
        djikstra_algo()
    }
    else if (algo == "astar") {
        astar_algo()
    }
}
function astar_algo() {

}

var dijkstra_array;

function djikstra_algo() {
    solution_found = false;
    class Node {
        constructor(i, j, element) {
            this.G;
            this.i = i;
            this.j = j;
            this.element = element;
            this.start = false;
            this.end = false;
            this.obstacle = false;

            if (this.element.style.backgroundColor == 'green') {
                this.start = true;
            };

            if (this.element.style.backgroundColor == 'red') {
                this.end = true;
            };

            if (this.element.style.backgroundColor == 'grey') {
                this.obstacle = true;
            };
        }
    }


    dijkstra_array = []

    for (i = 0; i < columns; i++) {
        list = []
        for (j = 0; j < columns; j++) {
            list.push(new Node(i, j, array[i][j]));
        }
        dijkstra_array.push(list)
    }
    openSet = []
    closedSet = []

    for (const m of dijkstra_array) {
        for (const n of m) {
            if (n.start == true) {
                start_i = n.i;
                start_j = n.j;
            }
            else if (n.end == true) {
                end_i = n.i;
                end_j = n.j;
            }
        }
    }

    function draw_openset() {
        if (openSet.length == 0) {
            return
        }
        for (const c of openSet) {
            console.log('draw')
            c.element.style.backgroundColor = 'lightblue'
        }
    }

    function draw_closedset() {

        if (closedSet.length == 0) {
            return
        }
        for (const c of closedSet) {
            c.element.style.backgroundColor = 'blue'
        }
    }
    // Start the algorithm

    if (start_i < columns - 1) {
        openSet.push(dijkstra_array[start_i + 1][start_j])
        dijkstra_array[start_i + 1][start_j].G = 10
    }
    if (start_i > 0) {
        openSet.push(dijkstra_array[start_i - 1][start_j])
        dijkstra_array[start_i - 1][start_j].G = 10
    }

    if (start_j < columns - 1) {
        openSet.push(dijkstra_array[start_i][start_j + 1])
        dijkstra_array[start_i][start_j + 1].G = 10
    }
    if (start_j > 0) {
        openSet.push(dijkstra_array[start_i][start_j - 1])
        dijkstra_array[start_i][start_j - 1].G = 10
    }

    while (solution_found != true) {
        for (i = 0; i < openSet.length; i++) {
            if (openSet[i].obstacle == true) {
                openSet.splice(i, 1);
            }
        }
        draw_openset();
        draw_closedset();
        solution_found = true;

    }



}






