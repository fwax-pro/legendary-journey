function numberPositiveCloserToZero(arr, current = null) {
    if(arr.length === 0) {
        return current === null ? 0 : current;
    }
    
    const test = arr.pop();
    if( Number.isNaN(parseInt(test))) {
        return 0
    }
    if(current === null || 
        Math.abs(test) < Math.abs(current) ||
        Math.abs(test) === Math.abs(current) && current < 0
    ) {
        return numberPositiveCloserToZero(arr, test)
    }

    return numberPositiveCloserToZero(arr, current)
}

module.exports = {
    numberPositiveCloserToZero
};