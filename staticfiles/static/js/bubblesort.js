


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function bubblesort(listlength) {
    var listofstaples = document.getElementsByClassName("staples");

    sortedList = listOfNumber

    sortedList = listOfNumber.slice().sort(function (a, b) { return a - b })


    while (sortedList.toString() != listOfNumber.toString()) {
        let i = 0


        for (i; i < listlength; i++) {

            if (i == listlength - 1) { }
            else if (listOfNumber[i] > listOfNumber[i + 1]) {
                temp = listOfNumber[i];
                listOfNumber[i] = listOfNumber[i + 1];
                listOfNumber[i + 1] = temp;



                for (j = 0; j < listlength; j++) {
                    listofstaples[j].style.height = listOfNumber[j] + '%';
                };
                await sleepNow(10);
            };

        };

    };
}



function generate(listlength) {
    var listofstaples = document.getElementsByClassName("staples")

    listOfNumber = Array.from({
        length: listlength
    }, () => Math.floor(Math.random() * 90));
    let i = 0
    for (i; i < listlength; i++) {
        listofstaples[i].style.height = listOfNumber[i] + '%';
    }
}