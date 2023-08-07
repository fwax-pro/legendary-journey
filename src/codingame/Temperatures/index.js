function numberPositiveCloserToZero(arr, current = null) {
    if(arr.length === 0) {
        return current === null ? 0 : current;
    }

    const test = arr.pop();
    if(current === null || 
        Math.abs(test) < Math.abs(current) || 
        test < 0 && Math.abs(test) < Math.abs(current)
    ) {
        return numberPositiveCloserToZero(arr, test)
    }

    return numberPositiveCloserToZero(arr, current)
}

module.exports = {
    numberPositiveCloserToZero
};