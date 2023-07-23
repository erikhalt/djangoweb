var astar_array;

async function astar_algo() {
    class node_astar {
        constructor(i, j, element) {
            this.i = i
            this.j = j
            this.element = element
            this.start = false
            this.end = false
            this.obstacle = false
            this.gcost;
            this.fcost;
            this.hcost;

            if (this.element.style.backgroundColor == 'green') {
                this.start = true;
                this.gcost = 0;
            }
            if (this.element.style.backgroundColor == 'red') {
                this.end = true;
                this.hcost = 0;
            }
            if (this.element.style.backgroundColor == 'grey') {
                this.obstacle = true;
            }
        }
    }
    //draw functions
    function draw_openlist() {
        if (openlist.length == 0) {
            return
        }
        for (const c of openlist) {
            console.log('draw open')
            c.element.style.backgroundColor = 'darkblue'
        }
    }

    function draw_closedlist() {

        if (closedlist.length == 0) {
            return
        }
        for (const c of closedlist) {
            console.log('draw closed')
            c.element.style.backgroundColor = 'purple'
        }
    }

    // create astart array with node_astar
    astar_array = []
    for (i = 0; i < columns; i++) {
        list = []
        for (j = 0; j < columns; j++) {
            list.push(new node_astar(i, j, array[i][j]));
        }
        astar_array.push(list)
    }

    // find start and finnishpoint coordinates
    var s_i;
    var s_j;
    var f_i;
    var f_j;
    var openlist = [];
    var closedlist = [];

    for (const row in astar_array) {
        for (const nodes in row) {
            if (nodes.start == true) {
                s_i = nodes.i;
                s_j = nodes.j;
                openlist.push(nodes);

            }
            if (nodes.end == true) {
                f_i = nodes.i;
                f_j = nodes.j;
            }
        }
    }

    // Calculating costs for start and finnish point
    for (const row in astar_array) {
        for (const nodes in row) {
            if (nodes.start == true) {
                nodes.fcost = (((nodes.i - f_i) ** 2) + ((nodes.j - f_j) ** 2) ** 0.5)
            }
            if (nodes.end == true) {
                nodes.fcost = (((nodes.i - s_i) ** 2) + ((nodes.j - s_j) ** 2) ** 0.5)
            }
        }
    }

    //main loop

    do {
        console.log('start');
        draw_closedlist()
        draw_openlist()
        openlist.sort((a, b) => a.fcost - b.fcost)
        current = openlist[0]
        closedlist.push(current)
        for (i = -1; i < 2; i++) {
            for (j = -1; i < 2; j++) {
                if (i == 0 && j == 0) { }
                if (current.end == true) {
                    break
                }
                console.log('neighbor');
                astar_array[current.i + i][current.j + j].gcost = ((((current.i + i) - s_i) ** 2) + (((current.j + j) - s_j) ** 2) ** 0.5)
                astar_array[current.i + i][current.j + j].hcost = ((((current.i + i) - f_i) ** 2) + (((current.j + j) - f_j) ** 2) ** 0.5)
                astar_array[current.i + i][current.j + j].fcost = (astar_array[current.i + i][current.j + j].hcost + astar_array[current.i + i][current.j + j].gcost)
                if (openlist.includes(astar_array[current.i + i][current.j + j]) != true) {
                    opelist.push(astar_array[current.i + i][current.j + j])
                }
            }
        }
        openlist.splice(0, 1)
        await sleepNow(100)
    }
    while (openlist.length > 0);
}
