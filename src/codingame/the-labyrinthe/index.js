/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.

const datas = {};
const nodes = [];
let isFinded = false;
let dir = 'RIGHT';

function getBackDir(dirCurrent) {
    if(dirCurrent === "LEFT") {
        return "RIGHT"
    }
    if(dirCurrent === "RIGHT") {
        return "LEFT"
    }
    if(dirCurrent === "UP") {
        return "DOWN"
    }
    if(dirCurrent === "DOWN") {
        return "UP"
    }
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const KR = parseInt(inputs[0]); // row where Rick is located.
    const KC = parseInt(inputs[1]); // column where Rick is located.
    console.error('K ',KR, KC)
    for (let i = 0; i < R; i++) {
        const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
        console.error('ROW', ROW);
        ROW.split('').forEach((char, index) => {
            datas[`${i}-${index}`] = char;
        });  
    }

    const y = KR;
    const x = KC;
    console.error('POS', datas[`${y}-${x}`])
    
    if(datas[`${y}-${x}`] === 'C') {
        isFinded = true;
    } 

    if(isFinded) {
        //console.error('before',nodes);
        const dirCurrent = nodes.pop();
        //console.error('after',nodes);
        console.error('dirCurrent', dirCurrent)
        dir = getBackDir(dirCurrent)
    } else {

        if(dir === 'RIGHT') {
           if(datas[`${y}-${x+1}`] === '#' && 
                datas[`${y-1}-${x}`] === '.') {
                dir = 'UP';
            } else if(datas[`${y}-${x+1}`] === '#' && 
            datas[`${y+1}-${x}`] === '.') {
                dir = 'DOWN';
            } else if(datas[`${y}-${x+1}`] === '#') {
                dir = 'LEFT'
            }
    
        } else if(dir === 'LEFT') {
            if(datas[`${y}-${x-1}`] === '#' && 
                datas[`${y-1}-${x}`] === '.') {
                dir = 'UP';
            } else if(datas[`${y}-${x-1}`] === '#' && 
            datas[`${y+1}-${x}`] === '.') {
                dir = 'DOWN';
            }
        } else if(dir === 'DOWN') {
            if(datas[`${y+1}-${x}`] === '#' && datas[`${y}-${x-1}`] === '.') {
                dir = 'LEFT';
            } else if(datas[`${y+1}-${x}`] === '#' && datas[`${y}-${x+1}`] === '.') {
                dir = 'RIGHT';
            }
        } else if(dir === 'UP') {
            if(datas[`${y-1}-${x}`] === '#' && datas[`${y}-${x-1}`] === '.') {
                dir = 'LEFT';
            } else if(datas[`${y-1}-${x}`] === '#' && datas[`${y}-${x+1}`] === '.') {
                dir = 'RIGHT';
            }
        }
    }

    console.error('dir', dir)
    if(!isFinded) {
        nodes.push(dir);
    }
    console.log(dir);     // Rick's next move (UP DOWN LEFT or RIGHT).
}
