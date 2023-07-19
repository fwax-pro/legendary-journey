function findSmallest(array) {
    let smallest = array[0];
    let smallestIndex = 0;

    array.forEach((el, i) => {
       if(el < smallest) {
        smallest = el;
        smallestIndex = i;
       }
    });

    return smallestIndex
}

function selectionSort(array) {
    newArray = [];

    for(let i = 0; i < array.length; i++) {
        const smallest = findSmallest(array);
        newArray.push(array[smallest]);
        array.splice(smallest, 1);
        i--
    }
    
    return newArray
}

module.exports = selectionSort