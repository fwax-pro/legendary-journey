function countdown(i) {
    let outlog = '' + i;  

    if(i <= 0) {
        return outlog;
    }
    outlog += ' ' + countdown(i-1)

    return outlog;
}

function factorial(x) {
    if(x === 1) {
        return 1;
    }
    return x * factorial(x-1);
}

module.exports = {
    countdown,
    factorial
};