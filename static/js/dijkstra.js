var dijkstra_array;

function draw_openset() {
    if (openSet.length == 0) {
        return
    }
    for (const c of openSet) {
        console.log('draw open')
        c.element.style.backgroundColor = 'darkblue'
    }
}

function draw_closedset() {

    if (closedSet.length == 0) {
        return
    }
    for (const c of closedSet) {
        console.log('draw closed')
        c.element.style.backgroundColor = 'purple'
    }
}


function draw_backtracking(node) {
    node.element.style.backgroundColor = 'yellow'
}

async function djikstra_algo() {
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




    // Start the algorithm

    var end_pointfound = false

    for (j = 0; solution_found == false; j++) {

        if (openSet.length > 0) {
            console.log('it2')


            closedSet.push(openSet.slice()[0])
            openSet = []


            for (i = 0; i < closedSet.length; i++) {

                if (closedSet[i].i < columns - 1) {
                    if (closedSet.includes(dijkstra_array[closedSet[i].i + 1][closedSet[i].j]) || dijkstra_array[closedSet[i].i + 1][closedSet[i].j].obstacle == true) { }
                    else if (dijkstra_array[closedSet[i].i + 1][closedSet[i].j].start == true) { }
                    else if (dijkstra_array[closedSet[i].i + 1][closedSet[i].j].end == true) { end_pointfound = true }
                    else {
                        openSet.push(dijkstra_array[closedSet[i].i + 1][closedSet[i].j])
                        dijkstra_array[closedSet[i].i + 1][closedSet[i].j].G = 10 * j
                    }
                }

                if (closedSet[i].i > 0) {
                    if (closedSet.includes(dijkstra_array[closedSet[i].i - 1][closedSet[i].j]) || dijkstra_array[closedSet[i].i - 1][closedSet[i].j].obstacle == true) { }
                    else if (dijkstra_array[closedSet[i].i - 1][closedSet[i].j].start == true) { }
                    else if (dijkstra_array[closedSet[i].i - 1][closedSet[i].j].end == true) { end_pointfound = true }
                    else {
                        openSet.push(dijkstra_array[closedSet[i].i - 1][closedSet[i].j])
                        dijkstra_array[closedSet[i].i - 1][closedSet[i].j].G = 10 * j
                    }
                }

                if (closedSet[i].j < columns - 1) {
                    if (closedSet.includes(dijkstra_array[closedSet[i].i][closedSet[i].j + 1]) || dijkstra_array[closedSet[i].i][closedSet[i].j + 1].obstacle == true) { }
                    else if (dijkstra_array[closedSet[i].i][closedSet[i].j + 1].start == true) { }
                    else if (dijkstra_array[closedSet[i].i][closedSet[i].j + 1].end == true) { end_pointfound = true }
                    else {
                        openSet.push(dijkstra_array[closedSet[i].i][closedSet[i].j + 1])
                        dijkstra_array[closedSet[i].i][closedSet[i].j + 1].G = 10 * j
                    }
                }

                if (closedSet[i].j > 0) {
                    if (closedSet.includes(dijkstra_array[closedSet[i].i][closedSet[i].j - 1]) || dijkstra_array[closedSet[i].i][closedSet[i].j - 1].obstacle == true) { }
                    else if (dijkstra_array[closedSet[i].i][closedSet[i].j - 1].start == true) { }
                    else if (dijkstra_array[closedSet[i].i][closedSet[i].j - 1].end == true) { end_pointfound = true }
                    else {
                        openSet.push(dijkstra_array[closedSet[i].i][closedSet[i].j - 1])
                        dijkstra_array[closedSet[i].i][closedSet[i].j - 1].G = 10 * j
                    }
                }

            }


        }
        else if (j == 0) {
            console.log('start it1')
            if (start_i < columns - 1) {
                openSet.push(dijkstra_array[start_i + 1][start_j])
                dijkstra_array[start_i + 1][start_j].G = 10 * j
            }
            if (start_i > 0) {
                openSet.push(dijkstra_array[start_i - 1][start_j])
                dijkstra_array[start_i - 1][start_j].G = 10 * j
            }

            if (start_j < columns - 1) {
                openSet.push(dijkstra_array[start_i][start_j + 1])
                dijkstra_array[start_i][start_j + 1].G = 10 * j
            }
            if (start_j > 0) {
                openSet.push(dijkstra_array[start_i][start_j - 1])
                dijkstra_array[start_i][start_j - 1].G = 10 * j
            }
            for (i = 0; i < openSet.length; i++) {
                console.log('remove obstacle openset')
                if (openSet[i].obstacle == true) {
                    openSet.splice(i, 1);
                }

            }
        }



        draw_openset();
        draw_closedset();

        await sleepNow(0)

        if (end_pointfound == true) {
            //start backwards
            if (closedSet.includes(dijkstra_array[end_i - 1][end_j])) {
                var backtracking = dijkstra_array[end_i - 1][end_j]
            }
            else if (closedSet.includes(dijkstra_array[end_i + 1][end_j])) {
                var backtracking = dijkstra_array[end_i + 1][end_j]
            }
            else if (closedSet.includes(dijkstra_array[end_i][end_j - 1])) {
                var backtracking = dijkstra_array[end_i][end_j - 1]
            }
            else if (closedSet.includes(dijkstra_array[end_i][end_j + 1])) {
                var backtracking = dijkstra_array[end_i][end_j + 1]
            }

            while (solution_found != true) {
                draw_backtracking(backtracking);
                var g = backtracking;
                if (dijkstra_array[backtracking.i + 1][backtracking.j].start == true || dijkstra_array[backtracking.i - 1][backtracking.j].start == true ||
                    dijkstra_array[backtracking.i][backtracking.j + 1].start == true || dijkstra_array[backtracking.i][backtracking.j - 1].start == true) {
                    console.log('done')
                    break;
                }
                if (closedSet.includes(dijkstra_array[backtracking.i + 1][backtracking.j])) {
                    g = dijkstra_array[backtracking.i + 1][backtracking.j]
                }
                if (closedSet.includes(dijkstra_array[backtracking.i - 1][backtracking.j]) && dijkstra_array[backtracking.i - 1][backtracking.j].G < g.G) {
                    g = dijkstra_array[backtracking.i - 1][backtracking.j]
                }
                if (closedSet.includes(dijkstra_array[backtracking.i][backtracking.j + 1]) && dijkstra_array[backtracking.i][backtracking.j + 1].G < g.G) {
                    g = dijkstra_array[backtracking.i][backtracking.j + 1]
                }
                if (closedSet.includes(dijkstra_array[backtracking.i][backtracking.j - 1]) && dijkstra_array[backtracking.i][backtracking.j - 1].G < g.G) {
                    g = dijkstra_array[backtracking.i][backtracking.j - 1]
                }

                backtracking = g
                await sleepNow(10)



            }

            break
        }

    }
}